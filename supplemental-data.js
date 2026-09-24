// Materials supplied on 2026-09-20. See MATERIALS.md for content notes.
// IDs are stable: append new rows rather than reordering existing ones.
(function () {
  const rows = text => text.trim().split("\n").map(line => line.trim().split("|").map(cell => cell.replace(/\\n/g, "\n")));
  const source11 = "Урок 11";
  const source14 = "Урок 14";
  const sourceAdj = "Прилагательные";
  const words11 = rows(`
こどもが います|Есть ребёнок; иметь ребёнка|Have a child|kodomo ga imasu
にほんに います|Находиться в Японии|Be in Japan|Nihon ni imasu
かかります|Требоваться (о времени или деньгах)|Take time; cost money|kakarimasu
かいしゃを やすみます|Брать выходной на работе|Take a day off work|kaisha o yasumimasu
ひとり|Один человек|One person|hitori
ふたり|Два человека|Two people|futari
～にん|Счётный суффикс для людей|Counter for people|~nin
～だい|Счётный суффикс для машин и техники|Counter for machines and vehicles|~dai
～まい|Счётный суффикс для плоских предметов|Counter for flat objects|~mai
～かい（回）|Счётный суффикс: количество раз|Counter for occurrences|~kai
～かい／～がい（階）|Счётный суффикс для этажей|Counter for floors|~kai / ~gai
～ふん／～ぷん|Счётный суффикс для минут|Counter for minutes|~fun / ~pun
～じかん|Продолжительность в часах|Duration in hours|~jikan
～にち|Продолжительность в днях|Duration in days|~nichi
～しゅうかん|Продолжительность в неделях|Duration in weeks|~shuukan
～かげつ|Продолжительность в месяцах|Duration in months|~kagetsu
～ねん|Продолжительность в годах|Duration in years|~nen
きょうだい|Братья и сёстры|Siblings|kyoudai
あに|Мой старший брат|My older brother|ani
おにいさん|Чей-то старший брат|Someone else's older brother|oniisan
あね|Моя старшая сестра|My older sister|ane
おねえさん|Чья-то старшая сестра|Someone else's older sister|oneesan
おとうと|Мой младший брат|My younger brother|otouto
おとうとさん|Чей-то младший брат|Someone else's younger brother|otoutosan
いもうと|Моя младшая сестра|My younger sister|imouto
いもうとさん|Чья-то младшая сестра|Someone else's younger sister|imoutosan
りんご|Яблоко|Apple|ringo
みかん|Мандарин|Mandarin orange|mikan
サンドイッチ|Бутерброд; сэндвич|Sandwich|sandoicchi
カレーライス|Рис с карри|Curry and rice|kareeraisu
アイスクリーム|Мороженое|Ice cream|aisukuriimu
きって|Почтовая марка|Postage stamp|kitte
はがき|Почтовая открытка|Postcard|hagaki
りょうしん|Родители|Parents|ryoushin
がいこく|Заграница; другая страна|Foreign country|gaikoku
がいこくじん|Иностранец|Foreigner|gaikokujin
りゅうがくせい|Иностранный студент|International student|ryuugakusei
クラス|Класс; учебная группа|Class|kurasu
～くらい／～ぐらい|Примерно; около|About; approximately|~kurai / ~gurai
どのくらい／どのぐらい|Сколько примерно; как долго|About how much; how long|dono kurai / dono gurai
ぜんぶで|Всего; в общей сложности|In total|zenbu de
みんな|Все|Everyone; all|minna
～だけ|Только|Only|~dake
かしこまりました。|Хорошо, будет исполнено (вежливо)|Certainly; understood (polite)|Kashikomarimashita.
いい おてんきですね。|Хорошая погода, правда?|Nice weather, isn't it?|Ii otenki desu ne.
おでかけですか。|Вы куда-то идёте?|Are you going out?|Odekake desu ka.
ちょっと ～まで。|Да, ненадолго до…|Just going to…|Chotto ~made.
いってらっしゃい。|Счастливого пути! (уходящему)|Take care! (to someone leaving)|Itterasshai.
いってきます。|Я пошёл / пошла (и вернусь).|I'm off (and will come back).|Itte kimasu.
ふなびん|Морская почта; отправка морем|Sea mail; surface mail|funabin
こうくうびん（エアメール）|Авиапочта|Airmail|koukuubin (eameeru)
おねがいします。|Будьте любезны; пожалуйста|Please (request)|Onegai shimasu.
  `).map(([jp, ru, en, romaji], i) => ({ id: `lesson11-${i}`, jp, ru, en, romaji, source: source11, sourcePage: 1 }));

  // Dictionary form, translation, romanization, te-form, group, source page.
  const verbs = rows(`
つける|Включать|Turn on|tsukeru|つけて|tsukete|2|2
けす|Выключать; стирать|Turn off; erase|kesu|けして|keshite|1|3
あける|Открывать|Open|akeru|あけて|akete|2|4
しめる|Закрывать|Close|shimeru|しめて|shimete|2|5
いそぐ|Торопиться|Hurry|isogu|いそいで|isoide|1|6
まつ|Ждать|Wait|matsu|まって|matte|1|7
とめる|Останавливать; парковать|Stop; park|tomeru|とめて|tomete|2|8
まがる|Поворачивать|Turn|magaru|まがって|magatte|1|10
もつ|Держать; нести|Hold; carry|motsu|もって|motte|1|11
とる|Брать|Take|toru|とって|totte|1|12
よぶ|Звать; вызывать|Call|yobu|よんで|yonde|1|13
はなす|Разговаривать|Talk|hanasu|はなして|hanashite|1|14
みせる|Показывать|Show|miseru|みせて|misete|2|15
てつだう|Помогать|Help|tetsudau|てつだって|tetsudatte|1|16
おしえる|Объяснять; сообщать; учить|Explain; tell; teach|oshieru|おしえて|oshiete|2|17
おわる|Заканчивать; заканчиваться|Finish; end|owaru|おわって|owatte|1|18
ふる|Идти (о снеге или дожде)|Fall (snow or rain)|furu|ふって|futte|1|19
コピーする|Копировать|Copy|kopii suru|コピーして|kopii shite|3|20
する|Делать|Do|suru|して|shite|3|24
くる|Приходить|Come|kuru|きて|kite|3|24
たべる|Есть; кушать|Eat|taberu|たべて|tabete|2|25
みる|Смотреть|See; watch|miru|みて|mite|2|25
かう|Покупать|Buy|kau|かって|katte|1|27
たつ|Вставать; стоять|Stand up; stand|tatsu|たって|tatte|1|27
かえる|Возвращаться|Return|kaeru|かえって|kaette|1|27
よむ|Читать|Read|yomu|よんで|yonde|1|27
あそぶ|Играть; проводить время|Play; hang out|asobu|あそんで|asonde|1|27
しぬ|Умирать|Die|shinu|しんで|shinde|1|27
かく|Писать|Write|kaku|かいて|kaite|1|27
いく|Идти; ехать|Go|iku|いって|itte|1|27
およぐ|Плавать|Swim|oyogu|およいで|oyoide|1|27
  `).map(([jp, ru, en, romaji, te, teRomaji, group, page], i) => ({ id: `lesson14-${i}`, jp, ru, en, romaji, te, teRomaji, group, source: source14, sourcePage: Number(page) }));

  // Preserve source order. Combined entries are separated where their grammar differs.
  const adjectivesI = rows(`
おいしい|Вкусный|Delicious|oishii
かわいい|Милый; симпатичный|Cute; pretty|kawaii
あつい|Жаркий; горячий|Hot|atsui
さむい|Холодный (о погоде)|Cold (weather)|samui
つめたい|Холодный на ощупь|Cold to the touch|tsumetai
たかい|Высокий; дорогой|High; expensive|takai
やすい|Дешёвый|Cheap|yasui
ひくい|Низкий|Low|hikui
ながい|Длинный|Long|nagai
みじかい|Короткий|Short|mijikai
おおきい|Большой|Big|ookii
ちいさい|Маленький|Small|chiisai
はやい|Быстрый; ранний|Fast; early|hayai
おそい|Медленный; поздний|Slow; late|osoi
おおい|Много; многочисленный|Many; much|ooi
すくない|Мало; немногочисленный|Few; little|sukunai
いそがしい|Занятый|Busy|isogashii
あたらしい|Новый|New|atarashii
ふるい|Старый|Old|furui
いい|Хороший|Good|ii
わるい|Плохой|Bad|warui
むずかしい|Трудный|Difficult|muzukashii
やさしい|Лёгкий; добрый|Easy; gentle|yasashii
おもしろい|Интересный; забавный|Interesting; amusing|omoshiroi
たのしい|Весёлый; приятный|Fun; enjoyable|tanoshii
しろい|Белый|White|shiroi
あかい|Красный|Red|akai
くろい|Чёрный|Black|kuroi
あおい|Синий|Blue|aoi
ちかい|Близкий|Near|chikai
とおい|Далёкий|Far|tooi
あたたかい|Тёплый|Warm|atatakai
すずしい|Прохладный|Cool|suzushii
あまい|Сладкий|Sweet|amai
からい|Острый (о вкусе)|Spicy|karai
おもい|Тяжёлый|Heavy|omoi
かるい|Лёгкий (по весу)|Light (weight)|karui
ほしい|Желанный; хотеть предмет|Wanted; want something|hoshii
～たい|Хотеть сделать (суффикс после основы ます)|Want to do (suffix after the masu stem)|~tai
ひろい|Широкий; просторный|Wide; spacious|hiroi
せまい|Узкий; тесный|Narrow; cramped|semai
わかい|Молодой|Young|wakai
あかるい|Светлый; яркий|Bright|akarui
くらい|Тёмный|Dark|kurai
せが たかい|Высокого роста|Tall|se ga takai
せが ひくい|Невысокого роста|Short in height|se ga hikui
あたまが いい|Умный|Smart|atama ga ii
あぶない|Опасный|Dangerous|abunai
いたい|Болезненный; болит|Painful|itai
ねむい|Сонный|Sleepy|nemui
つよい|Сильный|Strong|tsuyoi
よわい|Слабый|Weak|yowai
ちょうしが いい|В хорошем состоянии; дела идут хорошо|Doing well; in good condition|choushi ga ii
ちょうしが わるい|В плохом состоянии; дела идут плохо|Not doing well|choushi ga warui
からだに いい|Полезный для здоровья|Healthy; good for the body|karada ni ii
すごい|Потрясающий|Amazing|sugoi
かなしい|Грустный|Sad|kanashii
つごうが いい|Удобный (о времени и обстоятельствах)|Convenient (time or circumstances)|tsugou ga ii
つごうが わるい|Неудобный (о времени и обстоятельствах)|Inconvenient (time or circumstances)|tsugou ga warui
きぶんが いい|Хорошо себя чувствовать|Feel good|kibun ga ii
きぶんが わるい|Плохо себя чувствовать|Feel unwell|kibun ga warui
えらい|Выдающийся; достойный уважения|Admirable; great (person)|erai
ちょうど いい|Как раз подходящий|Just right|choudo ii
うるさい|Шумный; надоедливый|Noisy; annoying|urusai
おかしい|Странный; смешной|Strange; funny|okashii
にがい|Горький|Bitter|nigai
ただしい|Правильный|Correct|tadashii
うつくしい|Красивый; прекрасный|Beautiful|utsukushii
きもちが いい|Приятный; приятно себя чувствовать|Pleasant; feel good|kimochi ga ii
きもちが わるい|Неприятный; дурно себя чувствовать|Unpleasant; feel sick|kimochi ga warui
きたない|Грязный|Dirty|kitanai
うれしい|Радостный|Happy; glad|ureshii
さびしい|Одинокий; тоскливый|Lonely|sabishii
はずかしい|Смущённый; стыдно|Embarrassed|hazukashii
かたい|Твёрдый; жёсткий|Hard|katai
やわらかい|Мягкий|Soft|yawarakai
めずらしい|Редкий; необычный|Rare; unusual|mezurashii
うまい|Вкусный|Tasty|umai
まずい|Невкусный|Not tasty|mazui
こい|Насыщенный (вкус, цвет)|Strong (flavor); deep (color)|koi
うすい|Слабый (вкус); тонкий (слой)|Mild (flavor); thin (layer)|usui
ふとい|Толстый (в обхвате)|Thick|futoi
ほそい|Тонкий; узкий (в обхвате)|Thin; slender|hosoi
ひどい|Ужасный|Awful|hidoi
こわい|Страшный|Scary|kowai
きびしい|Строгий|Strict|kibishii
  `);
  const adjectivesNa = rows(`
ひま|Свободный; незанятый|Free; not busy|hima
げんき|Бодрый; здоровый|Energetic; healthy|genki
ゆうめい|Известный|Famous|yuumei
きれい|Красивый; чистый|Beautiful; clean|kirei
にぎやか|Оживлённый|Lively|nigiyaka
しずか|Тихий|Quiet|shizuka
ハンサム|Красивый (о мужчине)|Handsome|hansamu
キュート|Милый|Cute|kyuuto
しんせつ|Добрый; любезный|Kind|shinsetsu
べんり|Удобный|Convenient|benri
ふべん|Неудобный|Inconvenient|fuben
すてき|Прекрасный; замечательный|Lovely; nice|suteki
すき|Любимый; нравиться|Liked; fond of|suki
きらい|Нелюбимый; не нравиться|Disliked|kirai
じょうず|Умелый; хорошо уметь|Skillful; good at|jouzu
へた|Неумелый; плохо уметь|Unskillful; bad at|heta
いろいろ|Разнообразный|Various|iroiro
かんたん|Простой; лёгкий|Simple; easy|kantan
たいへん|Тяжёлый; трудный (о ситуации)|Hard; tough|taihen
たいせつ|Важный; ценный|Important; precious|taisetsu
だいじょうぶ|В порядке; всё хорошо|Fine; okay|daijoubu
むり|Невозможный; непосильный|Impossible; unreasonable|muri
むだ|Бесполезный; напрасный|Useless; wasteful|muda
おなじ|Одинаковый; тот же|Same|onaji
しんぱい|Беспокойство; тревожиться|Worried; anxious|shinpai
まじめ|Серьёзный; добросовестный|Serious; diligent|majime
ねっしん|Усердный; увлечённый|Enthusiastic; devoted|nesshin
じゅうぶん|Достаточный|Enough; sufficient|juubun
だめ|Негодный; нельзя|No good; not allowed|dame
たのしみ|Радостное ожидание|Something to look forward to|tanoshimi
ふくざつ|Сложный; запутанный|Complicated|fukuzatsu
へん|Странный|Strange|hen
しあわせ|Счастливый|Happy|shiawase
らく|Лёгкий; не требующий усилий|Easy; comfortable|raku
あんぜん|Безопасный|Safe|anzen
ていねい|Вежливый; аккуратный|Polite; careful|teinei
きけん|Опасный|Dangerous|kiken
いや|Неприятный; нежеланный|Unpleasant; unwanted|iya
  `);
  const forms = [
    { id: "polite", ru: "утверждение с です", en: "affirmative with desu" },
    { id: "negative", ru: "отрицание, простая форма", en: "negative, plain form" },
    { id: "te", ru: "соединительная て-форма", en: "connecting te-form" },
    { id: "past", ru: "прошедшее, простая форма", en: "past, plain form" },
    { id: "past-negative", ru: "прошедшее отрицание, простая форма", en: "past negative, plain form" }
  ];
  const adjectives = [...adjectivesI.map(row => [...row, "i"]), ...adjectivesNa.map(row => [...row, "na"])].map(([jp, ru, en, romaji, type], i) => {
    const good = jp === "いい" || jp.endsWith(" いい");
    const stem = good ? jp.slice(0, -2) + "よ" : jp.slice(0, -1);
    const latinStem = good ? romaji.slice(0, -2) + "yo" : romaji.slice(0, -1);
    const endings = type === "i" ? ["くない", "くて", "かった", "くなかった"] : ["じゃない", "で", "だった", "じゃなかった"];
    const latinEndings = type === "i" ? ["kunai", "kute", "katta", "kunakatta"] : [" ja nai", " de", " datta", " ja nakatta"];
    const answers = [jp + "です", ...endings.map(end => (type === "i" ? stem : jp) + end)];
    const latinAnswers = [romaji + " desu", ...latinEndings.map(end => (type === "i" ? latinStem : romaji) + end)];
    const sourcePage = type === "na" ? (i - adjectivesI.length < 30 ? 4 : 5) : i < 30 ? 1 : i < 65 ? 2 : 3;
    return { id: `adjective-${i}`, jp, ru, en, romaji, type, good, answers, latinAnswers, source: sourceAdj, sourcePage };
  });

  const phrases14 = rows(String.raw`
エアコンを つける|Включать кондиционер|Turn on the air conditioner|Eakon o tsukeru|2
エアコンを けす|Выключать кондиционер|Turn off the air conditioner|Eakon o kesu|3
ドアを あける|Открывать дверь|Open the door|Doa o akeru|4
ドアを しめる|Закрывать дверь|Close the door|Doa o shimeru|5
しょくばへ いそぐ|Торопиться на работу|Hurry to work|Shokuba e isogu|6
かのじょを まつ|Ждать её|Wait for her|Kanojo o matsu|7
おんがくを とめる|Останавливать музыку|Stop the music|Ongaku o tomeru|8
ちゅうしゃじょうに くるまを とめる|Парковать машину на стоянке|Park a car in the parking lot|Chuushajou ni kuruma o tomeru|9
みぎに まがる|Поворачивать направо|Turn right|Migi ni magaru|10
ふくろを もつ|Держать пакет|Hold a bag|Fukuro o motsu|11
ほんを とる|Брать книгу|Take a book|Hon o toru|12
タクシーを よぶ|Вызывать такси|Call a taxi|Takushii o yobu|13
ともだちと はなす|Разговаривать с другом|Talk with a friend|Tomodachi to hanasu|14
くうこうで パスポートを みせる|Показывать паспорт в аэропорту|Show a passport at the airport|Kuukou de pasupooto o miseru|15
ははを てつだう|Помогать маме|Help my mother|Haha o tetsudau|16
じゅうしょを おしえる|Сообщать адрес|Tell someone an address|Juusho o oshieru|17
しごとを おわる|Заканчивать работу|Finish work|Shigoto o owaru|18
ゆきが ふる|Идёт снег|Snow falls|Yuki ga furu|19
コピーを する|Делать копию|Make a copy|Kopii o suru|20
すみませんが、この かんじの よみかたを おしえて ください。|Извините, объясните, пожалуйста, как читается этот иероглиф.|Excuse me, please tell me how to read this kanji.|Sumimasen ga, kono kanji no yomikata o oshiete kudasai.|21
ボールペンで なまえを かいて ください。|Напишите, пожалуйста, имя шариковой ручкой.|Please write your name with a ballpoint pen.|Boorupen de namae o kaite kudasai.|21
どうぞ たくさん たべて ください。|Пожалуйста, ешьте побольше.|Please help yourself to plenty of food.|Douzo takusan tabete kudasai.|21
ミラーさんは いま でんわを かけています。|Господин Миллер сейчас разговаривает по телефону.|Mr. Miller is talking on the phone now.|Miraa-san wa ima denwa o kakete imasu.|22
いま あめが ふっていますか。\nはい、ふっています。\nいいえ、ふっていません。|Сейчас идёт дождь?\nДа, идёт.\nНет, не идёт. (Два варианта ответа.)|Is it raining now?\nYes, it is.\nNo, it isn't. (Two possible answers.)|Ima ame ga futte imasu ka. / Hai, futte imasu. / Iie, futte imasen.|22
パスポートを みせて ください。|Покажите, пожалуйста, паспорт.|Please show your passport.|Pasupooto o misete kudasai.|29
すみませんが、ちょっと てつだって ください。|Извините, помогите, пожалуйста, немного.|Excuse me, please give me a little help.|Sumimasen ga, chotto tetsudatte kudasai.|30
どうぞ のんで ください。|Пожалуйста, пейте; угощайтесь напитком.|Please have a drink.|Douzo nonde kudasai.|31
なにを していますか。\nレポートを かいています。|Что вы сейчас делаете?\nПишу отчёт.|What are you doing?\nI'm writing a report.|Nani o shite imasu ka. / Repooto o kaite imasu.|32
やまださんは なにを していますか。|Что сейчас делает господин Ямада?|What is Mr. Yamada doing?|Yamada-san wa nani o shite imasu ka.|33
サントスさんは どこで ねていますか。|Где спит господин Сантос?|Where is Mr. Santos sleeping?|Santosu-san wa doko de nete imasu ka.|33
ワンさんは なにを よんでいますか。|Что читает господин Ван?|What is Mr. Wang reading?|Wan-san wa nani o yonde imasu ka.|33
ミラーさんは だれと はなしていますか。|С кем разговаривает господин Миллер?|Who is Mr. Miller talking with?|Miraa-san wa dare to hanashite imasu ka.|33
シュミットさんは つりを していますか。|Господин Шмидт сейчас рыбачит?|Is Mr. Schmidt fishing?|Shumitto-san wa tsuri o shite imasu ka.|33
テレビを けしましょうか。\nすみません。おねがいします。|Выключить телевизор?\nДа, будьте любезны.|Shall I turn off the TV?\nYes, please.|Terebi o keshimashou ka. / Sumimasen. Onegai shimasu.|50
テレビを けしましょうか。\nいいえ、だいじょうぶです。|Выключить телевизор?\nНет, всё в порядке.|Shall I turn off the TV?\nNo, it's okay.|Terebi o keshimashou ka. / Iie, daijoubu desu.|50
  `).map(([jp, ru, en, romaji, page], i) => ({ id: `lesson14-phrase-${i}`, jp, ru, en, romaji, source: source14, sourcePage: Number(page) }));

  const adjectivePhrases = adjectives.flatMap(adj => forms.map((form, i) => ({
    id: `${adj.id}-${form.id}`, setId: `adjectives-${adj.type}-forms`,
    setTitle: { ru: `${adj.type === "i" ? "い" : "な"}-прилагательные: формы`, en: `${adj.type === "i" ? "I" : "Na"}-adjectives: forms` },
    ru: `${adj.ru}\n${form.ru}`, en: `${adj.en}\n${form.en}`,
    jp: adj.answers[i], romaji: adj.latinAnswers[i], source: adj.source, sourcePage: adj.sourcePage
  })));
  const tePhrases = verbs.map(verb => ({
    id: `${verb.id}-te`, studyKey: `${verb.id}-te`, setId: "lesson14-te", setTitle: { ru: "Урок 14: て-форма", en: "Lesson 14: te-form" },
    ru: `${verb.ru}\nて-форма от ${verb.jp} (группа ${verb.group})`,
    en: `${verb.en}\nTe-form of ${verb.jp} (group ${verb.group})`,
    jp: verb.te, romaji: verb.teRomaji, source: source14, sourcePage: verb.sourcePage
  }));
  window.IDJLT_DICTIONARIES = [...(window.IDJLT_DICTIONARIES || []),
    { id: "lesson11", title: { ru: "Урок 11", en: "Lesson 11" }, order: 11, cards: words11 },
    { id: "lesson14", title: { ru: "Урок 14: глаголы", en: "Lesson 14: verbs" }, order: 14, cards: verbs.map(v=>({
      ...v,
      ru:`${v.ru}\nГруппа ${v.group} — ${{'1':'五段','2':'一段','3':'неправильный глагол'}[v.group]}`,
      en:`${v.en}\nGroup ${v.group} — ${{'1':'五段','2':'一段','3':'irregular verb'}[v.group]}`
    })) },
    ...["i", "na"].map(type => ({ id: `adjectives-${type}`, title: { ru: `${type === "i" ? "い" : "な"}-прилагательные`, en: `${type === "i" ? "I" : "Na"}-adjectives` }, cards: adjectives.filter(a => a.type === type) }))
  ];
  window.IDJLT_PHRASES = [...(window.IDJLT_PHRASES || []),
    ...words11.filter(w => [43,44,45,46,47,48,51].includes(Number(w.id.split("-")[1]))).map(w => ({ ...w, id: w.id.replace("lesson11-", "lesson11-phrase-") })),
    ...phrases14, ...tePhrases, ...adjectivePhrases
  ];
  window.IDJLT_GRAMMAR_MATERIALS = { verbs, adjectives, forms };

  // Dictionary forms from the existing word sets, including verbs inside set phrases.
  // Explicit readings/groups avoid ambiguous reversal of endings such as -ります.
  const dictionaryVerbs = new Map(verbs.map(v => [v.jp, {
    jp:v.jp, ru:v.ru, en:v.en, romaji:v.romaji, group:v.group, sourceIds:[v.id]
  }]));
  const additionalVerbs = rows(`
のむ|Пить|Drink|nomu|1|lesson6-1
すう|Курить; вдыхать|Smoke; inhale|suu|1|lesson6-2
きく|Слушать; слышать|Listen; hear|kiku|1|lesson6-5
あう|Встречать; встречаться|Meet|au|1|lesson6-10
あげる|Давать|Give|ageru|2|lesson7-0
もらう|Получать|Receive|morau|1|lesson7-1
おくる|Посылать; отправлять|Send|okuru|1|lesson7-2
きる|Резать; нарезать|Cut|kiru|1|lesson7-3
かりる|Брать взаймы|Borrow|kariru|2|lesson7-4
かす|Давать взаймы|Lend|kasu|1|lesson7-5,lesson9-41
ならう|Учиться; изучать у кого-либо|Learn from someone|narau|1|lesson7-6
かける|Звонить (でんわを かける)|Make a phone call (でんわを かける)|kakeru|2|lesson7-9
わかる|Понимать|Understand|wakaru|1|lesson9-0
ある|Быть; находиться (о неодушевлённом); иметься|Exist (inanimate); be available|aru|1|lesson9-1,lesson10-0
いる|Быть; находиться (об одушевлённом)|Exist (animate); be present|iru|2|lesson10-2,lesson11-0,lesson11-1
かかる|Требоваться (о времени или деньгах)|Take (time); cost|kakaru|1|lesson11-2
やすむ|Отдыхать; брать выходной|Rest; take time off|yasumu|1|lesson11-3
しつれいする|Прощаться; уходить (в формуле вежливости); поступать невежливо|Excuse oneself; leave politely; be rude|shitsurei suru|3|lesson7-41,lesson8-51
いただく|Получать; есть; пить (скромно, вежливо)|Receive; eat; drink (humble)|itadaku|1|lesson7-44
いらっしゃる|Приходить; уходить; быть (уважительно)|Come; go; be (honorific)|irassharu|1|lesson7-39,lesson8-53,lesson11-47
あがる|Подниматься; заходить в дом (в приглашении)|Go up; enter a home (in an invitation)|agaru|1|lesson7-40
かしこまる|Почтительно соглашаться; принимать поручение|Acknowledge respectfully; accept an instruction|kashikomaru|1|lesson11-43
おねがいする|Просить|Ask; request|onegai suru|3|lesson9-47,lesson11-51
  `);
  additionalVerbs.forEach(([jp,ru,en,romaji,group,ids])=>dictionaryVerbs.set(jp,{jp,ru,en,romaji,group,sourceIds:ids.split(',')}));
  const sharedVerbs = {
    'たべる':['lesson6-0'], 'みる':['lesson6-3'], 'よむ':['lesson6-4'], 'かく':['lesson6-6'],
    'かう':['lesson6-7'], 'する':['lesson6-8'], 'とる':['lesson6-9'], 'おしえる':['lesson7-7'],
    'いく':['lesson11-48'], 'くる':['lesson11-48']
  };
  Object.entries(sharedVerbs).forEach(([jp,ids])=>dictionaryVerbs.get(jp).sourceIds.push(...ids));
  dictionaryVerbs.get('とる').ru += '; фотографировать (しゃしんを とる)';
  dictionaryVerbs.get('とる').en += '; take a photo (しゃしんを とる)';
  // Curated everyday beginner vocabulary; not an official JLPT level list.
  const beginnerVerbs = rows(`
おきる|Просыпаться; вставать с постели|Wake up; get up|okiru|2
ねる|Спать; ложиться спать|Sleep; go to bed|neru|2
はたらく|Работать|Work|hataraku|1
べんきょうする|Учиться; заниматься|Study|benkyou suru|3
れんしゅうする|Тренироваться; упражняться|Practice|renshuu suru|3
さわる|Трогать; касаться|Touch|sawaru|1
ふくしゅうする|Повторять изученное|Review a lesson|fukushuu suru|3
よしゅうする|Готовиться к следующему уроку|Prepare for a lesson|yoshuu suru|3
しつもんする|Задавать вопрос|Ask a question|shitsumon suru|3
こたえる|Отвечать|Answer|kotaeru|2
おぼえる|Запоминать|Memorize|oboeru|2
わすれる|Забывать|Forget|wasureru|2
しる|Знать; узнавать|Know; find out|shiru|1
かんがえる|Думать; обдумывать|Think; consider|kangaeru|2
おもう|Думать; полагать|Think; believe|omou|1
いう|Говорить; сказать|Say|iu|1
つたえる|Передавать; сообщать|Convey; tell|tsutaeru|2
せつめいする|Объяснять|Explain|setsumei suru|3
しょうかいする|Представлять; знакомить|Introduce|shoukai suru|3
そうだんする|Советоваться|Consult|soudan suru|3
れんらくする|Связываться; сообщать|Contact; notify|renraku suru|3
でんわする|Звонить по телефону|Phone|denwa suru|3
へんじする|Отвечать (на обращение, письмо)|Reply|henji suru|3
やくそくする|Обещать; договариваться|Promise; arrange|yakusoku suru|3
あいさつする|Приветствовать|Greet|aisatsu suru|3
あやまる|Извиняться|Apologize|ayamaru|1
おす|Нажимать; толкать|Press; push|osu|1
はいる|Входить; поступать|Enter; join|hairu|1
でる|Выходить; покидать|Go out; leave|deru|2
でかける|Выходить из дома; отправляться|Go out; set off|dekakeru|2
もどる|Возвращаться обратно|Return; go back|modoru|1
あるく|Ходить пешком|Walk|aruku|1
はしる|Бежать|Run|hashiru|1
のる|Садиться в транспорт; ехать|Get on; ride|noru|1
おりる|Выходить из транспорта; спускаться|Get off; go down|oriru|2
のりかえる|Пересаживаться|Change trains or buses|norikaeru|2
つく|Прибывать|Arrive|tsuku|1
しゅっぱつする|Отправляться; выезжать|Depart|shuppatsu suru|3
とうちゃくする|Прибывать (о транспорте, путешествии)|Arrive at a destination|touchaku suru|3
とまる|Останавливаться|Stop (intransitive)|tomaru|1
わたる|Переходить; пересекать|Cross|wataru|1
とおる|Проходить через; проезжать|Pass through|tooru|1
のぼる|Подниматься; взбираться|Climb|noboru|1
さがる|Спускаться; снижаться|Go down; decrease|sagaru|1
うんてんする|Водить транспорт|Drive|unten suru|3
りょこうする|Путешествовать|Travel|ryokou suru|3
さんぽする|Гулять; прогуливаться|Take a walk|sanpo suru|3
とまる（泊まる）|Ночевать; останавливаться на ночь|Stay overnight|tomaru-stay|1
よやくする|Бронировать; записываться заранее|Reserve; book|yoyaku suru|3
むかえる|Встречать прибывающего|Welcome; meet an arrival|mukaeru|2
まよう|Заблудиться; колебаться|Get lost; be unsure|mayou|1
さがす|Искать|Look for|sagasu|1
みつける|Находить|Find|mitsukeru|2
みつかる|Находиться; обнаруживаться|Be found|mitsukaru|1
おくれる|Опаздывать|Be late|okureru|2
まにあう|Успевать вовремя|Be on time|maniau|1
すむ|Жить; проживать|Live; reside|sumu|1
ひっこす|Переезжать|Move house|hikkosu|1
そうじする|Убирать; делать уборку|Clean|souji suru|3
せんたくする|Стирать бельё|Do laundry|sentaku suru|3
あらう|Мыть|Wash|arau|1
ふく|Вытирать|Wipe|fuku|1
みがく|Чистить; полировать|Brush; polish|migaku|1
かたづける|Прибирать; убирать на место|Tidy up; put away|katazukeru|2
すてる|Выбрасывать|Throw away|suteru|2
ひろう|Подбирать|Pick up|hirou|1
いれる|Класть внутрь; наливать|Put in; pour|ireru|2
だす|Доставать; вынимать; подавать|Take out; submit|dasu|1
おく|Класть; ставить|Put; place|oku|1
ならべる|Расставлять; раскладывать|Arrange; line up things|naraberu|2
ならぶ|Стоять в очереди; выстраиваться|Line up; queue|narabu|1
あく|Открываться|Open (intransitive)|aku|1
しまる|Закрываться|Close (intransitive)|shimaru|1
きえる|Гаснуть; исчезать|Go out; disappear|kieru|2
つく（点く）|Загораться; включаться (о свете)|Come on; light up|tsuku-light|1
なおす|Чинить; исправлять|Repair; correct|naosu|1
なおる|Исправляться; выздоравливать|Be fixed; recover|naoru|1
こわす|Ломать|Break (transitive)|kowasu|1
こわれる|Ломаться|Break (intransitive)|kowareru|2
つかう|Использовать|Use|tsukau|1
つくる|Делать; создавать; готовить|Make; create; cook|tsukuru|1
りょうりする|Готовить еду|Cook|ryouri suru|3
やく|Жарить; печь|Grill; bake|yaku|1
にる|Варить; тушить|Boil; simmer|niru|2
まぜる|Смешивать; перемешивать|Mix; stir|mazeru|2
あたためる|Подогревать|Warm up|atatameru|2
ひやす|Охлаждать|Cool; chill|hiyasu|1
ちゅうもんする|Заказывать (еду, товар)|Order food or goods|chuumon suru|3
はらう|Платить|Pay|harau|1
うる|Продавать|Sell|uru|1
えらぶ|Выбирать|Choose|erabu|1
くらべる|Сравнивать|Compare|kuraberu|2
かえる（変える）|Менять; изменять|Change (transitive)|kaeru-change|2
かえす|Возвращать что-либо|Return something|kaesu|1
とりかえる|Заменять; обменивать|Replace; exchange|torikaeru|2
つつむ|Заворачивать; упаковывать|Wrap|tsutsumu|1
はこぶ|Нести; перевозить|Carry; transport|hakobu|1
とどける|Доставлять|Deliver|todokeru|2
とどく|Доходить; доставляться|Reach; arrive (delivery)|todoku|1
うけとる|Получать; принимать из рук|Receive; accept delivery|uketoru|1
きる（着る）|Надевать одежду на верхнюю часть тела|Put on upper-body clothing|kiru-wear|2
はく|Надевать обувь, брюки, юбку|Put on shoes or lower-body clothing|haku|1
かぶる|Надевать головной убор|Put on a hat|kaburu|1
ぬぐ|Снимать одежду или обувь|Take off clothes or shoes|nugu|1
あびる|Принимать душ; обливаться|Take a shower; bathe in|abiru|2
きがえる|Переодеваться|Change clothes|kigaeru|2
すわる|Сидеть; садиться|Sit|suwaru|1
ねむる|Спать; засыпать|Sleep; fall asleep|nemuru|1
つかれる|Уставать|Get tired|tsukareru|2
いたむ|Болеть (о части тела)|Ache; hurt|itamu|1
ひく（引く）|Тянуть; вытягивать|Pull|hiku-pull|1
おちる|Падать; опускаться|Fall; drop (intransitive)|ochiru|2
うごく|Двигаться|Move (intransitive)|ugoku|1
うごかす|Двигать; приводить в движение|Move something|ugokasu|1
ころぶ|Падать; спотыкаться|Fall over|korobu|1
わらう|Смеяться; улыбаться|Laugh; smile|warau|1
なく|Плакать|Cry|naku|1
おこる|Сердиться|Get angry|okoru|1
よろこぶ|Радоваться|Be pleased; rejoice|yorokobu|1
おどろく|Удивляться|Be surprised|odoroku|1
こまる|Попадать в затруднение|Be in trouble|komaru|1
しんぱいする|Беспокоиться|Worry|shinpai suru|3
あんしんする|Чувствовать облегчение|Feel relieved|anshin suru|3
たのしむ|Наслаждаться; получать удовольствие|Enjoy|tanoshimu|1
うたう|Петь|Sing|utau|1
おどる|Танцевать|Dance|odoru|1
ひく|Играть на струнном или клавишном инструменте|Play a string or keyboard instrument|hiku|1
ふく（吹く）|Дуть; играть на духовом инструменте|Blow; play a wind instrument|fuku-blow|1
えがく|Рисовать; изображать|Draw; depict|egaku|1
あつめる|Собирать (коллекцию, предметы)|Collect; gather things|atsumeru|2
あつまる|Собираться (о людях)|Gather; assemble|atsumaru|1
はじめる|Начинать что-либо|Begin something|hajimeru|2
はじまる|Начинаться|Begin (intransitive)|hajimaru|1
つづける|Продолжать|Continue something|tsuzukeru|2
やめる|Прекращать; бросать занятие|Stop doing; quit|yameru|2
ぬれる|Мокнуть; промокать|Get wet|nureru|2
おとす|Ронять; терять|Drop; lose|otosu|1
うんどうする|Делать физические упражнения|Exercise|undou suru|3
とぶ|Летать; прыгать|Fly; jump|tobu|1
かつ|Побеждать|Win|katsu|1
まける|Проигрывать|Lose a game|makeru|2
がんばる|Стараться; держаться|Do one's best; persevere|ganbaru|1
できる|Мочь; уметь; получаться|Be able; be completed|dekiru|2
いる（要る）|Быть нужным; требоваться|Be needed|iru-need|1
くれる|Давать мне или близкому мне человеку|Give to me or someone close to me|kureru|2
たりる|Хватать; быть достаточным|Be sufficient|tariru|2
  `);
  beginnerVerbs.forEach(([jp,ru,en,key,group])=>dictionaryVerbs.set(jp,{
    jp,ru,en,romaji:key.replace(/-(stay|light|change|wear|blow|need|pull)$/,''),group,
    stableKey:key.replace(/ /g,'-'),sourceIds:[],collection:'beginner-expansion'
  }));
  const kanjiSpellings = new Map(rows(`
つける|付ける
けす|消す
あける|開ける
しめる|閉める
いそぐ|急ぐ
まつ|待つ
とめる|止める
まがる|曲がる
もつ|持つ
とる|取る
よぶ|呼ぶ
はなす|話す
みせる|見せる
てつだう|手伝う
おしえる|教える
おわる|終わる
ふる|降る
コピーする|コピーする
する|する
くる|来る
たべる|食べる
みる|見る
かう|買う
たつ|立つ
かえる|帰る
よむ|読む
あそぶ|遊ぶ
しぬ|死ぬ
かく|書く
いく|行く
およぐ|泳ぐ
のむ|飲む
すう|吸う
きく|聞く
あう|会う
あげる|あげる
もらう|もらう
おくる|送る
きる|切る
かりる|借りる
かす|貸す
ならう|習う
かける|掛ける
わかる|分かる
ある|ある
いる|居る
かかる|掛かる
やすむ|休む
しつれいする|失礼する
いただく|頂く
いらっしゃる|いらっしゃる
あがる|上がる
かしこまる|畏まる
おねがいする|お願いする
おきる|起きる
ねる|寝る
はたらく|働く
べんきょうする|勉強する
れんしゅうする|練習する
さわる|触る
ふくしゅうする|復習する
よしゅうする|予習する
しつもんする|質問する
こたえる|答える
おぼえる|覚える
わすれる|忘れる
しる|知る
かんがえる|考える
おもう|思う
いう|言う
つたえる|伝える
せつめいする|説明する
しょうかいする|紹介する
そうだんする|相談する
れんらくする|連絡する
でんわする|電話する
へんじする|返事する
やくそくする|約束する
あいさつする|挨拶する
あやまる|謝る
おす|押す
はいる|入る
でる|出る
でかける|出かける
もどる|戻る
あるく|歩く
はしる|走る
のる|乗る
おりる|降りる
のりかえる|乗り換える
つく|着く
しゅっぱつする|出発する
とうちゃくする|到着する
とまる|止まる
わたる|渡る
とおる|通る
のぼる|登る
さがる|下がる
うんてんする|運転する
りょこうする|旅行する
さんぽする|散歩する
とまる（泊まる）|泊まる
よやくする|予約する
むかえる|迎える
まよう|迷う
さがす|探す
みつける|見つける
みつかる|見つかる
おくれる|遅れる
まにあう|間に合う
すむ|住む
ひっこす|引っ越す
そうじする|掃除する
せんたくする|洗濯する
あらう|洗う
ふく|拭く
みがく|磨く
かたづける|片付ける
すてる|捨てる
ひろう|拾う
いれる|入れる
だす|出す
おく|置く
ならべる|並べる
ならぶ|並ぶ
あく|開く
しまる|閉まる
きえる|消える
つく（点く）|点く
なおす|直す
なおる|治る
こわす|壊す
こわれる|壊れる
つかう|使う
つくる|作る
りょうりする|料理する
やく|焼く
にる|煮る
まぜる|混ぜる
あたためる|温める
ひやす|冷やす
ちゅうもんする|注文する
はらう|払う
うる|売る
えらぶ|選ぶ
くらべる|比べる
かえる（変える）|変える
かえす|返す
とりかえる|取り替える
つつむ|包む
はこぶ|運ぶ
とどける|届ける
とどく|届く
うけとる|受け取る
きる（着る）|着る
はく|履く
かぶる|被る
ぬぐ|脱ぐ
あびる|浴びる
きがえる|着替える
すわる|座る
ねむる|眠る
つかれる|疲れる
いたむ|痛む
ひく（引く）|引く
おちる|落ちる
うごく|動く
うごかす|動かす
ころぶ|転ぶ
わらう|笑う
なく|泣く
おこる|怒る
よろこぶ|喜ぶ
おどろく|驚く
こまる|困る
しんぱいする|心配する
あんしんする|安心する
たのしむ|楽しむ
うたう|歌う
おどる|踊る
ひく|弾く
ふく（吹く）|吹く
えがく|描く
あつめる|集める
あつまる|集まる
はじめる|始める
はじまる|始まる
つづける|続ける
やめる|やめる
ぬれる|濡れる
おとす|落とす
うんどうする|運動する
とぶ|飛ぶ
かつ|勝つ
まける|負ける
がんばる|頑張る
できる|できる
いる（要る）|要る
くれる|くれる
たりる|足りる
  `));
  const groupNames = { '1':['五段','五段'], '2':['一段','一段'], '3':['неправильный глагол','irregular verb'] };
  window.IDJLT_DICTIONARIES.push({
    id:'verb-dictionary', title:{ru:'Словарные формы глаголов — 200',en:'Verb dictionary forms — 200'},
    cards:[...dictionaryVerbs.values()].map(v=>({
      ...v, id:`verb-dictionary-${v.stableKey || v.romaji.replace(/ /g,'-')}`,
      kanji:kanjiSpellings.get(v.jp), reading:v.jp.replace(/（.*?）/g,''),
      ru:`${v.ru}\nГруппа ${v.group} — ${groupNames[v.group][0]}`,
      en:`${v.en}\nGroup ${v.group} — ${groupNames[v.group][1]}`
    }))
  });
  // Preserve the expanded set and its progress; the lesson set has its own session.
  const lessonVerbs = window.IDJLT_DICTIONARIES.find(d=>d.id==='verb-dictionary').cards
    .filter(v=>v.collection!=='beginner-expansion')
    .map(v=>({...v,id:v.id.replace('verb-dictionary-','verb-dictionary-lessons-')}));
  window.IDJLT_DICTIONARIES.push({
    id:'verb-dictionary-lessons',
    title:{ru:'Словарные формы глаголов — все уроки',en:'Verb dictionary forms — all lessons'},
    cards:lessonVerbs
  });
  const teEndings={'う':'って','つ':'って','る':'って','む':'んで','ぶ':'んで','ぬ':'んで','く':'いて','ぐ':'いで','す':'して'};
  window.IDJLT_GRAMMAR_MATERIALS.trainingVerbs = lessonVerbs.map(v=>({
    ...v, jp:v.reading, ru:v.ru.split('\n')[0], en:v.en.split('\n')[0],
    te:verbs.find(original=>original.jp===v.jp)?.te ||
      (v.group==='3' ? v.reading.slice(0,-2)+(v.reading.endsWith('する')?'して':'きて') :
       v.group==='2' ? v.reading.slice(0,-1)+'て' : v.reading.slice(0,-1)+teEndings[v.reading.slice(-1)])
  }));
})();
