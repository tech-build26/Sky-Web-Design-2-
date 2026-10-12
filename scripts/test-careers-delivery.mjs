import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';

// Execute the actual handler and stream reader with HTTP services mocked.
// No network calls, provider accounts, live applicants or emails are used.
async function moduleSource(path, transform = value => value) {
  const source = await fs.readFile(path, 'utf8');
  return `data:text/javascript;base64,${Buffer.from(transform(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText)).toString('base64')}`;
}
const modelUrl = await moduleSource('src/lib/careers.ts');
const siteUrl = await moduleSource('src/lib/site-url.ts');
const bodyUrl = await moduleSource('src/lib/request-body.ts', source => source.replace('import "server-only";', ''));
const serverUrl = await moduleSource('src/lib/careers-server.ts', source => source.replace('import "server-only";', '').replace('"@supabase/supabase-js"', JSON.stringify(import.meta.resolve('@supabase/supabase-js'))).replace('"./careers"', JSON.stringify(modelUrl)).replace('"./site-url"', JSON.stringify(siteUrl)).replace('"./request-body"', JSON.stringify(bodyUrl)));
const routeUrl = await moduleSource('src/app/api/careers/apply/route.ts', source => source.replace('"@/lib/careers"', JSON.stringify(modelUrl)).replace('"@/lib/careers-server"', JSON.stringify(serverUrl)).replace('"@/lib/site-url"', JSON.stringify(siteUrl)));
const { POST } = await import(routeUrl);
const { limitedBody } = await import(serverUrl);
const keys = ['SITE_URL', 'NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'CAREERS_RATE_LIMIT_SECRET', 'CV_SCANNER_URL', 'CV_SCANNER_TOKEN', 'RESEND_API_KEY', 'CAREERS_FROM_EMAIL', 'TURNSTILE_SECRET_KEY'];
const savedEnv = Object.fromEntries(keys.map(key => [key, process.env[key]]));
Object.assign(process.env, { SITE_URL: 'https://careers.example.test', NEXT_PUBLIC_SUPABASE_URL: 'https://database.example.test', SUPABASE_SERVICE_ROLE_KEY: 'test-only-service-key', CAREERS_RATE_LIMIT_SECRET: 'test-only-secret-with-at-least-32-characters', CV_SCANNER_URL: 'https://scanner.example.test/scan', CV_SCANNER_TOKEN: 'test-only-scanner-token', RESEND_API_KEY: 'test-only-email-key', CAREERS_FROM_EMAIL: 'test@example.test', TURNSTILE_SECRET_KEY: 'test-only-captcha-secret' });
const originalFetch = globalThis.fetch;
const id = '00000000-0000-4000-8000-000000000003';
const fixture = { id, reference: 'SKY-V00003', title: 'Test technician', site: 'Test site', region: 'Mpumalanga', status: 'published', closing_at: null, updated_at: '2026-10-11T00:00:00Z', requirements: ['Current rope-access certification'], additional_requirements: '', description: 'Test-only advertised description, not a real vacancy.' };
let scenario = {}, mail = [], calls = [], vacancyReads = 0;
function reset(options = {}) { scenario = options; mail = []; calls = []; vacancyReads = 0; }
globalThis.fetch = async (input, init) => {
  const url = String(input); calls.push(url);
  if (url.includes('/rpc/consume_careers_rate')) {
    const payload = JSON.parse(init.body); assert.match(payload.p_key, /^[a-f0-9]{64}$/); assert(!init.body.includes('applicant@example.test'));
    return Response.json(scenario.rate !== false);
  }
  if (url.includes('/rest/v1/vacancies')) {
    vacancyReads++;
    return Response.json({ ...fixture, status: scenario.closed || (scenario.closeAfterScan && vacancyReads === 2) ? 'closed' : 'published' });
  }
  if (url.includes('turnstile/v0/siteverify')) return Response.json({ success: true, hostname: scenario.wrongHost ? 'wrong.example.test' : 'careers.example.test', action: scenario.wrongAction ? 'other' : 'careers-apply' });
  if (url.includes('scanner.example.test')) {
    assert.equal(init.headers['Content-Type'], 'application/pdf');
    if (scenario.scanTimeout) throw new Error('Test-only scanner timeout');
    return Response.json({ clean: scenario.unsafe !== true }, { status: scenario.scanUnavailable ? 503 : 200 });
  }
  if (url === 'https://api.resend.com/emails') {
    mail.push({ payload: JSON.parse(init.body), key: init.headers['Idempotency-Key'] });
    return Response.json({ id: 'test-only-message' }, { status: scenario.mailUnavailable ? 502 : 200 });
  }
  throw new Error(`Unexpected test network request: ${url}`);
};
const pdf = '%PDF-1.7\nTest-only screening fixture\n%%EOF\n';
function request(options = {}) {
  const form = new FormData();
  for (const [name, value] of Object.entries({ vacancy: id, name: 'Test Applicant', email: 'applicant@example.test', phone: '+27 82 123 4567', contact: 'WhatsApp', location: 'Test town', availability: 'Immediately', level: 'Level 2', cover: 'Test-only cover letter with enough relevant details for validation.', consent: 'on', captcha: 'test-only-token', ...options.fields })) form.set(name, value);
  form.set('cv', new Blob([options.pdf ?? pdf], { type: options.mime ?? 'application/pdf' }), options.name ?? 'test-cv.pdf');
  return new Request('https://careers.example.test/api/careers/apply', { method: 'POST', headers: { Origin: options.origin ?? 'https://careers.example.test', 'x-forwarded-for': '203.0.113.7' }, body: form });
}
try {
  reset(); const success = await POST(request()); assert.equal(success.status, 200); const first = await success.json();
  assert.match(first.reference, /^SKY-[0-9A-F]{12}$/); assert.equal(mail.length, 1);
  assert.deepEqual(mail[0].payload.to, ['reception@ropeaccess.co.za']);
  assert.equal(mail[0].payload.reply_to, 'applicant@example.test');
  assert.equal(Buffer.from(mail[0].payload.attachments[0].content, 'base64').toString(), pdf);
  assert(mail[0].payload.text.includes('Test-only cover letter'));
  assert(mail[0].payload.text.includes('ADVERTISED REQUIREMENTS'));
  const firstKey = mail[0].key; reset(); const retry = await POST(request()); assert.equal((await retry.json()).reference, first.reference); assert.equal(mail[0].key, firstKey);
  for (const [options, input, status] of [
    [{}, { origin: 'https://wrong.example.test' }, 403],
    [{}, { mime: 'application/msword' }, 400],
    [{}, { name: 'renamed.docx' }, 400],
    [{}, { pdf: 'Not a real PDF' }, 400],
    [{}, { pdf: 'x'.repeat(5 * 1024 * 1024 + 1) }, 400],
    [{}, { fields: { consent: '' } }, 400],
    [{ rate: false }, {}, 429],
    [{ wrongHost: true }, {}, 400],
    [{ wrongAction: true }, {}, 400],
    [{ closed: true }, {}, 409],
    [{ closeAfterScan: true }, {}, 409],
    [{ unsafe: true }, {}, 400],
    [{ scanUnavailable: true }, {}, 503],
    [{ scanTimeout: true }, {}, 503],
  ]) { reset(options); const response = await POST(request(input)); assert.equal(response.status, status, JSON.stringify(options) + JSON.stringify(input.fields || input.name || input.mime || '')); assert.equal(mail.length, 0, 'Rejected requests must not send CVs.'); }
  reset({ mailUnavailable: true }); assert.equal((await POST(request())).status, 502);
  process.env.CV_SCANNER_TOKEN = ''; reset(); assert.equal((await POST(request())).status, 503); assert.equal(calls.length, 0);
  const stream = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(7)); controller.enqueue(new Uint8Array(7)); controller.close(); } });
  await assert.rejects(limitedBody(new Request('https://careers.example.test', { method: 'POST', body: stream, duplex: 'half' }), 10), error => error.status === 413);
  console.log('PASS: actual application handler, recipient/PDF attachment, retry idempotency, chunked stream cap, invalid documents, consent, CAPTCHA, limiter, closure during scan, scanner and mail failures. HTTP services mocked; no CV saved or email sent.');
} finally {
  globalThis.fetch = originalFetch;
  for (const key of keys) { if (savedEnv[key] === undefined) delete process.env[key]; else process.env[key] = savedEnv[key]; }
}
