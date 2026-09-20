// Experimental exercises. Study progress in the regular modes is never read or written.
(function () {
  const { verbs, adjectives, forms } = window.IDJLT_GRAMMAR_MATERIALS;
  const root = document.getElementById("grammarDemo");
  let deck = [], index = 0, correct = 0, checked = false, mistakes = [], lastResult = null;
  let topic = "te", selectedForm = "mixed", started = false;
  const tr = (ru, en) => settings.lang === "en" ? en : ru;
  const normalize = value => value.normalize("NFKC").replace(/[\s。.!！?？~〜]/g, "").replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
  function explanation(item) {
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
  function pool() {
    if (topic === "te") return verbs.map(v => ({ id: v.id, verb: v, base: v.jp, ru: v.ru, en: v.en, answer: v.te, romaji: v.teRomaji }));
    return adjectives.filter(a => a.type === topic).flatMap(a => forms.filter(f => selectedForm === "mixed" || f.id === selectedForm).map(f => {
      const i = forms.indexOf(f);
      return { id: `${a.id}-${f.id}`, adj: a, form: f, base: a.jp, ru: a.ru, en: a.en, answer: a.answers[i], romaji: a.latinAnswers[i] };
    }));
  }
  function start(items = pool()) {
    deck = shuffle(items).slice(0, 10);
    index = 0; correct = 0; mistakes = []; checked = false; lastResult = null; started = true;
    render();
  }
  function render(preserveDraft = false) {
    const oldInput = document.getElementById("demoAnswer");
    const draft = preserveDraft && oldInput && !checked ? oldInput.value : "";
    if (oldInput?.dataset.wanakanaId) IDJLTInput.unbind(oldInput);
    const item = deck[index];
    const finished = started && index >= deck.length;
    root.innerHTML = `
      <div class="demo-intro">
        <span class="demo-badge">${tr("ДЕМО", "DEMO")}</span>
        <h1>${tr("Мастерская форм", "Form workshop")}</h1>
        <p class="sub">${tr("Вспомни форму, введи ответ и посмотри объяснение. До 10 заданий за подход.", "Recall the form, type your answer and read the explanation. Up to 10 questions per round.")}</p>
        <p class="sub demo-note">${tr("Результаты демо не сохраняются и не влияют на основные наборы.", "Demo results are not saved and do not affect the regular sets.")}</p>
      </div>
      <section class="demo-controls" aria-label="${tr("Настройки тренировки", "Practice settings")}">
        <label>${tr("Тема", "Topic")}<select id="demoTopic">
          <option value="te" ${topic === "te" ? "selected" : ""}>${tr("Глаголы: て-форма", "Verbs: te-form")}</option>
          <option value="i" ${topic === "i" ? "selected" : ""}>${tr("い-прилагательные", "I-adjectives")}</option>
          <option value="na" ${topic === "na" ? "selected" : ""}>${tr("な-прилагательные", "Na-adjectives")}</option>
        </select></label>
        <label ${topic === "te" ? "hidden" : ""}>${tr("Форма", "Form")}<select id="demoForm"><option value="mixed">${tr("Все формы", "All forms")}</option>${forms.map(f => `<option value="${f.id}" ${selectedForm === f.id ? "selected" : ""}>${escapeHtml(f[settings.lang])}</option>`).join("")}</select></label>
        <button id="demoStart" type="button" class="primary">${tr(started ? "Новая тренировка" : "Начать", started ? "New round" : "Start")}</button>
      </section>
      <details class="demo-guide"><summary>${tr("Короткая памятка", "Quick reference")}</summary>
        <p>${tr("Глаголы: сначала определи группу. Не каждый глагол на -いる/-える относится ко второй: например, かえる (возвращаться) → かえって.", "Verbs: identify the group first. Not every -iru/-eru verb is in group 2: for example, かえる (return) → かえって.")}</p>
        <p>Ⅰ: う・つ・る → って / む・ぶ・ぬ → んで / く → いて / ぐ → いで / す → して<br>Ⅱ: る → て<br>Ⅲ: する → して / くる → きて<br>いく → いって</p>
        <p>い: おいしい → おいしくない / おいしくて / おいしかった / おいしくなかった<br>いい → よくない / よくて / よかった / よくなかった<br>な: しずか → しずかじゃない / しずかで / しずかだった / しずかじゃなかった</p>
        <p>${tr("В отрицательных и прошедших заданиях нужна простая форма, без です. Для な-прилагательных принимается также полное ではない / ではなかった. ～たい — суффикс желания, изменяется по модели い; おなじ перед существительным обычно не требует な.", "Negative and past questions ask for plain forms, without です. For na-adjectives, full ではない / ではなかった forms are also accepted. ～たい is a desire suffix that follows the i-pattern; おなじ usually takes no な before a noun.")}</p>
      </details>
      ${item ? `<section class="demo-exercise">
        <div class="demo-progress"><span>${index + 1} / ${deck.length}</span><span>${tr("Верно", "Correct")}: ${correct}</span></div>
        <p class="demo-prompt">${item.verb ? tr("Образуй て-форму", "Make the te-form") : escapeHtml(item.form[settings.lang])}</p>
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
      <p class="demo-links"><a href="phrases.html?set=lesson14-te">${tr("Обычные карточки: て-форма", "Regular cards: te-form")}</a></p>`;
    const answerInput = document.getElementById("demoAnswer");
    if (answerInput && !checked) {
      answerInput.value = draft;
      IDJLTInput.bind(answerInput);
    }
    document.getElementById("demoTopic").addEventListener("change", e => { topic = e.target.value; started = false; deck = []; checked = false; render(); });
    document.getElementById("demoForm").addEventListener("change", e => { selectedForm = e.target.value; started = false; deck = []; checked = false; render(); });
    document.getElementById("demoStart").addEventListener("click", () => start());
    document.getElementById("demoRetry")?.addEventListener("click", () => start([...mistakes]));
    document.getElementById("demoAnswerForm")?.addEventListener("submit", e => { e.preventDefault(); check(false); });
    document.getElementById("demoAnswer")?.addEventListener("keydown", e => {
      if (e.key === "Enter" && e.isComposing) e.preventDefault();
    });
    document.getElementById("demoReveal")?.addEventListener("click", () => check(true));
    document.getElementById("demoNext")?.addEventListener("click", () => { index++; checked = false; lastResult = null; render(); });
    if (checked && lastResult && item) showFeedback(item, lastResult);
  }
  function showFeedback(item, { good, reveal }) {
    const feedback = document.getElementById("demoFeedback");
    feedback.dataset.result = good ? "good" : "review";
    feedback.innerHTML = `<strong>${good ? tr("Верно!", "Correct!") : reveal ? tr("Разберём форму", "Let's review") : tr("Нужно повторить", "Needs review")}</strong><p class="demo-answer" lang="ja">${escapeHtml(item.answer)}</p><p>${escapeHtml(item.romaji)}</p><p>${escapeHtml(explanation(item))}</p>`;
  }
  function check(reveal) {
    if (checked || !deck[index]) return;
    const input = document.getElementById("demoAnswer");
    const feedback = document.getElementById("demoFeedback");
    // Commit a trailing n (ん) when checking, while keeping incomplete syllables during typing.
    IDJLTInput.commit(input);
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
    lastResult = { good, reveal };
    showFeedback(item, lastResult);
    document.getElementById("demoNext").focus();
  }
  document.getElementById("langSelect")?.addEventListener("change", () => render(true));
  render();
})();
