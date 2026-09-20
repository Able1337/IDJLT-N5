(function () {
  const DATA = window.IDJLT_INTERVIEW;
  const KANJI_DATA = window.IDJLT_KANJI || { singles: [], words: [] };
  const SETTINGS_KEY = "idjlt.settings.v3";
  const SRS_KEY = "idjlt.interview.srs.v1";
  const SESSION_KEY = "idjlt.interview.session.v1";
  const root = document.getElementById("interviewApp");
  if (!DATA || !root) return;

  const l10n = {
    ru: {
      title: "Interview Preparation", sub: "Подготовка к интервью в японскую языковую школу.",
      open: "Открыть", cards: "вопросов", level: "уровень", profile: "Профиль",
      profileText: "Россия, IT-инженер, несколько лет опыта, поступление в языковую школу, цель — работа IT-инженером в Японии.",
      lesson: "Урок", cardsMode: "Карточки", interview: "Интервью", rapid: "Rapid Fire", listening: "Listening Only", shadowing: "Shadowing", speaking: "Speaking Test", srs: "SRS Review",
      all: "Все вопросы", random: "Случайное интервью", mock: "Mock Interview", daily: "Daily Interview",
      explain: "Объяснение", words: "Слова", grammar: "Грамматика", questions: "Вопросы", practice: "Тренировка", review: "Повторение",
      show: "Показать ответ", next: "Следующий вопрос", hard: "Сложно", good: "Уверенно", again: "Ещё раз",
      jp: "Японский", reading: "Чтение", translation: "Естественный перевод", literal: "Дословный перевод", grammarBreakdown: "Разбор грамматики",
      importantWords: "Важные слова", exampleAnswer: "Пример ответа", simpleAnswer: "Простой ответ N5", naturalAnswer: "Более естественный ответ N4", mistakes: "Типичные ошибки",
      audio: "Аудио", male: "Мужской", female: "Женский", speed: "Скорость", volume: "Громкость", play: "Пуск", stop: "Стоп", record: "Запись", stopRecord: "Остановить", original: "Оригинал",
      noText: "Слушай вопрос без текста.", stats: "Статистика", correct: "уверенно", difficult: "сложно", recommendations: "Рекомендации", due: "К повторению",
      emptySrs: "Пока нет сложных вопросов. Отмечай вопросы как «Сложно», и они появятся здесь чаще.",
      resources: "База", phraseCount: "интервью-фраз", dialogueCount: "диалогов", monologueCount: "мини-монологов", wordCount: "слов"
    },
    en: {
      title: "Interview Preparation", sub: "Japanese language school interview preparation.",
      open: "Open", cards: "questions", level: "level", profile: "Profile",
      profileText: "Russia, IT engineer, several years of experience, language school applicant, goal: IT work in Japan.",
      lesson: "Lesson", cardsMode: "Cards", interview: "Interview", rapid: "Rapid Fire", listening: "Listening Only", shadowing: "Shadowing", speaking: "Speaking Test", srs: "SRS Review",
      all: "All questions", random: "Random interview", mock: "Mock Interview", daily: "Daily Interview",
      explain: "Explanation", words: "Words", grammar: "Grammar", questions: "Questions", practice: "Practice", review: "Review",
      show: "Reveal answer", next: "Next question", hard: "Hard", good: "Confident", again: "Again",
      jp: "Japanese", reading: "Reading", translation: "Natural translation", literal: "Literal translation", grammarBreakdown: "Grammar breakdown",
      importantWords: "Important words", exampleAnswer: "Example answer", simpleAnswer: "N5 simple answer", naturalAnswer: "N4 natural answer", mistakes: "Common mistakes",
      audio: "Audio", male: "Male", female: "Female", speed: "Speed", volume: "Volume", play: "Play", stop: "Stop", record: "Record", stopRecord: "Stop", original: "Original",
      noText: "Listen without text.", stats: "Stats", correct: "confident", difficult: "hard", recommendations: "Recommendations", due: "Due",
      emptySrs: "No hard questions yet. Mark questions as Hard and they will return here more often.",
      resources: "Base", phraseCount: "interview phrases", dialogueCount: "dialogues", monologueCount: "mini monologues", wordCount: "words"
    }
  };

  let settings = loadSettings();
  settings.audioVolume ??= 1;
  let view = { moduleId: new URLSearchParams(location.search).get("module") || "", mode: "", deck: [], index: 0, revealed: false, results: [], recording: false, timer: 10 };
  let voices = [];
  let recorder = null;
  let chunks = [];
  let countdown = null;

  function loadSettings() {
    try { return { lang: "ru", theme: "dark", ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") }; }
    catch { return { lang: "ru", theme: "dark" }; }
  }
  function saveSettings() { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }
  function tr(key) { return l10n[settings.lang]?.[key] || l10n.ru[key] || key; }
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  }
  const rubyTerms = [
    ["日本語学校", "にほんごがっこう"], ["ITエンジニア", "あいてぃーえんじにあ"], ["日本語", "にほんご"], ["将来", "しょうらい"], ["勉強", "べんきょう"],
    ["働いています", "はたらいています"], ["働きたい", "はたらきたい"], ["仕事", "しごと"], ["生活", "せいかつ"], ["卒業", "そつぎょう"],
    ["家族", "かぞく"], ["留学", "りゅうがく"], ["目標", "もくひょう"], ["学校", "がっこう"], ["経験", "けいけん"],
    ["開発", "かいはつ"], ["問題", "もんだい"], ["調査", "ちょうさ"], ["担当", "たんとう"], ["興味", "きょうみ"],
    ["技術", "ぎじゅつ"], ["企業", "きぎょう"], ["費用", "ひよう"], ["貯金", "ちょきん"], ["大学", "だいがく"],
    ["進学", "しんがく"], ["長く", "ながく"], ["安定", "あんてい"], ["毎日", "まいにち"], ["一時間", "いちじかん"],
    ["二時間", "にじかん"], ["一年", "いちねん"], ["漢字", "かんじ"], ["聞き取り", "ききとり"], ["練習", "れんしゅう"],
    ["教材", "きょうざい"], ["教科書", "きょうかしょ"], ["単語", "たんご"], ["安全", "あんぜん"], ["文化", "ぶんか"],
    ["計画", "けいかく"], ["準備", "じゅんび"], ["管理", "かんり"], ["予算", "よさん"], ["理由", "りゆう"],
    ["自然", "しぜん"], ["面接", "めんせつ"], ["短くても", "みじかくても"], ["添える", "そえる"], ["思っています", "おもっています"],
    ["思った", "おもった"], ["来ました", "きました"], ["入学", "にゅうがく"], ["日本", "にほん"], ["今", "いま"], ["私", "わたし"]
  ].sort((a, b) => b[0].length - a[0].length);
  const rubyChars = {
    一:"いち", 七:"なな", 両:"りょう", 中:"ちゅう", 主:"しゅ", 予:"よ", 事:"じ", 交:"こう", 京:"きょう", 人:"ひと", 任:"にん", 休:"やす", 会:"かい", 住:"す", 使:"つか", 係:"かかり", 働:"はたら", 先:"さき", 内:"ない", 出:"で", 分:"ぶん", 切:"せつ", 初:"はじ", 前:"まえ", 力:"ちから", 務:"む", 十:"じゅう", 名:"な", 味:"み", 在:"ざい", 基:"き", 大:"だい", 始:"はじ", 子:"こ", 学:"がく", 守:"まも", 定:"てい", 実:"じつ", 容:"よう", 少:"すこ", 就:"しゅう", 平:"へい", 年:"ねん", 弱:"よわ", 後:"あと", 得:"とく", 復:"ふく", 必:"ひつ", 応:"おう", 意:"い", 成:"せい", 払:"はら", 指:"し", 掃:"そう", 授:"じゅ", 探:"さが", 援:"えん", 散:"さん", 数:"すう", 料:"りょう", 日:"にち", 映:"えい", 時:"じ", 最:"さい", 月:"げつ", 朝:"あさ", 期:"き", 東:"とう", 業:"ぎょう", 歩:"ぽ", 毎:"まい", 気:"き", 決:"き", 滞:"たい", 点:"てん", 無:"む", 理:"り", 生:"せい", 画:"が", 番:"ばん", 的:"てき", 眠:"みん", 睡:"すい", 確:"かく", 礎:"そ", 示:"じ", 社:"しゃ", 積:"つ", 立:"た", 第:"だい", 絡:"らく", 習:"しゅう", 考:"かんが", 職:"しょく", 自:"じ", 行:"い", 要:"よう", 見:"み", 親:"しん", 記:"き", 話:"はなし", 認:"にん", 読:"よ", 責:"せき", 費:"ひ", 賛:"さん", 起:"お", 趣:"しゅ", 身:"み", 転:"てん", 近:"ちか", 通:"つう", 連:"れん", 週:"しゅう", 進:"しん", 長:"なが", 間:"かん", 関:"かん", 除:"じょ", 集:"しゅう", 難:"むずか", 食:"しょく"
  };
  const interviewKanjiMeta = {
    平: { meaning: "ровный; спокойный", meaningEn: "flat; calm", on: ["ヘイ", "ビョウ"], kun: ["たいら"] },
    弱: { meaning: "слабый", meaningEn: "weak", on: ["ジャク"], kun: ["よわい", "よわる"] },
    点: { meaning: "точка; пункт", meaningEn: "point", on: ["テン"], kun: [] },
    何: { meaning: "что; сколько", meaningEn: "what; how many", on: ["カ"], kun: ["なに", "なん"] },
    時: { meaning: "время; час", meaningEn: "time; hour", on: ["ジ"], kun: ["とき"] },
    間: { meaning: "промежуток; время", meaningEn: "interval; time", on: ["カン", "ケン"], kun: ["あいだ"] },
    勉: { meaning: "усердие; учёба", meaningEn: "effort; study", on: ["ベン"], kun: [] },
    強: { meaning: "сильный; учиться", meaningEn: "strong; study", on: ["キョウ", "ゴウ"], kun: ["つよい"] },
    語: { meaning: "язык; слово", meaningEn: "language; word", on: ["ゴ"], kun: ["かたる"] },
    校: { meaning: "школа", meaningEn: "school", on: ["コウ"], kun: [] },
    面: { meaning: "лицо; поверхность", meaningEn: "face; surface", on: ["メン"], kun: ["おも"] },
    接: { meaning: "касаться; принимать", meaningEn: "contact; receive", on: ["セツ"], kun: ["つぐ"] }
  };
  function buildInterviewKanjiIndex() {
    const index = {};
    const pushExample = (term, reading, ru, en) => {
      if (!term || !/[一-龯]/.test(term)) return;
      [...term].filter(ch => /[一-龯]/.test(ch)).forEach(ch => {
        const meta = interviewKanjiMeta[ch] || {};
        const item = index[ch] || {
          kanji: ch,
          meaning: meta.meaning || "кандзи из интервью",
          meaningEn: meta.meaningEn || "interview kanji",
          on: meta.on || [],
          kun: meta.kun || [],
          examples: []
        };
        if (!item.examples.some(example => example.term === term)) {
          item.examples.push({ term, reading, ru, en });
        }
        index[ch] = item;
      });
    };
    DATA.questions.forEach(q => {
      q.words?.forEach(w => pushExample(w.word, w.reading, w.meaning?.ru, w.meaning?.en));
      [q.jp, q.answer, q.simpleAnswer, q.naturalAnswer].forEach(text => pushExample(text, "", q.translation?.ru, q.translation?.en));
    });
    return index;
  }
  const interviewKanjiIndex = buildInterviewKanjiIndex();
  function rubyHtml(text) {
    let html = "";
    for (let i = 0; i < String(text || "").length;) {
      const rest = text.slice(i);
      const term = rubyTerms.find(([word]) => rest.startsWith(word));
      if (term) {
        const chars = [...term[0]].filter(ch => /[一-龯]/.test(ch)).join("");
        const ruby = `<ruby>${escapeHtml(term[0])}<rt>${escapeHtml(term[1])}</rt></ruby>`;
        html += chars ? `<button class="ruby-kanji-btn" type="button" data-kanji-info="${escapeHtml(chars)}">${ruby}</button>` : ruby;
        i += term[0].length;
        continue;
      }
      const ch = text[i];
      if (rubyChars[ch]) html += `<button class="ruby-kanji-btn" type="button" data-kanji-info="${escapeHtml(ch)}"><ruby>${escapeHtml(ch)}<rt>${escapeHtml(rubyChars[ch])}</rt></ruby></button>`;
      else html += escapeHtml(ch);
      i++;
    }
    return html;
  }
  function kanjiItem(character) {
    return KANJI_DATA.singles.find(item => item.kanji === character) || interviewKanjiIndex[character];
  }
  function kanjiMeaning(item) {
    if (!item) return settings.lang === "en" ? "Not found in kanji base" : "Нет в базе кандзи";
    return settings.lang === "en" ? item.meaningEn || item.meaning : item.meaning;
  }
  function kanjiExamples(item) {
    if (!item?.examples?.length) return "";
    return item.examples.slice(0, 6).map(example => {
      const text = settings.lang === "en" ? example.en || example.ru : example.ru;
      return `<li><b>${escapeHtml(example.term)}</b><span>${escapeHtml(example.reading || "")}</span><small>${escapeHtml(text || "")}</small></li>`;
    }).join("");
  }
  function kanjiInfoCard(character) {
    const item = kanjiItem(character);
    return `
      <article class="kanji-info-card">
        <b class="kanji-info-char">${escapeHtml(character)}</b>
        <div class="kanji-info-main">
          <strong>${escapeHtml(kanjiMeaning(item))}</strong>
          <p><span>он:</span> ${escapeHtml(item?.on?.join(" / ") || "—")}</p>
          <p><span>кун:</span> ${escapeHtml(item?.kun?.join(" / ") || "—")}</p>
        </div>
        ${item?.examples?.length ? `<ul class="kanji-info-examples">${kanjiExamples(item)}</ul>` : ""}
      </article>
    `;
  }
  function showKanjiInfo(chars) {
    const uniqueChars = [...new Set([...String(chars || "")].filter(ch => /[一-龯]/.test(ch)))];
    if (!uniqueChars.length) return;
    let dialog = document.getElementById("interviewKanjiDialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "interviewKanjiDialog";
      dialog.className = "settings-dialog kanji-info-dialog";
      document.body.appendChild(dialog);
      dialog.addEventListener("click", event => {
        if (event.target === dialog) dialog.close();
      });
    }
    dialog.innerHTML = `
      <div class="dialog-head">
        <h2>Кандзи</h2>
        <button class="info-close" type="button" data-close-kanji-info>×</button>
      </div>
      <div class="kanji-info-list">${uniqueChars.map(kanjiInfoCard).join("")}</div>
    `;
    dialog.showModal();
  }
  function shuffle(items) {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function moduleById(id) { return DATA.modules.find(item => item.id === id); }
  function questionsFor(moduleId) {
    if (!moduleId || moduleId === "random" || moduleId === "mock" || moduleId === "srs") return DATA.questions;
    return DATA.questions.filter(q => q.moduleId === moduleId);
  }
  function readSrs() {
    try { return JSON.parse(localStorage.getItem(SRS_KEY) || "{}"); } catch { return {}; }
  }
  function writeSrs(srs) { localStorage.setItem(SRS_KEY, JSON.stringify(srs)); }
  function updateSrs(id, good) {
    const srs = readSrs();
    const item = srs[id] || { ease: 1, interval: 0, due: Date.now(), hard: 0, good: 0 };
    if (good) {
      item.good++;
      item.ease = Math.min(4, item.ease + 0.25);
      item.interval = Math.max(1, Math.round((item.interval || 1) * item.ease));
    } else {
      item.hard++;
      item.ease = Math.max(1.1, item.ease - 0.35);
      item.interval = 0.25;
    }
    item.due = Date.now() + item.interval * 24 * 60 * 60 * 1000;
    srs[id] = item;
    writeSrs(srs);
  }
  function dueQuestions() {
    const srs = readSrs();
    const now = Date.now();
    return DATA.questions.filter(q => srs[q.id]?.hard && srs[q.id].due <= now);
  }
  function setUrl(moduleId) {
    const url = moduleId ? `interview.html?module=${encodeURIComponent(moduleId)}` : "interview.html";
    history.replaceState(null, "", url);
  }
  function renderHeader() {
    document.getElementById("interviewTitle").textContent = tr("title");
    document.getElementById("interviewSub").textContent = tr("sub");
  }
  function renderMenu() {
    renderHeader();
    view.moduleId = "";
    setUrl("");
    const contentModules = DATA.modules.filter(m => !["random", "mock", "srs"].includes(m.id));
    root.innerHTML = `
      <section class="interview-profile">
        <h2>${tr("profile")}</h2>
        <p>${tr("profileText")}</p>
      </section>
      <section class="interview-resource-strip" aria-label="${tr("resources")}">
        <span><b>${DATA.questions.length}</b> ${tr("cards")}</span>
        <span><b>${DATA.words.length}</b> ${tr("wordCount")}</span>
        <span><b>${DATA.usefulPhrases.length}</b> ${tr("phraseCount")}</span>
        <span><b>${DATA.dialogues.length}</b> ${tr("dialogueCount")}</span>
        <span><b>${DATA.monologues.length}</b> ${tr("monologueCount")}</span>
      </section>
      <section class="interview-mode-row">
        <button class="secondary" data-start-special="random">${tr("random")}</button>
        <button class="secondary" data-start-special="mock">${tr("mock")}</button>
        <button class="secondary" data-start-special="srs">${tr("srs")}</button>
      </section>
      <section class="mode-grid interview-grid">
        ${contentModules.map(m => `<button class="mode-card interview-module" data-module="${m.id}">
          <span>${escapeHtml(m.title)}</span>
          <small>${escapeHtml(m.jpTitle)} · ${tr("level")} ${escapeHtml(m.level)}</small>
          <small>${questionsFor(m.id).length} ${tr("cards")}</small>
        </button>`).join("")}
      </section>
    `;
  }
  function renderLesson(moduleId) {
    const mod = moduleById(moduleId);
    if (!mod) return renderMenu();
    renderHeader();
    view.moduleId = moduleId;
    setUrl(moduleId);
    const qs = questionsFor(moduleId);
    root.innerHTML = `
      <section class="interview-lesson-head">
        <button class="small secondary" data-back-menu>←</button>
        <div><h2>${escapeHtml(mod.title)}</h2><p>${escapeHtml(mod.jpTitle)} · ${qs.length} ${tr("cards")} · ${escapeHtml(mod.level)}</p></div>
      </section>
      <section class="bottom-panel interview-section" open>
        <h3>${tr("explain")}</h3>
        <p>${escapeHtml(mod.explanation)}</p>
      </section>
      <section class="interview-mode-row">
        <button class="primary" data-start-mode="cards">${tr("cardsMode")}</button>
        <button class="secondary" data-start-mode="interview">${tr("interview")}</button>
        <button class="secondary" data-start-mode="rapid">${tr("rapid")}</button>
        <button class="secondary" data-start-mode="listening">${tr("listening")}</button>
        <button class="secondary" data-start-mode="shadowing">${tr("shadowing")}</button>
        <button class="secondary" data-start-mode="speaking">${tr("speaking")}</button>
      </section>
      <details class="bottom-panel" open><summary>${tr("words")}</summary>${wordListHtml(qs.slice(0, 12))}</details>
      <details class="bottom-panel"><summary>${tr("grammar")}</summary>${grammarListHtml(qs[0])}</details>
      <details class="bottom-panel"><summary>${tr("questions")}</summary><div class="interview-question-list">${qs.map(q => `<button class="secondary small" data-open-question="${q.id}">${escapeHtml(q.jp)}</button>`).join("")}</div></details>
    `;
  }
  function startSpecial(kind) {
    if (kind === "srs") {
      const due = dueQuestions();
      if (!due.length) {
        root.innerHTML = `<section class="done" style="display:block"><h2>${tr("srs")}</h2><p>${tr("emptySrs")}</p><div class="actions"><button class="secondary" data-back-menu>←</button></div></section>`;
        return;
      }
      return startSession("srs", due);
    }
    startSession(kind, shuffle(DATA.questions).slice(0, kind === "mock" ? 30 : 20));
  }
  function startMode(modeName) {
    const size = modeName === "rapid" ? 100 : modeName === "interview" ? 20 : questionsFor(view.moduleId).length;
    startSession(modeName, shuffle(questionsFor(view.moduleId)).slice(0, size));
  }
  function startSession(modeName, deck) {
    clearInterval(countdown);
    view = { ...view, mode: modeName, deck, index: 0, revealed: false, results: [], timer: modeName === "rapid" ? 10 : 0 };
    localStorage.setItem(SESSION_KEY, JSON.stringify({ modeName, ids: deck.map(q => q.id), startedAt: Date.now() }));
    renderQuestion();
    if (modeName === "rapid") startCountdown();
    if (modeName === "listening") setTimeout(() => speakCurrent("female"), 350);
  }
  function currentQuestion() { return view.deck[view.index]; }
  function renderQuestion() {
    const q = currentQuestion();
    if (!q) return renderStats();
    const noHints = ["interview", "rapid", "mock"].includes(view.mode);
    const listening = view.mode === "listening";
    const speaking = view.mode === "speaking";
    root.innerHTML = `
      <section class="interview-run-head">
        <button class="small secondary" data-exit-session>←</button>
        <span>${view.index + 1} / ${view.deck.length}</span>
        ${view.mode === "rapid" ? `<b id="rapidTimer">${view.timer}</b>` : ""}
      </section>
      <article class="interview-card ${view.revealed ? "revealed" : ""}">
        <div class="card-kind">${escapeHtml(currentQuestion().level)}</div>
        ${listening && !view.revealed ? `<p class="interview-muted">${tr("noText")}</p>` : `<h2>${rubyHtml(q.jp)}</h2>`}
        ${view.revealed ? questionBackHtml(q) : ""}
      </article>
      <section class="interview-audio-panel">
        <div class="interview-speed"><span>${tr("speed")}</span><select id="speechRate"><option value="0.5">0.5x</option><option value="0.75">0.75x</option><option value="1" selected>1x</option></select></div>
        <label class="interview-volume"><span>${tr("volume")}</span><input id="speechVolume" type="range" min="0" max="1" step="0.05" value="${settings.audioVolume}" aria-label="${tr("volume")}"></label>
        <button class="secondary" data-speak="male">${tr("male")}</button>
        <button class="secondary" data-speak="female">${tr("female")}</button>
        ${view.mode === "shadowing" ? `<button class="primary" data-speak-shadow>${tr("play")}</button>` : ""}
        ${view.mode === "shadowing" || speaking ? `<button class="secondary" data-record>${view.recording ? tr("stopRecord") : tr("record")}</button>` : ""}
      </section>
      ${speaking ? `<section class="bottom-panel"><h3>${tr("original")}</h3>${answerBlockHtml(q.answerBlock || { jp: q.answer, kana: q.answer, translation: q.translation })}</section>` : ""}
      <section class="interview-mode-row">
        ${view.revealed || noHints ? "" : `<button class="primary" data-reveal>${tr("show")}</button>`}
        <button class="dont" data-answer="hard">${tr("hard")}</button>
        <button class="know" data-answer="good">${tr("good")}</button>
        <button class="secondary" data-next>${tr("next")}</button>
      </section>
    `;
  }
  function questionBackHtml(q) {
    return `
      <div class="interview-back">
        <section><h3>${tr("translation")}</h3><p>${escapeHtml(q.translation[settings.lang] || q.translation.ru)}</p></section>
        <section><h3>${tr("literal")}</h3><p>${escapeHtml(q.literal[settings.lang] || q.literal.ru)}</p></section>
        <section><h3>${tr("exampleAnswer")}</h3>${answerBlockHtml(q.answerBlock || { jp: q.answer, kana: q.answer, translation: q.translation })}</section>
        <section><h3>${tr("simpleAnswer")}</h3>${answerBlockHtml(q.simpleAnswerBlock || { jp: q.simpleAnswer, kana: q.simpleAnswer, translation: q.translation })}</section>
        <section><h3>${tr("naturalAnswer")}</h3>${answerBlockHtml(q.naturalAnswerBlock || { jp: q.naturalAnswer, kana: q.naturalAnswer, translation: q.translation })}</section>
        <section><h3>${tr("grammarBreakdown")}</h3>${grammarListHtml(q)}</section>
        <section><h3>${tr("importantWords")}</h3>${wordListHtml([q])}</section>
        <section><h3>${tr("mistakes")}</h3><ul>${q.mistakes.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
      </div>
    `;
  }
  function answerBlockHtml(block) {
    const translation = block.literal?.[settings.lang] || block.literal?.ru || block.translation?.[settings.lang] || block.translation?.ru || "";
    return `<div class="interview-answer-example"><p class="jp-answer">${rubyHtml(block.jp)}</p><p class="translation-answer">${escapeHtml(translation)}</p></div>`;
  }
  function wordListHtml(qs) {
    const seen = new Set();
    const words = [];
    qs.forEach(q => q.words.forEach(w => {
      if (!seen.has(w.word)) {
        seen.add(w.word);
        words.push(w);
      }
    }));
    return `<div class="interview-word-grid">${words.map(w => `<div><b>${rubyHtml(w.word)}</b><small>${escapeHtml(w.reading || "")}</small><span>${escapeHtml(w.meaning[settings.lang] || w.meaning.ru)}</span></div>`).join("")}</div>`;
  }
  function grammarListHtml(q) {
    if (!q) return "";
    return `<ul class="interview-grammar">${q.grammar.map(g => `<li><b>${escapeHtml(g.part)}</b><span>${escapeHtml(g.explanation)}</span></li>`).join("")}</ul>`;
  }
  function markAnswer(good) {
    const q = currentQuestion();
    if (!q) return;
    updateSrs(q.id, good);
    view.results.push({ id: q.id, good });
    view.index++;
    view.revealed = false;
    renderQuestion();
    if (view.mode === "rapid") startCountdown();
    if (view.mode === "listening") setTimeout(() => speakCurrent("female"), 350);
  }
  function nextQuestion() {
    view.index++;
    view.revealed = false;
    renderQuestion();
  }
  function renderStats() {
    clearInterval(countdown);
    const good = view.results.filter(r => r.good).length;
    const hard = view.results.filter(r => !r.good).length;
    const hardQuestions = view.results.filter(r => !r.good).map(r => DATA.questions.find(q => q.id === r.id)).filter(Boolean);
    root.innerHTML = `
      <section class="done" style="display:block">
        <h2>${tr("stats")}</h2>
        <p><b>${good}</b> ${tr("correct")} · <b>${hard}</b> ${tr("difficult")}</p>
        <h3>${tr("recommendations")}</h3>
        <p>${hard ? "Повтори сложные вопросы в SRS Review и проговори ответы вслух 3 раза." : "Отлично. Следующий шаг — mock interview без подсказок."}</p>
        ${hardQuestions.length ? `<div class="interview-question-list">${hardQuestions.slice(0, 12).map(q => `<button class="secondary small" data-open-question="${q.id}">${escapeHtml(q.jp)}</button>`).join("")}</div>` : ""}
        <div class="actions"><button class="primary" data-back-menu>${tr("lesson")}</button><button class="secondary" data-start-special="srs">${tr("srs")}</button></div>
      </section>
    `;
  }
  function startCountdown() {
    clearInterval(countdown);
    view.timer = 10;
    countdown = setInterval(() => {
      view.timer--;
      const node = document.getElementById("rapidTimer");
      if (node) node.textContent = String(view.timer);
      if (view.timer <= 0) markAnswer(false);
    }, 1000);
  }
  function loadVoices() {
    voices = speechSynthesis?.getVoices?.() || [];
  }
  function pickVoice(kind) {
    loadVoices();
    const ja = voices.filter(v => /ja|Japan/i.test(v.lang + " " + v.name));
    const hinted = ja.find(v => new RegExp(kind === "female" ? "female|kyoko|haruka|nanami|siri" : "male|otoya|ichiro", "i").test(v.name));
    return hinted || ja[0] || voices[0] || null;
  }
  function speakCurrent(kind = "female") {
    const q = currentQuestion();
    if (!q || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(q.jp);
    utter.lang = "ja-JP";
    utter.rate = Number(document.getElementById("speechRate")?.value || 1);
    utter.volume = Math.max(0, Math.min(1, Number(settings.audioVolume ?? 1)));
    const voice = pickVoice(kind);
    if (voice) utter.voice = voice;
    speechSynthesis.speak(utter);
  }
  async function toggleRecord() {
    if (view.recording && recorder) {
      recorder.stop();
      view.recording = false;
      renderQuestion();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => null);
    if (!stream) return;
    chunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      stream.getTracks().forEach(track => track.stop());
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = URL.createObjectURL(new Blob(chunks, { type: "audio/webm" }));
      root.querySelector(".interview-audio-panel")?.appendChild(audio);
    };
    recorder.start();
    view.recording = true;
    renderQuestion();
  }
  function openQuestion(id) {
    const q = DATA.questions.find(item => item.id === id);
    if (!q) return;
    view = { ...view, mode: "cards", deck: [q], index: 0, revealed: true, results: [] };
    renderQuestion();
  }
  function handleClick(event) {
    const kanjiInfo = event.target.closest("[data-kanji-info]");
    if (kanjiInfo) return showKanjiInfo(kanjiInfo.dataset.kanjiInfo);
    if (event.target.closest("[data-close-kanji-info]")) return document.getElementById("interviewKanjiDialog")?.close();
    const moduleBtn = event.target.closest("[data-module]");
    if (moduleBtn) return renderLesson(moduleBtn.dataset.module);
    if (event.target.closest("[data-back-menu]")) return renderMenu();
    const special = event.target.closest("[data-start-special]");
    if (special) return startSpecial(special.dataset.startSpecial);
    const start = event.target.closest("[data-start-mode]");
    if (start) return startMode(start.dataset.startMode);
    if (event.target.closest("[data-exit-session]")) return view.moduleId ? renderLesson(view.moduleId) : renderMenu();
    const open = event.target.closest("[data-open-question]");
    if (open) return openQuestion(open.dataset.openQuestion);
    if (event.target.closest("[data-reveal]")) { view.revealed = true; return renderQuestion(); }
    const answer = event.target.closest("[data-answer]");
    if (answer) return markAnswer(answer.dataset.answer === "good");
    if (event.target.closest("[data-next]")) return nextQuestion();
    const speak = event.target.closest("[data-speak]");
    if (speak) return speakCurrent(speak.dataset.speak);
    if (event.target.closest("[data-speak-shadow]")) return speakCurrent("female");
    if (event.target.closest("[data-record]")) return toggleRecord();
  }
  document.addEventListener("input", event => {
    if (event.target.id !== "speechVolume") return;
    settings.audioVolume = Number(event.target.value);
    saveSettings();
  });
  document.addEventListener("click", handleClick);
  document.getElementById("langSelect")?.addEventListener("change", () => {
    settings = loadSettings();
    if (view.moduleId && !view.mode) renderLesson(view.moduleId);
    else if (view.mode) renderQuestion();
    else renderMenu();
  });
  if ("speechSynthesis" in window) {
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }
  if (view.moduleId) renderLesson(view.moduleId);
  else renderMenu();
})();
