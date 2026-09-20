const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const callbacks={},saved=[];let networkResponse=new Response('missing',{status:404}),offline=false;
const audio=new Response('0123456789',{headers:{'Content-Type':'audio/mpeg'}});
const context=vm.createContext({URL,Headers,Response,
  self:{location:{href:'https://example.com/project/sw.js'},addEventListener:(type,callback)=>callbacks[type]=callback},
  caches:{match:async request=>String(request.url||request).endsWith('audio.mp3')?audio.clone():undefined,open:async()=>({put:async(request,response)=>saved.push(response.status)})},
  fetch:async()=>{if(offline)throw new Error('Offline');return networkResponse.clone()}
});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../sw.js'),'utf8'),context);
async function request(path,range){let response;const pending=[];callbacks.fetch({request:{method:'GET',url:`https://example.com/project/${path}`,headers:new Headers(range?{range}:{}),mode:'cors'},respondWith:value=>response=value,waitUntil:value=>pending.push(value)});const result=await response;await Promise.all(pending);return result;}
(async()=>{
  assert.equal((await request('missing.js')).status,404);assert.deepEqual(saved,[]);
  networkResponse=new Response('partial',{status:206});await request('track.mp3');assert.deepEqual(saved,[]);
  networkResponse=new Response('code',{status:200});await request('app.js');assert.deepEqual(saved,[200]);
  offline=true;const failure=await request('uncached.js');assert.equal(failure.status,503);assert.equal(await failure.text(),'Offline');
  const range=await request('audio.mp3','bytes=2-5');assert.equal(range.status,206);assert.equal(await range.text(),'2345');assert.equal(range.headers.get('Content-Range'),'bytes 2-5/10');
  assert.equal(await (await request('audio.mp3','bytes=-3')).text(),'789');assert.equal((await request('audio.mp3','bytes=20-30')).status,416);
  console.log('PASS: no caching failures or partial responses, resource failure stays non-HTML, offline audio byte ranges.');
})().catch(error=>{console.error(error);process.exitCode=1});
