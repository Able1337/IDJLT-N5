const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const read=f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8');
const c=vm.createContext({window:{}});for(const f of ['data.js','supplemental-data.js'])vm.runInContext(read(f),c);
const cards=c.window.IDJLT_DICTIONARIES.find(s=>s.id==='lesson13').cards;
assert.equal(cards.length,25);assert.equal(new Set(cards.map(c=>c.id)).size,25);
for(const card of cards){for(const key of ['jp','ru','en','romaji','kanji','reading'])assert(card[key],`${card.id}.${key}`);if(card.group)assert(card.ru.includes(`Группа ${card.group}`));}
for(const [jp,group] of [['あそびます','1'],['むかえます','2'],['けっこんします','3'],['のどが かわきます','1'],['おなかが すきます','1']])assert.equal(cards.find(c=>c.jp===jp).group,group);
assert(read('lesson13.html').includes('data-dictionary="lesson13"'));
assert(read('sw.js').includes('./lesson13.html'));
console.log('PASS lesson 13: 25 cards, kanji/readings, groups and page/cache integration');
