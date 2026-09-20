/* Adapters keep legacy data immutable. Add exercise types through the registry. */
(function () {
  const S = window.IDJLTStudy;
  const kana = value => window.wanakana ? wanakana.toHiragana(value || "") : value;
  const kanjiWords = window.IDJLT_KANJI?.words || [];
  const kanjiByTerm = new Map(kanjiWords.map(w => [w.term, w]));
  const readable = value => value && !/[a-z]/i.test(value) ? value : "";
  const vocabulary = (window.IDJLT_DICTIONARIES || []).flatMap(set => set.cards.map(card => {
    const match = kanjiByTerm.get(card.jp);
    return { ...card, ref: `word:${card.id}`, lesson: set.id, title: set.title,
      reading: card.reading || match?.reading || readable(kana(card.romaji)) || card.jp,
      kanji: match?.term || "", examples: card.examples || match?.examples || [] };
  }));
  const sets = (window.IDJLT_DICTIONARIES || []).map(set => ({id:set.id,title:set.title}));
  const sentences = [
    {id:'read',tokens:['私','は','本','を','読みます'],kana:'わたしはほんをよみます',romaji:'Watashi wa hon o yomimasu.',ru:['Я читаю книгу.','Я читаю книги.'],en:['I read a book.','I read books.'],particle:3,note:{ru:'を обозначает объект действия: что читаем? 本 — книгу.',en:'を marks the object: what do you read? 本, a book.'}},
    {id:'study',tokens:['私','は','日本語','を','勉強します'],kana:'わたしはにほんごをべんきょうします',romaji:'Watashi wa nihongo o benkyou shimasu.',ru:['Я изучаю японский язык.','Я учу японский.'],en:['I study Japanese.','I learn Japanese.'],particle:3,note:{ru:'日本語を勉強します — изучать японский. を отмечает объект.',en:'日本語を勉強します means to study Japanese. を marks the object.'}},
    {id:'coffee',tokens:['朝','コーヒー','を','飲みます'],kana:'あさコーヒーをのみます',romaji:'Asa koohii o nomimasu.',ru:['Утром я пью кофе.','Я пью кофе утром.','Утром пью кофе.'],en:['I drink coffee in the morning.','In the morning I drink coffee.'],particle:2,note:{ru:'を ставится после напитка: コーヒーを飲みます.',en:'Place を after the drink: コーヒーを飲みます.'}},
    {id:'school',tokens:['毎日','学校','へ','行きます'],kana:'まいにちがっこうへいきます',romaji:'Mainichi gakkou e ikimasu.',ru:['Каждый день я хожу в школу.','Я хожу в школу каждый день.'],en:['I go to school every day.'],particle:2,particleAnswers:['へ','に'],note:{ru:'へ обозначает направление и читается «э». に здесь тоже допустимо.',en:'へ marks direction and is pronounced e. に is also valid here.'}},
    {id:'friend',tokens:['友達','と','映画','を','見ます'],kana:'ともだちとえいがをみます',romaji:'Tomodachi to eiga o mimasu.',ru:['Я смотрю фильм с другом.','С другом смотрю фильм.'],en:['I watch a movie with a friend.','I watch a film with a friend.'],particle:1,note:{ru:'と после человека означает «вместе с».',en:'と after a person means together with.'}},
    {id:'library',tokens:['図書館','で','本','を','読みます'],kana:'としょかんでほんをよみます',romaji:'Toshokan de hon o yomimasu.',ru:['Я читаю книгу в библиотеке.','В библиотеке я читаю книгу.'],en:['I read a book in the library.','I read books at the library.'],particle:1,note:{ru:'で обозначает место действия. В библиотеке читают.',en:'で marks where an action takes place: reading at the library.'}},
    {id:'cat',tokens:['部屋','に','猫','が','います'],kana:'へやにねこがいます',romaji:'Heya ni neko ga imasu.',ru:['В комнате есть кошка.','В комнате кошка.','В комнате кот.'],en:['There is a cat in the room.'],particle:1,note:{ru:'に отмечает место существования. Для живого существа используем います.',en:'に marks location with existence verbs. Use います for living beings.'}},
    {id:'price',tokens:['この','本','は','高い','です'],kana:'このほんはたかいです',romaji:'Kono hon wa takai desu.',ru:['Эта книга дорогая.','Эта книга стоит дорого.'],en:['This book is expensive.'],particle:2,note:{ru:'は выделяет тему: говорим об этой книге.',en:'は marks the topic: this book.'}},
    {id:'quiet',tokens:['この','部屋','は','静か','です'],kana:'このへやはしずかです',romaji:'Kono heya wa shizuka desu.',ru:['Эта комната тихая.','В этой комнате тихо.'],en:['This room is quiet.','It is quiet in this room.'],particle:3,particleAnswers:['静か'],note:{ru:'静か — な-прилагательное. Перед です добавлять な не нужно.',en:'静か is a na-adjective. Do not add な before です.'}},
    {id:'door',tokens:['ドア','を','開けて','ください'],kana:'ドアをあけてください',romaji:'Doa o akete kudasai.',ru:['Откройте дверь, пожалуйста.','Пожалуйста, откройте дверь.'],en:['Please open the door.','Open the door please.'],particle:1,note:{ru:'て-форма + ください выражает просьбу: あける → あけて.',en:'Te-form + ください expresses a request: あける → あけて.'}},
    {id:'rain',tokens:['今','雨','が','降って','います'],kana:'いまあめがふっています',romaji:'Ima ame ga futte imasu.',ru:['Сейчас идёт дождь.','Сейчас идет дождь.'],en:['It is raining now.'],particle:2,note:{ru:'が отмечает субъект; て + います — действие сейчас.',en:'が marks the subject; te + います describes an ongoing action.'}},
    {id:'apples',tokens:['りんご','を','三つ','買います'],kana:'りんごをみっつかいます',romaji:'Ringo o mittsu kaimasu.',ru:['Я покупаю три яблока.','Куплю три яблока.'],en:['I buy three apples.','I will buy three apples.'],particle:1,note:{ru:'三つ (みっつ) — три предмета. Счётное слово ставим перед глаголом.',en:'三つ (みっつ) counts three things. Here it goes before the verb.'}}
  ];
  const registry = new Map();
  function register(type, adapter) { registry.set(type, adapter); }
  function japaneseAnswers(word) {
    return [...new Set([word.jp,word.kanji,word.reading,readable(kana(word.romaji))].filter(Boolean))];
  }
  function commonWord(word, lang) { return {ref:word.ref,lesson:word.lesson,jp:word.jp,reading:word.reading,romaji:word.romaji,meaning:word[lang] || word.ru,hint:word.reading,explanation:"",difficulty:1}; }
  register('word-meaning', lang => vocabulary.map(word => ({...commonWord(word,lang),id:`word-meaning:${word.id}:${lang}`,type:'word-meaning',prompt:word.jp,answers:S.alternatives(word[lang] || word.ru),answerLanguage:lang})));
  register('word-japanese', lang => vocabulary.map(word => ({...commonWord(word,lang),id:`word-japanese:${word.id}`,type:'word-japanese',prompt:word[lang] || word.ru,answers:japaneseAnswers(word),answerLanguage:'ja'})));
  register('sentence-translation', lang => sentences.map(s=>({id:`sentence-translation:${s.id}:${lang}`,type:'sentence-translation',ref:`sentence:${s.id}`,lesson:'sentences',prompt:s.tokens.join('')+'。',jp:s.tokens.join('')+'。',reading:s.kana,romaji:s.romaji,meaning:s[lang][0],answers:s[lang],hint:s[lang][0].split(' ').slice(0,2).join(' ')+'…',explanation:s.note[lang],answerLanguage:lang,difficulty:2})));
  register('sentence-builder', lang => sentences.map(s=>({id:`sentence-builder:${s.id}`,type:'sentence-builder',ref:`sentence:${s.id}`,lesson:'sentences',prompt:s[lang][0],jp:s.tokens.join('')+'。',reading:s.kana,romaji:s.romaji,meaning:s[lang][0],tokens:s.tokens,answers:[s.tokens.join('')],hint:s.tokens[0],explanation:s.note[lang],answerLanguage:'ja',difficulty:2})));
  register('particles', lang => sentences.filter(s=>s.id!=='quiet').map(s=>({id:`particles:${s.id}`,type:'particles',ref:`sentence:${s.id}`,lesson:'sentences',prompt:s.tokens.map((t,i)=>i===s.particle?'［　］':t).join(''),jp:s.tokens.join('')+'。',reading:s.kana,romaji:s.romaji,meaning:s[lang][0],answers:s.particleAnswers || [s.tokens[s.particle]],choices:['は','が','を','に','で','へ','と'],hint:s.note[lang],explanation:s.note[lang],answerLanguage:'ja',difficulty:1})));
  register('kanji-reading', lang => kanjiWords.map(w=>({id:`kanji-reading:${w.id}`,type:'kanji-reading',ref:`kanji:${w.id}`,lesson:'kanji-readings',prompt:w.term,jp:w.term,reading:w.reading,meaning:w[lang] || w.ru,answers:[w.reading],hint:w.reading?.slice(0,1)+'…',explanation:'',answerLanguage:'ja',difficulty:2})).filter(e=>e.reading));
  register('conjugation', lang => {
    const g=window.IDJLT_GRAMMAR_MATERIALS;
    if(!g)return [];
    return [
      ...g.verbs.map(v=>({id:`conjugation:${v.id}-te`,type:'conjugation',ref:`word:${v.id}`,lesson:'verb-forms',prompt:`${v.jp} → て`,jp:v.te,reading:v.te,romaji:v.teRomaji,meaning:v[lang],answers:[v.te,kana(v.teRomaji)],hint:`${lang==='ru'?'Группа':'Group'} ${v.group}`,explanation:v.jp==='いく'?'いく → いって':`${v.jp} → ${v.te}`,answerLanguage:'ja',difficulty:2})),
      ...g.adjectives.flatMap(a=>g.forms.map((f,i)=>({id:`conjugation:${a.id}-${f.id}`,type:'conjugation',ref:`word:${a.id}`,lesson:`adjective-${a.type}-forms`,prompt:`${a.jp} → ${f[lang]}`,jp:a.answers[i],reading:a.answers[i],romaji:a.latinAnswers[i],meaning:a[lang],answers:[a.answers[i],kana(a.latinAnswers[i]),...(a.type==='na'?[a.answers[i].replace('じゃ','では'),kana(a.latinAnswers[i]).replace('じゃ','では')]:[])],hint:a.good?'いい → よ…':`${a.type==='i'?'い':'な'} → ${f[lang]}`,explanation:`${a.jp} → ${a.answers[i]}`,answerLanguage:'ja',difficulty:2})))
    ];
  });
  const cache=new Map();
  function build(lang='ru') {
    if(!cache.has(lang))cache.set(lang,[...registry.values()].flatMap(adapter=>adapter(lang)));
    return cache.get(lang);
  }
  window.IDJLTExercises={ vocabulary,sets,sentences,build,register(type,adapter){register(type,adapter);cache.clear();},japaneseAnswers };
})();
