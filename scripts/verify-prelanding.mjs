import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';

// Use an existing browser QA runtime; no browser dependencies ship to visitors.
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const sharp = require('sharp');
const origin = process.argv[2] || 'http://127.0.0.1:3012';
const reference = process.argv[3] || 'http://127.0.0.1:3013';
for (const url of [origin, reference]) {
  assert(['127.0.0.1', 'localhost', '::1'].includes(new URL(url).hostname), 'Use local QA servers.');
}
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});
const errors = [];
const watch = page => {
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
};
const ready = async page => {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode()));
  });
};
const geometry = page => page.evaluate(() => [...document.querySelector('.prelanding').querySelectorAll('*')]
  .filter(element => !element.closest('.industry-track ul[aria-hidden]'))
  .map(element => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return {
      tag: element.tagName, class: element.getAttribute('class'),
      rect: [rect.x, rect.y, rect.width, rect.height],
      font: [style.fontFamily, style.fontSize, style.fontWeight, style.lineHeight, style.letterSpacing],
      display: style.display, color: style.color, opacity: style.opacity,
    };
  }));
const layouts = [];
const checks = [];
try {
  const files = [];
  const scan = async folder => {
    for (const entry of await fs.readdir(folder, { withFileTypes: true })) {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) await scan(file);
      else files.push(file);
    }
  };
  await scan('public/pre-landing');
  for (const file of files) {
    const supplied = file.replace(/^public[\\/]pre-landing/, 'pre-landing');
    const bytes = await fs.readFile(file);
    assert.deepEqual(bytes, await fs.readFile(supplied), `Changed supplied asset: ${file}`);
    const response = await fetch(new URL(file.replaceAll('\\', '/').slice(6), origin));
    assert.equal(response.status, 200, file);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), bytes, `Delivery mismatch: ${file}`);
  }
  checks.push(`${files.length} runtime assets copied and served byte-for-byte.`);

  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  const source = await context.newPage();
  watch(page); watch(source);
  for (const [width, height] of [[1918, 911], [1440, 900], [1024, 768], [820, 1180], [768, 1024], [390, 844], [320, 700], [667, 375]]) {
    await page.setViewportSize({ width, height });
    await source.setViewportSize({ width, height });
    await Promise.all([page.goto(origin), source.goto(reference)]);
    await Promise.all([ready(page), ready(source)]);
    const expected = await geometry(source);
    const actual = await geometry(page);
    assert.equal(actual.length, expected.length);
    let maximumDifference = 0;
    actual.forEach((element, index) => {
      const match = expected[index];
      assert.deepEqual({ ...element, rect: null }, { ...match, rect: null });
      element.rect.forEach((value, axis) => {
        maximumDifference = Math.max(maximumDifference, Math.abs(value - match.rect[axis]));
      });
    });
    assert(maximumDifference <= .5, `Geometry changed at ${width}x${height}: ${maximumDifference}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert.equal(overflow, 0, `Horizontal overflow: ${width}x${height}`);
    assert.equal(await page.locator('.choices .destination:visible').count(), 2);
    const integratedImage = await page.screenshot({ fullPage: true });
    const referenceImage = await source.screenshot({ fullPage: true });
    const [integratedPixels, referencePixels] = await Promise.all([
      sharp(integratedImage).raw().toBuffer(), sharp(referenceImage).raw().toBuffer(),
    ]);
    assert.equal(integratedPixels.length, referencePixels.length);
    let changedChannels = 0;
    for (let i = 0; i < integratedPixels.length; i++) {
      if (Math.abs(integratedPixels[i] - referencePixels[i]) > 2) changedChannels++;
    }
    const changedFraction = changedChannels / integratedPixels.length;
    assert(changedFraction < .001, `Visual mismatch at ${width}x${height}: ${changedFraction}`);
    if (width === 1918 || width === 390) await fs.writeFile(`docs/qa/prelanding-${width}x${height}.png`, integratedImage);
    layouts.push({ width, height, overflow, maximumGeometryDifference: maximumDifference, changedPixelChannelFraction: changedFraction });
  }
  assert.equal(await page.locator('a[data-brand-choice="skyriders"]').count(), 2);
  assert.deepEqual(await page.locator('a[data-brand-choice="skyriders"]').evaluateAll(links => links.map(link => link.getAttribute('href'))), ['/home/', '/home/']);
  assert.deepEqual(await page.locator('a[data-brand-choice="skyi"]').evaluateAll(links => links.map(link => link.href)), ['https://skyi.co.za/', 'https://skyi.co.za/']);
  assert.equal(await page.locator('.industry-track ul').count(), 4);
  assert.equal(await page.locator('.industry-track ul:first-child li').count(), 10);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin);
  await page.waitForFunction(() => !!window.SkyridersPrelanding);
  await page.locator('.destination--skyriders').focus();
  assert.equal(await page.locator('.destination--skyriders .destination-description').evaluate(element => getComputedStyle(element).opacity), '1');
  await page.locator('.industry-window').focus();
  assert.equal(await page.locator('.industry-track').evaluate(element => getComputedStyle(element).animationName), 'none');
  checks.push('Four brand links, keyboard captions, ticker pause, and reduced motion preserved.');

  for (const selector of ['.brandbar-link--skyriders', '.destination--skyriders']) {
    await page.goto(origin);
    await page.locator(selector).click();
    await page.waitForURL(/\/home\/?$/);
    assert(await page.locator('#hero-heading').isVisible());
    assert.equal(await page.locator('.prelanding').count(), 0);
    assert.equal(await page.locator('link[href="/pre-landing/styles.css"]').count(), 0);
    await page.goBack();
    assert(await page.locator('.prelanding').isVisible());
    await page.reload();
    assert(await page.locator('.prelanding').isVisible());
  }
  checks.push('Both Skyriders links reach the existing hero; refresh and Back restore the gateway with isolated styles.');
  await context.close();

  const motion = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const movingPage = await motion.newPage(); watch(movingPage);
  await movingPage.goto(origin); await ready(movingPage);
  await movingPage.waitForFunction(() => !!window.SkyridersPrelanding);
  const first = await movingPage.locator('.intro-headline').textContent();
  await movingPage.waitForFunction(first => document.querySelector('.intro-headline').textContent !== first, first, { timeout: 12000 });
  await movingPage.locator('.intro').hover();
  const paused = await movingPage.locator('.intro-headline').textContent();
  await movingPage.waitForTimeout(8200);
  assert.equal(await movingPage.locator('.intro-headline').textContent(), paused);
  await movingPage.mouse.move(10, 200);
  const droneBounds = await movingPage.locator('.destination--skyi').boundingBox();
  await movingPage.mouse.move(droneBounds.x + droneBounds.width * .7, droneBounds.y + droneBounds.height * .45);
  await movingPage.waitForFunction(() => parseFloat(document.querySelector('.destination--skyi .destination-subject').style.translate) !== 0);
  await movingPage.locator('.industry-window').focus();
  assert.equal(await movingPage.locator('.industry-track').evaluate(element => getComputedStyle(element).animationPlayState), 'paused');
  await movingPage.locator('.brandbar-link--skyriders').click({ modifiers: ['Control'] });
  assert.equal(new URL(movingPage.url()).pathname, '/');
  await movingPage.locator('.brandbar-link--skyriders').click();
  await movingPage.waitForURL(/\/home\/?$/);
  assert(await movingPage.locator('#hero-heading').isVisible());
  await movingPage.goBack();
  await movingPage.waitForFunction(() => document.querySelector('.brand-entry-overlay').dataset.phase === 'idle');
  await motion.close();
  checks.push('Message rotation, hover pause, pointer movement, modified click, animated departure, and Back passed.');

  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const touchPage = await touch.newPage(); watch(touchPage);
  await touchPage.goto(origin); await ready(touchPage);
  assert.equal(await touchPage.locator('.destination--skyi .destination-description').evaluate(element => getComputedStyle(element).opacity), '1');
  await touchPage.locator('.destination--skyriders').tap();
  await touchPage.waitForURL(/\/home\/?$/);
  assert(await touchPage.locator('#hero-heading').isVisible());
  await touch.close();
  checks.push('Mobile touch captions and compact Skyriders handoff passed.');

  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const noJS = await browser.newContext({ viewport, javaScriptEnabled: false, reducedMotion: 'reduce' });
    const staticPage = await noJS.newPage(); watch(staticPage);
    await staticPage.goto(origin); await ready(staticPage);
    assert.equal(await staticPage.locator('.choices .destination:visible').count(), 2);
    assert.equal(await staticPage.locator('.intro-headline').textContent(), 'Advanced inspection.');
    await staticPage.locator('.destination--skyriders').click();
    await staticPage.waitForURL(/\/home\/?$/);
    assert(await staticPage.locator('#hero-heading').isVisible());
    await noJS.close();
  }
  checks.push('Desktop/mobile without JavaScript retain the scene and native Skyriders navigation.');
  assert.deepEqual(errors, []);
  const report = { date: '2026-10-08', origin, reference, layouts, checks, errors, result: 'passed', assetManifestHash: createHash('sha256').update(await fs.readFile('pre-landing/manifest.sha256')).digest('hex') };
  await fs.writeFile('docs/qa/prelanding-integration.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
