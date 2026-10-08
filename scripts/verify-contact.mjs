import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise validation and delivery outcomes without sending any real email.
async function compile(file, requireModule, extras = {}) {
  const source = await fs.readFile(file, 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const context = vm.createContext({ exports: {}, require: requireModule, Request, Response, URL, AbortSignal, ...extras });
  vm.runInContext(output, context, { filename: file });
  return context.exports;
}
const content = await compile('src/lib/contact.ts');
const siteUrl = await compile('src/lib/site-url.ts', undefined, { process: { env: {} } });
const env = {};
let providerStatus = 200;
let throwTransport = false;
let delivered;
let sends = 0;
const route = await compile('src/app/api/contact/route.ts', name => {
  if (name === '@/lib/site-url') return siteUrl;
  assert.equal(name, '@/lib/contact');
  return content;
}, {
  process: { env },
  fetch: async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    sends++;
    delivered = JSON.parse(options.body);
    if (throwTransport) throw new Error('Provider unavailable');
    return Response.json({ id: 'mock-message' }, { status: providerStatus });
  },
});
const enquiry = { name: 'Preview Tester', email: 'preview@example.com', phone: '', company: 'Example', location: 'Midrand', service: 'Inspection & NDT', timing: 'Planning ahead', message: 'Inspect the interior of an industrial vessel.', consent: true };
let sequence = 0;
function request(body, headers = {}) {
  return new Request('http://localhost:3000/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'http://localhost:3000', 'x-forwarded-for': `test-${++sequence}`, ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
}
assert.equal((await route.POST(request(enquiry, { origin: 'https://other.example' }))).status, 403);
assert.equal((await route.POST(request(enquiry, { 'content-type': 'text/plain' }))).status, 415);
assert.equal((await route.POST(request('{'))).status, 400);
assert.equal((await route.POST(request('x'.repeat(12001)))).status, 413);
assert.equal((await route.POST(request(null))).status, 400);
for (const invalid of [{ email: 'invalid' }, { consent: false }, { name: ' ' }, { message: 'Short' }, { service: 'Invented service' }, { timing: 'Tomorrow at 10' }, { email: 'preview@example.com\r\nCC: someone@example.com' }]) {
  assert.equal((await route.POST(request({ ...enquiry, ...invalid }))).status, 400);
}
assert.equal((await route.POST(request(enquiry))).status, 503);
assert.equal((await route.POST(request(enquiry, { host: '127.0.0.1:3000', origin: 'http://127.0.0.1:3000' }))).status, 503, 'Same-origin requests must work when the public host differs from Next internal hostname.');
assert.equal((await route.POST(request({ ...enquiry, website: 'spam' }))).status, 200);
assert.equal(sends, 0, 'Unconfigured delivery, validation failures and honeypot must not call provider.');
env.RESEND_API_KEY = 'mock-key';
env.CONTACT_FROM_EMAIL = 'website@example.com';
assert.equal((await route.POST(request(enquiry))).status, 200);
assert.deepEqual(delivered.to, ['info@ropeaccess.co.za']);
assert.equal(delivered.reply_to, enquiry.email);
assert.equal(delivered.from, 'website@example.com');
assert(delivered.text.includes(enquiry.message));
providerStatus = 500;
assert.equal((await route.POST(request(enquiry))).status, 502);
providerStatus = 200;
throwTransport = true;
assert.equal((await route.POST(request(enquiry))).status, 502);
throwTransport = false;
for (let i = 0; i < 5; i++) assert.equal((await route.POST(request(enquiry, { 'x-forwarded-for': 'limited-client' }))).status, 200);
const limited = await route.POST(request(enquiry, { 'x-forwarded-for': 'limited-client' }));
assert.equal(limited.status, 429);
assert(Number(limited.headers.get('retry-after')) > 0);
assert(content.WHATSAPP_URL.startsWith('https://wa.me/27832890077?text='));
console.log('Contact validation, fixed recipient, delivery outcomes, honeypot and rate limit: pass. No emails sent.');
