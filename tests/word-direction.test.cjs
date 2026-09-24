const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const app=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
const c=vm.createContext({settings:{lang:'ru',wordDirection:'native-jp'}});
vm.runInContext(app.slice(app.indexOf('function frontText('),app.indexOf('function renderMode(')),c);
const card={jp:'かりる',ru:'Брать взаймы\nГруппа 2 — 一段',en:'Borrow\nGroup 2 — 一段',group:'2'};
for(const lang of ['ru','en'])for(const direction of ['native-jp','jp-native']){
 c.settings.lang=lang;c.settings.wordDirection=direction;
 const front=c.frontText(card),answer=c.answerText(card);
 assert(!/Группа|Group/.test(front));assert(!/Группа|Group/.test(answer));
 assert.equal(direction==='jp-native'?front:answer,'かりる');
 assert.match(c.wordGroup(card),/2 — 一段/);
}
assert.equal(c.wordGroup({ru:'Книга',en:'Book'}),'');
const data=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../supplemental-data.js'),'utf8'),data);
const lesson14=data.window.IDJLT_DICTIONARIES.find(d=>d.id==='lesson14');
assert.equal(lesson14.cards.length,31);
for(const card of lesson14.cards)for(const lang of ['ru','en'])for(const direction of ['native-jp','jp-native']){
 c.settings.lang=lang;c.settings.wordDirection=direction;
 assert(!/Группа|Group/.test(c.frontText(card)));
 assert(!/Группа|Group/.test(c.answerText(card)));
 assert(c.wordGroup(card).includes(card.group));
}
console.log('PASS word direction and group separation in both languages.');
