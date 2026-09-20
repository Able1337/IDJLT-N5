const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context=vm.createContext({window:{},wanakana:require('../assets/wanakana/wanakana.min.js')});
context.window.wanakana=context.wanakana;
context.window.IDJLTStudy=require('../study-core.js')(()=>({getItem:()=>null,setItem(){}}));
for(const file of ['data.js','kanji-data.js','phrases-data.js','supplemental-data.js','exercise-data.js'])vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'..',file),'utf8'),context);
const d=context.window.IDJLTExercises;
for(const lang of ['ru','en']){
 const exercises=d.build(lang);
 assert.equal(new Set(exercises.map(e=>e.id)).size,exercises.length);
 for(const e of exercises){for(const key of ['id','ref','type','prompt','lesson','answerLanguage'])assert.ok(e[key],`${e.id}.${key}`);assert.ok(e.answers.length);assert.ok(e.answers.every(a=>typeof a==='string'&&a.trim()));if(e.tokens)assert.ok(context.window.IDJLTStudy.check(e,e.tokens.join('')));}
 assert.ok(exercises.some(e=>e.type==='word-meaning'));
 assert.ok(exercises.some(e=>e.type==='word-japanese'));
 assert.ok(exercises.some(e=>e.type==='sentence-translation'));
 assert.ok(exercises.some(e=>e.type==='sentence-builder'));
 const japanese=exercises.find(e=>e.type==='word-japanese'&&e.jp==='はがき');
 assert.ok(context.window.IDJLTStudy.check(japanese,'はがき'));
 const grammar=exercises.find(e=>e.type==='conjugation'&&e.prompt.startsWith('いく →'));
 assert.ok(context.window.IDJLTStudy.check(grammar,'いって'));
 assert.ok(!context.window.IDJLTStudy.check(grammar,'いいて'));
}
console.log('PASS: all adapters, required exercise types, unique IDs, complete answers, builders and kana/grammar validation.');
