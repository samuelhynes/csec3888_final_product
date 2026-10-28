import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { pageDefaults, pageFields, prototypeLinks, routeFromHash, escapeHTML, safeDestination } from './dist/data.mjs';
const app = readFileSync(new URL('./dist/app.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('./dist/index.html', import.meta.url), 'utf8');
test('home, prototype and legacy routes resolve', () => {
  for (const [hash, page] of [['#/', 'home'], ['#/llm', 'llm'], ['#/llm-input', 'llm'], ['#/seeding', 'seeding'], ['#/llm/broadsheet', 'llm'], ['#/unknown', 'not-found']]) assert.equal(routeFromHash(hash).page, page);
});
test('home includes a short replaceable introduction and cautious research summary', () => {
  assert.ok(pageDefaults.home.intro.length > 100);
  assert.match(pageDefaults.home.findings, /did not establish a GEO manipulation attempt/);
  assert.equal(pageFields.home.length, 2);
  assert.match(app, /About the project/); assert.match(app, /What we found/);
});
test('separate prototypes have introductions and three numbered sections', () => {
  for (const page of ['llm', 'seeding']) {
    assert.ok(pageDefaults[page].intro);
    const numbered = pageFields[page].filter(f => f.number);
    assert.deepEqual(numbered.map(f => f.number), ['01', '02', '03']);
    assert.ok(numbered.every(f => pageDefaults[page][f.key].length > 50));
  }
  assert.doesNotMatch(app, /Broadsheet|Docuvex|sourceReport|caseMarkdown|LLM review|Codex|45 individual|88 reports/i);
});
test('navigation contains only two prototype links, without client-demo controls', () => {
  const nav = html.match(/<nav[\s\S]*?<\/nav>/)[0];
  assert.equal((nav.match(/data-nav=/g) || []).length, 2);
  assert.match(nav, /LLM Input Prototype/); assert.match(nav, /Seeding Experiment/);
  assert.doesNotMatch(html, /about-demo|Client demo|Website concept/);
});
test('source copy is escaped and browser editing or saved overrides cannot affect it', () => {
  assert.equal(escapeHTML('<script>"&\'</script>'), '&lt;script&gt;&quot;&amp;&#39;&lt;/script&gt;');
  assert.match(app, /const content=pageDefaults;/);
  assert.doesNotMatch(app, /localStorage|sessionStorage|indexedDB|contenteditable|editButton|editPage|data-edit|Edit text|Edit template|<form|textarea|addEventListener\('submit'/i);
  assert.doesNotMatch(html, /content-form|toast|textarea|<form|contenteditable/i);
});
test('seeding keeps its feature section but removes tabs and handover copy', () => {
  assert.match(app, /From a published idea/);
  assert.match(app, /Controlled content/); assert.match(app, /Search & retrieval/);
  assert.doesNotMatch(app, /For the final client version|story-menu|role="tab"|Lumenleaf|not measured results|could be communicated to a client/i);
});
test('both prototypes have safe website links', () => {
  for (const key of ['llm', 'seeding']) assert.ok(safeDestination(prototypeLinks[key]));
  for (const value of ['', 'javascript:alert(1)', 'data:text/html,test', 'https://user:secret@example.com']) assert.equal(safeDestination(value), null);
  assert.equal(safeDestination('https://example.com/tool'), 'https://example.com/tool');
  assert.equal(safeDestination('http://localhost:1234'), 'http://localhost:1234/');
});
test('static assets and Australian English locale are present; no paid requests', () => {
  assert.match(html, /lang="en-AU"/);
  for (const name of ['styles.css', 'simplified.css', 'app.js', 'data.mjs', 'favicon.svg']) assert.ok(existsSync(new URL(`./dist/${name}`, import.meta.url)));
  assert.doesNotMatch(app, /fetch\(|api_key|OPENAI_API_KEY/);
});
test('seeding page reports the experiment figures consistently', () => {
  const s = pageDefaults.seeding;
  assert.match(s.setup, /11 questions/); assert.match(s.setup, /132 runs/);
  assert.match(s.findings, /87 of 99 runs/);
  assert.match(s.observations, /Sketrix A5/);
  assert.doesNotMatch(Object.values(s).join(' '), /<script|onerror|javascript:/i);
});