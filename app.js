const SETTINGS_KEY = "idjlt.settings.v3";
const WORD_SESSION_PREFIX = "idjlt.words.";
const KANA_SESSION_KEY = "idjlt.kana.session.v1";
const KANJI_SESSION_PREFIX = "idjlt.kanji.";

const DICTIONARIES = window.IDJLT_DICTIONARIES || [];
const KANJI_DATA = window.IDJLT_KANJI || { singles: [], words: [] };

const I18N = {
  ru: {
    themeDark: "Тёмная", themeLight: "Светлая", themeOled: "OLED",
    homeTitle: "Тренажёр японского", homeSub: "Выбери режим.",
    wordsMode: "Слова", kanaMode: "Кана", kanjiMode: "Кандзи", wordsTitle: "Слова", kanaTitle: "Кана", kanjiTitle: "Кандзи",
    wordsModeSub: "Словари и карточки", kanaModeSub: "Хирагана и катакана", kanjiModeSub: "Знаки и сочетания",
    wordsSub: "Словари, несколько словарей сразу, карточки и свайпы.",
    kanaSub: "Хирагана, катакана, дакутен и ёон по тем же правилам.",
    backHome: "← на главную", backWords: "← к словам", open: "Открыть", cards: "карточек",
    customTitle: "Сразу несколько", customSub: "Выбери несколько словарей и запускай общий пул.",
    start: "Запустить", selectAll: "Выбрать все", clearAll: "Снять все",
    left: "Осталось", known: "Знаю", unknown: "Не знаю", round: "Раунд",
    shuffle: "Перемешать", restart: "Сначала", roundDone: "Раунд закончен",
    repeatUnknown: "Повторить «не знаю»", restartAll: "Начать всё заново",
    fullscreen: "На весь экран", exitFullscreen: "Свернуть",
    installApp: "Установить приложение", installHelp: "Добавь сайт на главный экран, чтобы открывать его как приложение.",
    installIosHelp: "На iPhone: нажми «Поделиться» и выбери «На экран Домой».",
    installedApp: "Приложение уже установлено",
    stacks: "Стопки", table: "Таблица", settings: "Настройки режима",
    showButtons: "Показывать кнопки «Знаю / Не знаю»",
    showRomaji: "Показывать ромаджи",
    tapHint: "тыкни, чтобы показать ответ", swipeHint: "свайп вправо — знаю, влево — не знаю",
    chooseHint: "выбери стопку", noItems: "пусто", doneAll: "Все карточки отмечены как известные. Отлично!",
    doneSome: "Неизвестных карточек: {n}. Их можно вернуть в пул и повторить.",
    native: "Русский", jp: "日本語", kana: "Кана", reading: "Чтение",
    script: "Азбука", hiragana: "Хирагана", katakana: "Катакана", bothMix: "Обе, микс", bothTogether: "Обе вместе",
    order: "Порядок", random: "Случайный", sequential: "По порядку", dakuten: "Дакутен", yoon: "Ёон",
    reverseKana: "Обратный квиз", rows: "Ряды",
    kanjiSub: "Карточки для знаков и слов из кандзи.",
    kanjiSet: "Набор", kanjiMixed: "Кандзи + слова", kanjiSingles: "Только кандзи", kanjiWords: "Только слова"
    , kunReading: "Японское чтение (кун)", onReading: "Китайское чтение (он)", examples: "Примеры"
  },
  en: {
    themeDark: "Dark", themeLight: "Light", themeOled: "OLED",
    homeTitle: "Japanese trainer", homeSub: "Choose a mode.",
    wordsMode: "Words", kanaMode: "Kana", kanjiMode: "Kanji", wordsTitle: "Words", kanaTitle: "Kana", kanjiTitle: "Kanji",
    wordsModeSub: "Dictionaries and cards", kanaModeSub: "Hiragana and katakana", kanjiModeSub: "Characters and compounds",
    wordsSub: "Dictionaries, multi-dictionary pools, cards, and swipes.",
    kanaSub: "Hiragana, katakana, dakuten, and yoon with the same flow.",
    backHome: "← home", backWords: "← words", open: "Open", cards: "cards",
    customTitle: "Multiple dictionaries", customSub: "Choose dictionaries and launch one shared pool.",
    start: "Start", selectAll: "Select all", clearAll: "Clear all",
    left: "Left", known: "Known", unknown: "Unknown", round: "Round",
    shuffle: "Shuffle", restart: "Restart", roundDone: "Round complete",
    repeatUnknown: "Repeat unknown", restartAll: "Start over",
    fullscreen: "Fullscreen", exitFullscreen: "Exit",
    installApp: "Install app", installHelp: "Add this site to your home screen to open it like an app.",
    installIosHelp: "On iPhone: tap Share and choose Add to Home Screen.",
    installedApp: "App is already installed",
    stacks: "Stacks", table: "Table", settings: "Mode settings",
    showButtons: "Show Known / Unknown buttons",
    showRomaji: "Show romaji",
    tapHint: "tap to reveal the answer", swipeHint: "swipe right for known, left for unknown",
    chooseHint: "choose a stack", noItems: "empty", doneAll: "All cards are marked as known. Nice!",
    doneSome: "Unknown cards: {n}. Return them to the pool and repeat.",
    native: "English", jp: "日本語", kana: "Kana", reading: "Reading",
    script: "Script", hiragana: "Hiragana", katakana: "Katakana", bothMix: "Both, mixed", bothTogether: "Both together",
    order: "Order", random: "Random", sequential: "Sequential", dakuten: "Dakuten", yoon: "Yoon",
    reverseKana: "Reverse quiz", rows: "Rows",
    kanjiSub: "Cards for kanji characters and kanji words.",
    kanjiSet: "Set", kanjiMixed: "Kanji + words", kanjiSingles: "Kanji only", kanjiWords: "Words only"
    , kunReading: "Japanese reading (kun)", onReading: "Chinese reading (on)", examples: "Examples"
  }
};

const VOWELS = [
  { row: "vowels", r: "a", h: "あ", k: "ア" },
  { row: "vowels", r: "i", h: "い", k: "イ" },
  { row: "vowels", r: "u", h: "う", k: "ウ" },
  { row: "vowels", r: "e", h: "え", k: "エ" },
  { row: "vowels", r: "o", h: "お", k: "オ" }
];
const MAIN_ROWS = [
  { id: "k", label: "か", cells: [["ka", "か", "カ"], ["ki", "き", "キ"], ["ku", "く", "ク"], ["ke", "け", "ケ"], ["ko", "こ", "コ"]] },
  { id: "s", label: "さ", cells: [["sa", "さ", "サ"], ["shi", "し", "シ"], ["su", "す", "ス"], ["se", "せ", "セ"], ["so", "そ", "ソ"]] },
  { id: "t", label: "た", cells: [["ta", "た", "タ"], ["chi", "ち", "チ"], ["tsu", "つ", "ツ"], ["te", "て", "テ"], ["to", "と", "ト"]] },
  { id: "n", label: "な", cells: [["na", "な", "ナ"], ["ni", "に", "ニ"], ["nu", "ぬ", "ヌ"], ["ne", "ね", "ネ"], ["no", "の", "ノ"], ["n", "ん", "ン"]] },
  { id: "h", label: "は", cells: [["ha", "は", "ハ"], ["hi", "ひ", "ヒ"], ["fu", "ふ", "フ"], ["he", "へ", "ヘ"], ["ho", "ほ", "ホ"]] },
  { id: "m", label: "ま", cells: [["ma", "ま", "マ"], ["mi", "み", "ミ"], ["mu", "む", "ム"], ["me", "め", "メ"], ["mo", "も", "モ"]] },
  { id: "y", label: "や", cells: [["ya", "や", "ヤ"], ["yu", "ゆ", "ユ"], ["yo", "よ", "ヨ"]] },
  { id: "r", label: "ら", cells: [["ra", "ら", "ラ"], ["ri", "り", "リ"], ["ru", "る", "ル"], ["re", "れ", "レ"], ["ro", "ろ", "ロ"]] },
  { id: "w", label: "わ", cells: [["wa", "わ", "ワ"], ["wo", "を", "ヲ"]] }
];
const DAKUTEN_ROWS = [
  { id: "g", label: "が", cells: [["ga", "が", "ガ"], ["gi", "ぎ", "ギ"], ["gu", "ぐ", "グ"], ["ge", "げ", "ゲ"], ["go", "ご", "ゴ"]] },
  { id: "z", label: "ざ", cells: [["za", "ざ", "ザ"], ["ji", "じ", "ジ"], ["zu", "ず", "ズ"], ["ze", "ぜ", "ゼ"], ["zo", "ぞ", "ゾ"]] },
  { id: "d", label: "だ", cells: [["da", "だ", "ダ"], ["di", "ぢ", "ヂ"], ["du", "づ", "ヅ"], ["de", "で", "デ"], ["do", "ど", "ド"]] },
  { id: "b", label: "ば", cells: [["ba", "ば", "バ"], ["bi", "び", "ビ"], ["bu", "ぶ", "ブ"], ["be", "べ", "ベ"], ["bo", "ぼ", "ボ"]] },
  { id: "p", label: "ぱ", cells: [["pa", "ぱ", "パ"], ["pi", "ぴ", "ピ"], ["pu", "ぷ", "プ"], ["pe", "ぺ", "ペ"], ["po", "ぽ", "ポ"]] }
];
const YOON = [
  ["kya", "きゃ", "キャ"], ["kyu", "きゅ", "キュ"], ["kyo", "きょ", "キョ"], ["sha", "しゃ", "シャ"], ["shu", "しゅ", "シュ"], ["sho", "しょ", "ショ"],
  ["cha", "ちゃ", "チャ"], ["chu", "ちゅ", "チュ"], ["cho", "ちょ", "チョ"], ["nya", "にゃ", "ニャ"], ["nyu", "にゅ", "ニュ"], ["nyo", "にょ", "ニョ"],
  ["hya", "ひゃ", "ヒャ"], ["hyu", "ひゅ", "ヒュ"], ["hyo", "ひょ", "ヒョ"], ["mya", "みゃ", "ミャ"], ["myu", "みゅ", "ミュ"], ["myo", "みょ", "ミョ"],
  ["rya", "りゃ", "リャ"], ["ryu", "りゅ", "リュ"], ["ryo", "りょ", "リョ"], ["gya", "ぎゃ", "ギャ"], ["gyu", "ぎゅ", "ギュ"], ["gyo", "ぎょ", "ギョ"],
  ["ja", "じゃ", "ジャ"], ["ju", "じゅ", "ジュ"], ["jo", "じょ", "ジョ"], ["bya", "びゃ", "ビャ"], ["byu", "びゅ", "ビュ"], ["byo", "びょ", "ビョ"],
  ["pya", "ぴゃ", "ピャ"], ["pyu", "ぴゅ", "ピュ"], ["pyo", "ぴょ", "ピョ"]
].map(([r, h, k]) => ({ row: "yoon", r, h, k }));

let settings = loadSettings();
let session = null;
let cards = [];
let current = null;
let shown = false;
let drag = null;
let suppressClick = false;
let swipeTimer = null;
let mode = document.body.dataset.page;
let currentKind = "";
let kanaSettingsBound = false;
let installPromptEvent = null;

const $ = id => document.getElementById(id);
const t = key => I18N[settings.lang]?.[key] || I18N.ru[key] || key;

function loadSettings() {
  try {
    return {
      theme: "dark", lang: "ru", showButtons: false, showRomaji: true,
      kana: { script: "hiragana", order: "random", dakuten: false, yoon: false, reverse: false, rows: ["vowels","k","s","t","n","h","m","y","r","w"] },
      kanji: { mode: "mixed" },
      ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}")
    };
  } catch {
    return { theme: "dark", lang: "ru", showButtons: false, showRomaji: true, kana: { script: "hiragana", order: "random", dakuten: false, yoon: false, reverse: false, rows: ["vowels","k","s","t","n","h","m","y","r","w"] }, kanji: { mode: "mixed" } };
  }
}
function saveSettings() { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }
function nativeText(card) { return settings.lang === "en" ? card.en : card.ru; }
function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function dictTitle(dict) { return dict.title[settings.lang] || dict.title.ru; }

function applyGlobal() {
  document.body.dataset.theme = settings.theme;
  document.documentElement.lang = settings.lang;
  if ($("themeSelect")) $("themeSelect").value = settings.theme;
  if ($("langSelect")) $("langSelect").value = settings.lang;
  document.querySelectorAll("[data-i18n]").forEach(node => { node.textContent = t(node.dataset.i18n); });
  if ($("answerButtons")) $("answerButtons").hidden = !settings.showButtons;
  if ($("showButtonsSetting")) $("showButtonsSetting").checked = settings.showButtons;
  if ($("showRomajiSetting")) $("showRomajiSetting").checked = settings.showRomaji;
  updatePwaInstallUi();
}

function bindGlobal() {
  $("themeSelect")?.addEventListener("change", e => { settings.theme = e.target.value; saveSettings(); applyGlobal(); });
  $("langSelect")?.addEventListener("change", e => { settings.lang = e.target.value; saveSettings(); applyGlobal(); renderDictionaryList(); renderCustomPicker(); if (currentKind === "kanji") renderKanjiTitle(); renderTable(currentKind); renderMode(); });
}
function isStandaloneApp() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}
function updatePwaInstallUi() {
  const btn = $("installAppBtn");
  const help = $("installHelp");
  if (!btn || !help) return;
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  if (isStandaloneApp()) {
    btn.disabled = true;
    btn.textContent = t("installedApp");
    help.textContent = t("installedApp");
    return;
  }
  btn.disabled = false;
  btn.textContent = t("installApp");
  help.textContent = isIos && !installPromptEvent ? t("installIosHelp") : t("installHelp");
}
function setupPwaInstall() {
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
  const box = $("installBox");
  const btn = $("installAppBtn");
  const help = $("installHelp");
  if (!box || !btn || !help) return;
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    installPromptEvent = e;
    updatePwaInstallUi();
  });
  window.addEventListener("appinstalled", () => {
    installPromptEvent = null;
    updatePwaInstallUi();
  });
  btn.addEventListener("click", async () => {
    if (!installPromptEvent) {
      updatePwaInstallUi();
      return;
    }
    installPromptEvent.prompt();
    await installPromptEvent.userChoice.catch(() => null);
    installPromptEvent = null;
    updatePwaInstallUi();
  });
  updatePwaInstallUi();
}

function renderDictionaryList() {
  const list = $("dictionaryList");
  if (!list) return;
  list.innerHTML = `
    <a class="lesson custom-lesson" href="custom.html">
      <h2>${t("customTitle")}</h2><p>${t("customSub")}</p><p>${t("open")}</p>
    </a>
    ${DICTIONARIES.map(dict => `<a class="lesson" href="${dict.id}.html"><h2>${dictTitle(dict)}</h2><p>${dict.cards.length} ${t("cards")}</p><p>${t("open")}</p></a>`).join("")}
  `;
}

function renderCustomPicker() {
  const picker = $("customPicker");
  if (picker && !$("customList")) {
    picker.innerHTML = `
      <div class="actions">
        <button class="small secondary" id="selectAllBtn" type="button" data-i18n="selectAll">${t("selectAll")}</button>
        <button class="small secondary" id="clearAllBtn" type="button" data-i18n="clearAll">${t("clearAll")}</button>
      </div>
      <div class="pick-list" id="customList"></div>
      <button class="primary wide" id="startCustomBtn" type="button" data-i18n="start">${t("start")}</button>
    `;
  }
  const list = $("customList");
  if (!list) return;
  list.innerHTML = DICTIONARIES.map(dict => `
    <label class="pick-row"><input type="checkbox" value="${dict.id}" checked> <span>${dictTitle(dict)}</span><small>${dict.cards.length}</small></label>
  `).join("");
}

function selectedCustomIds() {
  return [...document.querySelectorAll("#customList input:checked")].map(input => input.value);
}

function dictionaryById(id) { return DICTIONARIES.find(dict => dict.id === id); }
function wordCardsFor(ids) {
  return ids.flatMap(id => {
    const dict = dictionaryById(id);
    return dict ? dict.cards.map(card => ({ ...card, source: dictTitle(dict) })) : [];
  });
}

function startWords(ids) {
  currentKind = "word";
  ensureTrainerMarkup("word");
  cards = wordCardsFor(ids);
  const key = WORD_SESSION_PREFIX + ids.join("+");
  session = loadSession(key, cards);
  if (session.current === null && !session.done) nextCard();
  bindTrainer("word");
  renderWordTitle(ids);
  renderTable("word");
  renderMode();
}

function startKana() {
  currentKind = "kana";
  ensureTrainerMarkup("kana");
  cards = buildKanaCards();
  session = loadSession(KANA_SESSION_KEY, cards, settings.kana.order);
  if (session.total !== cards.length) session = newSession(cards, settings.kana.order);
  if (session.current === null && !session.done) nextCard();
  bindTrainer("kana");
  renderKanaSettings();
  renderTable("kana");
  renderMode();
}

function startKanji() {
  currentKind = "kanji";
  ensureTrainerMarkup("kanji");
  cards = buildKanjiCards();
  const key = KANJI_SESSION_PREFIX + settings.kanji.mode;
  session = loadSession(key, cards);
  if (session.current === null && !session.done) nextCard();
  bindTrainer("kanji");
  renderKanjiTitle();
  renderKanjiSettings();
  renderTable("kanji");
  renderMode();
}

function ensureTrainerMarkup(kind) {
  const mount = document.querySelector("[data-trainer]");
  if (!mount || mount.dataset.ready) return;
  mount.dataset.ready = "1";
  mount.innerHTML = `
    <section class="top">
      <div class="pill"><span data-i18n="left">${t("left")}</span>: <b id="left">0</b></div>
      <div class="pill"><span data-i18n="known">${t("known")}</span>: <b id="knownCount">0</b></div>
      <div class="pill"><span data-i18n="unknown">${t("unknown")}</span>: <b id="unknownCount">0</b></div>
      <div class="pill"><span data-i18n="round">${t("round")}</span>: <b id="round">1</b></div>
      <button class="small secondary" id="shuffleBtn" data-i18n="shuffle">${t("shuffle")}</button>
      <button class="small secondary" id="resetBtn" data-i18n="restart">${t("restart")}</button>
      <button class="small secondary" id="focusBtn" type="button" data-i18n="fullscreen">${t("fullscreen")}</button>
    </section>
    <section id="game">
      <button class="focus-exit" id="focusExitBtn" type="button">${t("exitFullscreen")}</button>
      <article class="card" id="card" tabindex="0">
        <div class="swipe-label swipe-left" data-i18n="unknown">${t("unknown")}</div>
        <div class="swipe-label swipe-right" data-i18n="known">${t("known")}</div>
        <div class="card-inner"><div class="ru" id="ru"></div><div class="jp" id="jp"></div><div class="romaji" id="romaji"></div><div class="hint" id="hint"></div></div>
      </article>
      <div class="buttons" id="answerButtons"><button class="dont" id="dontBtn" data-i18n="unknown">${t("unknown")}</button><button class="know" id="knowBtn" data-i18n="known">${t("known")}</button></div>
    </section>
    <section class="done" id="done"><h2 data-i18n="roundDone">${t("roundDone")}</h2><p id="doneText"></p><div class="actions"><button class="primary" id="repeatUnknownBtn" data-i18n="repeatUnknown">${t("repeatUnknown")}</button><button class="restart" id="fullRestartBtn" data-i18n="restartAll">${t("restartAll")}</button></div></section>
    <details class="bottom-panel" open><summary data-i18n="stacks">${t("stacks")}</summary><div class="stacks"><div class="stack"><h3 data-i18n="known">${t("known")}</h3><div class="items" id="knownList"></div></div><div class="stack"><h3 data-i18n="unknown">${t("unknown")}</h3><div class="items" id="unknownList"></div></div></div></details>
    <details class="bottom-panel"><summary data-i18n="table">${t("table")}</summary><div class="table-wrap" id="wordTable"></div></details>
    <details class="bottom-panel"><summary data-i18n="settings">${t("settings")}</summary><div class="mode-settings" id="${kind === "kana" ? "kanaSettings" : kind === "kanji" ? "kanjiSettings" : "wordSettings"}"></div></details>
  `;
  const settingsBox = kind === "kana" ? $("kanaSettings") : kind === "kanji" ? $("kanjiSettings") : $("wordSettings");
  settingsBox.innerHTML = kind === "kana" ? kanaSettingsHtml() : kind === "kanji" ? kanjiSettingsHtml() : wordSettingsHtml();
  applyGlobal();
  if (kind === "kana") bindKanaSettings();
  if (kind === "kanji") bindKanjiSettings();
}

function kanaSettingsHtml() {
  return `
    <label><span data-i18n="script">${t("script")}</span><select id="kanaScript"><option value="hiragana" data-i18n="hiragana">${t("hiragana")}</option><option value="katakana" data-i18n="katakana">${t("katakana")}</option><option value="bothMix" data-i18n="bothMix">${t("bothMix")}</option><option value="bothTogether" data-i18n="bothTogether">${t("bothTogether")}</option></select></label>
    <label><span data-i18n="order">${t("order")}</span><select id="kanaOrder"><option value="random" data-i18n="random">${t("random")}</option><option value="sequential" data-i18n="sequential">${t("sequential")}</option></select></label>
    <label class="check"><input type="checkbox" id="kanaReverse"> <span data-i18n="reverseKana">${t("reverseKana")}</span></label>
    <div><span class="settings-label" data-i18n="rows">${t("rows")}</span><div class="row-picks" id="kanaRows"></div></div>
    <label class="check"><input type="checkbox" id="showButtonsSetting"> <span data-i18n="showButtons">${t("showButtons")}</span></label>
  `;
}
function wordSettingsHtml() {
  return `
    <label class="check"><input type="checkbox" id="showRomajiSetting"> <span data-i18n="showRomaji">${t("showRomaji")}</span></label>
    <label class="check"><input type="checkbox" id="showButtonsSetting"> <span data-i18n="showButtons">${t("showButtons")}</span></label>
  `;
}
function kanjiSettingsHtml() {
  return `
    <label><span data-i18n="kanjiSet">${t("kanjiSet")}</span><select id="kanjiMode"><option value="mixed" data-i18n="kanjiMixed">${t("kanjiMixed")}</option><option value="single" data-i18n="kanjiSingles">${t("kanjiSingles")}</option><option value="words" data-i18n="kanjiWords">${t("kanjiWords")}</option></select></label>
    <label class="check"><input type="checkbox" id="showRomajiSetting"> <span data-i18n="showRomaji">${t("showRomaji")}</span></label>
    <label class="check"><input type="checkbox" id="showButtonsSetting"> <span data-i18n="showButtons">${t("showButtons")}</span></label>
  `;
}

function newSession(cardsList, order = "random") {
  const ids = cardsList.map(c => c.id);
  return { version: 1, total: cardsList.length, pool: order === "sequential" ? ids : shuffle(ids), known: [], unknown: [], current: null, round: 1, done: false };
}
function loadSession(key, cardsList, order = "random") {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    const ids = new Set(cardsList.map(c => c.id));
    if (saved?.version === 1 && saved.total === cardsList.length && [...saved.pool, ...saved.known, ...saved.unknown, saved.current].filter(Boolean).every(id => ids.has(id))) {
      saved.key = key;
      return saved;
    }
  } catch {}
  const s = newSession(cardsList, order);
  s.key = key;
  return s;
}
function saveSession() { if (session?.key) localStorage.setItem(session.key, JSON.stringify(session)); }
function cardById(id) { return cards.find(card => card.id === id); }
function nextCard() {
  if (!session.pool.length) return finishRound();
  session.current = session.pool.pop();
  current = cardById(session.current);
  shown = false;
  session.done = false;
  saveSession();
}
function finishRound() { session.done = true; session.current = null; current = null; shown = false; saveSession(); }
function reveal() { if (!current || shown) return; shown = true; renderMode(); }
function answer(isKnown) {
  if (!current) return;
  (isKnown ? session.known : session.unknown).push(current.id);
  session.current = null;
  nextCard();
  renderMode();
}
function repeatUnknown() {
  session.pool = shuffle(session.unknown);
  session.unknown = [];
  session.round++;
  session.done = false;
  nextCard();
  renderMode();
}
function restartAll() {
  session = newSession(cards, currentKind === "kana" ? settings.kana.order : "random");
  nextCard();
  saveSession();
  renderMode();
}

function updateFocusButton() {
  const btn = $("focusBtn");
  if (!btn) return;
  const active = document.body.classList.contains("card-focus");
  btn.disabled = !active && (!current || session?.done);
  btn.textContent = active ? t("exitFullscreen") : t("fullscreen");
  if ($("focusExitBtn")) $("focusExitBtn").textContent = t("exitFullscreen");
}

async function toggleCardFocus() {
  if (!document.body.classList.contains("card-focus") && (!current || session?.done)) return;
  setCardFocus(!document.body.classList.contains("card-focus"), true);
}

async function setCardFocus(active, useNative) {
  if (active && (!current || session?.done)) return;
  document.body.classList.toggle("card-focus", active);
  updateFocusButton();
  if (!useNative) return;
  const game = $("game");
  try {
    if (active && game?.requestFullscreen && !document.fullscreenElement) await game.requestFullscreen();
    if (!active && document.fullscreenElement) await document.exitFullscreen();
  } catch {}
}

let trainerBound = false;
function bindTrainer(kind) {
  if (trainerBound) return;
  trainerBound = true;
  $("card")?.addEventListener("click", () => { if (suppressClick) { suppressClick = false; return; } reveal(); });
  $("card")?.addEventListener("pointerdown", onPointerDown);
  $("card")?.addEventListener("pointermove", onPointerMove);
  $("card")?.addEventListener("pointerup", onPointerUp);
  $("card")?.addEventListener("pointercancel", clearDrag);
  $("knowBtn")?.addEventListener("click", () => answer(true));
  $("dontBtn")?.addEventListener("click", () => answer(false));
  $("shuffleBtn")?.addEventListener("click", () => { session.pool = shuffle(session.pool); saveSession(); renderMode(); });
  $("resetBtn")?.addEventListener("click", restartAll);
  $("focusBtn")?.addEventListener("click", toggleCardFocus);
  $("focusExitBtn")?.addEventListener("click", () => setCardFocus(false, true));
  $("fullRestartBtn")?.addEventListener("click", restartAll);
  $("repeatUnknownBtn")?.addEventListener("click", repeatUnknown);
  $("showButtonsSetting")?.addEventListener("change", e => { settings.showButtons = e.target.checked; saveSettings(); applyGlobal(); });
  $("showRomajiSetting")?.addEventListener("change", e => { settings.showRomaji = e.target.checked; saveSettings(); renderMode(); });
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) setCardFocus(false, false);
  });
}
function onPointerDown(e) {
  if (!current || swipeTimer) return;
  drag = { id: e.pointerId, x: e.clientX, y: e.clientY, dx: 0, moved: false };
  $("card").setPointerCapture(e.pointerId);
  $("card").classList.add("dragging");
}
function onPointerMove(e) {
  if (!drag || e.pointerId !== drag.id) return;
  drag.dx = e.clientX - drag.x;
  const dy = e.clientY - drag.y;
  if (Math.abs(drag.dx) > 8 || Math.abs(dy) > 8) drag.moved = true;
  const card = $("card");
  card.style.transform = `translate3d(${drag.dx}px, 0, 0) rotate(${Math.max(-10, Math.min(10, drag.dx / 18))}deg)`;
  card.classList.toggle("swiping-right", drag.dx > 55);
  card.classList.toggle("swiping-left", drag.dx < -55);
  card.classList.toggle("known-glow", drag.dx > 55);
  card.classList.toggle("unknown-glow", drag.dx < -55);
}
function onPointerUp(e) {
  if (!drag || e.pointerId !== drag.id) return;
  const dx = drag.dx;
  const moved = drag.moved;
  suppressClick = moved;
  if (Math.abs(dx) > 96) finishSwipe(dx > 0);
  else settleCardBack();
}
function finishSwipe(isKnown) {
  const card = $("card");
  if (!card) return;
  card.classList.remove("dragging");
  card.classList.add("settling", isKnown ? "known-glow" : "unknown-glow", isKnown ? "swiping-right" : "swiping-left");
  card.style.transform = `translate3d(${isKnown ? "115vw" : "-115vw"}, 0, 0) rotate(${isKnown ? 14 : -14}deg)`;
  clearTimeout(swipeTimer);
  swipeTimer = setTimeout(() => {
    clearDrag();
    answer(isKnown);
  }, 280);
  drag = null;
}
function settleCardBack() {
  const card = $("card");
  if (!card) return;
  card.classList.remove("dragging");
  card.classList.add("settling");
  card.style.transform = "";
  clearTimeout(swipeTimer);
  swipeTimer = setTimeout(clearDrag, 260);
  drag = null;
}
function clearDrag() {
  const card = $("card");
  clearTimeout(swipeTimer);
  swipeTimer = null;
  if (card) {
    card.classList.remove("dragging", "settling", "swiping-left", "swiping-right", "known-glow", "unknown-glow");
    card.style.transform = "";
  }
  drag = null;
}

function renderWordTitle(ids) {
  const title = $("lessonTitle");
  if (!title) return;
  if (ids.length === 1) title.textContent = dictTitle(dictionaryById(ids[0]));
  else title.textContent = t("customTitle");
  $("lessonSub").textContent = ids.length === 1 ? `${cards.length} ${t("cards")}` : `${ids.length} · ${cards.length} ${t("cards")}`;
}
function renderKanjiTitle() {
  if ($("lessonTitle")) $("lessonTitle").textContent = t("kanjiTitle");
  if ($("lessonSub")) $("lessonSub").textContent = `${t("kanjiSub")} ${cards.length} ${t("cards")}`;
}
function frontText(card) {
  if (card.type === "kana") return settings.kana.reverse ? card.r : card.front;
  if (card.type === "kanji-single" || card.type === "kanji-word") return card.front;
  return nativeText(card);
}
function answerText(card) {
  if (card.type === "kana") return settings.kana.reverse ? card.front : card.r;
  if (card.type === "kanji-single" || card.type === "kanji-word") return card.answer;
  return card.jp;
}
function nativeText(card) { return settings.lang === "en" ? card.en : card.ru; }

function renderMode() {
  if (!session) return;
  current = session.current === null ? null : cardById(session.current);
  if (session.done) setCardFocus(false, true);
  $("game").style.display = session.done ? "none" : "block";
  $("done").style.display = session.done ? "block" : "none";
  $("card")?.classList.toggle("kanji-card", currentKind === "kanji");
  $("left").textContent = session.pool.length + (current ? 1 : 0);
  $("knownCount").textContent = session.known.length;
  $("unknownCount").textContent = session.unknown.length;
  $("round").textContent = session.round;
  if (current) {
    $("ru").textContent = frontText(current);
    $("jp").textContent = answerText(current);
    $("jp").style.display = shown ? "block" : "none";
    $("romaji").textContent = (currentKind === "word" || currentKind === "kanji") && current.romaji ? current.romaji : "";
    $("romaji").style.display = shown && (currentKind === "word" || currentKind === "kanji") && settings.showRomaji && current.romaji ? "block" : "none";
    $("hint").textContent = shown ? (settings.showButtons ? t("chooseHint") : t("swipeHint")) : t("tapHint");
  }
  $("knowBtn").disabled = false;
  $("dontBtn").disabled = false;
  $("knownList").innerHTML = stackHtml(session.known);
  $("unknownList").innerHTML = stackHtml(session.unknown);
  $("doneText").textContent = session.unknown.length ? t("doneSome").replace("{n}", session.unknown.length) : t("doneAll");
  $("repeatUnknownBtn").style.display = session.unknown.length ? "inline-block" : "none";
  applyGlobal();
  updateFocusButton();
}
function stackHtml(ids) {
  if (!ids.length) return t("noItems");
  return ids.map(id => {
    const card = cardById(id);
    return `<div class="item">${frontText(card)} — ${answerText(card)}</div>`;
  }).join("");
}
function renderTable(kind) {
  const wrap = $("wordTable");
  if (!wrap) return;
  if (kind === "kana") {
    wrap.innerHTML = kanaTableHtml();
  } else if (kind === "kanji") {
    wrap.innerHTML = kanjiTableHtml();
  } else {
    wrap.innerHTML = `<table><thead><tr><th>${t("native")}</th><th>${t("jp")}</th></tr></thead><tbody>${cards.map(c => `<tr><td>${nativeText(c)}</td><td>${c.jp}</td></tr>`).join("")}</tbody></table>`;
  }
}

function kanaRowsForStudy() {
  const selected = new Set(settings.kana.rows);
  const rows = [];
  if (selected.has("vowels")) rows.push({ id: "vowels", label: "あ", cells: VOWELS.map(x => [x.r, x.h, x.k]) });
  for (const row of MAIN_ROWS) if (selected.has(row.id)) rows.push(row);
  for (const row of DAKUTEN_ROWS) if (selected.has(row.id)) rows.push(row);
  if (selected.has("yoon")) rows.push({ id: "yoon", label: "きゃ", cells: YOON.map(x => [x.r, x.h, x.k]) });
  return rows;
}

function kanaDisplay(h, k, index = 0) {
  if (settings.kana.script === "katakana") return k;
  if (settings.kana.script === "bothTogether") return `${h} / ${k}`;
  if (settings.kana.script === "bothMix") return index % 2 ? k : h;
  return h;
}

function kanaTableHtml() {
  const groups = kanaRowsForStudy();
  if (!groups.length) return "";
  return `<div class="kana-table-groups">${groups.map(group => `
    <section class="kana-table-group">
      <h3>${group.label}</h3>
      <div class="kana-tile-grid">
        ${group.cells.map(([r, h, k], i) => `<div class="kana-tile"><b>${kanaDisplay(h, k, i)}</b><span>${r.toUpperCase()}</span></div>`).join("")}
      </div>
    </section>
  `).join("")}</div>`;
}

function buildKanjiCards() {
  const singleCards = KANJI_DATA.singles.map(item => ({
    id: item.id,
    type: "kanji-single",
    front: item.kanji,
    answer: kanjiSingleAnswer(item),
    romaji: kanjiReadingRomaji(item),
    tableReading: kanjiShortReadings(item),
    tableMeaning: item.meaning
  }));
  const wordCards = KANJI_DATA.words.map(item => ({
    id: item.id,
    type: "kanji-word",
    front: item.term,
    answer: [item.reading, nativeKanjiText(item)].filter(Boolean).join("\n"),
    romaji: kanaToRomaji(item.reading || ""),
    tableReading: item.reading,
    tableMeaning: nativeKanjiText(item)
  }));
  if (settings.kanji.mode === "single") return singleCards;
  if (settings.kanji.mode === "words") return wordCards;
  return [...singleCards, ...wordCards];
}

function nativeKanjiText(item) {
  return settings.lang === "en" ? item.en || item.ru : item.ru;
}

function kanjiSingleAnswer(item) {
  const lines = [];
  lines.push(`кун: ${item.kun?.length ? item.kun.join(" / ") : "—"}`);
  lines.push(`он: ${item.on?.length ? item.on.join(" / ") : "—"}`);
  if (item.meaning) lines.push(item.meaning);
  if (item.examples?.length) {
    lines.push(item.examples.slice(0, 4).map(ex => `${ex.term}${ex.reading ? " · " + ex.reading : ""}${ex.ru ? " · " + ex.ru : ""}`).join("\n"));
  }
  return lines.join("\n");
}

function kanjiShortReadings(item) {
  return [`кун: ${item.kun?.length ? item.kun.join(" / ") : "—"}`, `он: ${item.on?.length ? item.on.join(" / ") : "—"}`].join("\n");
}

const ROMAJI_DIGRAPHS = {
  きゃ: "kya", きゅ: "kyu", きょ: "kyo", しゃ: "sha", しゅ: "shu", しょ: "sho", ちゃ: "cha", ちゅ: "chu", ちょ: "cho",
  にゃ: "nya", にゅ: "nyu", にょ: "nyo", ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo", みゃ: "mya", みゅ: "myu", みょ: "myo",
  りゃ: "rya", りゅ: "ryu", りょ: "ryo", ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo", じゃ: "ja", じゅ: "ju", じょ: "jo",
  びゃ: "bya", びゅ: "byu", びょ: "byo", ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo"
};
const ROMAJI_KANA = {
  あ: "a", い: "i", う: "u", え: "e", お: "o", か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so", た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
  な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no", は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
  ま: "ma", み: "mi", む: "mu", め: "me", も: "mo", や: "ya", ゆ: "yu", よ: "yo",
  ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro", わ: "wa", を: "wo", ん: "n",
  が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go", ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
  だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do", ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
  ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po", ー: "-"
};
function kanaToRomaji(text) {
  const hira = String(text || "").replace(/[\u30a1-\u30f6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  let out = "";
  for (let i = 0; i < hira.length; i++) {
    if (hira[i] === "っ" && i + 1 < hira.length) {
      const next = ROMAJI_DIGRAPHS[hira.slice(i + 1, i + 3)] || ROMAJI_KANA[hira[i + 1]] || "";
      out += next[0] || "";
      continue;
    }
    const pair = hira.slice(i, i + 2);
    if (ROMAJI_DIGRAPHS[pair]) {
      out += ROMAJI_DIGRAPHS[pair];
      i++;
    } else {
      out += ROMAJI_KANA[hira[i]] || hira[i];
    }
  }
  return out.replace(/-/g, "");
}
function kanjiReadingRomaji(item) {
  return [`kun: ${(item.kun || []).map(kanaToRomaji).join(" / ") || "—"}`, `on: ${(item.on || []).map(kanaToRomaji).join(" / ") || "—"}`].join("\n");
}

function kanjiTableHtml() {
  return `<div class="kanji-table">${cards.map(card => `
    <div class="kanji-row">
      <b>${card.front}</b>
      <span>${card.tableReading || ""}</span>
      <small>${card.tableMeaning || ""}</small>
    </div>
  `).join("")}</div>`;
}

function buildKanaCards() {
  const list = kanaRowsForStudy().flatMap(row => row.cells.map(([r,h,k]) => ({ row: row.id, r, h, k })));
  return list.map((x, i) => ({
    id: `kana-${settings.kana.script}-${settings.kana.rows.join(".")}-${i}`,
    type: "kana", r: x.r,
    front: kanaDisplay(x.h, x.k, i)
  }));
}

function renderKanjiSettings() {
  if ($("kanjiMode")) $("kanjiMode").value = settings.kanji.mode;
}

let kanjiSettingsBound = false;
function bindKanjiSettings() {
  if (kanjiSettingsBound) return;
  kanjiSettingsBound = true;
  $("kanjiSettings")?.addEventListener("change", e => {
    if (e.target.id === "kanjiMode") {
      settings.kanji.mode = e.target.value;
      saveSettings();
      startKanji();
    }
  });
}
function renderKanaSettings() {
  const rows = $("kanaRows");
  if (!rows) return;
  $("kanaScript").value = settings.kana.script;
  $("kanaOrder").value = settings.kana.order;
  $("kanaReverse").checked = settings.kana.reverse;
  rows.innerHTML = [["vowels","あ"], ...MAIN_ROWS.map(r => [r.id,r.label]), ...DAKUTEN_ROWS.map(r => [r.id,r.label]), ["yoon","きゃ"]]
    .map(([id,label]) => `<button class="row-btn ${settings.kana.rows.includes(id) ? "active" : ""}" data-row="${id}" type="button">${label}</button>`).join("");
}
function bindKanaSettings() {
  if (kanaSettingsBound) return;
  kanaSettingsBound = true;
  $("kanaSettings")?.addEventListener("change", e => {
    const id = e.target.id;
    if (id === "kanaScript") settings.kana.script = e.target.value;
    if (id === "kanaOrder") settings.kana.order = e.target.value;
    if (id === "kanaReverse") settings.kana.reverse = e.target.checked;
    saveSettings();
    startKana();
  });
  $("kanaRows")?.addEventListener("click", e => {
    const row = e.target.dataset.row;
    if (!row) return;
    const set = new Set(settings.kana.rows);
    set.has(row) ? set.delete(row) : set.add(row);
    if (!set.size) set.add(row);
    settings.kana.rows = [...set];
    saveSettings();
    startKana();
  });
}

bindGlobal();
applyGlobal();
setupPwaInstall();
renderDictionaryList();
renderCustomPicker();

if (mode === "lesson") {
  const id = new URLSearchParams(location.search).get("dict") || document.body.dataset.dictionary || "lesson7";
  startWords([id]);
}
if (mode === "custom") {
  $("selectAllBtn")?.addEventListener("click", () => document.querySelectorAll("#customList input").forEach(i => i.checked = true));
  $("clearAllBtn")?.addEventListener("click", () => document.querySelectorAll("#customList input").forEach(i => i.checked = false));
  $("startCustomBtn")?.addEventListener("click", () => {
    const ids = selectedCustomIds();
    if (!ids.length) return;
    $("customPicker").hidden = true;
    document.querySelector("[data-trainer]").hidden = false;
    startWords(ids);
  });
}
if (mode === "kana") {
  startKana();
}
if (mode === "kanji") {
  startKanji();
}
