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
    { id: "lesson14", title: { ru: "Урок 14: глаголы", en: "Lesson 14: verbs" }, order: 14, cards: verbs },
    ...["i", "na"].map(type => ({ id: `adjectives-${type}`, title: { ru: `${type === "i" ? "い" : "な"}-прилагательные`, en: `${type === "i" ? "I" : "Na"}-adjectives` }, cards: adjectives.filter(a => a.type === type) }))
  ];
  window.IDJLT_PHRASES = [...(window.IDJLT_PHRASES || []),
    ...words11.filter(w => [43,44,45,46,47,48,51].includes(Number(w.id.split("-")[1]))).map(w => ({ ...w, id: w.id.replace("lesson11-", "lesson11-phrase-") })),
    ...phrases14, ...tePhrases, ...adjectivePhrases
  ];
  window.IDJLT_GRAMMAR_MATERIALS = { verbs, adjectives, forms };
})();
