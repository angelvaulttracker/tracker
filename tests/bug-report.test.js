const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { stripTypeScriptTypes } = require('node:module');

const source = stripTypeScriptTypes(
  fs.readFileSync(path.join(__dirname, '../supabase/functions/bug-report/index.ts'), 'utf8')
    .replace(/^import .*;\n/gm, ''),
);

function harness(signingError = false) {
  const calls = { emails: [], logs: [], signed: [] };
  const bucket = {
    upload: async () => ({ error: null }),
    createSignedUrl: async (objectPath, expiresIn) => {
      calls.signed.push({ objectPath, expiresIn });
      return signingError
        ? { error: new Error('signing failed') }
        : { data: { signedUrl: 'https://example.test/private-screenshot?token=signed' } };
    },
  };
  let handler;
  const context = vm.createContext({
    Response, Request, FormData, File, crypto,
    console: { error() {} },
    corsHeaders: { 'Access-Control-Allow-Origin': '*' },
    Deno: {
      env: { get: name => ({
        SUPABASE_URL: 'https://example.test',
        SUPABASE_SERVICE_ROLE_KEY: 'test-only',
        RESEND_API_KEY: 'test-only',
        BUG_REPORT_TO_EMAIL: 'recipient@example.test',
      })[name] },
      serve: fn => { handler = fn; },
    },
    createClient: () => ({
      storage: { from: name => { assert.equal(name, 'bug-report-images'); return bucket; } },
      from: () => ({ insert: async row => { calls.logs.push(row); return { error: null }; } }),
    }),
    fetch: async (url, options) => {
      assert.equal(url, 'https://api.resend.com/emails');
      calls.emails.push(JSON.parse(options.body));
      return new Response('{}', { status: 200 });
    },
  });
  vm.runInContext(source, context);
  return { handler, calls };
}

function reportRequest() {
  const form = new FormData();
  form.set('description', 'Screenshot test');
  form.append('screenshots', new File(['png'], 'screen.png', { type: 'image/png' }));
  return new Request('https://example.test/bug-report', { method: 'POST', body: form });
}

test('private screenshot links expire in seven days and are used in email and log', async () => {
  const { handler, calls } = harness();
  const response = await handler(reportRequest());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, attachments: 1 });
  assert.equal(calls.signed[0].expiresIn, 604800);
  assert.match(calls.emails[0].text, /private-screenshot\?token=signed/);
  assert.match(calls.emails[0].html, /private-screenshot\?token=signed/);
  assert.equal(calls.logs[0].screenshot_urls[0], 'https://example.test/private-screenshot?token=signed');
});

test('signing failure sends no email and logs no successful report', async () => {
  const { handler, calls } = harness(true);
  const response = await handler(reportRequest());
  assert.equal(response.status, 500);
  assert.match((await response.json()).error, /prepare/);
  assert.equal(calls.emails.length, 0);
  assert.equal(calls.logs.length, 0);
});

test('preflight and unsupported methods have no email side effects', async () => {
  const { handler, calls } = harness();
  assert.equal((await handler(new Request('https://example.test', { method: 'OPTIONS' }))).status, 200);
  assert.equal((await handler(new Request('https://example.test'))).status, 405);
  assert.equal(calls.emails.length, 0);
});
