import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';

const origin = new URL(process.argv[2] || 'http://127.0.0.1:3001');
assert(['127.0.0.1', 'localhost', '::1'].includes(origin.hostname), 'Use a local preview server.');
const timings = [];
let html;
for (let run = 0; run < 3; run++) {
  const start = performance.now();
  const response = await fetch(origin);
  const headersAt = performance.now();
  assert.equal(response.status, 200);
  html = await response.text();
  timings.push({ run: run + 1, headersMs: +(headersAt - start).toFixed(2), completeMs: +(performance.now() - start).toFixed(2), decodedHtmlBytes: Buffer.byteLength(html) });
}
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML/SVG IDs.');
const fragmentLinks = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
fragmentLinks.forEach(id => assert(ids.includes(id), `Missing destination: #${id}`));
assert(html.includes('https://skyadmin.ropeaccess.co.za/dashboard'));
assert(html.includes('mailto:info@ropeaccess.co.za'));
assert(html.includes('tel:+27861000759') && html.includes('tel:+27136925219'));
assert(/<form[\s>]/.test(html) && html.includes('id="project-enquiry"'), 'Project enquiry form missing.');
assert(html.includes('https://wa.me/27832890077'), 'Project WhatsApp destination missing.');
assert(!html.includes('tel:+27832890077'), 'The project number is WhatsApp only.');
assert(!ids.includes('insights') && !ids.includes('work'), 'Removed sections must stay removed.');
assert(html.includes('Who we are') && html.includes('How we help'), 'Updated section names missing.');
assert(!html.includes('Watch our story') && !html.includes('Discuss your structure'));
for (const logo of ['sky-logo.png', 'sky-i-logo.png']) {
  const original = await fs.readFile(logo);
  const delivered = await fs.readFile(path.join('public/images/brand', logo));
  assert.equal(createHash('sha256').update(original).digest('hex'), createHash('sha256').update(delivered).digest('hex'), `${logo} must remain intact.`);
}
const assets = new Set([...html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)].map(match => match[1].replaceAll('&amp;', '&')));
for (const folder of ['public/images/hero', 'public/images/about', 'public/images/services', 'public/images/safety', 'public/images/sky-i', 'public/images/brand', 'public/images/contractors']) {
  for (const file of await fs.readdir(folder)) assets.add(`/${folder.slice(7)}/${file}`);
}
for (const endpoint of ['/icon', '/opengraph-image', '/robots.txt', '/sitemap.xml']) assets.add(endpoint);
const resourceChecks = [];
const stylesheetText = [];
for (const asset of assets) {
  const response = await fetch(new URL(asset, origin));
  assert.equal(response.status, 200, asset);
  const buffer = await response.arrayBuffer();
  const bytes = buffer.byteLength;
  if (response.headers.get('content-type')?.includes('text/css')) stylesheetText.push(new TextDecoder().decode(buffer));
  assert(bytes > 0, `Empty asset: ${asset}`);
  resourceChecks.push({ asset, status: response.status, decodedBytes: bytes, contentType: response.headers.get('content-type') });
}
const deliveredCSS = stylesheetText.join('\n');
assert(stylesheetText.length > 0, 'No production stylesheets checked.');
assert(!/Arial/i.test(deliveredCSS), 'Arial must not appear in delivered CSS or generated font fallbacks.');
assert(/font-style:\s*italic/.test(deliveredCSS), 'Genuine italic font face missing.');
const unsupportedContactMethod = await fetch(new URL('/api/contact', origin));
assert.equal(unsupportedContactMethod.status, 405);
const invalidEnquiry = await fetch(new URL('/api/contact', origin), { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin.origin }, body: '{}' });
assert.equal(invalidEnquiry.status, 400, 'The live contact route must reject an incomplete enquiry.');
const report = { origin: origin.href, scope: 'Local production HTTP and static asset checks; not a mobile network or Core Web Vitals benchmark.', timings, uniqueIds: ids.length, fragmentLinkCount: fragmentLinks.length, intactLogos: true, contactRouteValidation: true, typography: { arialAbsent: true, italicFacePresent: true, newSectionNames: true }, resources: resourceChecks };
await fs.writeFile('docs/qa/production-http-checks.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ timings, uniqueIds: ids.length, fragmentLinkCount: fragmentLinks.length, resourceCount: resourceChecks.length, result: 'pass' }, null, 2));
