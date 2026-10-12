import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const origin = new URL(process.argv[2] || 'http://localhost:3001');
assert(['localhost', '127.0.0.1'].includes(origin.hostname), 'Use a local test server.');
const routes = ['/', '/home', '/about', '/industries', '/services/inspection-concrete-access', '/services/maintenance-confined-space-drone', '/contact', '/cookie-policy'];
const report = { origin: origin.origin, routes: [], images: [], notes: ['Local production HTTP measurements; these are not Lighthouse, Core Web Vitals or real-device network scores.'] };
for (const route of routes) {
  const timings = [];
  let html;
  for (let i = 0; i < 3; i++) {
    const start = performance.now();
    const response = await fetch(new URL(route, origin));
    assert.equal(response.status, 200);
    html = await response.text();
    timings.push(Math.round((performance.now() - start) * 100) / 100);
  }
  const scripts = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => match[1]))];
  let initialJavaScriptBytes = 0;
  for (const script of scripts) {
    const response = await fetch(new URL(script.replaceAll('&amp;', '&'), origin));
    assert.equal(response.status, 200);
    initialJavaScriptBytes += (await response.arrayBuffer()).byteLength;
  }
  report.routes.push({ route, htmlBytes: Buffer.byteLength(html), initialJavaScriptBytes, localResponseMs: timings });
}
for (const [source, width] of [['/images/brand/sky-logo.png', 384], ['/images/brand/sky-i-logo.png', 384], ['/images/safety/safety-quality-display.webp', 1920]]) {
  const optimized = new URL('/_next/image', origin);
  optimized.searchParams.set('url', source);
  optimized.searchParams.set('w', String(width));
  optimized.searchParams.set('q', '75');
  const response = await fetch(optimized, { headers: { Accept: 'image/webp' } });
  assert.equal(response.status, 200);
  report.images.push({ source, width, sourceBytes: (await fs.stat('public' + source)).size, deliveredBytes: (await response.arrayBuffer()).byteLength, cacheControl: response.headers.get('cache-control') });
}
const staticImage = await fetch(new URL('/pre-landing/images/variants/sky-logo-480.webp', origin));
assert(staticImage.headers.get('cache-control')?.includes('max-age=86400'));
await fs.writeFile('docs/qa/performance-audit.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
