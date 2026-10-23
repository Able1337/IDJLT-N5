const {chromium}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/kub-v/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+(new URL(req.url,'http://localhost').pathname==='/'?'/index.html':decodeURIComponent(new URL(req.url,'http://localhost').pathname)));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.json')?'application/json':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;const browser=await chromium.launch({channel:'msedge',headless:true});try{
const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
const payload={version:1,groups:[{kind:'kanji',name:'Учёба',items:[{kanji:'学',ru:'учёба',on:['ガク'],kun:['まな.ぶ'],examples:[{term:'学生',reading:'がくせい',ru:'студент'}]}]},{kind:'words',name:'Глаголы',items:[{jp:'切る',reading:'きる',ru:'резать',verbGroup:'1'},{jp:'着る',reading:'きる',ru:'надевать',verbGroup:'2'}]}]};
await page.goto(base+'/personal.html#import='+encodeURIComponent(JSON.stringify(payload)));
assert(await page.locator('#personalPreviewBox').isVisible());assert.equal(await page.evaluate(()=>localStorage.getItem('idjlt.personal.v1')),null);
await page.locator('#personalConfirm').click();assert((await page.locator('#personalMessage').textContent()).includes('Добавлено: 3'));
await page.reload();assert((await page.locator('#personalGroups').textContent()).includes('Учёба'));
await page.locator('#personalImport').fill(JSON.stringify(payload));await page.locator('#personalPreview').click();assert(await page.locator('#personalConfirm').isDisabled());
await page.locator('#personalKind').selectOption('words');await page.locator('#personalStart').click();assert((await page.locator('#lessonSub').textContent()).includes('2'));assert.equal(await page.locator('#wordGroup').isVisible(),false);
await page.locator('#card').click();assert(await page.locator('#wordGroup').isVisible());assert(await page.locator('#jp ruby').count()>0);await page.locator('#knowBtn').click();
await page.reload();assert((await page.locator('#knownList').textContent()).length>0);
await page.locator('#wordDirection').selectOption('jp-native');assert.equal(await page.locator('#wordGroup').isVisible(),false);assert(await page.locator('#ru ruby').count()>0);await page.locator('#card').click();assert(await page.locator('#wordGroup').isVisible());
await page.goto(base+'/personal.html');await page.locator('#personalStart').click();assert.equal(await page.locator('#ru').textContent(),'学');await page.locator('#card').click();assert((await page.locator('#jp').textContent()).includes('ガク'));
await page.goto(base+'/personal.html');const download=page.waitForEvent('download');await page.locator('#personalExport').click();const file=await (await download).path();assert.equal(JSON.parse(fs.readFileSync(file,'utf8')).groups.length,2);
await page.screenshot({path:path.join(root,'../personal-manager.png'),fullPage:true});
await page.locator('#personalFile').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(payload))});assert(await page.locator('#personalConfirm').isDisabled());
await page.locator('summary').filter({hasText:'Добавить вручную'}).click();await page.locator('#personalAdd [name=name]').fill('Другая группа');await page.locator('#personalAdd [name=jp]').fill('本');await page.locator('#personalAdd [name=ru]').fill('книга');await page.locator('#personalAdd [name=reading]').fill('ほん');await page.locator('#personalAdd button').click();assert((await page.locator('#personalMessage').textContent()).includes('Добавлено: 1'));
// Untrusted import strings must be rendered as text, never markup.
const xss={version:1,groups:[{kind:'words',name:'<img src=x onerror=alert(1)>',items:[{jp:'本',reading:'ほん',ru:'<img src=x onerror=alert(1)>'}]}]};await page.locator('#personalImport').fill(JSON.stringify(xss));await page.locator('#personalPreview').click();assert.equal(await page.locator('#personalPreviewItems img').count(),0);
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
// Install the real worker and verify the saved library and trainer offline.
await page.evaluate(async()=>{await navigator.serviceWorker.register('sw.js');await navigator.serviceWorker.ready;});await page.reload();await context.setOffline(true);await page.reload();assert((await page.locator('#personalGroups').textContent()).includes('Учёба'));await page.locator('#personalStart').click();assert.equal(await page.locator('#ru').textContent(),'学');
assert.deepEqual(errors,[]);console.log('PASS browser import preview/confirm, duplicate handling, homophones, kanji and verb cards, export, escaping, persistence and offline training');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exit(1)});
