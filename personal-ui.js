(function(){
  'use strict';
  const api=PersonalDictionary, $=id=>document.getElementById(id);
  let data=window.personalData,pending=null;
  const message=text=>{$('personalMessage').textContent=text;};
  const fail=error=>message('Не удалось выполнить действие: '+error.message);
  const run=fn=>(...args)=>{try{return fn(...args);}catch(e){fail(e);}};
  const ensureWritable=()=>{if(window.personalLoadError)throw new Error('Сохранённый словарь не удалось прочитать. Не перезаписываем его; сохрани резервную копию данных браузера.');};
  function render(){
    const kind=$('personalKind').value, groups=data.groups.filter(g=>g.kind===kind);
    $('personalGroup').replaceChildren(new Option(`Все группы (${groups.reduce((n,g)=>n+g.items.length,0)})`,'all'),...groups.map(g=>new Option(`${g.name} (${g.items.length})`,api.groupId(g))));
    $('personalStart').disabled=!groups.length;
    $('personalExport').disabled=!data.groups.length;
    $('personalGroups').replaceChildren(...data.groups.map(g=>{const p=document.createElement('p');p.textContent=`${g.kind==='words'?'Слова':'Кандзи'} · ${g.name} — ${g.items.length}`;return p;}));
    if(!data.groups.length)$('personalGroups').textContent='Пока пусто. Добавь карточку или импортируй подборку.';
  }
  function preview(text){
    pending=null;$('personalPreviewBox').hidden=true;ensureWritable();
    const incoming=api.parse(text),result=api.merge(data,incoming);
    const nodes=[];
    for(const g of incoming.groups){const title=document.createElement('h4');title.textContent=`${g.kind==='words'?'Слова':'Кандзи'} · ${g.name}`;nodes.push(title);
      for(const i of g.items){const p=document.createElement('p');p.textContent=g.kind==='words'?`${i.jp}【${i.reading}】 — ${i.ru}${i.verbGroup?' · Группа '+i.verbGroup:''}`:`${i.kanji} — ${i.ru}\nОн: ${i.on.join('、')||'—'} · Кун: ${i.kun.join('、')||'—'}${i.examples.map(e=>'\n'+e.term+'【'+e.reading+'】 — '+e.ru).join('')}`;nodes.push(p);}}
    $('personalPreviewItems').replaceChildren(...nodes);
    $('personalPreviewCount').textContent=`Новых: ${result.added}; совпадений, которые пропустим: ${result.skipped}.`;
    $('personalConfirm').disabled=!result.added;pending=incoming;$('personalPreviewBox').hidden=false;
  }
  function commit(incoming){
    ensureWritable();
    // Re-read storage so an import in another tab is not overwritten.
    const result=api.merge(api.load(),incoming);api.save(result.data);data=result.data;
    message(`Добавлено: ${result.added}. Пропущено совпадений: ${result.skipped}.`);render();
  }
  $('personalKind').addEventListener('change',render);
  $('personalStudy').addEventListener('submit',event=>{event.preventDefault();location.href=`personal.html?study=${$('personalKind').value}&group=${encodeURIComponent($('personalGroup').value)}`;});
  $('personalPreview').addEventListener('click',run(()=>preview($('personalImport').value)));
  $('personalImport').addEventListener('input',()=>{pending=null;$('personalPreviewBox').hidden=true;});
  $('personalConfirm').addEventListener('click',run(()=>{if(!pending)return;commit(pending);pending=null;$('personalPreviewBox').hidden=true;$('personalImport').value='';}));
  $('personalFile').addEventListener('change',async event=>{try{const file=event.target.files[0];if(!file)return;if(file.size>2000000)throw new Error('Файл больше 2 МБ.');const text=await file.text();$('personalImport').value=text;preview(text);}catch(e){pending=null;$('personalPreviewBox').hidden=true;fail(e);}finally{event.target.value='';}});
  const form=$('personalAdd');
  form.elements.kind.addEventListener('change',()=>{const isWord=form.elements.kind.value==='words';$('personalWordFields').hidden=!isWord;$('personalKanjiFields').hidden=isWord;});
  form.addEventListener('submit',run(event=>{event.preventDefault();const f=Object.fromEntries(new FormData(form)),split=s=>s.split(/[,、]/).map(x=>x.trim()).filter(Boolean);
    const item=f.kind==='words'?{jp:f.jp,reading:f.reading,ru:f.ru,romaji:f.romaji,verbGroup:f.verbGroup}:{kanji:f.jp,ru:f.ru,on:split(f.on),kun:split(f.kun)};
    commit(api.validate({version:1,groups:[{name:f.name,kind:f.kind,items:[item]}]}));form.elements.jp.value='';form.elements.ru.value='';form.elements.reading.value='';form.elements.romaji.value='';form.elements.on.value='';form.elements.kun.value='';
  }));
  $('personalExport').addEventListener('click',run(()=>{ensureWritable();const url=URL.createObjectURL(new Blob([JSON.stringify(api.load(),null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='idjlt-personal-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}));
  $('personalPrompt').value=`Помоги пополнить мой личный словарь японского в IDJLT N5. Я укажу новые слова/кандзи и название группы. Если название не задано, спроси его. Для сочетаний и слов используй kind="words", для одного иероглифа kind="kanji". Проверь чтения и перевод; не выдумывай неизвестные данные. Отвечай по-русски.

Создай JSON строго такого формата (version: 1):
{"version":1,"groups":[{"name":"Моя группа","kind":"kanji","items":[{"kanji":"学","ru":"учёба; учиться","on":["ガク"],"kun":["まな.ぶ"],"examples":[{"term":"学生","reading":"がくせい","ru":"студент"}]}]},{"name":"Моя группа","kind":"words","items":[{"jp":"食べる","reading":"たべる","ru":"есть; кушать","romaji":"taberu","verbGroup":"2"}]}]}

Включай только запрошенные карточки, не примеры из промпта. Для слов jp — обычное написание, reading — полное чтение каной, ru — перевод, romaji — ромадзи. Для каждого глагола обязательно verbGroup: "1", "2" или "3"; для остальных слов это поле не добавляй. Не путай название пользовательской группы с группой спряжения. Для кандзи on и kun — массивы чтений; отсутствующие чтения — пустой массив. Примеры в examples необязательны. en необязателен. Не используй HTML или Markdown внутри полей.

Верни JSON в блоке кода и кликабельную ссылку «Добавить в IDJLT»: https://able1337.github.io/IDJLT-N5/personal.html#import=PAYLOAD
PAYLOAD — полный JSON, закодированный через encodeURIComponent (UTF-8 percent-encoding), без base64 и без сокращений. Используй выполнение кода для точного кодирования, если оно доступно. Если не можешь надёжно построить ссылку или она длиннее 8000 символов, дай JSON для вставки/сохранения в файл вместо ссылки. Не отправляй данные на сторонние сайты. Импорт потребует проверки в приложении.

Моя группа и новые карточки: `;
  $('personalCopyPrompt').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('personalPrompt').value);message('Промпт скопирован.');}catch{ $('personalPrompt').focus();$('personalPrompt').select();message('Выделил промпт — скопируй его вручную.');}});
  render();
  if(window.personalLoadError){fail(window.personalLoadError);return;}
  if(location.hash.startsWith('#import=')){
    $('personalImport').value=location.hash;
    run(()=>preview(location.hash))();history.replaceState(null,'',location.pathname+location.search);
  }
  const params=new URLSearchParams(location.search),kind=params.get('study');
  if(['words','kanji'].includes(kind)&&!$('personalImport').value){
    const choice=params.get('group')||'all',groups=data.groups.filter(g=>g.kind===kind&&(choice==='all'||api.groupId(g)===choice));
    if(!groups.length){message('В выбранной группе нет карточек. Добавь их в словарь.');return;}
    $('personalManager').hidden=true;document.querySelector('[data-trainer]').hidden=false;
    $('personalBack').href='personal.html';$('personalBack').textContent='← Мои словари';
    if(kind==='words')startWords(groups.map(api.groupId));
    else {settings.kanji.mode='single';startKanji(groups.map(api.groupId));$('kanjiMode').closest('label').hidden=true;}
    if(groups.length>1)$('lessonTitle').textContent=kind==='words'?'Мои слова — все группы':'Мои кандзи — все группы';
  }
})();
