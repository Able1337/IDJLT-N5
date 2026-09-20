const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
process.chdir(path.join(__dirname, '..'));
const read = file => fs.readFileSync(file, 'utf8');
for (const file of fs.readdirSync('.').filter(f => f.endsWith('.js'))) {
  new vm.Script(read(file), { filename: file });
}
const ctx = vm.createContext({ window: {} });
for (const file of ['data.js', 'phrases-data.js']) vm.runInContext(read(file), ctx);
const oldWords = JSON.stringify(ctx.window.IDJLT_DICTIONARIES);
const oldPhrases = JSON.stringify(ctx.window.IDJLT_PHRASES);
vm.runInContext(read('supplemental-data.js'), ctx);
const { IDJLT_DICTIONARIES: words, IDJLT_PHRASES: phrases, IDJLT_GRAMMAR_MATERIALS: grammar } = ctx.window;
assert.equal(JSON.stringify(words.slice(0, 14)), oldWords, 'Existing dictionaries are unchanged');
assert.equal(JSON.stringify(phrases.slice(0, 53)), oldPhrases, 'Existing phrases are unchanged');
assert.equal(words.length, 18);
assert.equal(phrases.length, 746);
assert.equal(words.find(d => d.id === 'lesson11').cards.length, 52);
assert.equal(words.find(d => d.id === 'lesson14').cards.length, 31);
assert.equal(grammar.adjectives.filter(a => a.type === 'i').length, 86);
assert.equal(grammar.adjectives.filter(a => a.type === 'na').length, 38);
for (const list of [words.flatMap(d => d.cards), phrases]) {
  assert.equal(new Set(list.map(c => c.id)).size, list.length, 'Unique IDs');
  for (const card of list) for (const key of ['id', 'jp', 'ru', 'en', 'romaji']) {
    assert.equal(typeof card[key], 'string', `${card.id}.${key}`);
    assert.ok(card[key].trim(), `${card.id}.${key} must not be empty`);
  }
}
for (const card of [...words.slice(-4).flatMap(d => d.cards), ...phrases.slice(53)]) {
  assert.ok(card.source && Number.isInteger(card.sourcePage) && card.sourcePage > 0, card.id);
  assert.ok(!/undefined|NaN/.test(JSON.stringify(card)), card.id);
}
const adjective = jp => grammar.adjectives.find(a => a.jp === jp);
assert.equal(adjective('いい').answers[1], 'よくない');
assert.equal(adjective('あたまが いい').answers[3], 'あたまが よかった');
assert.equal(adjective('かわいい').answers[1], 'かわいくない');
assert.equal(adjective('きれい').answers[3], 'きれいだった');
assert.equal(adjective('きらい').answers[2], 'きらいで');
assert.equal(adjective('～たい').answers[4], '～たくなかった');
for (const [base, expected] of [['いく','いって'],['かえる','かえって'],['くる','きて'],['する','して'],['いそぐ','いそいで'],['よぶ','よんで'],['みる','みて']]) {
  assert.equal(grammar.verbs.find(v => v.jp === base).te, expected);
}
assert.equal(words.find(d => d.id === 'lesson11').cards.find(c => c.jp === 'はがき').ru, 'Почтовая открытка');
assert.equal(new Set(words.find(d => d.id === 'lesson11').cards.map(c => c.jp.replace(/\s/g, ''))).size, 52);
assert.ok(phrases.find(p => p.id === 'lesson14-phrase-27').jp.includes('\n'));

// Exercise the actual session implementation: restart, answer, then reload storage.
const app = read('app.js');
// Homophonous forms must remain separate prompts when combining phrase sets.
const phraseCtx = vm.createContext({ phraseSetById: () => ({ items: phrases.filter(p => p.setId === 'lesson14-te') }), phraseSetTitle: () => 'te' });
vm.runInContext(app.slice(app.indexOf('function normalizeStudyKey('), app.indexOf('function wordCardsFor(')), phraseCtx);
vm.runInContext(app.slice(app.indexOf('function phraseCardsFor('), app.indexOf('function startPhrases(')), phraseCtx);
assert.equal(vm.runInContext("phraseCardsFor(['lesson14-te']).length", phraseCtx), 31);
const storage = new Map();
const sessionCtx = vm.createContext({
  localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
  cards: [{ id: 'one' }, { id: 'two' }], currentKind: 'word',
  shuffle: items => [...items], renderMode() {}, settings: { kana: { order: 'random' } }
});
vm.runInContext(app.slice(app.indexOf('function newSession('), app.indexOf('function updateFocusButton(')), sessionCtx);
vm.runInContext("session = loadSession('test.session', cards); nextCard(); restartAll(); answer(true);", sessionCtx);
const restored = JSON.parse(storage.get('test.session'));
assert.equal(restored.known.length, 1);
assert.equal(restored.key, 'test.session');
assert.ok(restored.current);

// Check local HTML assets, dictionary destinations, and every precached URL.
for (const file of fs.readdirSync('.').filter(f => f.endsWith('.html'))) {
  const html = read(file);
  assert.ok(html.indexOf('supplemental-data.js') < html.indexOf('src="app.js'), file);
  for (const [, url] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    if (/^(https?:|data:|mailto:)/.test(url)) continue;
    assert.ok(fs.existsSync(url.split('?')[0]), `${file}: ${url}`);
  }
  assert.ok(!html.includes('?v=65'), `${file}: stale release`);
}
for (const dict of words) assert.ok(fs.existsSync(`${dict.id}.html`), dict.id);
const swCtx = vm.createContext({ self: { addEventListener() {} } });
vm.runInContext(read('sw.js'), swCtx);
for (const url of vm.runInContext('APP_SHELL', swCtx)) assert.ok(fs.existsSync(url.split('?')[0]), url);
assert.equal(read('VERSION').trim(), '0.19.2');
assert.ok(app.includes('APP_VERSION = "0.19.2"'));
console.log('PASS: content integrity, existing sets, grammar exceptions, session persistence, links and cache.');
