const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const c=vm.createContext({window:{}});
for(const name of ['data.js','supplemental-data.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',name),'utf8'),c);
const sets=c.window.IDJLT_DICTIONARIES,derived=sets.find(s=>s.id==='verb-dictionary'),source=new Map(sets.filter(s=>s!==derived).flatMap(s=>s.cards).map(w=>[w.id,w]));
assert.equal(derived.cards.length,54);
assert.equal(new Set(derived.cards.map(w=>w.jp)).size,54);
for(const word of derived.cards){assert(['1','2','3'].includes(word.group));assert(word.ru.includes(`Группа ${word.group}`));assert(word.en.includes(`Group ${word.group}`));assert(!word.jp.endsWith('ます'));assert(word.sourceIds.length);for(const id of word.sourceIds)assert(source.has(id),id);}
const covered=new Set(derived.cards.flatMap(w=>w.sourceIds));
for(const id of ['lesson6-0','lesson6-1','lesson6-2','lesson6-3','lesson6-4','lesson6-5','lesson6-6','lesson6-7','lesson6-8','lesson6-9','lesson6-10','lesson7-0','lesson7-1','lesson7-2','lesson7-3','lesson7-4','lesson7-5','lesson7-6','lesson7-7','lesson7-9','lesson9-0','lesson9-1','lesson10-0','lesson10-2','lesson11-0','lesson11-1','lesson11-2','lesson11-3',...c.window.IDJLT_GRAMMAR_MATERIALS.verbs.map(w=>w.id)])assert(covered.has(id),id);
for(const [jp,group] of [['きる','1'],['かりる','2'],['かえる','1'],['いる','2'],['ある','1'],['する','3'],['くる','3'],['いらっしゃる','1']])assert.equal(derived.cards.find(w=>w.jp===jp).group,group);
console.log('PASS: 54 unique dictionary verbs, group descriptions, provenance and coverage of existing verb entries.');
