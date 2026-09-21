const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({window:{}});
for(const file of ['supplemental-data.js','forms-library.js','mnn-demo-data.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
const {lessons,questions}=context.window.MNN_DEMO_DATA;
assert.equal(lessons.length,20);
assert.equal(questions.length,80);
assert.equal(new Set(questions.map(q=>q.id)).size,80);
for(const l of lessons){
  const items=questions.filter(q=>q.lesson===l.id);
  assert.equal(items.length,4);
  assert.equal(items.filter(q=>q.kind==='build').length,1);
  if(l.workshop){const isAdj=l.workshop.includes(':');const id=isAdj?l.workshop.split(':')[1]:l.workshop;assert((isAdj?context.window.IDJLT_GRAMMAR_MATERIALS.forms:context.window.IDJLT_FORM_LIBRARY.forms).some(f=>f.id===id),`workshop ${l.id}`);}
}
for(const q of questions){
  assert(q.prompt&&q.why&&q.answer,q.id);
  if(q.kind==='build'){assert.equal(q.tokens.join(''),q.answer);assert(q.tokens.length>=4);}
  else{assert.equal(q.options.filter(o=>o===q.answer).length,1);assert.equal(new Set(q.options).size,q.options.length);assert(q.options.length>=3);}
}
// Contrasting core constructions must be taught at their actual lesson boundary.
assert(questions.some(q=>q.lesson===17&&q.answer==='はらわなくてもいいです'));
assert(questions.some(q=>q.lesson===18&&q.jp.includes('ことが できます')));
assert(questions.some(q=>q.lesson===19&&q.jp.includes('ことが あります')));
assert(questions.some(q=>q.lesson===20&&q.answer==='しずかだった。'));
console.log('PASS: 20 lesson mappings, 80 unique tasks, valid answers, workshop destinations and key contrasts.');
