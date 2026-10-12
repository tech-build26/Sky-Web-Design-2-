import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { renderToString } from 'react-dom/server';

// DOM interaction tests, with native dialog behavior shimmed for JSDOM.
const dom = new JSDOM('<!doctype html><html><body><div id="test-root"></div></body></html>', { url: 'https://skyriders.test' });
for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node', 'Event', 'MouseEvent', 'StorageEvent']) globalThis[key] = dom.window[key];
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
dom.window.HTMLDialogElement.prototype.showModal = function () { this.open = true; this.querySelector('[autofocus]')?.focus(); };
dom.window.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new Event('close')); };
const { createRoot } = await import('react-dom/client');
const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'skyriders-consent-'));
const stylesFile = path.join(temporary, 'styles.mjs');
await fs.writeFile(stylesFile, 'export default new Proxy({}, {get: (_, name) => name});');
const stylesUrl = pathToFileURL(stylesFile).href;
const loaded = new Map();
async function moduleUrl(file) {
  if (loaded.has(file)) return loaded.get(file);
  const outputFile = path.join(temporary, file.replaceAll('/', '_').replace(/\.tsx?$/, '.mjs'));
  const url = pathToFileURL(outputFile).href;
  loaded.set(file, url);
  let source = ts.transpileModule(await fs.readFile(file, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  for (const specifier of [...new Set([...source.matchAll(/from "([^"]+)"/g)].map(match => match[1]))]) {
    let url;
    if (specifier.endsWith('.css')) url = stylesUrl;
    else if (specifier === 'react' || specifier === 'react/jsx-runtime') url = import.meta.resolve(specifier);
    else {
      const base = specifier.startsWith('@/') ? `src/${specifier.slice(2)}` : path.posix.join(path.posix.dirname(file), specifier);
      let target;
      for (const ext of ['.ts', '.tsx']) { try { await fs.access(base + ext); target = base + ext; break; } catch {} }
      if (!target) throw new Error(`Cannot resolve ${specifier} in ${file}`);
      url = await moduleUrl(target);
    }
    source = source.replaceAll(JSON.stringify(specifier), JSON.stringify(url));
  }
  await fs.writeFile(outputFile, source);
  return url;
}

const store = await import(await moduleUrl('src/lib/cookie-consent.ts'));
const { CookieConsent } = await import(await moduleUrl('src/components/site/CookieConsent.tsx'));
const { CookieSettingsButton } = await import(await moduleUrl('src/components/site/CookieSettingsButton.tsx'));
const { OfficeMap } = await import(await moduleUrl('src/components/sections/OfficeMap.tsx'));
const now = Date.now();
const valid = { version: store.CONSENT_VERSION, savedAt: now, expiresAt: now + store.CONSENT_MAX_AGE, externalMedia: true };
assert.deepEqual(store.parseConsent(JSON.stringify(valid), now), valid);
for (const value of [null, '{broken', 'null', '{}', JSON.stringify({ ...valid, externalMedia: 'true' }), JSON.stringify({ ...valid, version: 0 }), JSON.stringify({ ...valid, savedAt: now + 1 }), JSON.stringify({ ...valid, expiresAt: now }), JSON.stringify({ ...valid, expiresAt: valid.expiresAt + 1 })]) assert.equal(store.parseConsent(value, now), null);
// Even a returning visitor's maps must not appear in initial server HTML.
window.localStorage.setItem(store.CONSENT_KEY, JSON.stringify(valid));
const serverHtml = renderToString(React.createElement(OfficeMap));
assert(!serverHtml.includes('<iframe'));
assert(!serverHtml.includes('maps.google.com'));
window.localStorage.clear();

const container = document.getElementById('test-root');
let root = createRoot(container);
const tree = () => React.createElement(React.Fragment, null, React.createElement(CookieConsent), React.createElement(CookieSettingsButton), React.createElement(OfficeMap));
const click = async element => { assert(element, 'Expected clickable element'); await act(() => { element.focus(); element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); }); };
const banner = () => container.querySelector('[aria-labelledby="cookie-banner-title"]');
const dialog = () => container.querySelector('#cookie-preferences');
const button = (scope, text) => [...scope.querySelectorAll('button')].find(element => element.textContent.trim() === text);
const reset = async () => { await act(() => { window.localStorage.clear(); window.dispatchEvent(new StorageEvent('storage', { key: null })); }); };
await act(() => root.render(tree()));
assert(banner()); assert.equal(container.querySelectorAll('iframe').length, 0);
await click(button(banner(), 'Manage Preferences ↗'));
assert(dialog().open); assert.equal(document.body.style.overflow, 'hidden');
assert.equal(dialog().querySelector('[role="switch"]').getAttribute('aria-checked'), 'false');
await click(dialog().querySelector('[aria-label="Close cookie preferences without saving"]'));
assert(banner()); assert.equal(window.localStorage.getItem(store.CONSENT_KEY), null); assert.equal(document.body.style.overflow, '');

await click(button(banner(), 'Reject Optional'));
assert(!banner()); assert.equal(store.getConsent().externalMedia, false); assert.equal(container.querySelectorAll('iframe').length, 0);
await act(() => root.unmount());
root = createRoot(container); await act(() => root.render(tree()));
assert(!banner(), 'Saved rejection persists after a remount/navigation');
const settings = button(container, 'Cookie settings');
await click(settings); assert(dialog().open);
await click(dialog().querySelector('[role="switch"]'));
assert.equal(container.querySelectorAll('iframe').length, 0, 'Draft toggles do not grant consent');
await click(button(dialog(), 'Save Preferences ↗'));
assert.equal(container.querySelectorAll('iframe').length, 2); assert.equal(store.getConsent().externalMedia, true); assert(document.activeElement === settings, 'Focus returns to the settings trigger');
await click(settings); await click(button(dialog(), 'Reject Optional'));
assert.equal(container.querySelectorAll('iframe').length, 0, 'Withdrawal immediately unmounts optional vendors');

await reset(); await click(button(banner(), 'Accept All'));
assert.equal(container.querySelectorAll('iframe').length, 2); assert(!banner());
// A choice in another tab updates all subscribers, including the map gates.
await act(() => { window.localStorage.setItem(store.CONSENT_KEY, JSON.stringify({ ...valid, externalMedia: false })); window.dispatchEvent(new StorageEvent('storage', { key: store.CONSENT_KEY })); });
assert.equal(container.querySelectorAll('iframe').length, 0);
await act(() => { window.localStorage.setItem(store.CONSENT_KEY, '{broken'); window.dispatchEvent(new StorageEvent('storage', { key: store.CONSENT_KEY })); });
assert(banner()); assert.equal(container.querySelectorAll('iframe').length, 0);

await click(button(banner(), 'Accept All'));
const realNow = Date.now;
const expiresAt = JSON.parse(window.localStorage.getItem(store.CONSENT_KEY)).expiresAt;
Date.now = () => expiresAt + 1;
await act(() => window.dispatchEvent(new Event('focus')));
assert(banner()); assert.equal(container.querySelectorAll('iframe').length, 0, 'Expired consent revokes optional media on active pages');
Date.now = realNow;
await reset();
// Storage failures must not crash, silently persist, or turn a rejection into consent.
await click(button(banner(), 'Accept All'));
await click(button(container, 'Cookie settings'));
const storagePrototype = Object.getPrototypeOf(window.localStorage);
const realSet = storagePrototype.setItem;
storagePrototype.setItem = () => { throw new Error('Storage blocked'); };
await click(button(dialog(), 'Reject Optional'));
assert(!banner()); assert.equal(store.getConsent().externalMedia, false); assert(container.querySelector('[role="status"]')); assert.equal(window.localStorage.getItem(store.CONSENT_KEY), null);
await click(button(container, 'Cookie settings')); await click(button(dialog(), 'Accept All'));
assert.equal(container.querySelectorAll('iframe').length, 2, 'Explicit choice still applies in memory when storage is blocked');
storagePrototype.setItem = realSet;
await reset();
assert(banner()); assert.equal(container.querySelectorAll('iframe').length, 0);
await act(() => root.unmount());
dom.window.close();
// This exact directory was created by this run and contains only transpiled fixtures.
assert.equal(path.dirname(path.resolve(temporary)), path.resolve(os.tmpdir()));
assert(path.basename(temporary).startsWith('skyriders-consent-'));
await fs.rm(temporary, { recursive: true, force: true });
console.log('Consent tests passed: SSR gating, first visit, accept/reject, saved choices, draft/save/cancel, withdrawal, cross-tab updates, invalid/expired records, blocked storage and focus restoration.');
