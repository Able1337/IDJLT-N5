const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const read=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');
const c=vm.createContext({window:{}});
for(const name of ['data.js','supplemental-data.js','forms-library.js'])vm.runInContext(read(name),c);
const sets=c.window.IDJLT_DICTIONARIES;
const original=sets.find(s=>s.id==='verb-dictionary-lessons'),expanded=sets.find(s=>s.id==='verb-dictionary');
const {verbs,trainingVerbs}=c.window.IDJLT_GRAMMAR_MATERIALS;
const lib=c.window.IDJLT_FORM_LIBRARY;
assert.equal(original.cards.length,54);
assert.equal(expanded.cards.length,200);
assert.deepEqual(Array.from(trainingVerbs,v=>v.id),Array.from(original.cards,v=>v.id));
for(const v of original.cards){assert(v.kanji&&v.reading);assert(expanded.cards.some(w=>w.jp===v.jp&&w.group===v.group));assert(v.sourceIds.length);}
for(const old of verbs){const v=trainingVerbs.find(w=>w.jp===old.jp);assert(v,old.jp);assert.equal(v.te,old.te);assert.equal(v.group,old.group);}
for(const [jp,te,masu] of [['のむ','のんで','のみます'],['きる','きって','きります'],['かりる','かりて','かります'],['しつれいする','しつれいして','しつれいします'],['ある','あって','あります'],['いらっしゃる','いらっしゃって','いらっしゃいます']]){
  const v=trainingVerbs.find(w=>w.jp===jp);assert.equal(lib.conjugate(v,'te'),te);assert.equal(lib.conjugate(v,'masu'),masu);
}
for(const v of trainingVerbs)for(const f of lib.forms){const value=lib.conjugate(v,f.id);assert(value&&!value.includes('undefined'),`${v.jp}: ${f.id}`);}
assert(read('grammar-demo.js').includes('trainingVerbs: verbs'));
assert(read('verb-dictionary-lessons.html').includes('data-dictionary="verb-dictionary-lessons"'));
assert(read('sw.js').includes('./verb-dictionary-lessons.html'));
console.log('PASS: separate 54/200 sets, original 31 covered, workshop uses lesson set, added conjugations.');
