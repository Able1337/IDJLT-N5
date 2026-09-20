(function () {
  const tr=(ru,en)=>settings.lang==='en'?en:ru;
  const main=document.querySelector('main');if(!main)return;
  main.id='mainContent';
  const skip=document.createElement('a');skip.href='#mainContent';skip.className='skip-link';skip.textContent=tr('К содержимому','Skip to content');document.body.prepend(skip);
  const nav=document.createElement('nav');nav.className='study-nav';nav.setAttribute('aria-label',tr('Основная навигация','Main navigation'));document.querySelector('.topbar').after(nav);
  const home=document.body.dataset.page==='home';
  if(home){const block=document.createElement('section');block.id='homeProgress';block.className='study-panel home-progress';document.querySelector('.hero').after(block);}
  function render(){
    nav.innerHTML=[['index.html','Главная','Home'],['practice.html','Практика','Practice'],['vocabulary.html','Словарь','Vocabulary']].map(([url,ru,en])=>`<a href="${url}" ${location.pathname.endsWith(url)||url==='index.html'&&location.pathname.endsWith('/')?'aria-current="page"':''}>${tr(ru,en)}</a>`).join('');
    if(document.getElementById('vocabularyApp'))IDJLTVocabulary.mount(document.getElementById('vocabularyApp'));
    if(document.getElementById('vocabularyTitle'))document.getElementById('vocabularyTitle').textContent=tr('Словарь','Vocabulary');
    if(!home)return;
    const s=IDJLTStudy.summary(),saved=IDJLTStudy.read(IDJLTStudy.SESSION_KEY,null),resume=saved?.phase!=='done'&&saved?.queue?.length;
    document.getElementById('homeProgress').innerHTML=`<div><p class="eyebrow">${tr('ТВОЙ РИТМ','YOUR PACE')}</p><h2>${tr('Немного практики каждый день','A little practice every day')}</h2><p class="sub">${tr('Вводи ответы, собирай предложения и возвращайся к сложному.','Type answers, build sentences and revisit difficult items.')}</p></div><div class="study-stats"><div><b>${s.today}</b><span>${tr('ответов сегодня','answers today')}</span></div><div><b>${s.streak}</b><span>${tr('дней подряд','day streak')}</span></div><div><b>${s.mastered}</b><span>${tr('закреплено','mastered')}</span></div></div><div class="study-actions"><a class="btn primary" href="practice.html?quick=1">${resume?tr('Продолжить тренировку','Resume practice'):tr('Практика · 10 заданий','Practice · 10 questions')}</a><a class="btn secondary" href="practice.html?review=1">${tr('Повторить ошибки','Review mistakes')}${s.weak?` · ${s.weak}`:''}</a><a class="btn secondary" href="vocabulary.html">${tr('Открыть словарь','Open vocabulary')}</a></div>`;
  }
  document.getElementById('langSelect')?.addEventListener('change',render);
  window.addEventListener('storage',()=>{IDJLTStudy.refresh();render();});
  window.addEventListener('pagehide',()=>window.speechSynthesis?.cancel());
  render();
})();
