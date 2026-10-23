// Personal content is stored separately from disposable service-worker caches.
(function(root){
  'use strict';
  const KEY='idjlt.personal.v1', MAX=2000000;
  const str=(v,label,max=500)=>{
    if(typeof v!=='string'||!v.trim()||v.length>max)throw new Error(`Проверь поле «${label}» (до ${max} символов).`);
    return v.trim().normalize('NFC');
  };
  const optional=(v,label,max)=>v===undefined||v===''?'':str(v,label,max);
  const list=(v,label)=>{
    if(v===undefined)return [];
    if(!Array.isArray(v)||v.length>30)throw new Error(`«${label}» должен быть списком (до 30 чтений).`);
    return [...new Set(v.map(s=>str(s,label,100)))];
  };
  function validate(data){
    if(!data||data.version!==1||!Array.isArray(data.groups)||!data.groups.length||data.groups.length>100)throw new Error('Нужен JSON версии 1 с массивом groups (1–100 групп).');
    let count=0;
    return {version:1,groups:data.groups.map(g=>{
      if(!g||!['words','kanji'].includes(g.kind))throw new Error('Тип группы: words или kanji.');
      const name=str(g.name,'Название группы',80);
      if(!Array.isArray(g.items)||!g.items.length||(count+=g.items.length)>5000)throw new Error('В группе нужны карточки; максимум 5000 за импорт.');
      return {name,kind:g.kind,items:g.items.map(item=>{
        if(!item||typeof item!=='object')throw new Error('Некорректная карточка.');
        if(g.kind==='words'){
          const word={jp:str(item.jp,'Написание',100),reading:str(item.reading,'Чтение',150),ru:str(item.ru,'Перевод'),en:optional(item.en,'English'),romaji:optional(item.romaji,'Ромадзи',200)};
          if(item.verbGroup!==undefined&&item.verbGroup!==null&&item.verbGroup!==''){
            if(![1,2,3,'1','2','3'].includes(item.verbGroup))throw new Error('Группа глагола: 1, 2 или 3.');
            word.verbGroup=String(item.verbGroup);
          }
          return word;
        }
        const kanji=str(item.kanji,'Кандзи',4);
        if(!/^\p{Script=Han}$/u.test(kanji))throw new Error('Карточка кандзи должна содержать один иероглиф. Сочетания добавляй в слова.');
        const on=list(item.on,'Онные чтения'),kun=list(item.kun,'Кунные чтения');
        if(!on.length&&!kun.length)throw new Error('Добавь хотя бы одно чтение кандзи.');
        const examples=item.examples===undefined?[]:item.examples;
        if(!Array.isArray(examples)||examples.length>10)throw new Error('Не больше 10 примеров на кандзи.');
        return {kanji,ru:str(item.ru,'Значение'),en:optional(item.en,'English'),on,kun,examples:examples.map(e=>({term:str(e.term,'Пример',100),reading:str(e.reading,'Чтение примера',150),ru:str(e.ru,'Перевод примера'),en:optional(e.en,'English')}))};
      })};
    })};
  }
  function parse(text){
    if(typeof text!=='string'||text.length>MAX)throw new Error('Импорт слишком большой (максимум 2 МБ текста).');
    text=text.trim();
    if(/^https?:\/\//.test(text)){
      const url=new URL(text);
      if(url.origin!=='https://able1337.github.io'||url.pathname!=='/IDJLT-N5/personal.html')throw new Error('Это не ссылка импорта IDJLT.');
      text=url.hash;
    }
    if(text.startsWith('#import='))text=decodeURIComponent(text.slice(8));
    try{return validate(JSON.parse(text));}catch(e){if(e instanceof SyntaxError)throw new Error('Не удалось прочитать JSON. Вставь полный JSON или ссылку импорта.');throw e;}
  }
  const groupId=g=>'personal-'+g.kind+'-'+encodeURIComponent(g.name);
  const itemKey=(kind,i)=>kind==='kanji'?i.kanji:JSON.stringify([i.jp,i.reading]);
  function merge(base,addition){
    const result=JSON.parse(JSON.stringify(base));let added=0,skipped=0;
    for(const incoming of addition.groups){
      let group=result.groups.find(g=>g.name===incoming.name&&g.kind===incoming.kind);
      if(!group){group={name:incoming.name,kind:incoming.kind,items:[]};result.groups.push(group);}
      const seen=new Set(group.items.map(i=>itemKey(group.kind,i)));
      for(const item of incoming.items){const key=itemKey(group.kind,item);if(seen.has(key)){skipped++;continue;}seen.add(key);group.items.push(item);added++;}
    }
    return {data:validate(result),added,skipped};
  }
  function load(){const raw=localStorage.getItem(KEY);return raw?parse(raw):{version:1,groups:[]};}
  function save(data){const text=JSON.stringify(validate(data));if(text.length>MAX)throw new Error('Словарь больше 2 МБ.');localStorage.setItem(KEY,text);}
  function install(data){
    root.IDJLT_DICTIONARIES=[];root.IDJLT_KANJI={singles:[],words:[],sets:[]};
    for(const g of data.groups){const id=groupId(g);
      if(g.kind==='words')root.IDJLT_DICTIONARIES.push({id,title:{ru:g.name,en:g.name},cards:g.items.map(i=>({
        id:id+'-'+encodeURIComponent(itemKey(g.kind,i)),jp:i.jp,reading:i.reading,kanji:i.jp,romaji:i.romaji,
        ...(i.verbGroup?{group:i.verbGroup}:{}),
        ru:i.ru+(i.verbGroup?`\nГруппа ${i.verbGroup}`:''),en:(i.en||i.ru)+(i.verbGroup?`\nGroup ${i.verbGroup}`:'')
      }))});
      else{
        const cards=g.items.map(i=>({...i,id:id+'-'+encodeURIComponent(i.kanji),meaning:i.ru,meaningEn:i.en||i.ru}));
        root.IDJLT_KANJI.singles.push(...cards);root.IDJLT_KANJI.sets.push({id,title:{ru:g.name,en:g.name},singleIds:cards.map(i=>i.id),wordIds:[]});
      }
    }
  }
  root.PersonalDictionary={KEY,validate,parse,merge,load,save,install,groupId};
})(window);
