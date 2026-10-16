const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

test('activation only deletes obsolete IDJLT caches and retired IDJLT documents', async () => {
  const callbacks = {}, opened = [], removed = [];
  let claimed = 0;
  const store = new Map();
  const ctx = vm.createContext({URL,
    self: {location: {href:'https://able1337.github.io/IDJLT-N5/sw.js'},
      addEventListener: (event,fn)=>callbacks[event]=fn,
      clients: {claim: async()=>{claimed++;}}},
    caches: {
      keys: async()=>[...store.keys()],
      delete: async key=>{removed.push(key);return store.delete(key);},
      open: async key=>{opened.push(key);const entries=store.get(key);return {
        keys: async()=>[...entries].map(url=>({url})),
        delete: async request=>entries.delete(request.url)
      };}
    }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8'),ctx);
  const current=vm.runInContext('CACHE_NAME',ctx), textbooks=vm.runInContext('TEXTBOOK_CACHE',ctx);
  const retired=['lesson11-vocabulary.pdf','lesson14.pdf?v=66','adjective-forms.pdf'].map(name=>`https://able1337.github.io/IDJLT-N5/assets/textbooks/${name}`);
  const keep=['https://able1337.github.io/IDJLT-N5/index.html','https://able1337.github.io/IDJLT-N5/assets/textbooks/MNN_I_-_Uchebnik.pdf','https://able1337.github.io/balance/assets/textbooks/lesson14.pdf'];
  const foreign=['balance-v2','unrelated-cache','idjlt-other-v1','idjlt-n5-v66-backup','other-idjlt-n5-v1'];
  for(const key of [current,textbooks,'idjlt-n5-v47','idjlt-n5-v66','idjlt-textbooks-v0',...foreign]) store.set(key,new Set([...retired,...keep]));
  const foreignBefore=new Map(foreign.map(key=>[key,[...store.get(key)]]));
  const activate=async()=>{let pending;callbacks.activate({waitUntil:p=>pending=p});await pending;};
  await activate();
  assert.deepEqual(removed.sort(),['idjlt-n5-v47','idjlt-n5-v66','idjlt-textbooks-v0'].sort());
  assert.deepEqual(opened.sort(),[current,textbooks].sort());
  for(const key of [current,textbooks]) assert.deepEqual([...store.get(key)],keep);
  for(const key of foreign) assert.deepEqual([...store.get(key)],foreignBefore.get(key),key);
  assert.equal(claimed,1);
  await activate();
  assert.equal(removed.length,3,'activation is idempotent');
  for(const key of foreign) assert.deepEqual([...store.get(key)],foreignBefore.get(key),key);
});
