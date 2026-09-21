(function () {
  'use strict';
  const {lessons,questions}=window.MNN_DEMO_DATA;
  const verbs=window.IDJLT_GRAMMAR_MATERIALS.trainingVerbs;
  const lib=window.IDJLT_FORM_LIBRARY;
  const exceptions=['かえる','はいる','きる','しる','いる'];
  const root=document.getElementById('content');
  const key='idjlt-mnn20-demo-v1';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=s=>wanakana.toHiragana(s.normalize('NFKC').replace(/[ぁ-ゖ]/g,c=>String.fromCharCode(c.charCodeAt(0)+96))).replace(/[\s。.!！?？、,]/g,'');
  function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  const verbQuestions=verbs.flatMap(v=>['identify','dictionary','masu'].map(mode=>({
    id:`${v.id}-${mode}`,kind:mode,verb:v,lesson:null,
    prompt:mode==='identify'?'Определи группу и выбери перевод':mode==='dictionary'?'Восстанови словарную форму':'Поставь глагол в ます-форму',
    jp:mode==='dictionary'?lib.conjugate(v,'masu'):v.jp,
    answer:mode==='identify'?v.ru:mode==='dictionary'?v.jp:lib.conjugate(v,'masu'),
    why:`${v.jp} → ${lib.conjugate(v,'masu')} → ${v.te}. ${v.ru}. ${groupRule(v)}`
  })));
  const catalog=[...questions,...verbQuestions];
  const byId=new Map(catalog.map(q=>[q.id,q]));
  let saved={solved:[],weak:[],theme:'light'};
  let storageAvailable=true;
  try {const parsed=JSON.parse(localStorage.getItem(key)||'null');if(parsed&&typeof parsed==='object'){
    for(const field of ['solved','weak'])if(Array.isArray(parsed[field]))saved[field]=[...new Set(parsed[field].filter(id=>typeof id==='string'&&byId.has(id)))];
    saved.theme=parsed.theme==='dark'?'dark':'light';
  }} catch {storageAvailable=false;}
  document.body.classList.toggle('dark',saved.theme==='dark');
  let tab='map',selectedLesson=14,round=null;
  function persist(){try{localStorage.setItem(key,JSON.stringify(saved));}catch{storageAvailable=false;}storageNote();}
  function storageNote(){document.getElementById('storageNote').textContent=storageAvailable?'':'Сохранение недоступно: результаты останутся только до закрытия страницы.';}
  storageNote();
  function groupRule(v){
    if(v.group==='3')return 'III группа: する и くる меняются нерегулярно; составные глаголы на する — тоже III группа.';
    if(v.group==='2')return 'II группа: убираем る, добавляем ます. Окончание само по себе не всегда позволяет узнать группу — запоминай её вместе со словом.';
    if(v.jp==='いらっしゃる')return 'I группа, особая вежливая форма: いらっしゃいます. Не используй её как образец обычного спряжения.';
    if(exceptions.includes(v.jp))return 'I группа: это исключение из подсказки про -いる / -える. Группу нужно запомнить вместе со значением.';
    return 'I группа: последний слог переходит из ряда う в ряд い, затем добавляется ます.';
  }
  document.getElementById('theme').onclick=()=>{saved.theme=saved.theme==='dark'?'light':'dark';document.body.classList.toggle('dark',saved.theme==='dark');persist();};
  document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;round=null;render();});
  function render(){
    document.querySelectorAll('[data-tab]').forEach(b=>{if(b.dataset.tab===tab)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
    if(round){renderRound();return;}
    ({map:renderMap,verbs:renderVerbs,practice:renderPractice,plan:renderPlan}[tab])();
  }
  function workshopUrl(l){if(l.workshop?.startsWith('i:'))return `grammar-demo.html?topic=i&form=${l.workshop.split(':')[1]}`;return `grammar-demo.html?topic=te&form=${l.workshop}`;}
  function renderMap(){
    const l=lessons.find(l=>l.id===selectedLesson);
    const solved=questions.filter(q=>saved.solved.includes(q.id)).length;
    root.innerHTML=`<div class="dashboard"><section><div class="section-heading"><h2>Твой маршрут</h2><span class="small">20 уроков · без блокировок</span></div><div class="lesson-grid">${lessons.map(l=>{
      const n=questions.filter(q=>q.lesson===l.id&&saved.solved.includes(q.id)).length;
      return `<button class="lesson-card ${l.id===selectedLesson?'active':''}" data-lesson="${l.id}" aria-pressed="${l.id===selectedLesson}"><span class="lesson-number">${String(l.id).padStart(2,'0')}</span><strong>${esc(l.title)}</strong><span class="lesson-status">${n?`${n}/4 верно`:'4 задания'}</span></button>`;
    }).join('')}</div><div class="stat-strip"><span>${solved} / 80 решено верно</span><span>${saved.weak.length} на повторение</span><span>Грамматика → применение</span></div></section><aside class="detail" aria-label="Выбранный урок"><span class="tag">ВЫБРАННЫЙ УРОК</span><span class="big-number">${String(l.id).padStart(2,'0')} <span lang="ja">課</span></span><h2>${esc(l.title)}</h2><p>${esc(l.goal)}.</p><div class="rule" lang="ja">${esc(l.grammar)}</div><h3>Что тренируем</h3><p>${esc(l.drill)}.</p><button class="primary" id="lessonStart">Практика урока · 4 задания →</button>${l.workshop?`<a class="text-link" href="${workshopUrl(l)}">Открыть связанную форму в мастерской ↗</a>`:''}</aside></div>`;
    root.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>{selectedLesson=Number(b.dataset.lesson);renderMap();root.querySelector(`[data-lesson="${selectedLesson}"]`).focus({preventScroll:true});if(innerWidth<=650)root.querySelector('.detail').scrollIntoView({block:'start',behavior:'instant'});});
    document.getElementById('lessonStart').onclick=()=>start(questions.filter(q=>q.lesson===l.id),`Урок ${l.id} · ${l.title}`);
  }
  function renderVerbs(){
    root.innerHTML=`<div class="two-cols"><section class="panel"><p class="eyebrow">ОТДЕЛЬНЫЙ РЕЖИМ</p><h2>Узнай глагол до того,<br>как менять его форму.</h2><p class="muted">Группа + значение + связь двух форм. ${verbs.length} глагола из существующих наборов приложения.</p><div class="mode-options">
    <label class="mode-option"><input type="radio" name="verbMode" value="identify" checked><span><strong>Группа и перевод</strong><small>Два решения на карточке. Группа не видна до проверки.</small></span></label>
    <label class="mode-option"><input type="radio" name="verbMode" value="dictionary"><span><strong>ます → словарная</strong><small>Вспомни исходный глагол и введи ответ каной или ромадзи.</small></span></label>
    <label class="mode-option"><input type="radio" name="verbMode" value="masu"><span><strong>Словарная → ます</strong><small>Проверь основу: かえる → かえります, かりる → かります.</small></span></label></div>
    <div class="fields"><label>Какие глаголы<select id="verbPool"><option value="all">Все ${verbs.length}</option><option value="1">I группа</option><option value="2">II группа</option><option value="3">III группа</option><option value="exceptions">Ловушки на -いる / -える</option></select></label><label>Длина подхода<select id="verbLength"><option value="10">До 10 глаголов</option><option value="5">До 5 глаголов</option><option value="20">До 20 глаголов</option></select></label></div><button id="verbStart" class="primary">Начать тренировку →</button><p class="note">Подборка использует имеющуюся лексику; это не полный словарь уроков 1–20. В фильтре отдельной группы тренируй перевод или переход формы.</p></section>
    <aside class="panel"><span class="tag">ПОЧЕМУ ЭТО ОТДЕЛЬНЫЙ НАВЫК</span><div class="example-verb" lang="ja">かえる ≠ かりる</div><p class="muted">Похожие окончания не гарантируют одинаковую группу.</p><div class="guide-row"><b>I</b><span>かえる · возвращаться<br>かえります → かえって</span></div><div class="guide-row"><b>II</b><span>かりる · брать взаймы<br>かります → かりて</span></div><div class="guide-row"><b>III</b><span>する / くる<br>します / きます</span></div><p class="note">Сначала выделяй する и くる. У остальных окончание -いる / -える — подсказка, но исключения нужно помнить. Слова с одинаковым чтением различай по значению и кандзи.</p><a class="text-link" href="grammar-demo.html">Перейти к мастерской форм ↗</a></aside></div>`;
    document.getElementById('verbStart').onclick=()=>{
      const mode=root.querySelector('[name=verbMode]:checked').value;
      const group=document.getElementById('verbPool').value;
      const pool=verbQuestions.filter(q=>q.kind===mode&&(group==='all'||(group==='exceptions'?q.verb.group==='1'&&exceptions.includes(q.verb.jp):q.verb.group===group)));
      start(shuffle(pool).slice(0,Number(document.getElementById('verbLength').value)),'Лаборатория глаголов');
    };
  }
  function renderPractice(){
    root.innerHTML=`<div class="two-cols"><section class="panel"><p class="eyebrow">КОРОТКИЕ ПОДХОДЫ</p><h2>Применить, а не только узнать</h2><p class="muted">Повтори изученные темы вместе или сосредоточься на одном навыке.</p><div class="fields"><label>Я дошёл до урока<select id="upTo">${lessons.map(l=>`<option value="${l.id}" ${l.id===20?'selected':''}>${l.id} · ${esc(l.title)}</option>`).join('')}</select></label><label>Режим<select id="practiceMode"><option value="mixed">Смешанная практика</option><option value="particle">Частицы</option><option value="meaning">Смысл и ситуация</option><option value="build">Конструктор фраз</option></select></label></div><div class="actions"><button id="practiceStart" class="primary">Начать · до 10 заданий →</button><button id="weakStart" ${saved.weak.length?'':'disabled'}>Повторить ошибки · ${saved.weak.length}</button></div><p class="note">Смешанная практика учитывает верхнюю границу уроков. Повтор ошибок берёт отдельную очередь из всех твоих тренировок, включая глаголы.</p></section><aside class="panel"><span class="tag">ОДНА ФОРМА — РАЗНЫЕ НАМЕРЕНИЯ</span><div class="guide-row"><b>14</b><span lang="ja">あけてください<br><span class="muted">Пожалуйста, откройте.</span></span></div><div class="guide-row"><b>15</b><span lang="ja">あけてもいいですか<br><span class="muted">Можно мне открыть?</span></span></div><div class="guide-row"><b>17</b><span lang="ja">あけないでください<br><span class="muted">Пожалуйста, не открывайте.</span></span></div><p class="note">После проверки увидишь верный вариант и объяснение. В конструкторе собирай фразу кнопками; нажатие на выбранный фрагмент возвращает его обратно.</p></aside></div>`;
    document.getElementById('practiceStart').onclick=()=>{
      const mode=document.getElementById('practiceMode').value,max=Number(document.getElementById('upTo').value);
      const pool=questions.filter(q=>q.lesson<=max&&(mode==='mixed'||q.kind===mode));
      start(shuffle(pool).slice(0,10),'Практика · уроки 1–'+max);
    };
    document.getElementById('weakStart').onclick=()=>start(saved.weak.map(id=>byId.get(id)).filter(Boolean),'Повторение ошибок');
  }
  function renderPlan(){
    root.innerHTML=`<p class="eyebrow">КАК РАЗВИВАТЬ ПРИЛОЖЕНИЕ</p><h2>Общий каркас, разные навыки.</h2><p class="muted">Карточки помогают запомнить. Следующий шаг — вспомнить без подсказки и использовать в ситуации.</p><div class="plan-grid"><section class="panel"><span class="tag">ЕСТЬ В ДЕМО</span><h3>Маршрут по урокам</h3><p>Цель, конструкции, короткий подход и переход в нужную часть мастерской. Для всех 20 уроков — контекст и конструктор фразы.</p></section><section class="panel"><span class="tag">ЕСТЬ В ДЕМО</span><h3>Глаголы как отдельный навык</h3><p>Группа и значение, переходы между ます и словарной формой, отдельный набор ловушек. В разборе — связка со знакомой て-формой.</p></section><section class="panel"><span class="tag">ЕСТЬ В ДЕМО</span><h3>Возвращаться к ошибкам</h3><p>Очередь ошибочных заданий сохраняется отдельно. Правильный ответ убирает задание из неё. Счётчик «решено» отражает практику, а не полное освоение урока.</p></section></div><section class="panel wide-panel"><h3>Что добавить ко всем урокам в полноценной версии</h3><ol><li><b>Полный набор лексики.</b> Направления JP → RU и RU → JP, фуригана по запросу, слово в короткой фразе. Заполнить отсутствующие уроки.</li><li><b>Самостоятельный ввод.</b> От выбора варианта переходить к пропуску без подсказок, затем к полной фразе; принимать заранее проверенные варианты ответа.</li><li><b>Аудио и мини-диалоги.</b> Услышать → выбрать смысл → ответить вслух. Привязать существующее аудио к темам; не выдавать синтез речи за запись носителя.</li><li><b>Повторение с интервалами.</b> Возврат через 1, 3 и 7 дней; отдельная статистика слов, форм и применения. Неверный ответ раньше возвращается в практику.</li><li><b>Контроль после блока.</b> Смешанный мини-тест без названий правил. Для урока — собственный словарь и грамматика не выше выбранного уровня.</li></ol><p class="note">Эти пять пунктов — план развития. Полный словарь, аудиотренировки и интервальный алгоритм в этом демо ещё не реализованы.</p></section><section class="panel wide-panel"><h3>Какие специальные тренажёры развивать</h3><p class="muted">1–3: визитки, указательные слова и план здания. 4–5: часы, календарь и маршрут. 6–7: приглашения и схема передачи подарков. 8–9: описание и причина. 10–11: расположение предметов и счётчики. 12–13: сравнить варианты и выразить желание. 14–17: намерение говорящего и правила. 18–19: умение, опыт и последовательность. 20: смена стиля целого диалога.</p><p class="note">В карте уже можно попробовать текстовые упражнения по этим темам. Визуальные сцены, полноценные диалоги и свободная речь — следующий этап.</p></section>`;
  }
  function start(pool,title){
    round={deck:shuffle(pool),title,index:0,correct:0,mistakes:[],checked:false,choice:null,group:null,tokens:[],options:[],tokenOrder:[]};
    prepare();render();root.scrollIntoView({block:'start',behavior:'instant'});
  }
  function prepare(){
    round.checked=false;round.choice=null;round.group=null;round.tokens=[];round.input='';round.feedback='';
    const q=round.deck[round.index];if(!q)return;
    if(q.kind==='identify')round.options=shuffle([q.answer,...shuffle([...new Set(verbs.map(v=>v.ru).filter(ru=>ru!==q.answer))]).slice(0,3)]);
    else round.options=shuffle(q.options||[]);
    round.tokenOrder=shuffle((q.tokens||[]).map((_,i)=>i));
  }
  function renderRound(){
    if(round.index>=round.deck.length){renderResult();return;}
    const q=round.deck[round.index];
    const inputMode=['dictionary','masu'].includes(q.kind);
    const wordMarkup=q.verb&&q.kind!=='dictionary'?`<ruby>${esc(q.verb.kanji)}<rt>${esc(q.verb.jp)}</rt></ruby>`:esc(q.jp);
    root.innerHTML=`<div class="practice-wrap"><div class="round-header"><span>${esc(round.title)} · ${round.index+1} / ${round.deck.length}</span><button id="exitRound">К выбору</button></div><progress class="progress" value="${round.index}" max="${round.deck.length}" aria-label="Пройдено заданий"></progress><section class="panel exercise" data-question="${q.id}"><span class="tag">${q.lesson?'УРОК '+String(q.lesson).padStart(2,'0'):'ГЛАГОЛЫ'} · ${q.kind==='build'?'КОНСТРУКТОР':q.kind==='particle'?'ЧАСТИЦЫ':q.kind==='identify'?'ГРУППА + ЗНАЧЕНИЕ':inputMode?'ВВОД ОТВЕТА':'СМЫСЛ И СИТУАЦИЯ'}</span><h2 class="focus-heading" tabindex="-1">${esc(q.prompt)}</h2>${q.jp?`<div class="jp" lang="ja">${wordMarkup}</div>${q.kind==='dictionary'?`<p class="small">${esc(q.verb.ru)}</p>`:''}`:''}${q.kind==='identify'?`<p class="answer-label">1. Группа глагола</p><div class="group-buttons">${['1','2','3'].map((g,i)=>`<button data-group="${g}" aria-pressed="false">${['I','II','III'][i]} группа</button>`).join('')}</div><p class="answer-label" style="margin-top:22px">2. Перевод</p>`:''}
    ${q.kind==='build'?'<p class="answer-label">Твоя фраза · нажми на фрагмент, чтобы вернуть</p><div class="token-area" aria-label="Собранная фраза"></div><div class="token-bank" aria-label="Доступные фрагменты"></div>':inputMode?'<label class="answer-label" for="verbAnswer">Ответ каной или ромадзи</label><input id="verbAnswer" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Введи форму…">':`<div class="choice-grid">${round.options.map((o,i)=>`<button data-choice="${i}" aria-pressed="false">${esc(o)}</button>`).join('')}</div>`}
    <div class="error-hint" id="hint" role="status"></div><div id="feedback" aria-live="polite"></div><div class="actions"><button id="check" class="primary">Проверить</button><button id="next" disabled>Дальше →</button></div></section></div>`;
    document.getElementById('exitRound').onclick=()=>{round=null;render();};
    root.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{if(round.checked)return;round.choice=Number(b.dataset.choice);root.querySelectorAll('[data-choice]').forEach(el=>{const selected=el===b;el.classList.toggle('selected',selected);el.setAttribute('aria-pressed',String(selected));});});
    root.querySelectorAll('[data-group]').forEach(b=>b.onclick=()=>{if(round.checked)return;round.group=b.dataset.group;root.querySelectorAll('[data-group]').forEach(el=>{const selected=el===b;el.classList.toggle('selected',selected);el.setAttribute('aria-pressed',String(selected));});});
    if(q.kind==='build')renderTokens(q);
    const input=document.getElementById('verbAnswer');
    if(input){wanakana.bind(input,{IMEMode:'toHiragana'});input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing&&e.keyCode!==229){e.preventDefault();if(round.checked)next();else check();}});input.focus();}else root.querySelector('h2').focus({preventScroll:true});
    document.getElementById('check').onclick=check;document.getElementById('next').onclick=next;
  }
  function renderTokens(q){
    const area=root.querySelector('.token-area'),bank=root.querySelector('.token-bank');
    area.innerHTML=round.tokens.length?round.tokens.map((id,i)=>`<button data-remove="${i}" lang="ja">${esc(q.tokens[id])}</button>`).join(''):'<span class="small">Выбирай фрагменты в нужном порядке</span>';
    bank.innerHTML=round.tokenOrder.map(id=>`<button data-token="${id}" lang="ja" ${round.tokens.includes(id)?'disabled':''}>${esc(q.tokens[id])}</button>`).join('');
    bank.querySelectorAll('[data-token]').forEach(b=>b.onclick=()=>{if(round.checked)return;round.tokens.push(Number(b.dataset.token));renderTokens(q);});
    area.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{if(round.checked)return;round.tokens.splice(Number(b.dataset.remove),1);renderTokens(q);});
  }
  function check(){
    if(!round||round.checked)return;
    const q=round.deck[round.index],input=document.getElementById('verbAnswer');
    let answer='';
    if(q.kind==='build'){
      if(round.tokens.length!==q.tokens.length){document.getElementById('hint').textContent='Используй все фрагменты, затем проверь фразу.';return;}
      answer=round.tokens.map(i=>q.tokens[i]).join('');
    }else if(input){answer=wanakana.toHiragana(input.value.trim());if(!answer){document.getElementById('hint').textContent='Сначала введи ответ.';input.focus();return;}input.value=answer;}
    else {if(round.choice===null||(q.kind==='identify'&&!round.group)){document.getElementById('hint').textContent=q.kind==='identify'?'Выбери и группу, и перевод.':'Выбери вариант ответа.';return;}answer=round.options[round.choice];}
    const accepted=[q.answer,...(q.kind==='dictionary'?[q.verb.kanji]:[])].filter(Boolean);
    const ok=accepted.some(a=>normalize(a)===normalize(answer))&&(q.kind!=='identify'||round.group===q.verb.group);
    round.checked=true;
    const userAnswer=q.kind==='identify'?`Группа ${round.group}; ${answer}`:answer;
    if(ok){round.correct++;saved.weak=saved.weak.filter(id=>id!==q.id);if(!saved.solved.includes(q.id))saved.solved.push(q.id);}else{round.mistakes.push({q,answer:userAnswer});if(!saved.weak.includes(q.id))saved.weak.push(q.id);saved.solved=saved.solved.filter(id=>id!==q.id);}
    persist();document.getElementById('hint').textContent='';
    root.querySelector('.exercise').classList.toggle('is-correct',ok);
    document.getElementById('feedback').innerHTML=`<div class="feedback ${ok?'':'wrong'}"><strong>${ok?'✓ Верно':'Нужно повторить'}</strong>${!ok?`<p>Твой ответ: ${esc(userAnswer)}</p>`:''}<div class="answer-line">${q.kind==='identify'?`Группа ${q.verb.group} · `:''}${esc(q.kind==='build'?q.tokens.join(' '):q.answer)}</div><p>${esc(q.why)}</p></div>`;
    root.querySelectorAll('[data-choice],[data-group],[data-token],[data-remove]').forEach(b=>b.disabled=true);
    if(input)input.readOnly=true;
    document.getElementById('check').disabled=true;document.getElementById('next').disabled=false;
    if(!input)document.getElementById('next').focus({preventScroll:true});
  }
  function next(){if(!round?.checked)return;round.index++;prepare();renderRound();}
  function renderResult(){
    const errors=round.mistakes,total=round.deck.length;
    root.innerHTML=`<div class="practice-wrap panel"><p class="eyebrow">${esc(round.title)}</p><h2 tabindex="-1">${total?'Подход завершён':'Пока нет заданий'}</h2><div class="result-number">${round.correct} <span class="muted">/ ${total}</span></div><p class="muted">${!total?'Для этого сочетания уроков и режима нет заданий. Выбери другой режим.':errors.length?'Ошибки сохранены для повторения. Разбери их и попробуй ещё раз.':'Все задания этого подхода решены верно. Можно перейти к следующей теме.'}</p>${errors.length?`<ul class="error-list">${errors.map(({q,answer})=>`<li><strong>${esc(q.jp||q.prompt)}</strong>Твой ответ: ${esc(answer)}<br>Верно: ${q.kind==='identify'?`группа ${q.verb.group}, `:''}${esc(q.answer)}<br><span class="muted">${esc(q.why)}</span></li>`).join('')}</ul>`:''}<div class="actions">${errors.length?'<button id="retry" class="primary">Повторить ошибки</button>':''}<button id="done">К выбору тренировок</button></div></div>`;
    if(errors.length)document.getElementById('retry').onclick=()=>start(errors.map(e=>e.q),'Повторение ошибок');
    document.getElementById('done').onclick=()=>{round=null;render();};
    root.querySelector('h2').focus();
  }
  render();
})();
