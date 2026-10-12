import fs from 'node:fs/promises';
const origin = new URL(process.argv[2] || 'http://localhost:3001');
if (!['localhost', '127.0.0.1'].includes(origin.hostname)) throw new Error('Use a local test server.');
const paths = ['/', '/home', '/about', '/industries', '/services/inspection-concrete-access', '/services/maintenance-confined-space-drone', '/contact', '/careers', '/careers/admin'];
const pages = new Map();
const report = { origin: origin.origin, pages: [], problems: [], resourcesChecked: 0, endpointChecks: [] };
for (const path of paths) {
  const response = await fetch(new URL(path, origin));
  const html = await response.text();
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const headings = [...html.matchAll(/<h1(?:\s[^>]*)?>/g)].length;
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  pages.set(path, { html, ids });
  report.pages.push({ path, status: response.status, title, h1Count: headings, bytes: Buffer.byteLength(html), noindex: /name="robots" content="[^"]*noindex/.test(html), cacheControl: response.headers.get('cache-control'), securityHeaders: ['x-content-type-options', 'x-frame-options', 'content-security-policy'].map(h => [h, response.headers.get(h)]) });
  if (response.status !== 200 || headings !== 1) report.problems.push({ path, issue: `HTTP ${response.status}, ${headings} h1 headings` });
  if (new Set(ids).size !== ids.length) report.problems.push({ path, issue: 'Duplicate IDs', ids: ids.filter((id, index) => ids.indexOf(id) !== index) });
}
if (/Sample testimonials for layout review/.test(pages.get('/about').html)) report.problems.push({ path: '/about', issue: 'Sample testimonials must be absent in production' });
if (/Local design preview:/.test(pages.get('/careers/admin').html)) report.problems.push({ path: '/careers/admin', issue: 'Editor sandbox must be absent in production' });
const assets = new Set();
for (const [path, { html, ids }] of pages) {
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    const url = new URL(href.replaceAll('&amp;', '&'), new URL(path, origin));
    if (url.origin !== origin.origin) continue;
    const destination = url.pathname.replace(/\/$/, '') || '/';
    if (url.hash) {
      const targetIds = destination === path ? ids : pages.get(destination)?.ids;
      if (!targetIds?.includes(decodeURIComponent(url.hash.slice(1)))) report.problems.push({ path, issue: 'Broken internal fragment', href });
    }
    if (!pages.has(destination)) assets.add(url.pathname + url.search);
  }
  for (const [, src] of html.matchAll(/src="(\/[^\"]+)"/g)) assets.add(src.replaceAll('&amp;', '&'));
}
for (const resource of assets) {
  const response = await fetch(new URL(resource, origin));
  report.resourcesChecked++;
  if (response.status !== 200) report.problems.push({ issue: 'Resource failed', resource, status: response.status });
}
for (const [path, method, headers, body] of [
  ['/api/careers/admin', 'GET', {}, undefined],
  ['/api/careers/admin', 'POST', { Origin: origin.origin, 'Content-Type': 'application/json' }, '{}'],
  ['/api/careers/apply', 'POST', { Origin: 'https://wrong.example', 'Content-Type': 'multipart/form-data; boundary=x' }, '--x--'],
  ['/api/careers/apply', 'POST', { Origin: origin.origin, 'Content-Type': 'application/json' }, '{}'],
  ['/api/contact', 'POST', { Origin: 'https://wrong.example', 'Content-Type': 'application/json' }, '{}'],
  ['/api/assessment', 'POST', { Origin: 'https://wrong.example', 'Content-Type': 'application/json' }, '{}'],
  ['/api/contact', 'POST', { 'Content-Type': 'application/json' }, 'x'.repeat(12001)],
  ['/api/assessment', 'POST', { 'Content-Type': 'application/json' }, 'x'.repeat(9001)],
]) {
  const response = await fetch(new URL(path, origin), { method, headers, body });
  report.endpointChecks.push({ path, method, status: response.status, body: await response.json() });
  if (response.status >= 200 && response.status < 300) report.problems.push({ path, issue: 'Invalid request accepted' });
}
await fs.mkdir('docs/qa', { recursive: true });
await fs.writeFile('docs/qa/website-audit.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ pages: report.pages.length, resources: report.resourcesChecked, problems: report.problems, endpointChecks: report.endpointChecks }, null, 2));
if (report.problems.length) process.exitCode = 1;
