import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';

// Isolated DOM interaction tests; this does not open or control a browser.
// Geometry and WAAPI timing are fixtures, so this is not visual/performance QA.
const dom = new JSDOM('<!doctype html><html><body><div id="test-root"></div></body></html>');
for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent', 'MutationObserver']) globalThis[key] = dom.window[key];
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const { createRoot } = await import('react-dom/client');
let reduced = false;
const preferenceListeners = new Set();
window.matchMedia = () => ({ get matches() { return reduced; }, addEventListener: (_, fn) => preferenceListeners.add(fn), removeEventListener: (_, fn) => preferenceListeners.delete(fn) });
globalThis.getComputedStyle = () => ({ borderTopWidth: '1px', borderBottomWidth: '1px', paddingTop: '0px', paddingBottom: '0px' });

const animations = [];
HTMLElement.prototype.animate = function (frames, options) {
  const animation = { element: this, frames, options, playState: 'running', progress: 0, onfinish: null,
    cancel() { this.playState = 'idle'; },
    finish() { if (this.playState !== 'running') return; this.progress = 1; this.playState = 'finished'; this.onfinish?.(); },
  };
  animations.push(animation);
  return animation;
};
const nativeAnimate = HTMLElement.prototype.animate;
HTMLElement.prototype.getBoundingClientRect = function () {
  let height = 0;
  const pending = animations.findLast(a => a.element === this && a.playState === 'running' && a.frames[0].height);
  if (pending) height = parseFloat(pending.frames[0].height) + (parseFloat(pending.frames[1].height) - parseFloat(pending.frames[0].height)) * pending.progress;
  else if (this.tagName === 'SUMMARY') height = 64;
  else if (this.tagName === 'DETAILS') height = 66 + (this.open ? 120 : 0);
  else if (this.className === 'faqSlot') {
    const panel = this.querySelector('[role="tabpanel"]:not([hidden])');
    height = panel ? 46 + [...panel.querySelectorAll('details')].reduce((sum, item) => sum + item.getBoundingClientRect().height, 0) : 0;
  }
  return { height, width: 600, top: 0, bottom: height, left: 0, right: 600, x: 0, y: 0, toJSON: () => ({ height }) };
};
const observers = [];
globalThis.IntersectionObserver = class {
  constructor(callback, options) { this.callback = callback; this.options = options; this.observed = new Set(); this.disconnected = false; observers.push(this); }
  observe(element) { this.observed.add(element); }
  unobserve(element) { this.observed.delete(element); }
  disconnect() { this.disconnected = true; this.observed.clear(); }
};
window.IntersectionObserver = globalThis.IntersectionObserver;
const stylesUrl = `data:text/javascript;base64,${Buffer.from('export default new Proxy({}, {get: (_, name) => name});').toString('base64')}`;
const loaded = new Map();
async function moduleUrl(path) {
  if (loaded.has(path)) return loaded.get(path);
  let source = ts.transpileModule(await fs.readFile(path, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  source = source.replaceAll('"react"', JSON.stringify(import.meta.resolve('react'))).replaceAll('"react/jsx-runtime"', JSON.stringify(import.meta.resolve('react/jsx-runtime')));
  source = source.replace('"./careers.module.css"', JSON.stringify(stylesUrl));
  if (source.includes('"./AnimatedDisclosure"')) source = source.replace('"./AnimatedDisclosure"', JSON.stringify(await moduleUrl('src/components/careers/AnimatedDisclosure.tsx')));
  if (source.includes('"./VacancyDetail"')) source = source.replace('"./VacancyDetail"', JSON.stringify(await moduleUrl('src/components/careers/VacancyDetail.tsx')));
  if (source.includes('"@/components/site/Icons"')) source = source.replace('"@/components/site/Icons"', JSON.stringify(await moduleUrl('src/components/site/Icons.tsx')));
  const url = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`; loaded.set(path, url); return url;
}
const { CareersFaq } = await import(await moduleUrl('src/components/careers/CareersFaq.tsx'));
const { ScrollReveals } = await import(await moduleUrl('src/components/site/ScrollReveals.tsx'));
const { VacancyCard } = await import(await moduleUrl('src/components/careers/VacancyCard.tsx'));
const container = document.getElementById('test-root');
const root = createRoot(container);
const click = async element => act(() => { element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); });
const key = async (element, value) => act(() => { element.dispatchEvent(new KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true })); });
const finish = async () => act(() => { for (const animation of animations) animation.finish(); });
function visiblePanel() { return container.querySelector('[role="tabpanel"]:not([hidden])'); }
await act(() => root.render(React.createElement(CareersFaq)));
assert.equal(container.querySelectorAll('[role="tab"]').length, 4);
assert.equal(container.querySelectorAll('[role="tabpanel"]:not([hidden])').length, 1);
const questions = visiblePanel().querySelectorAll('details');
const first = questions[0], second = questions[1];
await click(first.querySelector('summary'));
assert(first.open); assert.equal(first.lastElementChild.inert, false);
let transition = animations.findLast(a => a.element === first);
assert.equal(transition.options.fill, 'both');
assert.equal(transition.frames[0].height, '66px'); assert.equal(transition.frames[1].height, '186px');
transition.progress = .4;
const midOpenHeight = first.getBoundingClientRect().height;
await click(first.querySelector('summary'));
assert.equal(transition.playState, 'idle');
let reverse = animations.findLast(a => a.element === first);
assert.equal(parseFloat(reverse.frames[0].height), midOpenHeight);
assert.equal(first.lastElementChild.inert, true);
reverse.progress = .3;
const midCloseHeight = first.getBoundingClientRect().height;
await click(first.querySelector('summary'));
assert.equal(parseFloat(animations.findLast(a => a.element === first).frames[0].height), midCloseHeight);
await finish(); assert(first.open); assert.equal(first.style.height, '');
await click(second.querySelector('summary')); await finish();
assert.equal(first.open, false); assert.equal(second.open, true);

let tabs = container.querySelectorAll('[role="tab"]');
await click(tabs[3]);
assert.equal(visiblePanel().id, 'faq-panel-3');
assert(animations.some(a => a.element.className === 'faqSlot' && a.options.duration === 360));
await click(tabs[1]); await click(tabs[2]); await finish();
assert.equal(visiblePanel().id, 'faq-panel-2');
assert.equal(container.querySelectorAll('[role="tab"][aria-selected="true"]').length, 1);
await key(tabs[2], 'ArrowLeft'); assert.equal(visiblePanel().id, 'faq-panel-1'); assert.equal(document.activeElement, tabs[1]);
await key(tabs[1], 'End'); assert.equal(visiblePanel().id, 'faq-panel-3'); assert.equal(document.activeElement, tabs[3]);
await key(tabs[3], 'Home'); assert.equal(visiblePanel().id, 'faq-panel-0');
await finish();

reduced = true; await act(() => { preferenceListeners.forEach(fn => fn()); });
const beforeReduced = animations.length;
await click(tabs[1]);
const reducedQuestion = visiblePanel().querySelector('details');
await click(reducedQuestion.querySelector('summary')); assert(reducedQuestion.open);
await click(reducedQuestion.querySelector('summary')); assert(!reducedQuestion.open);
assert.equal(animations.length, beforeReduced, 'Reduced motion must not start WAAPI transitions.');
reduced = false; delete HTMLElement.prototype.animate;
await click(reducedQuestion.querySelector('summary')); assert(reducedQuestion.open);
await click(reducedQuestion.querySelector('summary')); assert(!reducedQuestion.open);
HTMLElement.prototype.animate = nativeAnimate;
await click(reducedQuestion.querySelector('summary'));
window.dispatchEvent(new Event('resize'));
assert(reducedQuestion.open); assert.equal(animations.findLast(a => a.element === reducedQuestion).playState, 'idle');
await act(() => root.unmount());
assert(!animations.some(a => a.playState === 'running'));

const roleRoot = createRoot(container);
let applications = 0;
const vacancy = { id: 'test-only-role', reference: 'TEST-ONLY', title: 'Test technician', site: 'Test industrial site', region: 'Mpumalanga', level: 'Level 3', contract: 'Shutdown / outage', sector: 'Power generation', scheme: 'IRATA', duration: '6 weeks', headcount: 4, rotation: 'Day shift', start: 'Planned shutdown', closing_at: null, description: '<script>Test text must remain escaped</script>', requirements: ['Coded welding qualification'], additional_requirements: '' };
await act(() => roleRoot.render(React.createElement(VacancyCard, { vacancy, onApply: () => applications++ })));
assert(container.textContent.includes('Applications open'));
assert(container.textContent.includes('Shutdown / outage'));
assert.equal(container.querySelectorAll('script').length, 0);
const role = container.querySelector('details');
await click(role.querySelector('summary')); await finish(); assert(role.open);
await click(role.querySelector('button')); assert.equal(applications, 1);
await click(role.querySelector('summary')); await finish(); assert(!role.open); assert.equal(role.lastElementChild.inert, true);
await act(() => roleRoot.render(React.createElement(VacancyCard, { vacancy, preview: true })));
assert(container.textContent.includes('Preview only')); assert(!container.querySelector('button'));
await act(() => roleRoot.unmount());

const revealRoot = createRoot(container);
await act(() => revealRoot.render(React.createElement(ScrollReveals)));
const revealObserver = observers.find(o => o.options?.threshold === .08);
const card = document.createElement('article'); card.dataset.reveal = 'bottom';
await act(async () => { container.append(card); await Promise.resolve(); });
assert(card.classList.contains('motion-pending')); assert(revealObserver.observed.has(card));
revealObserver.callback([{ target: card, isIntersecting: true }]);
assert(card.classList.contains('arrived')); assert(!card.classList.contains('motion-pending'));
await act(async () => { card.remove(); await Promise.resolve(); });
assert(!revealObserver.observed.has(card));
const another = document.createElement('article'); another.dataset.reveal = 'bottom';
await act(async () => { container.append(another); await Promise.resolve(); });
reduced = true; await act(() => { preferenceListeners.forEach(fn => fn()); });
assert(!another.classList.contains('motion-pending')); assert.equal(document.documentElement.dataset.motion, 'reduced');
await act(() => revealRoot.unmount());
assert(revealObserver.disconnected); assert.equal(document.documentElement.dataset.motion, undefined);
dom.window.close();
console.log('PASS: actual FAQ/vacancy/disclosure components — rapid reversals, height cleanup, exclusive answers, category interrupts, keyboard tabs, reduced motion, resize, WAAPI fallback, application action, escaped advert content, isolated preview and dynamic-card reveal cleanup. DOM geometry/timing mocked; visual browser QA not performed.');
