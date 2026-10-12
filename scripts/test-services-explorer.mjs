import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { renderToString } from 'react-dom/server';

// Exercise selections and modal lifecycle without opening a browser or sending enquiries.
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'https://skyriders.test/home' });
for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent']) globalThis[key] = dom.window[key];
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
let reducedMotion = true;
window.matchMedia = () => ({ matches: reducedMotion });
dom.window.HTMLDialogElement.prototype.showModal = function () { this.open = true; this.querySelector('[autofocus]')?.focus(); };
dom.window.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new Event('close')); };
const { createRoot } = await import('react-dom/client');
const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'skyriders-services-'));
const mocks = {
  'next/image': 'import React from "react"; export default function Image({fill,preload,fetchPriority,...props}) { return React.createElement("img",props); }',
  'next/link': 'import React from "react"; export default function Link({prefetch,...props}) { return React.createElement("a",props); }',
  'next/dynamic': 'export default function dynamic() { return globalThis.TestServicesExplorer; }',
  styles: 'export default new Proxy({}, {get: (_, key) => key});',
};
const urls = {};
for (const [name, source] of Object.entries(mocks)) {
  const file = path.join(temporary, name.replaceAll('/', '_') + '.mjs');
  await fs.writeFile(file, source.replace('"react"', JSON.stringify(import.meta.resolve('react'))));
  urls[name] = pathToFileURL(file).href;
}
const loaded = new Map();
async function moduleUrl(file) {
  if (loaded.has(file)) return loaded.get(file);
  const destination = path.join(temporary, file.replaceAll('/', '_').replace(/\.tsx?$/, '.mjs'));
  const url = pathToFileURL(destination).href;
  loaded.set(file, url);
  let source = ts.transpileModule(await fs.readFile(file, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  for (const specifier of [...new Set([...source.matchAll(/from "([^"]+)"/g)].map(match => match[1]))]) {
    let resolved;
    if (specifier.endsWith('.css')) resolved = urls.styles;
    else if (urls[specifier]) resolved = urls[specifier];
    else if (specifier === 'react' || specifier === 'react/jsx-runtime') resolved = import.meta.resolve(specifier);
    else {
      const base = specifier.startsWith('@/') ? `src/${specifier.slice(2)}` : path.posix.join(path.posix.dirname(file), specifier);
      let target;
      for (const extension of ['.ts', '.tsx']) { try { await fs.access(base + extension); target = base + extension; break; } catch {} }
      if (!target) throw new Error(`Cannot resolve ${specifier}`);
      resolved = await moduleUrl(target);
    }
    source = source.replaceAll(`from "${specifier}"`, `from ${JSON.stringify(resolved)}`);
  }
  await fs.writeFile(destination, source);
  return url;
}
try {
  const { default: Explorer } = await import(await moduleUrl('src/components/sections/ServicesExplorer.tsx'));
  globalThis.TestServicesExplorer = Explorer;
  const { ServicesCatalogue } = await import(await moduleUrl('src/components/sections/ServicesCatalogue.tsx'));
  assert(renderToString(React.createElement(ServicesCatalogue)).includes('disabled=""'), 'Server-rendered launcher must wait for its interaction handlers.');
  const root = createRoot(document.getElementById('root'));
  const click = async element => act(() => element.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  await act(() => root.render(React.createElement(ServicesCatalogue)));
  const trigger = document.querySelector('[aria-haspopup="dialog"]');
  const dialog = document.querySelector('dialog');
  assert.equal(dialog.open, false);
  assert.equal(document.querySelector('[role="tablist"]'), null, 'Closed explorer must not mount its photographs or details.');
  await click(trigger);
  assert.equal(dialog.open, true);
  assert.equal(document.body.style.overflow, 'hidden');
  assert.equal(document.activeElement.getAttribute('aria-label'), 'Close all services');
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  assert.equal(tabs.length, 6);
  const destinations = [
    '/services/inspection-concrete-access#inspection-ndt', '/services/inspection-concrete-access#concrete-services', '/services/inspection-concrete-access#installations',
    '/services/maintenance-confined-space-drone#maintenance', '/services/maintenance-confined-space-drone#confined-space', '/services/maintenance-confined-space-drone#drone-inspection',
  ];
  for (const [index, tab] of tabs.entries()) {
    await click(tab);
    assert.equal(tab.getAttribute('aria-selected'), 'true');
    assert.equal(document.querySelectorAll('[role="tab"][tabindex="0"]').length, 1);
    const panel = document.querySelector('[role="tabpanel"]');
    assert.equal(panel.getAttribute('aria-labelledby'), tab.id);
    assert.equal(panel.querySelector('a').getAttribute('href'), destinations[index]);
    assert.equal(panel.querySelectorAll('li').length, 3);
    assert(panel.querySelector('img').getAttribute('alt').length > 0);
  }
  await act(() => tabs[5].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true })));
  assert.equal(document.activeElement, tabs[0]);
  await act(() => tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })));
  assert.equal(document.activeElement, tabs[5]);
  await click(document.querySelector('[aria-label="Close all services"]'));
  assert.equal(dialog.open, false);
  assert.equal(document.body.style.overflow, '');
  assert.equal(document.activeElement, trigger);
  await click(trigger);
  await act(() => dialog.dispatchEvent(new Event('cancel', { cancelable: true })));
  assert.equal(dialog.open, false, 'Escape must close the dialog.');
  await click(trigger);
  await click(dialog);
  assert.equal(dialog.open, false, 'Backdrop must close the dialog.');
  reducedMotion = false;
  await click(trigger);
  await click(document.querySelector('[aria-label="Close all services"]'));
  assert.equal(dialog.dataset.closing, 'true');
  assert.equal(dialog.open, true, 'Normal-motion close should finish its animation.');
  await act(async () => { await new Promise(resolve => setTimeout(resolve, 220)); });
  assert.equal(dialog.open, false);
  assert.equal(document.body.style.overflow, '');
  reducedMotion = true;
  await click(trigger);
  await click(document.querySelector('[role="tabpanel"] a'));
  assert.equal(dialog.open, false, 'Navigation must unlock the page immediately.');
  assert.equal(document.body.style.overflow, '');
  await click(trigger);
  await act(() => root.unmount());
  assert.equal(document.body.style.overflow, '', 'Unmounting an open dialog must restore scrolling.');
  console.log('Services explorer: all six destinations, previews, keyboard wrap, modal focus, close, Escape, backdrop, navigation and unmount cleanup passed.');
} finally {
  delete globalThis.TestServicesExplorer;
  dom.window.close();
  assert.equal(path.dirname(temporary), os.tmpdir());
  assert(path.basename(temporary).startsWith('skyriders-services-'));
  await fs.rm(temporary, { recursive: true, force: true });
}
