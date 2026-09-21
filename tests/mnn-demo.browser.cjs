const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.MNN_DEMO_URL||'http://127.0.0.1:4173/';
require('node:fs').mkdirSync('tmp',{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1050},serviceWorkers:'block'});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'mnn-demo.html');
 await page.evaluate(()=>{localStorage.setItem('existing-study-progress','preserve-me');});
 assert.equal(await page.locator('[data-lesson]').count(),20);
 await page.screenshot({path:'tmp/mnn-desktop.png',fullPage:true});
 const data=await page.evaluate(()=>window.MNN_DEMO_DATA.questions);
 for(let lesson=1;lesson<=20;lesson++){
  await page.locator(`[data-lesson="${lesson}"]`).click();await page.locator('#lessonStart').click();
  await page.locator('#check').click();assert((await page.locator('#hint').innerText()).length);
  for(let i=0;i<4;i++){
   const id=await page.locator('[data-question]').getAttribute('data-question');const q=data.find(q=>q.id===id);
   if(q.kind==='build')for(let t=0;t<q.tokens.length;t++)await page.locator(`[data-token="${t}"]`).click();
   else await page.locator('[data-choice]').filter({hasText:q.answer}).evaluateAll((els,ans)=>els.find(el=>el.textContent===ans).click(),q.answer);
   await page.locator('#check').click();assert.match(await page.locator('#feedback').innerText(),/✓ Верно/);
   await page.locator('#next').click();
  }
  assert.match(await page.locator('.result-number').innerText(),/4\s*\/ 4/);await page.locator('#done').click();
 }
 await page.locator('[data-tab="verbs"]').click();await page.screenshot({path:'tmp/mnn-verbs.png',fullPage:true});
 await page.locator('#verbLength').selectOption('5');await page.locator('#verbStart').click();
 let errorId;
 for(let i=0;i<5;i++){
  const id=await page.locator('[data-question]').getAttribute('data-question');
  const v=await page.evaluate(id=>window.IDJLT_GRAMMAR_MATERIALS.trainingVerbs.find(v=>id===v.id+'-identify'),id);
  await page.locator(`[data-group="${i===0?(v.group==='1'?'2':'1'):v.group}"]`).click();
  await page.locator('[data-choice]').evaluateAll((els,a)=>els.find(el=>el.textContent===a).click(),v.ru);
  await page.locator('#check').click();
  assert.match(await page.locator('#feedback').innerText(),i===0?/Нужно повторить/:/✓ Верно/);
  if(i===0){errorId=id;await page.screenshot({path:'tmp/mnn-verb-error.png',fullPage:true});}
  await page.locator('#next').click();
 }
 assert.match(await page.locator('.result-number').innerText(),/4\s*\/ 5/);
 await page.reload();await page.locator('[data-tab="practice"]').click();assert.match(await page.locator('#weakStart').innerText(),/1/);
 await page.locator('#weakStart').click();assert.equal(await page.locator('[data-question]').getAttribute('data-question'),errorId);
 const v=await page.evaluate(id=>window.IDJLT_GRAMMAR_MATERIALS.trainingVerbs.find(v=>id===v.id+'-identify'),errorId);
 await page.locator(`[data-group="${v.group}"]`).click();await page.locator('[data-choice]').evaluateAll((els,a)=>els.find(el=>el.textContent===a).click(),v.ru);await page.locator('#check').click();await page.locator('#next').click();await page.locator('#done').click();assert(await page.locator('#weakStart').isDisabled());
 for(const mode of ['dictionary','masu'])for(const pool of ['all','3']){
  await page.locator('[data-tab="verbs"]').click();await page.locator(`[value="${mode}"]`).check();await page.locator('#verbPool').selectOption(pool);await page.locator('#verbLength').selectOption(pool==='3'?'20':'5');await page.locator('#verbStart').click();
  const count=Number((await page.locator('.round-header').innerText()).match(/1 \/ (\d+)/)[1]);
  for(let i=0;i<count;i++){
   const id=await page.locator('[data-question]').getAttribute('data-question');
   const ans=await page.evaluate(({id,mode})=>{const v=window.IDJLT_GRAMMAR_MATERIALS.trainingVerbs.find(v=>id===v.id+'-'+mode);if(v.jp==='コピーする')return mode==='dictionary'?'kopi-suru':'kopi-shimasu';return mode==='dictionary'?v.jp:window.IDJLT_FORM_LIBRARY.conjugate(v,'masu');},{id,mode});
   await page.locator('#verbAnswer').fill(ans);await page.locator('#verbAnswer').press('Enter');assert.match(await page.locator('#feedback').innerText(),/✓ Верно/);await page.locator('#verbAnswer').press('Enter');
  }
  assert.equal((await page.locator('.result-number').innerText()).replace(/\s/g,''),`${count}/${count}`);await page.locator('#done').click();
 }
 assert.equal(await page.evaluate(()=>localStorage.getItem('existing-study-progress')),'preserve-me');
 for(const size of [360,768,1440]){
  await page.setViewportSize({width:size,height:900});await page.locator('[data-tab="map"]').click();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`map overflow ${size}`);
  if(size===360){await page.screenshot({path:'tmp/mnn-mobile.png',fullPage:true});await page.locator('#theme').click();await page.screenshot({path:'tmp/mnn-mobile-dark.png',fullPage:true});await page.locator('#theme').click();}
  await page.locator('#lessonStart').click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`exercise overflow ${size}`);await page.locator('#exitRound').click();
 }
 await page.goto(base+'grammar-demo.html?topic=te&form=dictionary');assert.equal(await page.locator('#demoForm').inputValue(),'dictionary');
 await page.goto(base+'grammar-demo.html?topic=i&form=past');assert.equal(await page.locator('#demoForm').inputValue(),'past');assert.equal(await page.locator('#demoTopic').inputValue(),'i');
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: all 80 tasks; verb identity and two input modes; wrong group; persisted error/retry; progress isolation; 360/768/1440 layouts; workshop links; no browser errors.');
})().catch(e=>{console.error(e);process.exit(1);});
