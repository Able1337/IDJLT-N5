/* One responsive vocabulary view for the library and legacy word tables. */
(function () {
  const S=window.IDJLTStudy, D=window.IDJLTExercises;
  const tr=(ru,en)=>settings.lang==='en'?en:ru;
  const labels={new:['Новое','New'],learning:['Учу','Learning'],familiar:['Знакомое','Familiar'],mastered:['Закреплено','Mastered'],weak:['Повторить','Weak']};
  function mount(root, ids) {
    const words=ids?D.vocabulary.filter(w=>ids.has(w.id)):D.vocabulary;
    let page=0, query='', filter='all', lesson='all', sort='lesson';
    root.innerHTML=`<div class="vocab-filters"><label>${tr('Поиск слова, чтения или перевода','Search word, reading or meaning')}<input type="search" id="vocabSearch" autocomplete="off" placeholder="日本語 · nihongo"></label><label>${tr('Статус','Status')}<select id="vocabStatus"><option value="all">${tr('Все','All')}</option>${Object.entries(labels).map(([id,text])=>`<option value="${id}">${tr(...text)}</option>`).join('')}</select></label><label>${tr('Сортировка','Sort')}<select id="vocabSort"><option value="lesson">${tr('По урокам','By lesson')}</option><option value="jp">${tr('По японскому','Japanese')}</option><option value="difficulty">${tr('Сначала сложные','Difficult first')}</option></select></label>${!ids?`<label>${tr('Набор','Set')}<select id="vocabLesson"><option value="all">${tr('Все наборы','All sets')}</option>${D.sets.map(s=>`<option value="${s.id}">${escapeHtml(s.title[settings.lang]||s.title.ru)}</option>`).join('')}</select></label>`:''}</div><p id="vocabCount" class="sub" role="status"></p><p id="vocabNotice" role="status"></p><div id="vocabRows" class="vocab-rows"></div><nav class="vocab-pagination" aria-label="${tr('Страницы словаря','Vocabulary pages')}"><button class="secondary" id="vocabPrev">← ${tr('Назад','Previous')}</button><span id="vocabPage"></span><button class="secondary" id="vocabNext">${tr('Дальше','Next')} →</button></nav>`;
    const find=id=>root.querySelector('#'+id);
    function render() {
      const stats=new Map(words.map(w=>[w.ref,S.progressFor(w.ref)]));
      const needle=S.normalize(query), hira=window.wanakana?.toHiragana(needle)||needle;
      const filtered=words.filter(w=>(lesson==='all'||w.lesson===lesson)&&(filter==='all'||stats.get(w.ref).status===filter)&&(!needle||[w.jp,w.reading,w.romaji,w.ru,w.en].some(value=>S.normalize(value).includes(needle)||S.normalize(value,'ja').includes(hira))));
      if(sort==='jp')filtered.sort((a,b)=>a.jp.localeCompare(b.jp,'ja'));
      if(sort==='difficulty')filtered.sort((a,b)=>stats.get(b.ref).difficulty-stats.get(a.ref).difficulty);
      const pages=Math.max(1,Math.ceil(filtered.length/30));page=Math.min(page,pages-1);
      find('vocabCount').textContent=tr(`Найдено: ${filtered.length} из ${words.length}`,`${filtered.length} of ${words.length} words`);
      find('vocabPage').textContent=`${page+1} / ${pages}`;
      find('vocabPrev').disabled=page===0;find('vocabNext').disabled=page===pages-1;
      find('vocabRows').innerHTML=filtered.length?filtered.slice(page*30,page*30+30).map(w=>{
        const p=stats.get(w.ref),examples=Array.isArray(w.examples)?w.examples:[];
        return `<article class="vocab-row"><div class="vocab-term"><b lang="ja">${escapeHtml(w.jp)}</b><span lang="ja">${escapeHtml(w.reading!==w.jp?w.reading:'')}</span>${settings.showRomaji?`<small>${escapeHtml(w.romaji||'')}</small>`:''}</div><div class="vocab-meaning"><p>${escapeHtml(w[settings.lang]||w.ru)}</p><small class="sub">${escapeHtml(w.title[settings.lang]||w.title.ru)}</small>${examples.length?`<details><summary>${tr('Примеры','Examples')}</summary>${examples.map(e=>`<p lang="ja">${escapeHtml(typeof e==='string'?e:e.jp||e.term||'')}</p>${typeof e==='object'?`<p>${escapeHtml(e[settings.lang]||e.ru||'')}</p>`:''}`).join('')}</details>`:''}</div><div class="vocab-state"><span class="status-badge status-${p.status}">${tr(...labels[p.status])}</span><div class="vocab-actions"><button class="secondary small" data-speak="${w.id}" aria-label="${tr('Произнести','Pronounce')} ${escapeHtml(w.jp)}">♪</button><button class="secondary small" data-flag="${w.id}" aria-pressed="${!!S.state.flags[w.ref]}" aria-label="${tr('Отметить сложным','Mark difficult')} ${escapeHtml(w.jp)}">${S.state.flags[w.ref]?'★':'☆'}</button><a class="btn secondary small" href="practice.html?word=${encodeURIComponent(w.id)}">${tr('Учить','Practice')}</a></div></div></article>`;
      }).join(''):`<section class="study-panel"><h2>${tr('Ничего не найдено','No matches')}</h2><p>${tr('Попробуй другое слово или убери фильтр статуса.','Try another word or remove the status filter.')}</p></section>`;
      root.querySelectorAll('[data-flag]').forEach(button=>button.onclick=()=>{const w=words.find(w=>w.id===button.dataset.flag);S.markDifficult(w.ref,!S.state.flags[w.ref]);render();find('vocabNotice').textContent=S.persistenceError?tr('Не удалось сохранить отметку. Она доступна только в этой вкладке.','Could not save. The flag lasts in this tab only.'):'';});
      root.querySelectorAll('[data-speak]').forEach(button=>button.onclick=()=>{
        const synth=window.speechSynthesis,voice=synth?.getVoices().find(v=>v.lang.startsWith('ja'));
        if(!voice){find('vocabNotice').textContent=tr('Японский голос недоступен в этом браузере. Чтение указано рядом со словом.','No Japanese voice is available in this browser. Use the reading beside the word.');return;}
        synth.cancel();const utterance=new SpeechSynthesisUtterance(words.find(w=>w.id===button.dataset.speak).jp);utterance.lang='ja-JP';utterance.voice=voice;utterance.rate=.85;utterance.onerror=()=>find('vocabNotice').textContent=tr('Не удалось воспроизвести произношение.','Could not play pronunciation.');synth.speak(utterance);
      });
    }
    find('vocabSearch').oninput=e=>{query=e.target.value;page=0;render();};
    find('vocabStatus').onchange=e=>{filter=e.target.value;page=0;render();};
    find('vocabSort').onchange=e=>{sort=e.target.value;page=0;render();};
    if(find('vocabLesson'))find('vocabLesson').onchange=e=>{lesson=e.target.value;page=0;render();};
    for(const [id,delta] of [['vocabPrev',-1],['vocabNext',1]])find(id).onclick=()=>{page+=delta;render();find('vocabRows').scrollIntoView({block:'start'});};
    render();
  }
  window.IDJLTVocabulary={mount};
})();
