// Experimental exercises. Study progress in the regular modes is never read or written.
(function () {
  const { verbs, adjectives, forms } = window.IDJLT_GRAMMAR_MATERIALS;
  const library = window.IDJLT_FORM_LIBRARY;
  const root = document.getElementById("grammarDemo");
  let deck = [], index = 0, correct = 0, checked = false, mistakes = [], lastResult = null;
  let topic = "te", selectedForm = "te", started = false;
  const tr = (ru, en) => settings.lang === "en" ? en : ru;
  const normalize = value => value.normalize("NFKC").replace(/[\s。.!！?？~〜]/g, "").replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
  function bindRomajiInput(input) {
    // Keep the second n available for the next syllable: konni → こんに,
    // while nn alone still displays ん. WanaKana otherwise commits both n's.
    let carry = null, rememberN = false;
    input.addEventListener("input", event => {
      rememberN = false;
      if (event.isComposing) { carry = null; return; }
      if (carry && event.inputType === "insertText" && /^[aiueoy]$/i.test(event.data || "") &&
          input.value === carry.value.slice(0, carry.cursor) + event.data + carry.value.slice(carry.cursor)) {
        const cursor = input.selectionStart;
        input.value = input.value.slice(0, carry.cursor) + "n" + input.value.slice(carry.cursor);
        input.setSelectionRange(cursor + 1, cursor + 1);
      }
      rememberN = /nn$/i.test(input.value.slice(0, input.selectionStart));
      carry = null;
    });
    wanakana.bind(input, { IMEMode: "toHiragana" });
    input.addEventListener("input", () => {
      if (rememberN) carry = { value: input.value, cursor: input.selectionStart };
      rememberN = false;
    });
  }
  function explanation(item) {
    if (item.lesson) return `${item.base} → ${item.answer}. ${item.lesson.rule[settings.lang]}`;
    if (item.verb) {
      const v = item.verb;
      if (v.jp === "いく") return tr("Исключение: いく → いって, не いいて.", "Exception: いく → いって, not いいて.");
      if (v.group === "3") return tr("Группа 3: する → して, くる → きて. В コピーする меняется часть する.", "Group 3: する → して, くる → きて. In コピーする, change the する part.");
      if (v.group === "2") return tr("Группа 2: убираем る, добавляем て.", "Group 2: replace る with て.");
      return tr("Группа 1: う・つ・る → って; む・ぶ・ぬ → んで; く → いて; ぐ → いで; す → して.", "Group 1: う・つ・る → って; む・ぶ・ぬ → んで; く → いて; ぐ → いで; す → して.");
    }
    const a = item.adj;
    if (item.form.id === "polite") return tr("Для этой формы добавляем です к исходному слову.", "For this form, add です to the original word.");
    if (a.type === "na") return tr("な-прилагательное: основу сохраняем. Окончания: じゃない / で / だった / じゃなかった. きれい и きらい тоже относятся к этому типу.", "Na-adjective: keep the stem. Endings: じゃない / で / だった / じゃなかった. きれい and きらい belong to this type too.");
    return (a.good ? tr("Исключение いい: используем основу よ. ", "Exception いい: use the stem よ. ") : tr("Убираем последнее い. ", "Remove the final い. ")) + tr("Добавляем くない / くて / かった / くなかった.", "Add くない / くて / かった / くなかった.");
  }
  function formOptions() {
    if(topic!=="te")return `<option value="mixed">${tr("Все формы","All forms")}</option>`+forms.map(f=>`<option value="${f.id}" ${selectedForm===f.id?'selected':''}>${escapeHtml(f[settings.lang])}</option>`).join('');
    return [['base','Основы','Basics'],['te','Семейство て','Te family'],['wish','Семейство たい','Tai family'],['next','Следующий шаг','Next steps']].map(([id,ru,en])=>`<optgroup label="${tr(ru,en)}">${library.forms.filter(f=>f.section===id).map(f=>`<option value="${f.id}" ${selectedForm===f.id?'selected':''}>${escapeHtml(f[settings.lang])}</option>`).join('')}</optgroup>`).join('');
  }
  function formationRule(lesson) {
    if (lesson.id !== 'te') return `<p>${escapeHtml(lesson.rule[settings.lang])}</p>`;
    const table=(caption,rows)=>`<table class="te-rule-table"><caption>${caption}</caption><thead><tr><th scope="col">${tr('Конец','Ending')}</th><th scope="col">${tr('Замена','Change to')}</th><th scope="col">${tr('Пример','Example')}</th></tr></thead><tbody>${rows.map(([ending,result,examples])=>`<tr><th scope="row" lang="ja">${ending}</th><td lang="ja"><b>${result}</b></td><td lang="ja">${examples.map(example=>`<span>${example}</span>`).join('')}</td></tr>`).join('')}</tbody></table>`;
    return `<p>${tr('Найди группу глагола. В I группе замени окончание по таблице; остальную часть слова сохрани.','Identify the verb group. For group I, replace the ending as shown and keep the rest of the word.')}</p>`+
      table(tr('I группа — пять вариантов замены','Group I — five replacement patterns'),[
        ['う・つ・る','って',['かう → かって','まつ → まって','かえる → かえって']],
        ['む・ぶ・ぬ','んで',['よむ → よんで','あそぶ → あそんで','しぬ → しんで']],
        ['く','いて',['かく → かいて']],
        ['ぐ','いで',['およぐ → およいで']],
        ['す','して',['はなす → はなして']]
      ])+`<p class="formation-rule"><b>${tr('Исключение','Exception')}:</b> <span lang="ja">いく → いって</span> (${tr('не いいて','not いいて')}).</p>`+
      table(tr('II группа — убери る, добавь て','Group II — replace る with て'),[['る','て',['たべる → たべて','みる → みて']]])+
      table(tr('III группа — запомни отдельно','Group III — learn separately'),[['する','して',['する → して','コピーする → コピーして']],['くる','きて',['くる → きて']]]);
  }
  function groupTwoGuide() {
    const exceptions=[
      ['帰る（かえる）','возвращаться','return','かえります','かえって'],
      ['入る（はいる）','входить','enter','はいります','はいって'],
      ['走る（はしる）','бежать','run','はしります','はしって'],
      ['切る（きる）','резать','cut','きります','きって'],
      ['知る（しる）','знать','know','しります','しって'],
      ['要る（いる）','быть нужным','be needed','いります','いって']
    ];
    return `<div class="group-two-guide">
      <p><b>${tr('～いる / ～える — подсказка, а не гарантия.','-iru / -eru is a clue, not a guarantee.')}</b> ${tr('Если глагол так заканчивается, по одному звучанию нельзя на 100% определить группу. Большинство таких глаголов — II группа, но частые исключения относятся к I.','The ending alone cannot identify the group with certainty. Most such verbs belong to group II, but common exceptions belong to group I.')}</p>
      <h4>${tr('Как определять группу','How to identify the group')}</h4>
      <ol>
        <li>${tr('Сначала выдели III группу: する, くる и составные глаголы на する, например べんきょうする.','First identify group III: する, くる and compounds with する, such as べんきょうする.')}</li>
        <li>${tr('Не заканчивается на る → I группа: かく, のむ, かう, はなす.','Does not end in る → group I: かく, のむ, かう, はなす.')}</li>
        <li>${tr('Заканчивается на -aru / -uru / -oru → для обычных глаголов начального уровня это I группа: わかる, つくる, のる. Смотри на чтение, а не только на кандзи.','Ends in -aru / -uru / -oru → ordinary beginner-level verbs belong to group I: わかる, つくる, のる. Use the reading, not just the kanji.')}</li>
        <li>${tr('Заканчивается на -iru / -eru → обычно II: たべる, みる, おきる, ねる. Проверь, не исключение ли это, и запомни группу вместе со значением.','Ends in -iru / -eru → usually group II: たべる, みる, おきる, ねる. Check for exceptions and learn the group with the meaning.')}</li>
      </ol>
      <details class="demo-guide group-exceptions"><summary>${tr('6 частых исключений: ～いる / ～える, но I группа','6 common exceptions: -iru / -eru, but group I')}</summary>
        ${exceptions.map(([jp,ru,en,masu,te])=>`<div class="formation-row"><div><b lang="ja">${jp}</b><small>${tr(ru,en)} · ${tr('группа I','group I')}</small></div><div><small>ます</small><span lang="ja">${masu}</span></div><div><small>て</small><span lang="ja">${te}</span></div></div>`).join('')}
        <p>${tr('Особенно важно: 要る（いる） «быть нужным» — I: いります. 居る（いる） «быть, находиться» — II: います. 切る（きる） «резать» — I, а 着る（きる） «надевать» — II. Одинаковое чтение не означает одинаковую группу.','Important: 要る（いる） “be needed” is group I: いります. 居る（いる） “exist, be present” is group II: います. 切る（きる） “cut” is group I, while 着る（きる） “put on” is group II. The same reading does not mean the same group.')}</p>
        <p class="demo-note">${tr('Это список частых исключений, не всех существующих. Для нового или неоднозначного слова проверяй группу в словаре.','These are common exceptions, not an exhaustive list. Check a dictionary for new or ambiguous words.')}</p>
      </details>
      <h4>${tr('Учи связкой из трёх форм','Learn three forms together')}</h4>
      <p>${tr('Не только «かえる = возвращаться», а сразу «かえる → かえります → かえって». Так закрепляется и группа, и готовая форма.','Do not learn only “かえる = return”; learn “かえる → かえります → かえって”. This reinforces both the group and the actual forms.')}</p>
      <div class="formation-rule" lang="ja">食べる（たべる）【II】 → たべます → たべて<br>帰る（かえる）【I】 → かえります → かえって<br>見る（みる）【II】 → みます → みて<br>切る（きる）【I】 → きります → きって</div>
      <p>${tr('У II группы убираем る. У I группы на る меняем его: перед ます — на り, в て-форме — на って. Не нужно угадывать группу каждый раз: постепенно запоминай эти связки.','Group II drops る. Group I verbs ending in る change it to り before ます, or to って in the te-form. Gradually learn these combinations instead of guessing the group each time.')}</p>
    </div>`;
  }
  function formationExamples(lesson) {
    const stemForms=['masu','masen','mashita','masen-deshita','tai','takunai','takatta','takunakatta','takute','mashou'];
    const usesStem=stemForms.includes(lesson.id);
    const teForms=lesson.section==='te'||['ta','tara','tari'].includes(lesson.id);
    const intermediate=v=>usesStem?library.parts(v).masu:teForms?v.te:library.parts(v).nai;
    const showStep=usesStem || (teForms && lesson.id!=='te') || ['nakatta','naide-kudasai','nakereba','nakutemo'].includes(lesson.id);
    const stepLabel=usesStem?tr('Основа ます','Masu stem'):teForms?'て':tr('ない-форма','Nai-form');
    const row=v=>`<div class="formation-row"><div><small>${tr('Словарная','Dictionary')}</small><span lang="ja">${escapeHtml(v.jp)}</span><small>${wanakana.toRomaji(v.jp)}</small></div><div><small>${tr('Конец','Ending')}</small><b lang="ja">${v.jp.slice(-1)}</b></div>${showStep?`<div><small>${stepLabel}</small><span lang="ja">${intermediate(v)}</span></div>`:''}<div><small>${tr('Результат','Result')}</small><b lang="ja">${library.conjugate(v,lesson.id)}</b></div></div>`;
    return `<section class="formation-group"><h3>${tr('Группа 1 · все 9 окончаний','Group 1 · all 9 endings')}</h3>
      <p>${tr('よむ — лишь пример на む. В первой группе возможны う・く・ぐ・す・つ・ぬ・ぶ・む・る. Меняется последняя кана, остальная часть слова сохраняется.','よむ is only the む example. Group 1 has nine endings: う・く・ぐ・す・つ・ぬ・ぶ・む・る. Change the final kana and keep the rest of the word.')}</p>
      ${usesStem?`<ol><li>${tr('Найди последнюю кану: かく → く.','Find the final kana: かく → く.')}</li><li>${tr('Замени её на кану того же ряда со звуком «и»: く → き. Получится основа かき.','Change it to the i-vowel kana in the same row: く → き. The stem is かき.')}</li><li>${tr('Добавь нужное окончание к основе. Ниже показаны все варианты для выбранной формы.','Attach the required ending to the stem. All patterns for the selected form are shown below.')}</li></ol><p class="formation-rule" lang="ja">う→い · く→き · ぐ→ぎ · す→し · つ→ち · ぬ→に · ぶ→び · む→み · る→り</p>`:''}
      <div class="formation-rows ${showStep?'with-step':''}">${library.samples.filter(v=>v.group==='1').map(row).join('')}</div>
      <p class="demo-note">${tr('Важно: かえる «возвращаться» — группа 1, хотя заканчивается на -える. きる «резать», はいる «входить», はしる «бежать» — тоже группа 1. Само окончание る ещё не определяет группу.','Important: かえる “return” is group 1 despite ending in -eru. きる “cut”, はいる “enter” and はしる “run” are group 1 too. Ending in る does not determine the group.')}</p>
      ${teForms?`<p class="formation-rule">${tr('Исключение','Exception')}: いく → いって${lesson.id==='te'?'':` → ${library.conjugate({jp:'いく',group:'1',te:'いって'},lesson.id)}`}. ${tr('Не いいて. В た-форме: いった.','Not いいて. The ta-form is いった.')}</p>`:''}
      ${['nai','nakatta','naide-kudasai','nakereba','nakutemo'].includes(lesson.id)?`<p class="formation-rule">${tr('Два важных случая','Two important cases')}: かう → かわない (${tr('не かあない','not かあない')}); ある → ない (${tr('не あらない','not あらない')}).</p>`:''}
    </section><section class="formation-group"><h3>${tr('Группа 2 · убираем る','Group 2 · remove る')}</h3><p>${tr('Здесь не меняем る на り. Убираем る целиком: たべる → たべ, みる → み. Затем добавляем окончание выбранной формы.','Do not change る to り here. Remove it entirely: たべる → たべ, みる → み. Then add the selected form’s ending.')}</p><div class="formation-rows ${showStep?'with-step':''}">${library.samples.filter(v=>v.group==='2').map(row).join('')}</div>${groupTwoGuide()}</section>
    <section class="formation-group"><h3>${tr('Группа 3 · запоминаем отдельно','Group 3 · learn separately')}</h3><p>${tr('する и くる не следуют обычной схеме. Составные глаголы на する меняют только эту часть: コピーする → コピーします.','する and くる do not follow the regular patterns. In compounds, only the する part changes: コピーする → コピーします.')}</p><div class="formation-rows ${showStep?'with-step':''}">${library.samples.filter(v=>v.group==='3').map(row).join('')}</div></section>`;
  }
  function guide() {
    const groups=`<details class="demo-guide"><summary>${tr("Сначала: что такое форма и как узнать группу глагола?","Start here: what is a form and how do verb groups work?")}</summary>
      <p>${tr("Форма меняет способ выражения действия: читаю, не читаю, читал, хочу читать. Конструкция добавляет смысл к готовой форме: よんで + ください — «прочитайте, пожалуйста». Лицо не меняет окончание: я, ты и он могут использовать один и тот же глагол.","A form changes how an action is expressed: read, do not read, read in the past, want to read. A construction adds meaning to a form: よんで + ください means please read. The verb ending does not change with I, you or they.")}</p>
      <p><b>Ⅰ · 五段</b> — ${tr("меняется последний слог: よむ → よみます, よまない. Глагол на る тоже может быть в этой группе: かえる (возвращаться), はいる, はしる, きる (резать).","The final kana changes: よむ → よみます, よまない. Some verbs ending in る belong here: かえる (return), はいる, はしる, きる (cut).")}</p>
      <p><b>Ⅱ · 一段</b> — ${tr("убираем る: たべる → たべ, みる → み. Обычно окончание -いる/-える, но по одному окончанию группу надёжно не определить — проверяй в словаре.","Remove る: たべる → たべ, みる → み. Usually -iru/-eru, but the ending alone is not a reliable test: check a dictionary.")}</p>
      <p><b>Ⅲ · 不規則</b> — する / くる: します / きます; しない / こない; して / きて.</p>
      <p><b>${tr("Основа ます","Masu stem")}</b>: Ⅰ — ${tr("ряд い","i-row")}: う→い, く→き, ぐ→ぎ, す→し, つ→ち, ぬ→に, ぶ→び, む→み, る→り. Ⅱ: る→∅. Ⅲ: する→し, くる→き.</p>
      <p>${tr("Если уже знаешь ます-форму, просто убери ます: よみます → よみ. От этой основы строятся たい и ましょう.","If you know the masu-form, remove ます: よみます → よみ. This stem builds たい and ましょう.")}</p>
    </details>`;
    if(topic!=='te')return groups+`<details class="demo-guide" ${started?'':'open'}><summary>${tr("Как изменяются прилагательные","How adjectives change")}</summary><p>${topic==='i'?tr("У い-прилагательного убираем последнее い: おいしい → おいしくない, おいしくて, おいしかった, おいしくなかった. В утверждении с です оставляем い: おいしいです. Исключение いい: よくない, よくて, よかった. たい изменяется так же.","Remove the final い: おいしい → おいしくない, おいしくて, おいしかった, おいしくなかった. Keep い before です: おいしいです. Exception いい: よくない, よくて, よかった. たい follows the same pattern."):tr("У な-прилагательного основа не меняется: しずかです, しずかじゃない, しずかで, しずかだった, しずかじゃなかった. きれい и きらい — тоже な-прилагательные. な ставим перед существительным: しずかな へや. おなじ — особое слово: おなじ へや, без な.","Keep the na-adjective stem: しずかです, しずかじゃない, しずかで, しずかだった, しずかじゃなかった. きれい and きらい are na-adjectives too. Use な before a noun: しずかな へや. おなじ is special: おなじ へや, without な.")}</p><p>${tr("В отрицательных и прошедших заданиях вводи простую форму без です. Для な принимаются и ではない / ではなかった.","Enter plain negative and past answers without です. Na-adjectives also accept ではない / ではなかった.")}</p></details>`;
    const lesson=library.forms.find(f=>f.id===selectedForm);
    return groups+`<details class="demo-guide form-lesson" ${started?'':'open'}><summary>${escapeHtml(lesson[settings.lang])} · ${tr("объяснение и примеры","explanation and examples")}</summary>
      ${lesson.section==='next'?`<p class="demo-note">${tr("Следующий шаг после основ. Здесь разбираем образование формы; её употребление требует контекста.","A step beyond the basics. This teaches formation; usage needs context.")}</p>`:''}
      <h2>${tr("Что означает","What it means")}</h2><p>${escapeHtml(lesson.purpose[settings.lang])}</p>
      <h2>${tr("Как образовать","How to form it")}</h2>${formationRule(lesson)}
      ${formationExamples(lesson)}
      <h2>${tr("В предложении","In a sentence")}</h2><p lang="ja">${lesson.example.jp}</p><p class="sub">${wanakana.toRomaji(lesson.example.jp.replace(/は(?=\s)/g,'わ').replace(/へ(?=\s)/g,'え').replace(/を/g,'お'))}</p><p>${escapeHtml(lesson.example[settings.lang])}</p>
      <p class="demo-note">${tr("В тренировке вводи форму из схемы, без добавлений: например, たい, а не たいです. Для потенциальной, условной, страдательной и побудительной форм — простую форму.","In practice, enter exactly the form in the pattern: for example たい, not たいです. Potential, conditional, passive and causative exercises ask for the plain form.")}</p>
      ${started?'':`<button class="primary" id="guidePractice" type="button">${tr("Потренировать эту форму","Practice this form")}</button>`}
    </details>`;
  }
  function pool() {
    if (topic === "te") {
      const lesson = library.forms.find(f => f.id === selectedForm) || library.forms.find(f => f.id === 'te');
      return verbs.filter(v => !['ふる','しぬ'].includes(v.jp) || ['dictionary','masu','masen','mashita','masen-deshita','nai','nakatta','te','ta','tara','tari'].includes(lesson.id)).map(v => {
        const answer=library.conjugate(v,lesson.id);
        return {id:`${v.id}-${lesson.id}`,verb:v,lesson,base:v.jp,ru:v.ru,en:v.en,answer,romaji:wanakana.toRomaji(answer)};
      });
    }
    return adjectives.filter(a => a.type === topic).flatMap(a => forms.filter(f => selectedForm === "mixed" || f.id === selectedForm).map(f => {
      const i = forms.indexOf(f);
      return { id: `${a.id}-${f.id}`, adj: a, form: f, base: a.jp, ru: a.ru, en: a.en, answer: a.answers[i], romaji: a.latinAnswers[i] };
    }));
  }
  function start(items = pool()) {
    deck = shuffle(items).slice(0, 10);
    index = 0; correct = 0; mistakes = []; checked = false; lastResult = null; started = true;
    render();
    document.querySelector('.demo-exercise')?.scrollIntoView({block:'start'});
  }
  function render(preserveDraft = false) {
    const oldInput = document.getElementById("demoAnswer");
    const draft = preserveDraft && oldInput && !checked ? oldInput.value : "";
    if (oldInput?.dataset.wanakanaId) wanakana.unbind(oldInput);
    const item = deck[index];
    const finished = started && index >= deck.length;
    root.innerHTML = `
      <div class="demo-intro">
        <span class="demo-badge">${tr("ДЕМО", "DEMO")}</span>
        <h1>${tr("Мастерская форм", "Form workshop")}</h1>
        <p class="sub">${tr("Выбери форму, разберись в правиле и попробуй сам. До 10 заданий за подход.", "Choose a form, learn the rule and try it yourself. Up to 10 questions per round.")}</p>
        <p class="sub demo-note">${tr("Результаты демо не сохраняются и не влияют на основные наборы.", "Demo results are not saved and do not affect the regular sets.")}</p>
      </div>
      <section class="demo-controls" aria-label="${tr("Настройки тренировки", "Practice settings")}">
        <label>${tr("Тема", "Topic")}<select id="demoTopic">
          <option value="te" ${topic === "te" ? "selected" : ""}>${tr("Глаголы", "Verbs")}</option>
          <option value="i" ${topic === "i" ? "selected" : ""}>${tr("い-прилагательные", "I-adjectives")}</option>
          <option value="na" ${topic === "na" ? "selected" : ""}>${tr("な-прилагательные", "Na-adjectives")}</option>
        </select></label>
        <label>${tr("Форма", "Form")}<select id="demoForm">${formOptions()}</select></label>
        <button id="demoStart" type="button" class="primary">${tr(started ? "Новая тренировка" : "Начать", started ? "New round" : "Start")}</button>
      </section>
      ${guide()}
      ${item ? `<section class="demo-exercise">
        <div class="demo-progress"><span>${index + 1} / ${deck.length}</span><span>${tr("Верно", "Correct")}: ${correct}</span></div>
        <p class="demo-prompt">${item.verb ? escapeHtml(item.lesson[settings.lang]) : escapeHtml(item.form[settings.lang])}</p>
        <p class="demo-word" lang="ja">${escapeHtml(item.base)}</p>
        <p class="sub">${escapeHtml(item[settings.lang])}${item.verb ? ` · ${tr("Группа", "Group")} ${item.verb.group}` : ""}</p>
        <form id="demoAnswerForm" autocomplete="off">
          <label for="demoAnswer">${tr("Ответ на японском", "Answer in Japanese")}</label>
          <input id="demoAnswer" lang="ja" type="text" spellcheck="false" autocapitalize="off" autocorrect="off" aria-describedby="demoInputHint" placeholder="${tr("Печатай ромадзи: shite → して", "Type romaji: shite → して")}" ${checked ? "disabled" : ""}>
          <p class="sub demo-note" id="demoInputHint">${tr("Ромадзи автоматически превращаются в кану. Например: matte → まって, kyonen → きょねん. Для отдельного ん перед гласной: n'. Можно вводить и готовую кану.", "Romaji turns into kana as you type: matte → まって, kyonen → きょねん. Use n' for ん before a vowel. You can also enter kana directly.")}</p>
          <div class="demo-actions"><button class="primary" id="demoCheck" type="submit" ${checked ? "disabled" : ""}>${tr("Проверить", "Check")}</button>
          <button class="secondary" id="demoReveal" type="button" ${checked ? "disabled" : ""}>${tr("Показать ответ", "Show answer")}</button></div>
        </form>
        <div id="demoFeedback" class="demo-feedback" role="status" aria-live="polite"></div>
        <button class="primary" id="demoNext" type="button" ${checked ? "" : "hidden"}>${tr(index + 1 === deck.length ? "Результат" : "Дальше", index + 1 === deck.length ? "Results" : "Next")}</button>
      </section>` : finished ? `<section class="demo-exercise"><h2>${tr("Тренировка завершена", "Round complete")}</h2><p class="demo-word">${correct} / ${deck.length}</p><p>${tr("Ответов верно с первой попытки.", "Answers correct on the first try.")}</p>${mistakes.length ? `<button class="primary" id="demoRetry" type="button">${tr("Повторить ошибки", "Retry mistakes")} (${mistakes.length})</button>` : `<p>${tr("Все формы верны!", "All forms correct!")}</p>`}</section>` : ""}
      `;
    const answerInput = document.getElementById("demoAnswer");
    if (answerInput && !checked) {
      answerInput.value = draft;
      bindRomajiInput(answerInput);
    }
    document.getElementById("demoTopic").addEventListener("change", e => { topic = e.target.value; selectedForm = topic === "te" ? "te" : "mixed"; started = false; deck = []; checked = false; render(); });
    document.getElementById("demoForm").addEventListener("change", e => { selectedForm = e.target.value; started = false; deck = []; checked = false; render(); });
    document.getElementById("demoStart").addEventListener("click", () => start());
    document.getElementById("guidePractice")?.addEventListener("click", () => start());
    document.getElementById("demoRetry")?.addEventListener("click", () => start([...mistakes]));
    document.getElementById("demoAnswerForm")?.addEventListener("submit", e => { e.preventDefault(); check(false); });
    document.getElementById("demoAnswer")?.addEventListener("keydown", e => {
      if (e.key === "Enter" && e.isComposing) e.preventDefault();
    });
    document.getElementById("demoReveal")?.addEventListener("click", () => check(true));
    document.getElementById("demoNext")?.addEventListener("click", () => { index++; checked = false; lastResult = null; render(); });
    if (checked && lastResult && item) showFeedback(item, lastResult);
  }
  function feedbackExplanation(item) {
    if (item.lesson?.id !== 'te') return `<p>${escapeHtml(explanation(item))}</p>`;
    const v=item.verb, ending=v.jp.slice(-1);
    let from=ending, to='', note='';
    if(v.jp==='いく') {
      from='いく'; to='いって';
      note=tr('Исключение: у いく запоминаем いって, а не いいて.','Exception: learn いく → いって, not いいて.');
    } else if(v.group==='3') {
      from=v.jp.endsWith('する')?'する':'くる'; to=from==='する'?'して':'きて';
      note=tr('Группа III — неправильный глагол. Запомни эту пару. В составном глаголе на する меняется только часть する.','Group III — irregular verb. Learn this pair. In a compound with する, only the する part changes.');
    } else if(v.group==='2') {
      to='て';note=tr('Группа II: убираем последнее る и добавляем て.','Group II: remove the final る and add て.');
    } else {
      to={'う':'って','つ':'って','る':'って','む':'んで','ぶ':'んで','ぬ':'んで','く':'いて','ぐ':'いで','す':'して'}[ending];
      note=tr(`Группа I: заменяем окончание ${ending} на ${to}. Остальную часть слова сохраняем.`,`Group I: replace the ending ${ending} with ${to}. Keep the rest of the word.`);
    }
    return `<p>${escapeHtml(note)}</p><table class="te-rule-table"><caption>${tr('Преобразование этого глагола','This verb’s transformation')}</caption><thead><tr><th scope="col">${tr('Было','Before')}</th><th scope="col">${tr('Стало','After')}</th><th scope="col">${tr('Результат','Result')}</th></tr></thead><tbody><tr><td lang="ja">${from}</td><td lang="ja">${to}</td><td lang="ja">${escapeHtml(item.base)} → <b>${escapeHtml(item.answer)}</b></td></tr></tbody></table><details class="feedback-rule-reference"><summary>${tr('Все правила て-формы — таблицы','All te-form rules — tables')}</summary>${formationRule(item.lesson)}</details>`;
  }
  function showFeedback(item, { good, reveal, answer }) {
    const feedback = document.getElementById("demoFeedback");
    feedback.dataset.result = good ? "good" : "review";
    feedback.innerHTML = `<strong>${good ? tr("Верно!", "Correct!") : reveal ? tr("Разберём форму", "Let's review") : tr("Нужно повторить", "Needs review")}</strong>${!good && !reveal ? `<p>${tr("Твой ответ", "Your answer")}: ${escapeHtml(answer)}</p>` : ""}<p class="demo-answer" lang="ja">${escapeHtml(item.answer)}</p><p>${escapeHtml(item.romaji)}</p>${feedbackExplanation(item)}`;
  }
  function check(reveal) {
    if (checked || !deck[index]) return;
    const input = document.getElementById("demoAnswer");
    const feedback = document.getElementById("demoFeedback");
    // Commit a trailing n (ん) when checking, while keeping incomplete syllables during typing.
    input.value = wanakana.toHiragana(input.value);
    if (!reveal && !input.value.trim()) { feedback.textContent = tr("Сначала введи ответ.", "Type an answer first."); input.focus(); return; }
    const item = deck[index];
    // Romaji long vowels (kyuuto) may produce きゅうと rather than キュート.
    const answers = [item.answer, wanakana.toHiragana(item.romaji)];
    if (item.adj?.type === "na") answers.push(...answers.map(answer => answer.replace("じゃ", "では")));
    const good = !reveal && answers.some(answer => normalize(answer) === normalize(input.value));
    checked = true;
    if (good) correct++; else mistakes.push(item);
    root.querySelector(".demo-progress span:last-child").textContent = `${tr("Верно", "Correct")}: ${correct}`;
    input.disabled = true;
    document.getElementById("demoCheck").disabled = true;
    document.getElementById("demoReveal").disabled = true;
    document.getElementById("demoNext").hidden = false;
    lastResult = { good, reveal, answer: input.value };
    showFeedback(item, lastResult);
    document.getElementById("demoNext").focus();
  }
  document.getElementById("langSelect")?.addEventListener("change", () => render(true));
  render();
})();
