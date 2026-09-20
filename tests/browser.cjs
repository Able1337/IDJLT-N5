/* Start a static server first. Set PLAYWRIGHT_MODULE / BROWSER_CHANNEL if needed. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const origin=process.env.TEST_URL || 'http://127.0.0.1:4173';
(async()=>{
  const browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
  try {
    const context=await browser.newContext({serviceWorkers:'block'}), page=await context.newPage(), errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const visit=path=>page.goto(`${origin}/${path}`);
    await visit('practice.html');
    for(const type of ['word-meaning','word-japanese','sentence-translation','sentence-builder','particles','kanji-reading','conjugation']) {
      await page.locator('#practiceType').selectOption(type);await page.locator('#practiceCount').selectOption('5');await page.locator('#beginPractice').click();
      const exercise=await page.evaluate(()=>{const s=IDJLTStudy.read(IDJLTStudy.SESSION_KEY);return IDJLTExercises.build(s.lang).find(e=>e.id===s.queue[s.index]);});
      if(type==='sentence-builder'){for(let i=0;i<exercise.tokens.length;i++)await page.locator(`[data-add="${i}"]`).click();}
      else if(type==='particles')await page.locator(`[name=particle][value="${exercise.answers[0]}"]`).check();
      else await page.locator('#practiceAnswer').fill(exercise.answers[0]);
      await page.locator('#practiceCheck').click();assert.equal(await page.locator('.answer-feedback.is-correct').count(),1,type);
      const days=await page.evaluate(()=>IDJLTStudy.state.days);
      await page.reload();await page.locator('#resumePractice').click();assert.equal(await page.locator('.answer-feedback.is-correct').count(),1);
      assert.deepEqual(await page.evaluate(()=>IDJLTStudy.state.days),days,'reload must not count an answer again');
      await page.locator('#practiceNext').click();await page.locator('#practiceReveal').click();await page.locator('#pausePractice').click();
    }
    await page.locator('#allMistakes').click();assert.equal(await page.locator('.exercise-prompt').count(),1);await page.locator('#pausePractice').click();
    await page.locator('#reviewOnly').uncheck();await page.locator('#practiceType').selectOption('sentence-translation');await page.locator('#beginPractice').click();
    await page.locator('#practiceAnswer').fill('Мой вариант');await page.locator('#practiceCheck').click();await page.locator('#acceptVariant').click();assert.equal(await page.locator('.is-correct').count(),1);
    await visit('practice.html?type=word-japanese&word=lesson1-0');await page.locator('#beginPractice').click();
    await page.locator('#practiceAnswer').pressSequentially('watashi');assert.equal(await page.locator('#practiceAnswer').inputValue(),'わたし');
    await page.locator('#practiceAnswer').press('Enter');assert.equal(await page.locator('.is-correct').count(),1);
    await page.locator('#practiceNext').click();assert.equal(await page.locator('.session-summary').count(),1);
    await visit('vocabulary.html');await page.locator('#vocabSearch').fill('watashi');assert(await page.locator('.vocab-row').count()>0);
    await page.locator('[data-flag]').first().click();await page.reload();await page.locator('#vocabStatus').selectOption('weak');assert(await page.locator('[aria-pressed="true"]').count()>0);
    await page.locator('#vocabSearch').fill('no_such_word_here');assert.equal(await page.locator('.vocab-row').count(),0);
    await page.locator('#vocabSearch').fill('');await page.locator('#vocabStatus').selectOption('all');await page.locator('#vocabSort').selectOption('difficulty');await page.locator('#vocabNext').click();assert.match(await page.locator('#vocabPage').textContent(),/^2 /);
    await visit('kana.html');await page.evaluate(()=>{settings.kana.order='sequential';settings.kana.script='hiragana';saveSettings();restartAll();});
    assert.equal(await page.evaluate(()=>current.front),'あ');
    await page.locator('#card').focus();await page.keyboard.press('Space');assert(await page.evaluate(()=>shown));await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>session.known.length),1);
    await page.reload();assert.equal(await page.evaluate(()=>session.known.length),1);
    await visit('lesson.html?dict=does-not-exist');assert.match(await page.locator('#lessonTitle').textContent(),/не найден/);
    // Exercise navigation cleanup with a fake clock, without requesting microphone access.
    await visit('interview.html');await page.clock.install();await page.locator('[data-module]').first().click();await page.locator('[data-start-mode="rapid"]').click();await page.locator('[data-exit-session]').click();await page.clock.fastForward(12000);assert.equal(await page.locator('[data-start-mode="rapid"]').count(),1);
    for(const theme of ['dark','light','oled']) for(const width of [320,768,1440]) {
      await page.setViewportSize({width,height:900});
      for(const path of ['index.html','vocabulary.html','practice.html','words.html','lesson1.html','kana.html','kanji.html','phrases.html','textbooks.html','grammar-demo.html','interview.html']) {
        await visit(path);await page.locator('#themeSelect').selectOption(theme);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow: ${path} ${width} ${theme}`);
      }
    }
    await visit('practice.html');await page.evaluate(()=>localStorage.setItem(IDJLTStudy.SESSION_KEY,JSON.stringify({version:1,queue:[null],index:0,results:[],lang:'ru',phase:'answer'})));await page.reload();assert.equal(await page.locator('#resumePractice').count(),0);
    await page.evaluate(()=>localStorage.setItem('idjlt.settings.v3',JSON.stringify({kana:{rows:null},lang:'invalid',theme:null})));await visit('kana.html');assert.equal(await page.locator('#langSelect').inputValue(),'ru');
    const blocked=await browser.newContext({serviceWorkers:'block'});await blocked.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Full','QuotaExceededError')};});
    const blockedPage=await blocked.newPage();blockedPage.on('pageerror',e=>errors.push(e.message));await blockedPage.goto(`${origin}/practice.html?quick=1`);await blockedPage.locator('#practiceReveal').click();assert.equal(await blockedPage.locator('.answer-feedback').count(),1);assert(await blockedPage.locator('[role=alert]').count()>0);await blocked.close();
    // Fresh install must support pages that have never been opened while online.
    const offline=await browser.newContext(), offlinePage=await offline.newPage();offlinePage.on('pageerror',e=>errors.push(e.message));
    await offlinePage.goto(`${origin}/index.html`);await offlinePage.evaluate(()=>navigator.serviceWorker.ready);await offlinePage.reload();await offline.setOffline(true);
    for(const path of ['practice.html','vocabulary.html','kana.html','lesson14.html','grammar-demo.html']){await offlinePage.goto(`${origin}/${path}`);assert.equal(await offlinePage.locator('body').getAttribute('data-page'),path==='lesson14.html'?'lesson':path==='grammar-demo.html'?'grammar-demo':path.replace('.html',''));}
    await offline.close();assert.deepEqual(errors,[]);console.log('PASS: exercises, romaji typing, reload, review, vocabulary, legacy keyboard, timers, three themes × three widths, damaged storage, quota failure and offline first visits.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1});
