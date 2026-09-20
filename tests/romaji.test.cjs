const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
process.chdir(path.join(__dirname, '..'));
const wk = require('../assets/wanakana/wanakana.min.js');
for (const [input, expected] of [
  ['shite','して'], ['matte','まって'], ['konnichiwa','こんにちわ'],
  ['shinbun','しんぶん'], ["kan'i",'かんい'], ['kyonen','きょねん'],
  ['chotto','ちょっと'], ['tsukete','つけて'], ['shizuka ja nakatta','しずか じゃ なかった'],
  ['よくない','よくない'], ['KITE','きて'], ['kopii shite','こぴい して']
]) assert.equal(wk.toHiragana(input), expected, input);
assert.equal(wk.toHiragana('sh', { IMEMode: true }), 'sh');
assert.equal(wk.toHiragana('n', { IMEMode: true }), 'n');
const app = fs.readFileSync('app.js', 'utf8');
for (const filename of ['lesson11-vocabulary.pdf', 'lesson14.pdf', 'adjective-forms.pdf']) {
  assert.ok(!fs.existsSync(`assets/textbooks/${filename}`));
  assert.ok(!app.includes(filename));
}
const demo = fs.readFileSync('grammar-demo.js', 'utf8');
assert.ok(!demo.includes('href="textbooks.html"'));
// Cache migration removes only retired PDFs, including query-string copies.
const deleted = [], cachesDeleted = [], callbacks = {};
const entries = ['lesson11-vocabulary.pdf', 'lesson14.pdf?v=66', 'adjective-forms.pdf', 'MNN_I_-_Uchebnik.pdf'].map(f => ({url:`https://example.com/IDJLT-N5/assets/textbooks/${f}`}));
const ctx = vm.createContext({ URL, Response,
  self: { location: {href:'https://example.com/IDJLT-N5/sw.js'}, clients:{claim:async()=>{}}, addEventListener:(type,cb)=>callbacks[type]=cb },
  caches: {keys:async()=>['idjlt-n5-v48','idjlt-textbooks-v1'],delete:async k=>cachesDeleted.push(k),open:async()=>({keys:async()=>entries,delete:async r=>deleted.push(r.url)})}
});
vm.runInContext(fs.readFileSync('sw.js','utf8'),ctx);
(async()=>{
  let activation;
  callbacks.activate({waitUntil:p=>activation=p});await activation;
  assert.equal(deleted.length,3);assert.ok(!deleted.some(url=>url.includes('MNN')));
  assert.deepEqual(cachesDeleted,['idjlt-n5-v48']);
  let response;
  callbacks.fetch({request:{method:'GET',url:entries[1].url},respondWith:r=>response=r});
  assert.equal((await response).status,404);
  console.log('PASS: romaji conversion, removed documents, selective cache migration and blocked retired URLs.');
})().catch(e=>{console.error(e);process.exitCode=1;});
