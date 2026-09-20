(function () {
  const S=IDJLTStudy, D=IDJLTExercises, root=document.getElementById('practiceApp');
  const tr=(ru,en)=>settings.lang==='en'?en:ru;
  const esc=escapeHtml;
  const names={
    mixed:['Смешанная практика','Mixed practice'], 'word-meaning':['Слово → перевод','Word → meaning'],
    'word-japanese':['Перевод → японский','Meaning → Japanese'], 'sentence-translation':['Перевод предложений','Sentence translation'],
    'sentence-builder':['Собери предложение','Sentence builder'], particles:['Частицы','Particles'],
    'kanji-reading':['Кандзи → чтение','Kanji → reading'], conjugation:['Формы слов','Conjugation']
  };
  const name=type=>tr(...names[type]);
  const params=new URLSearchParams(location.search);
  let config={type:params.get('type') || 'mixed',lesson:params.get('lesson') || 'all',count:10,review:params.get('review')==='1',ref:params.get('word')?`word:${params.get('word')}`:null};
  if(!names[config.type])config.type='mixed';
  let run=null, notice='', composing=false;
  const saved=()=>S.read(S.SESSION_KEY,null);
  const save=()=>{if(run)S.write(S.SESSION_KEY,run);};
  function valid(value) {
    if(!value || value.version!==1 || !['ru','en'].includes(value.lang) || !Array.isArray(value.queue) || !value.queue.length || value.queue.length>15 || !Number.isInteger(value.index) || value.index<0 || value.index>value.queue.length || !Array.isArray(value.results) || value.results.length<value.index || value.results.length>value.index+1 || !['answer','feedback','done'].includes(value.phase))return false;
    const ids=new Set(D.build(value.lang).map(e=>e.id));
    if (!value.queue.every(id=>ids.has(id)) || !value.results.every(r=>r && typeof r.answer==='string' && typeof r.correct==='boolean') || typeof value.id!=='string' || typeof value.answer!=='string' || !Array.isArray(value.selected) || !Array.isArray(value.order)) return false;
    if (value.phase==='done') return value.index===value.queue.length && value.results.length===value.queue.length;
    if (value.index>=value.queue.length || value.results.length!==value.index+(value.phase==='feedback'?1:0)) return false;
    const exercise=D.build(value.lang).find(e=>e.id===value.queue[value.index]);
    if(exercise.tokens) return value.order.length===exercise.tokens.length && new Set(value.order).size===value.order.length && value.order.every(i=>Number.isInteger(i)&&i>=0&&i<exercise.tokens.length) && new Set(value.selected).size===value.selected.length && value.selected.every(i=>value.order.includes(i));
    return value.selected.length===0;
  }
  const current=()=>D.build(run.lang).find(e=>e.id===run.queue[run.index]);
  function filtered() {
    return D.build(settings.lang).filter(e=>(config.type==='mixed'||e.type===config.type) && (config.lesson==='all'||e.lesson===config.lesson) && (!config.ref || e.ref===config.ref));
  }
  function plan(pool) {
    if(config.type!=='mixed')return S.select(pool,{count:config.count,review:config.review});
    const groups=Object.keys(names).filter(t=>t!=='mixed').map(type=>S.select(pool.filter(e=>e.type===type),{count:config.count,review:config.review}));
    const queue=[],seen=new Set();
    for(let i=0;i<config.count;i++)for(const group of groups){const e=group[i];if(e&&!seen.has(e.ref)&&queue.length<config.count){queue.push(e);seen.add(e.ref);}}
    return queue;
  }
  function begin(queue=plan(filtered())) {
    if(!queue.length){notice=tr(config.review?'В этом наборе пока нет ошибок. Попробуй обычную тренировку.':'Для этих настроек нет заданий. Выбери другой набор.',config.review?'No mistakes in this set yet. Try regular practice.':'No exercises match these settings. Choose another set.');renderSetup();return;}
    run={version:1,id:crypto.randomUUID(),lang:settings.lang,queue:queue.map(e=>e.id),index:0,results:[],phase:'answer',answer:'',selected:[],order:[],hinted:false};
    prepare();save();renderRun();
  }
  function prepare() {
    run.answer='';run.selected=[];run.hinted=false;
    const e=current();run.order=e?.tokens?shuffle(e.tokens.map((_,i)=>i)):[];
    if(e?.tokens&&run.order.every((n,i)=>n===i))run.order.push(run.order.shift());
  }
  function destroyInput() {const input=document.getElementById('practiceAnswer');if(input?.dataset.wanakanaId)IDJLTInput.unbind(input);}
  function storageNotice() {return S.persistenceError?`<p class="notice" role="alert">${tr('Браузер не разрешил сохранение. Прогресс доступен только в этой вкладке; можно скачать копию ниже.','Browser storage is unavailable. Progress lasts in this tab only; download a backup below.')}</p>`:'';}
  function renderSetup() {
    destroyInput();run=null;
    const summary=S.summary(),resume=saved();
    const options=[{id:'all',title:{ru:'Все наборы',en:'All sets'}},...D.sets,
      {id:'sentences',title:{ru:'Короткие предложения N5',en:'Short N5 sentences'}},
      {id:'kanji-readings',title:{ru:'Чтения кандзи',en:'Kanji readings'}},
      {id:'verb-forms',title:{ru:'て-форма глаголов',en:'Verb te-form'}},
      {id:'adjective-i-forms',title:{ru:'Формы い-прилагательных',en:'I-adjective forms'}},
      {id:'adjective-na-forms',title:{ru:'Формы な-прилагательных',en:'Na-adjective forms'}}];
    root.innerHTML=`<div class="study-heading"><div><p class="eyebrow">N5 · ${tr('КОРОТКИЕ СЕССИИ','SHORT SESSIONS')}</p><h1>${tr('Практика','Practice')}</h1><p class="sub">${tr('Вспоминай самостоятельно. Повторяй то, что требует внимания.','Recall actively. Revisit what needs attention.')}</p></div><a class="btn secondary" href="vocabulary.html">${tr('Словарь','Vocabulary')}</a></div>
      <div class="study-stats"><div><b>${summary.today}</b><span>${tr('ответов сегодня','answers today')}</span></div><div><b>${summary.weak}</b><span>${tr('требуют повторения','need review')}</span></div><div><b>${summary.streak}</b><span>${tr('дней подряд','day streak')}</span></div></div>
      ${storageNotice()}${notice?`<p class="notice" role="status">${esc(notice)}</p>`:''}
      ${valid(resume)&&resume.index<resume.queue.length?`<section class="resume-box"><div><b>${tr('Продолжить с места остановки','Pick up where you left off')}</b><p>${resume.index} / ${resume.queue.length} · ${resume.lang.toUpperCase()}</p></div><button class="primary" id="resumePractice">${tr('Продолжить','Resume')}</button></section>`:''}
      <section class="study-panel setup-panel"><h2>${tr('Твоя следующая сессия','Your next session')}</h2>
        ${config.ref?`<p class="notice">${tr('Тренировка выбранного слова.','Practice for the selected word.')} <button class="small secondary" id="clearWord">${tr('Все слова','All words')}</button></p>`:''}
        <div class="study-fields"><label>${tr('Упражнение','Exercise')}<select id="practiceType">${Object.keys(names).map(type=>`<option value="${type}" ${config.type===type?'selected':''}>${name(type)}</option>`).join('')}</select></label>
        <label>${tr('Материал','Material')}<select id="practiceLesson">${options.map(s=>`<option value="${s.id}" ${config.lesson===s.id?'selected':''}>${esc(s.title[settings.lang]||s.title.ru)}</option>`).join('')}</select></label>
        <label>${tr('Заданий','Questions')}<select id="practiceCount">${[5,10,15].map(n=>`<option ${n===config.count?'selected':''}>${n}</option>`).join('')}</select></label></div>
        <label class="check"><input id="reviewOnly" type="checkbox" ${config.review?'checked':''}> ${tr('Только ошибки и отмеченные сложные','Only mistakes and flagged items')}</label>
        <div class="study-actions"><button id="beginPractice" class="primary">${tr('Начать тренировку','Start practice')}</button><button id="allMistakes" class="secondary">${tr('Повторить все ошибки','Review all mistakes')}</button></div>
        <p class="sub small-note">${tr('Сначала — сложные и подошедшие к повторению задания. Новому материалу тоже остаётся место.','Difficult and due items come first, with room for new material too.')}</p>
      </section><details class="study-panel"><summary>${tr('Как проверяются ответы и сохраняется прогресс','Answer checking and progress')}</summary><p>${tr('Проверка учитывает известные варианты, регистр и пунктуацию. Свободный перевод может быть верным, даже если его нет в списке: после проверки можно засчитать свой вариант. Подсказка и показ ответа отправляют задание на повторение.','Checking accepts listed alternatives and ignores case and punctuation. A valid free translation may be missing: after checking you can accept your own variant. Hints and revealed answers schedule more practice.')}</p><p>${tr('Статусы отражают результаты тренировок, а не уровень владения языком. Прогресс хранится в этом браузере.','Statuses reflect practice results, not language proficiency. Progress is stored in this browser.')}</p><button id="exportProgress" class="secondary">${tr('Скачать прогресс','Download progress')}</button></details>`;
    document.getElementById('resumePractice')?.addEventListener('click',()=>{run=resume;renderRun();});
    document.getElementById('beginPractice').onclick=()=>begin();
    document.getElementById('allMistakes').onclick=()=>{config={...config,type:'mixed',lesson:'all',ref:null,review:true};begin();};
    document.getElementById('clearWord')?.addEventListener('click',()=>{config.ref=null;renderSetup();});
    for(const [id,key] of [['practiceType','type'],['practiceLesson','lesson'],['practiceCount','count'],['reviewOnly','review']])document.getElementById(id).onchange=e=>{config[key]=key==='review'?e.target.checked:key==='count'?Number(e.target.value):e.target.value;notice='';};
    document.getElementById('exportProgress').onclick=()=>{const url=URL.createObjectURL(new Blob([S.exportProgress()],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='idjlt-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  }
  const typed={
    html:e=>`<label for="practiceAnswer">${e.answerLanguage==='ja'?tr('Ответ на японском','Answer in Japanese'):tr('Твой перевод','Your translation')}</label><input id="practiceAnswer" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="500" aria-describedby="answerHelp" value="${esc(run.answer)}"><p id="answerHelp" class="small-note">${e.answerLanguage==='ja'?tr('Можно писать ромадзи: shite → して.','Type romaji if you like: shite → して.'):tr('Напиши перевод самостоятельно. Для слова достаточно одного значения.','Write your own translation. One meaning is enough for a word.')}</p>`,
    bind:e=>{const input=document.getElementById('practiceAnswer');if(e.answerLanguage==='ja')IDJLTInput.bind(input);input.oncompositionstart=()=>composing=true;input.oncompositionend=()=>composing=false;input.addEventListener('input',()=>{run.answer=input.value;save();});},
    answer:e=>{const input=document.getElementById('practiceAnswer');return e.answerLanguage==='ja'?IDJLTInput.commit(input):input.value;}
  };
  const builder={
    html:e=>`<p class="small-note">${tr('Нажимай слова снизу, чтобы добавить их. Нажми слово в ответе, чтобы вернуть его.','Tap words below to add them. Tap a word in your answer to put it back.')}</p><div class="token-answer" aria-label="${tr('Твоё предложение','Your sentence')}">${run.selected.map(i=>`<button type="button" class="token selected" data-remove="${i}">${esc(e.tokens[i])}</button>`).join('')||`<span class="sub">${tr('Здесь будет предложение','Build your sentence here')}</span>`}</div><div class="token-bank">${run.order.map(i=>`<button type="button" class="token" data-add="${i}" ${run.selected.includes(i)?'disabled':''}>${esc(e.tokens[i])}</button>`).join('')}</div><button class="small secondary" id="undoToken" type="button" ${run.selected.length?'':'disabled'}>${tr('Убрать последнее','Undo last word')}</button>`,
    bind:()=>{
      const update=selector=>{save();renderRun();(root.querySelector(selector)||document.getElementById('practiceCheck')).focus({preventScroll:true});};
      root.querySelectorAll('[data-add]').forEach(button=>button.onclick=()=>{run.selected.push(Number(button.dataset.add));update('[data-add]:not(:disabled)');});
      root.querySelectorAll('[data-remove]').forEach(button=>button.onclick=()=>{run.selected=run.selected.filter(i=>i!==Number(button.dataset.remove));update(`[data-add="${button.dataset.remove}"]`);});
      document.getElementById('undoToken').onclick=()=>{const removed=run.selected.pop();update(`[data-add="${removed}"]`);};
    },
    answer:e=>run.selected.map(i=>e.tokens[i]).join('')
  };
  const choice={html:e=>`<fieldset class="particle-options"><legend>${tr('Выбери частицу','Choose a particle')}</legend>${e.choices.map(c=>`<label><input type="radio" name="particle" value="${c}" ${run.answer===c?'checked':''}><span>${c}</span></label>`).join('')}</fieldset>`,bind:()=>root.querySelectorAll('[name=particle]').forEach(n=>n.onchange=()=>{run.answer=n.value;save();}),answer:()=>run.answer};
  const renderers=new Map(Object.keys(names).filter(t=>t!=='mixed').map(t=>[t,typed]));
  renderers.set('sentence-builder',builder);renderers.set('particles',choice);
  function renderRun() {
    destroyInput();
    if(run.index>=run.queue.length){renderSummary();return;}
    const e=current(),renderer=renderers.get(e.type),feedback=run.phase==='feedback',result=run.results[run.index];
    root.innerHTML=`<div class="run-toolbar"><button class="secondary small" id="pausePractice">${tr('← Пауза','← Pause')}</button><span>${run.index+1} / ${run.queue.length}</span><span>${name(e.type)}</span></div><progress class="run-progress" value="${run.index}" max="${run.queue.length}" aria-label="${tr('Прогресс сессии','Session progress')}"></progress>${storageNotice()}
      <div class="practice-layout"><section class="study-panel exercise-panel"><p class="eyebrow">${run.lang.toUpperCase()} · ${name(e.type)}</p><h1 class="exercise-prompt" ${e.answerLanguage!=='ja'||e.type==='particles'?'lang="ja"':''}>${esc(e.prompt)}</h1>
      ${e.type==='particles'?`<p class="sub">${esc(e.meaning)}</p>`:''}
      <form id="practiceForm">${feedback?'':renderer.html(e)}<p id="practiceValidation" role="status"></p>
      ${run.hinted&&!feedback?`<p class="notice">${esc(e.hint||e.reading)}</p>`:''}
      ${!feedback?`<div class="study-actions secondary-actions"><button class="secondary small" id="practiceHint" type="button">${tr('Подсказка','Hint')}</button><button class="secondary small" id="practiceReveal" type="button">${tr('Не знаю','I do not know')}</button></div>`:''}
      <div class="feedback-panel" aria-live="polite">${feedback?feedbackHtml(e,result):''}</div>
      <div class="practice-footer"><button class="primary" id="${feedback?'practiceNext':'practiceCheck'}" type="${feedback?'button':'submit'}">${feedback?tr(run.index+1===run.queue.length?'Результат':'Дальше',run.index+1===run.queue.length?'Results':'Next'):tr('Проверить','Check')}</button></div></form></section>
      <aside class="practice-aside"><h2>${tr('Шаг за шагом','One step at a time')}</h2><p>${tr('Enter — проверить и продолжить. Tab — перейти к следующей кнопке.','Enter checks and continues. Tab moves to the next control.')}</p><p>${tr('Подсказки помогают учиться. После них материал вернётся на повторение.','Hints help you learn. Hinted material will return for review.')}</p><p>${tr('Ответ сохраняется сразу после проверки. Сессию можно продолжить позже.','Results save after each check. You can resume the session later.')}</p></aside></div>`;
    document.getElementById('pausePractice').onclick=()=>{save();renderSetup();};
    document.getElementById('practiceForm').onsubmit=event=>{event.preventDefault();if(!composing&&!feedback)submit(false);};
    if(!feedback){renderer.bind(e);if(matchMedia('(pointer:fine)').matches)document.getElementById('practiceAnswer')?.focus({preventScroll:true});document.getElementById('practiceHint').onclick=()=>{run.answer=renderer.answer(e);run.hinted=true;save();renderRun();};document.getElementById('practiceReveal').onclick=()=>submit(true);}
    else {
      document.getElementById('practiceNext').onclick=()=>{run.index++;run.phase=run.index===run.queue.length?'done':'answer';prepare();save();renderRun();};
      document.getElementById('acceptVariant')?.addEventListener('click',()=>{if(S.acceptAlternative(e,`${run.id}:${run.index}`,result.answer)){result.correct=true;result.selfAssessed=true;save();renderRun();}});
      document.getElementById('practiceNext').focus({preventScroll:true});
    }
  }
  function feedbackHtml(e,r) {
    const heading=r.correct?(r.assisted?tr('Верно с подсказкой','Correct with a hint'):tr('Верно','Correct')):tr('Разберём ответ','Review the answer');
    return `<section class="answer-feedback ${r.correct&&!r.assisted?'is-correct':'needs-review'}"><h2>${heading}</h2>${r.answer?`<p><span class="sub">${tr('Твой ответ','Your answer')}:</span> ${esc(r.answer)}</p>`:''}<p><span class="sub">${tr('Образец','Model answer')}:</span> <strong>${esc(e.answers[0])}</strong></p><p lang="ja">${esc(e.jp)}${e.reading&&e.reading!==e.jp?` · ${esc(e.reading)}`:''}</p><p>${esc(e.meaning)}</p>${e.explanation?`<p>${esc(e.explanation)}</p>`:''}${r.assisted?`<p>${tr('С подсказкой — добавлено в повторение.','Assisted answer — scheduled for review.')}</p>`:''}${!r.correct&&!r.assisted&&e.answerLanguage!=='ja'&&r.answer?`<p class="small-note">${tr('Перевод может отличаться от образца. Если твой вариант верный, сохрани его для следующих проверок.','A translation can differ from the model. If yours is valid, save it for future checks.')}</p><button class="secondary small" id="acceptVariant" type="button">${tr('Засчитать мой перевод','Accept my translation')}</button>`:''}${r.selfAssessed?`<p>${tr('Вариант принят по твоей оценке.','Variant accepted by your own assessment.')}</p>`:''}</section>`;
  }
  function submit(reveal) {
    if(run.phase!=='answer')return;
    const e=current(),answer=renderers.get(e.type).answer(e);
    if(!reveal&&!answer.trim()){document.getElementById('practiceValidation').textContent=tr('Сначала введи или составь ответ.','Enter or build an answer first.');return;}
    const result={answer,correct:!reveal&&S.check(e,answer),assisted:run.hinted||reveal};
    S.record(e,{...result,attemptId:`${run.id}:${run.index}`});run.results.push(result);run.phase='feedback';save();renderRun();
  }
  function renderSummary() {
    destroyInput();const finished=run;
    const correct=run.results.filter(r=>r.correct&&!r.assisted).length;
    const errors=run.queue.filter((_,i)=>!run.results[i]?.correct||run.results[i]?.assisted);
    root.innerHTML=`<section class="study-panel session-summary"><p class="eyebrow">${tr('СЕССИЯ ЗАВЕРШЕНА','SESSION COMPLETE')}</p><h1>${tr('Хорошая работа','Good work')}</h1><p class="summary-score">${correct} / ${run.queue.length}</p><p>${tr('ответов без подсказки','answers without hints')}</p><p class="sub">${errors.length?tr('Сложные задания сохранены. Повторим их ещё раз?','Difficult items are saved. Try them once more?'):tr('Все задания выполнены. Вернись позже — интервалы повторения уже обновлены.','All done. Come back later — review intervals are updated.')}</p>${storageNotice()}<div class="study-actions">${errors.length?`<button class="primary" id="retryPractice">${tr('Повторить ошибки','Retry mistakes')} (${errors.length})</button>`:''}<button class="secondary" id="setupPractice">${tr('Выбрать тренировку','Choose practice')}</button><a class="btn secondary" href="index.html">${tr('На главную','Home')}</a></div></section>`;
    document.getElementById('retryPractice')?.addEventListener('click',()=>{const all=D.build(finished.lang);settings.lang=finished.lang;begin(errors.map(id=>all.find(e=>e.id===id)));});
    document.getElementById('setupPractice').onclick=()=>renderSetup();
  }
  document.getElementById('langSelect').addEventListener('change',()=>run?renderRun():renderSetup());
  window.addEventListener('storage',event=>{if(event.key===S.KEY){S.refresh();if(!run)renderSetup();}});
  window.addEventListener('pagehide',save);
  renderSetup();
  if(params.get('quick')==='1') { const previous=saved(); if(valid(previous)&&previous.phase!=='done'){run=previous;renderRun();}else begin(); }
})();
