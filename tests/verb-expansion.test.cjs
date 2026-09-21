const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const app=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const storage=new Map(),c=vm.createContext({localStorage:{getItem:key=>storage.get(key)||null},shuffle:items=>items});
vm.runInContext(app.slice(app.indexOf('function newSession('),app.indexOf('function saveSession(')),c);
for(const suffix of ['', '.jp-native']){
 const key='idjlt.words.verb-dictionary'+suffix;
 storage.set(key,JSON.stringify({version:1,total:3,pool:['old-3'],known:['old-1'],unknown:[],current:'old-2',round:1,done:false}));
 const session=c.loadSession(key,['old-1','old-2','old-3','new-1','new-2'].map(id=>({id})));
 assert.equal(session.total,5);assert.equal(session.current,'old-2');assert.deepEqual(Array.from(session.known),['old-1']);assert.deepEqual(Array.from(session.pool),['old-3','new-1','new-2']);
 storage.set(key,JSON.stringify({version:1,total:3,pool:[],known:['old-1','old-2'],unknown:['old-3'],current:null,round:1,done:true}));
 const resumed=c.loadSession(key,['old-1','old-2','old-3','new-1'].map(id=>({id})));assert.equal(resumed.done,false);assert.equal(resumed.unknown[0],'old-3');assert.equal(resumed.pool[0],'new-1');
}
vm.runInContext(app.slice(app.indexOf('function wordJapaneseHtml('),app.indexOf('function kanaRowsForStudy(')),c);
for(const [kanji,reading,base,ruby] of [['食べる','たべる','食','た'],['切る','きる','切','き'],['着る','きる','着','き'],['お願いする','おねがいする','願','ねが']]){
 const html=c.wordJapaneseHtml({kanji,reading,jp:reading});assert(html.includes(`<ruby>${base}<rp>(</rp><rt>${ruby}</rt>`),html);
}
assert.equal(c.wordJapaneseHtml({kanji:'する',reading:'する'}),'する');
console.log('PASS expanded-set progress migration in both directions and ruby rendering without duplicated okurigana.');
