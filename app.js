const SETTINGS_KEY = "idjlt.settings.v3";
const APP_VERSION = "0.18.1";
const APP_RELEASE_DATE = "2026-06-26";
const APP_REPOSITORY = "https://github.com/Able1337/IDJLT-N5";
const WORD_SESSION_PREFIX = "idjlt.words.";
const KANA_SESSION_KEY = "idjlt.kana.session.v1";
const KANJI_SESSION_PREFIX = "idjlt.kanji.";
const PHRASE_SESSION_PREFIX = "idjlt.phrases.";

const DICTIONARIES = window.IDJLT_DICTIONARIES || [];
const KANJI_DATA = window.IDJLT_KANJI || { singles: [], words: [] };
const PHRASES_DATA = window.IDJLT_PHRASES || [];
const TEXTBOOKS = [
  { id: "mnn1", title: "MNN I - Учебник", pdf: "assets/textbooks/MNN_I_-_Uchebnik.pdf", audioPrefix: "assets/audio/mnn1/", audioCount: 87 },
  { id: "mnn-kanji", title: "MNN Beginner I Kanji", pdf: "assets/textbooks/MNN_Beginner_I_Kanji.pdf" },
  { id: "voronina-kanji", title: "Японские иероглифы — Воронина", pdf: "assets/textbooks/Voronina_N._Yaponskie_ieroglifi.pdf" }
];

const I18N = {
  ru: {
    themeDark: "Тёмная", themeLight: "Светлая", themeOled: "OLED",
    homeTitle: "Тренажёр японского", homeSub: "Выбери режим.",
    wordsMode: "Слова", kanaMode: "Кана", kanjiMode: "Кандзи", phrasesMode: "Фразы", textbooksMode: "Учебники", interviewMode: "Интервью", wordsTitle: "Слова", kanaTitle: "Кана", kanjiTitle: "Кандзи", phrasesTitle: "Фразы", textbooksTitle: "Учебники", interviewTitle: "Интервью",
    wordsModeSub: "Словари и карточки", kanaModeSub: "Хирагана и катакана", kanjiModeSub: "Знаки и сочетания", phrasesModeSub: "Предложения и диалоги", textbooksModeSub: "PDF и аудио", interviewModeSub: "Подготовка к языковой школе",
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
    aboutApp: "О приложении", appVersion: "Версия", releaseDate: "Дата выпуска",
    sourceCode: "Репозиторий GitHub", close: "Закрыть", shareApp: "Поделиться", shareCopied: "Ссылка скопирована",
    appDescription: "Тренажёр японского языка уровня N5 со словами, каной, кандзи, фразами, учебниками и подготовкой к интервью.",
    stacks: "Стопки", table: "Таблица", settings: "Настройки режима",
    showButtons: "Показывать кнопки «Знаю / Не знаю»",
    showRomaji: "Показывать ромаджи",
    tapHint: "тыкни, чтобы показать ответ", tapExamples: "нажми ещё раз, чтобы показать примеры", swipeHint: "свайп вправо — знаю, влево — не знаю",
    chooseHint: "выбери стопку", noItems: "пусто", doneAll: "Все карточки отмечены как известные. Отлично!",
    doneSome: "Неизвестных карточек: {n}. Их можно вернуть в пул и повторить.",
    native: "Русский", jp: "日本語", kana: "Кана", reading: "Чтение",
    script: "Азбука", hiragana: "Хирагана", katakana: "Катакана", bothMix: "Обе, микс", bothTogether: "Обе вместе",
    order: "Порядок", random: "Случайный", sequential: "По порядку", dakuten: "Дакутен", yoon: "Ёон",
    reverseKana: "Обратный квиз", rows: "Ряды",
    kanjiSub: "Карточки для знаков и слов из кандзи.",
    kanjiSet: "Набор", kanjiSets: "Наборы кандзи", kanjiMixed: "Кандзи + слова", kanjiSingles: "Только кандзи", kanjiWords: "Только слова", reverseKanji: "Обратный режим: вспомнить кандзи", cardKanji: "Кандзи", cardWord: "Слово"
    , kunReading: "Японское чтение (кун)", onReading: "Китайское чтение (он)", examples: "Примеры",
    phrasesSub: "Предложения и диалоги из уроков.", textbooksSub: "Открой учебник и слушай аудио рядом с PDF.", direction: "Направление",
    openPdf: "Открыть PDF", cacheTextbook: "Сохранить в кеш", cacheReady: "Сохранено", caching: "Сохраняю...", audioTrack: "Дорожка", audioVolume: "Громкость", playAudio: "Пуск", pauseAudio: "Пауза", previousTrack: "Назад", nextTrack: "Дальше", rewind10: "-10 сек", rewind5: "-5 сек", rewind2: "-2 сек",
    pdfPrev: "←", pdfNext: "→", pdfZoomOut: "−", pdfZoomIn: "+", pdfLoading: "Загружаю PDF...",
    ruToJp: "Русский → японский", jpToRu: "Японский → русский"
  },
  en: {
    themeDark: "Dark", themeLight: "Light", themeOled: "OLED",
    homeTitle: "Japanese trainer", homeSub: "Choose a mode.",
    wordsMode: "Words", kanaMode: "Kana", kanjiMode: "Kanji", phrasesMode: "Phrases", textbooksMode: "Textbooks", interviewMode: "Interview", wordsTitle: "Words", kanaTitle: "Kana", kanjiTitle: "Kanji", phrasesTitle: "Phrases", textbooksTitle: "Textbooks", interviewTitle: "Interview",
    wordsModeSub: "Dictionaries and cards", kanaModeSub: "Hiragana and katakana", kanjiModeSub: "Characters and compounds", phrasesModeSub: "Sentences and dialogues", textbooksModeSub: "PDF and audio", interviewModeSub: "Language school preparation",
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
    aboutApp: "About", appVersion: "Version", releaseDate: "Release date",
    sourceCode: "GitHub repository", close: "Close", shareApp: "Share", shareCopied: "Link copied",
    appDescription: "A Japanese N5 trainer for words, kana, kanji, phrases, textbooks, and interview preparation.",
    stacks: "Stacks", table: "Table", settings: "Mode settings",
    showButtons: "Show Known / Unknown buttons",
    showRomaji: "Show romaji",
    tapHint: "tap to reveal the answer", tapExamples: "tap again to show examples", swipeHint: "swipe right for known, left for unknown",
    chooseHint: "choose a stack", noItems: "empty", doneAll: "All cards are marked as known. Nice!",
    doneSome: "Unknown cards: {n}. Return them to the pool and repeat.",
    native: "English", jp: "日本語", kana: "Kana", reading: "Reading",
    script: "Script", hiragana: "Hiragana", katakana: "Katakana", bothMix: "Both, mixed", bothTogether: "Both together",
    order: "Order", random: "Random", sequential: "Sequential", dakuten: "Dakuten", yoon: "Yoon",
    reverseKana: "Reverse quiz", rows: "Rows",
    kanjiSub: "Cards for kanji characters and kanji words.",
    kanjiSet: "Set", kanjiSets: "Kanji sets", kanjiMixed: "Kanji + words", kanjiSingles: "Kanji only", kanjiWords: "Words only", reverseKanji: "Reverse mode: recall kanji", cardKanji: "Kanji", cardWord: "Word"
    , kunReading: "Japanese reading (kun)", onReading: "Chinese reading (on)", examples: "Examples",
    phrasesSub: "Sentences and dialogues from lessons.", textbooksSub: "Open a textbook and listen to audio next to the PDF.", direction: "Direction",
    openPdf: "Open PDF", cacheTextbook: "Save to cache", cacheReady: "Saved", caching: "Saving...", audioTrack: "Track", audioVolume: "Volume", playAudio: "Play", pauseAudio: "Pause", previousTrack: "Previous", nextTrack: "Next", rewind10: "-10 sec", rewind5: "-5 sec", rewind2: "-2 sec",
    pdfPrev: "←", pdfNext: "→", pdfZoomOut: "−", pdfZoomIn: "+", pdfLoading: "Loading PDF...",
    ruToJp: "English → Japanese", jpToRu: "Japanese → English"
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
settings.phrases ||= { direction: "native-jp" };
settings.kanji = { mode: "single", reverse: false, ...(settings.kanji || {}) };
settings.audioVolume ??= 1;
let session = null;
let cards = [];
let current = null;
let shown = false;
let examplesShown = false;
let expandedKanjiTableId = null;
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
      audioVolume: 1,
      kana: { script: "hiragana", order: "random", dakuten: false, yoon: false, reverse: false, rows: ["vowels","k","s","t","n","h","m","y","r","w"] },
      kanji: { mode: "mixed", reverse: false },
      phrases: { direction: "native-jp" },
      ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}")
    };
  } catch {
    return { theme: "dark", lang: "ru", showButtons: false, showRomaji: true, audioVolume: 1, kana: { script: "hiragana", order: "random", dakuten: false, yoon: false, reverse: false, rows: ["vowels","k","s","t","n","h","m","y","r","w"] }, kanji: { mode: "mixed", reverse: false }, phrases: { direction: "native-jp" } };
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
  updateAppInfoUi();
}

function bindGlobal() {
  $("themeSelect")?.addEventListener("change", e => { settings.theme = e.target.value; saveSettings(); applyGlobal(); });
  $("langSelect")?.addEventListener("change", e => { settings.lang = e.target.value; saveSettings(); applyGlobal(); renderDictionaryList(); renderCustomPicker(); renderKanjiSetMenu(); renderKanjiCustomPicker(); renderPhraseSetMenu(); renderPhraseCustomPicker(); if (currentKind === "kanji") { renderKanjiTitle(); renderKanjiSettings(); } if (currentKind === "phrase") renderPhraseTitle(); if (mode === "textbooks") renderTextbookPicker(); renderTable(currentKind); renderMode(); });
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
function updateAppInfoUi() {
  const share = $("shareAppBtn");
  if (share && !share.dataset.feedback) {
    share.title = t("shareApp");
    share.setAttribute("aria-label", t("shareApp"));
  }
  const btn = $("appInfoBtn");
  if (btn) {
    btn.title = t("aboutApp");
    btn.setAttribute("aria-label", t("aboutApp"));
  }
  const close = $("appInfoClose");
  if (close) close.setAttribute("aria-label", t("close"));
}
function copyShareLink() {
  const url = location.href;
  const legacyCopy = () => {
    const input = document.createElement("textarea");
    input.value = url;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    return copied ? Promise.resolve() : Promise.reject(new Error("Copy failed"));
  };
  return navigator.clipboard?.writeText ? navigator.clipboard.writeText(url).catch(legacyCopy) : legacyCopy();
}
function showShareFeedback() {
  const btn = $("shareAppBtn");
  if (!btn) return;
  btn.dataset.feedback = "1";
  btn.textContent = "✓";
  btn.title = t("shareCopied");
  btn.setAttribute("aria-label", t("shareCopied"));
  window.setTimeout(() => {
    btn.textContent = "↗";
    delete btn.dataset.feedback;
    updateAppInfoUi();
  }, 1600);
}
function setupShare() {
  const toolbar = document.querySelector(".toolbar");
  if (!toolbar || $("shareAppBtn")) return;
  const btn = document.createElement("button");
  btn.id = "shareAppBtn";
  btn.className = "info-btn";
  btn.type = "button";
  btn.textContent = "↗";
  toolbar.appendChild(btn);
  btn.addEventListener("click", async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, text: t("appDescription"), url: location.href });
      } else {
        await copyShareLink();
        showShareFeedback();
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
      await copyShareLink().catch(() => {});
      showShareFeedback();
    }
  });
  updateAppInfoUi();
}
function setupAppInfo() {
  const toolbar = document.querySelector(".toolbar");
  if (!toolbar || $("appInfoBtn")) return;
  const btn = document.createElement("button");
  btn.id = "appInfoBtn";
  btn.className = "info-btn";
  btn.type = "button";
  btn.textContent = "i";
  toolbar.appendChild(btn);

  const dialog = document.createElement("dialog");
  dialog.id = "appInfoDialog";
  dialog.className = "settings-dialog app-info-dialog";
  dialog.innerHTML = `
    <div class="dialog-head">
      <h2 data-i18n="aboutApp">${t("aboutApp")}</h2>
      <button class="info-close" id="appInfoClose" type="button">×</button>
    </div>
    <p data-i18n="appDescription">${t("appDescription")}</p>
    <dl class="version-list">
      <div><dt data-i18n="appVersion">${t("appVersion")}</dt><dd>v${APP_VERSION}</dd></div>
      <div><dt data-i18n="releaseDate">${t("releaseDate")}</dt><dd>${APP_RELEASE_DATE}</dd></div>
    </dl>
    <a class="btn secondary wide app-repo-link" href="${APP_REPOSITORY}" target="_blank" rel="noopener" data-i18n="sourceCode">${t("sourceCode")}</a>
  `;
  document.body.appendChild(dialog);
  btn.addEventListener("click", () => dialog.showModal());
  $("appInfoClose").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", e => {
    if (e.target === dialog) dialog.close();
  });
  updateAppInfoUi();
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

function kanjiSetCardCount(set) {
  return new Set([...(set.singleIds || []), ...(set.wordIds || [])]).size;
}

function renderKanjiSetMenu() {
  const list = $("kanjiSetMenu");
  if (!list) return;
  if (currentKind !== "kanji" && $("lessonTitle")) $("lessonTitle").textContent = t("kanjiTitle");
  const multiSub = settings.lang === "en" ? "Choose several kanji sets and launch one shared pool." : "Выбери несколько наборов кандзи и запускай общий пул.";
  list.innerHTML = `
    <a class="lesson custom-lesson" href="kanji.html?custom=1">
      <h2>${t("customTitle")}</h2><p>${multiSub}</p><p>${t("open")}</p>
    </a>
    ${kanjiSets().map(set => `<a class="lesson" href="kanji.html?set=${encodeURIComponent(set.id)}"><h2>${escapeHtml(kanjiSetTitle(set))}</h2><p>${kanjiSetCardCount(set)} ${t("cards")}</p><p>${t("open")}</p></a>`).join("")}
  `;
}

function renderKanjiCustomPicker() {
  const picker = $("kanjiCustomPicker");
  if (!picker) return;
  if (!$("kanjiCustomList")) {
    picker.innerHTML = `
      <div class="actions">
        <button class="small secondary" id="kanjiCustomSelectAllBtn" type="button" data-i18n="selectAll">${t("selectAll")}</button>
        <button class="small secondary" id="kanjiCustomClearAllBtn" type="button" data-i18n="clearAll">${t("clearAll")}</button>
      </div>
      <div class="pick-list" id="kanjiCustomList"></div>
      <button class="primary wide" id="startKanjiCustomBtn" type="button" data-i18n="start">${t("start")}</button>
    `;
  }
  const list = $("kanjiCustomList");
  list.innerHTML = kanjiSets().map(set => `
    <label class="pick-row"><input type="checkbox" value="${escapeHtml(set.id)}" checked> <span>${escapeHtml(kanjiSetTitle(set))}</span><small>${kanjiSetCardCount(set)}</small></label>
  `).join("");
}

function selectedKanjiCustomIds() {
  return [...document.querySelectorAll("#kanjiCustomList input:checked")].map(input => input.value);
}

function phraseSets() {
  const grouped = new Map();
  PHRASES_DATA.forEach(item => {
    const match = item.id.match(/^lesson(\d+)-/);
    const id = item.setId || (match ? `lesson${match[1]}` : "other");
    if (!grouped.has(id)) grouped.set(id, { items: [], title: item.setTitle || null });
    const group = grouped.get(id);
    if (!group.title && item.setTitle) group.title = item.setTitle;
    group.items.push(item);
  });
  return [...grouped.entries()].map(([id, group]) => ({
    id,
    title: group.title || (id === "other" ? { ru: "Другое", en: "Other" } : { ru: `Урок ${id.replace("lesson", "")}`, en: `Lesson ${id.replace("lesson", "")}` }),
    items: group.items
  })).sort((a, b) => {
    const an = Number(a.id.match(/^lesson(\d+)/)?.[1]) || 999;
    const bn = Number(b.id.match(/^lesson(\d+)/)?.[1]) || 999;
    return an - bn || a.id.localeCompare(b.id);
  });
}

function phraseSetTitle(set) {
  return set.title?.[settings.lang] || set.title?.ru || set.id;
}

function phraseSetById(id) {
  return phraseSets().find(set => set.id === id);
}

function selectedPhraseSetIds() {
  const valid = new Set(phraseSets().map(set => set.id));
  const saved = Array.isArray(settings.phrases.setIds) ? settings.phrases.setIds.filter(id => valid.has(id)) : [];
  return saved.length ? saved : [...valid];
}

function renderPhraseSetMenu() {
  const list = $("phraseSetMenu");
  if (!list) return;
  if (currentKind !== "phrase" && $("lessonTitle")) $("lessonTitle").textContent = t("phrasesTitle");
  const multiSub = settings.lang === "en" ? "Choose several phrase sets and launch one shared pool." : "Выбери несколько наборов фраз и запускай общий пул.";
  list.innerHTML = `
    <a class="lesson custom-lesson" href="phrases.html?custom=1">
      <h2>${t("customTitle")}</h2><p>${multiSub}</p><p>${t("open")}</p>
    </a>
    ${phraseSets().map(set => `<a class="lesson" href="phrases.html?set=${encodeURIComponent(set.id)}"><h2>${escapeHtml(phraseSetTitle(set))}</h2><p>${set.items.length} ${t("cards")}</p><p>${t("open")}</p></a>`).join("")}
  `;
}

function renderPhraseCustomPicker() {
  const picker = $("phraseCustomPicker");
  if (!picker) return;
  if (!$("phraseCustomList")) {
    picker.innerHTML = `
      <div class="actions">
        <button class="small secondary" id="phraseCustomSelectAllBtn" type="button" data-i18n="selectAll">${t("selectAll")}</button>
        <button class="small secondary" id="phraseCustomClearAllBtn" type="button" data-i18n="clearAll">${t("clearAll")}</button>
      </div>
      <div class="pick-list" id="phraseCustomList"></div>
      <button class="primary wide" id="startPhraseCustomBtn" type="button" data-i18n="start">${t("start")}</button>
    `;
  }
  const list = $("phraseCustomList");
  list.innerHTML = phraseSets().map(set => `
    <label class="pick-row"><input type="checkbox" value="${escapeHtml(set.id)}" checked> <span>${escapeHtml(phraseSetTitle(set))}</span><small>${set.items.length}</small></label>
  `).join("");
}

function selectedPhraseCustomIds() {
  return [...document.querySelectorAll("#phraseCustomList input:checked")].map(input => input.value);
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

function normalizeStudyKey(value) {
  return String(value || "").replace(/\s+/g, "").toLowerCase();
}

function wordCardsFor(ids) {
  const unique = new Map();
  ids.forEach(id => {
    const dict = dictionaryById(id);
    if (!dict) return;
    dict.cards.forEach(card => {
      const key = normalizeStudyKey(card.jp) || normalizeStudyKey(card.romaji) || normalizeStudyKey(card.ru);
      if (!unique.has(key)) unique.set(key, { ...card, source: dictTitle(dict) });
    });
  });
  return [...unique.values()];
}

function startWords(ids) {
  currentKind = "word";
  shown = false;
  examplesShown = false;
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
  shown = false;
  examplesShown = false;
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

function startKanji(setIdsOverride = null) {
  currentKind = "kanji";
  shown = false;
  examplesShown = false;
  ensureTrainerMarkup("kanji");
  const setIds = setIdsOverride?.length ? setIdsOverride : selectedKanjiSetIds();
  settings.kanji.setIds = setIds;
  saveSettings();
  cards = buildKanjiCards(setIds);
  const key = `${KANJI_SESSION_PREFIX}${settings.kanji.mode}.${setIds.join("+")}.${settings.kanji.reverse ? "reverse" : "normal"}`;
  session = loadSession(key, cards);
  if (session.current === null && !session.done) nextCard();
  bindTrainer("kanji");
  renderKanjiTitle(setIds);
  renderKanjiSettings();
  renderTable("kanji");
  renderMode();
}

function phraseCardsFor(setIds) {
  const unique = new Map();
  setIds.forEach(id => {
    const set = phraseSetById(id);
    if (!set) return;
    set.items.forEach(item => {
      const key = normalizeStudyKey(item.jp) || normalizeStudyKey(item.ru);
      if (!unique.has(key)) unique.set(key, { ...item, type: "phrase", source: phraseSetTitle(set) });
    });
  });
  return [...unique.values()];
}

function startPhrases(setIdsOverride = null) {
  currentKind = "phrase";
  shown = false;
  examplesShown = false;
  ensureTrainerMarkup("phrase");
  const setIds = setIdsOverride?.length ? setIdsOverride : selectedPhraseSetIds();
  settings.phrases.setIds = setIds;
  saveSettings();
  cards = phraseCardsFor(setIds);
  const key = `${PHRASE_SESSION_PREFIX}${settings.phrases.direction}.${setIds.join("+")}`;
  session = loadSession(key, cards);
  if (session.current === null && !session.done) nextCard();
  bindTrainer("phrase");
  renderPhraseTitle(setIds);
  renderPhraseSettings();
  renderTable("phrase");
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
        <div class="card-inner"><div class="card-kind" id="cardKind"></div><div class="ru" id="ru"></div><div class="jp" id="jp"></div><div class="romaji" id="romaji"></div><div class="kanji-examples" id="kanjiExamples"></div><div class="hint" id="hint"></div></div>
      </article>
      <div class="buttons" id="answerButtons"><button class="dont" id="dontBtn" data-i18n="unknown">${t("unknown")}</button><button class="know" id="knowBtn" data-i18n="known">${t("known")}</button></div>
    </section>
    <section class="done" id="done"><h2 data-i18n="roundDone">${t("roundDone")}</h2><p id="doneText"></p><div class="actions"><button class="primary" id="repeatUnknownBtn" data-i18n="repeatUnknown">${t("repeatUnknown")}</button><button class="restart" id="fullRestartBtn" data-i18n="restartAll">${t("restartAll")}</button></div></section>
    <details class="bottom-panel" open><summary data-i18n="stacks">${t("stacks")}</summary><div class="stacks"><div class="stack"><h3 data-i18n="known">${t("known")}</h3><div class="items" id="knownList"></div></div><div class="stack"><h3 data-i18n="unknown">${t("unknown")}</h3><div class="items" id="unknownList"></div></div></div></details>
    <details class="bottom-panel"><summary data-i18n="table">${t("table")}</summary><div class="table-wrap" id="wordTable"></div></details>
    <details class="bottom-panel"><summary data-i18n="settings">${t("settings")}</summary><div class="mode-settings" id="${kind === "kana" ? "kanaSettings" : kind === "kanji" ? "kanjiSettings" : kind === "phrase" ? "phraseSettings" : "wordSettings"}"></div></details>
  `;
  const settingsBox = kind === "kana" ? $("kanaSettings") : kind === "kanji" ? $("kanjiSettings") : kind === "phrase" ? $("phraseSettings") : $("wordSettings");
  settingsBox.innerHTML = kind === "kana" ? kanaSettingsHtml() : kind === "kanji" ? kanjiSettingsHtml() : kind === "phrase" ? phraseSettingsHtml() : wordSettingsHtml();
  applyGlobal();
  if (kind === "kana") bindKanaSettings();
  if (kind === "kanji") bindKanjiSettings();
  if (kind === "phrase") bindPhraseSettings();
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
    <label class="check"><input type="checkbox" id="kanjiReverse"> <span data-i18n="reverseKanji">${t("reverseKanji")}</span></label>
    <label class="check"><input type="checkbox" id="showRomajiSetting"> <span data-i18n="showRomaji">${t("showRomaji")}</span></label>
    <label class="check"><input type="checkbox" id="showButtonsSetting"> <span data-i18n="showButtons">${t("showButtons")}</span></label>
  `;
}
function phraseSettingsHtml() {
  return `
    <label><span data-i18n="direction">${t("direction")}</span><select id="phraseDirection"><option value="native-jp" data-i18n="ruToJp">${t("ruToJp")}</option><option value="jp-native" data-i18n="jpToRu">${t("jpToRu")}</option></select></label>
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
  examplesShown = false;
  session.done = false;
  saveSession();
}
function finishRound() { session.done = true; session.current = null; current = null; shown = false; examplesShown = false; saveSession(); }
function reveal() {
  if (!current) return;
  if (!shown) shown = true;
  else if (currentKind === "kanji" && current.examples?.length && !examplesShown) examplesShown = true;
  else return;
  renderMode();
}
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
function renderKanjiTitle(setIds = selectedKanjiSetIds()) {
  const title = $("lessonTitle");
  const sub = $("lessonSub");
  if (title) title.textContent = setIds.length === 1 ? kanjiSetTitle(kanjiSetById(setIds[0])) : t("customTitle");
  if (sub) sub.textContent = setIds.length === 1 ? `${t("kanjiSub")} ${cards.length} ${t("cards")}` : `${setIds.length} · ${cards.length} ${t("cards")}`;
}
function renderPhraseTitle(setIds = selectedPhraseSetIds()) {
  const title = $("lessonTitle");
  const sub = $("lessonSub");
  if (title) title.textContent = setIds.length === 1 ? phraseSetTitle(phraseSetById(setIds[0])) : t("customTitle");
  if (sub) sub.textContent = setIds.length === 1 ? `${t("phrasesSub")} ${cards.length} ${t("cards")}` : `${setIds.length} · ${cards.length} ${t("cards")}`;
}
function frontText(card) {
  if (card.type === "kana") return settings.kana.reverse ? card.r : card.front;
  if (card.type === "kanji-single" || card.type === "kanji-word") {
    if (!settings.kanji.reverse) return card.front;
    if (card.type === "kanji-word") return settings.lang === "en" ? card.reverseFrontEn : card.reverseFrontRu;
    return nativeKanjiMeaning(card.sourceItem);
  }
  if (card.type === "phrase") return settings.phrases.direction === "jp-native" ? card.jp : nativeText(card);
  return nativeText(card);
}
function answerText(card) {
  if (card.type === "kana") return settings.kana.reverse ? card.front : card.r;
  if (card.type === "kanji-single") return settings.kanji.reverse ? card.reverseAnswer : kanjiSingleAnswer(card.sourceItem);
  if (card.type === "kanji-word") return settings.kanji.reverse ? card.reverseAnswer : [card.sourceItem.reading, nativeKanjiText(card.sourceItem)].filter(Boolean).join("\n");
  if (card.type === "phrase") return settings.phrases.direction === "jp-native" ? nativeText(card) : card.jp;
  return card.jp;
}
function kanjiExamplesText(card) {
  return (card.examples || []).map(example => {
    const translation = settings.lang === "en" ? example.en || example.ru : example.ru;
    return `${example.term}${example.reading ? " · " + example.reading : ""}${translation ? "\n" + translation : ""}`;
  }).join("\n\n");
}
function nativeText(card) { return settings.lang === "en" ? card.en : card.ru; }

function renderMode() {
  if (!session) return;
  current = session.current === null ? null : cardById(session.current);
  if (session.done) setCardFocus(false, true);
  $("game").style.display = session.done ? "none" : "block";
  $("done").style.display = session.done ? "block" : "none";
  $("card")?.classList.toggle("kanji-card", currentKind === "kanji");
  $("card")?.classList.toggle("kanji-reverse", currentKind === "kanji" && settings.kanji.reverse);
  $("card")?.classList.toggle("phrase-card", currentKind === "phrase");
  $("left").textContent = session.pool.length + (current ? 1 : 0);
  $("knownCount").textContent = session.known.length;
  $("unknownCount").textContent = session.unknown.length;
  $("round").textContent = session.round;
  if (current) {
    const isSingleKanji = current.type === "kanji-single";
    $("cardKind").textContent = currentKind === "kanji" ? t(isSingleKanji ? "cardKanji" : "cardWord") : "";
    $("cardKind").style.display = currentKind === "kanji" ? "inline-flex" : "none";
    $("ru").textContent = frontText(current);
    $("jp").textContent = answerText(current);
    $("jp").style.display = shown ? "block" : "none";
    $("romaji").textContent = (currentKind === "word" || currentKind === "kanji" || currentKind === "phrase") && current.romaji ? current.romaji : "";
    $("romaji").style.display = shown && (currentKind === "word" || currentKind === "kanji" || currentKind === "phrase") && settings.showRomaji && current.romaji ? "block" : "none";
    $("kanjiExamples").textContent = currentKind === "kanji" ? kanjiExamplesText(current) : "";
    $("kanjiExamples").style.display = currentKind === "kanji" && examplesShown && current.examples?.length ? "block" : "none";
    const canShowExamples = currentKind === "kanji" && current.examples?.length && !examplesShown;
    $("hint").textContent = !shown ? t("tapHint") : canShowExamples ? t("tapExamples") : (settings.showButtons ? t("chooseHint") : t("swipeHint"));
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
    bindKanjiTableExamples(wrap);
  } else {
    wrap.innerHTML = `<table><thead><tr><th>${t("native")}</th><th>${t("jp")}</th></tr></thead><tbody>${cards.map(c => `<tr><td>${nativeText(c)}</td><td>${c.jp}</td></tr>`).join("")}</tbody></table>`;
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
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

function kanjiSets() {
  const fallback = {
    id: "all",
    title: { ru: "Все кандзи", en: "All kanji" },
    singleIds: KANJI_DATA.singles.map(item => item.id),
    wordIds: KANJI_DATA.words.map(item => item.id)
  };
  const sets = KANJI_DATA.sets?.length ? KANJI_DATA.sets : [fallback];
  const seen = new Set();
  return sets.filter(set => {
    const key = [...new Set([...(set.singleIds || []), ...(set.wordIds || [])])].sort().join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function kanjiSetTitle(set) {
  return typeof set.title === "string" ? set.title : set.title?.[settings.lang] || set.title?.ru || set.id;
}

function kanjiSetById(id) {
  return kanjiSets().find(set => set.id === id);
}

function selectedKanjiSetIds() {
  const valid = new Set(kanjiSets().map(set => set.id));
  const saved = Array.isArray(settings.kanji.setIds) ? settings.kanji.setIds.filter(id => valid.has(id)) : [];
  return saved.length ? saved : [...valid];
}

function buildKanjiCards(setIds = selectedKanjiSetIds()) {
  const activeSets = setIds.map(kanjiSetById).filter(Boolean);
  const singleIds = new Set(activeSets.flatMap(set => set.singleIds || []));
  const wordIds = new Set(activeSets.flatMap(set => set.wordIds || []));
  const kanjiCharacters = new Set(KANJI_DATA.singles.map(item => item.kanji));
  const singleCards = KANJI_DATA.singles.map(item => ({
    id: item.id,
    type: "kanji-single",
    sourceItem: item,
    front: item.kanji,
    answer: kanjiSingleAnswer(item),
    reverseAnswer: [item.kanji, kanjiShortReadings(item)].filter(Boolean).join("\n"),
    romaji: kanjiReadingRomaji(item),
    examples: item.examples || [],
    tableReading: kanjiShortReadings(item),
    tableMeaning: nativeKanjiMeaning(item)
  }));
  const wordCards = KANJI_DATA.words.map(item => {
    const characters = [...item.term].filter(character => kanjiCharacters.has(character));
    const relatedExamples = KANJI_DATA.words
      .filter(other => other.id !== item.id && characters.some(character => other.term.includes(character)))
      .slice(0, 4);
    return {
    id: item.id,
    type: "kanji-word",
    sourceItem: item,
    front: item.term,
    answer: [item.reading, nativeKanjiText(item)].filter(Boolean).join("\n"),
    reverseFrontRu: item.ru,
    reverseFrontEn: item.en || item.ru,
    reverseAnswer: [item.term, item.reading].filter(Boolean).join("\n"),
    romaji: kanaToRomaji(item.reading || ""),
    examples: relatedExamples,
    tableReading: item.reading,
    tableMeaning: nativeKanjiText(item)
    };
  });
  const uniqueCards = (list, keyFn) => [...list.reduce((map, card) => map.has(keyFn(card)) ? map : map.set(keyFn(card), card), new Map()).values()];
  const selectedSingles = uniqueCards(singleCards.filter(card => singleIds.has(card.id)), card => card.front);
  const selectedWords = uniqueCards(wordCards.filter(card => wordIds.has(card.id)), card => card.front);
  if (settings.kanji.mode === "single") return selectedSingles;
  if (settings.kanji.mode === "words") return selectedWords;
  return [...selectedSingles, ...selectedWords];
}

function nativeKanjiText(item) {
  return settings.lang === "en" ? item.en || item.ru : item.ru;
}

function nativeKanjiMeaning(item) {
  return settings.lang === "en" ? item.meaningEn || item.meaning : item.meaning;
}

function kanjiSingleAnswer(item) {
  const lines = [];
  lines.push(`он: ${item.on?.length ? item.on.join(" / ") : "—"}`);
  lines.push(`кун: ${item.kun?.length ? item.kun.join(" / ") : "—"}`);
  if (item.meaning) lines.push(nativeKanjiMeaning(item));
  return lines.join("\n");
}

function kanjiShortReadings(item) {
  return [`он: ${item.on?.length ? item.on.join(" / ") : "—"}`, `кун: ${item.kun?.length ? item.kun.join(" / ") : "—"}`].join("\n");
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
  return [`on: ${(item.on || []).map(kanaToRomaji).join(" / ") || "—"}`, `kun: ${(item.kun || []).map(kanaToRomaji).join(" / ") || "—"}`].join("\n");
}

function kanjiTableHtml() {
  const rowHtml = card => {
    const meaning = card.type === "kanji-single" ? nativeKanjiMeaning(card.sourceItem) : nativeKanjiText(card.sourceItem);
    const examples = kanjiExamplesText(card);
    const hasExamples = Boolean(examples);
    const isOpen = expandedKanjiTableId === card.id;
    return `
    <button class="kanji-row ${isOpen ? "open" : ""}" type="button" ${hasExamples ? `data-kanji-examples="${card.id}" aria-expanded="${isOpen}"` : "disabled"}>
      <b>${escapeHtml(card.front)}</b>
      <span>${escapeHtml(card.tableReading || "")}</span>
      <small>${escapeHtml(meaning || "")}</small>
      ${isOpen && hasExamples ? `<em class="kanji-table-examples">${escapeHtml(examples)}</em>` : ""}
    </button>`;
  };
  const sections = [
    { type: "kanji-single", title: t("cardKanji") },
    { type: "kanji-word", title: t("cardWord") }
  ].map(section => {
    const sectionCards = cards.filter(card => card.type === section.type);
    return sectionCards.length ? `<section class="kanji-table-section"><h3>${section.title}</h3><div class="kanji-table">${sectionCards.map(rowHtml).join("")}</div></section>` : "";
  }).join("");
  return `<div class="kanji-table-sections">${sections}</div>`;
}

function bindKanjiTableExamples(wrap) {
  wrap.onclick = event => {
    const row = event.target.closest("[data-kanji-examples]");
    if (!row) return;
    expandedKanjiTableId = expandedKanjiTableId === row.dataset.kanjiExamples ? null : row.dataset.kanjiExamples;
    renderTable("kanji");
  };
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
  if ($("kanjiReverse")) $("kanjiReverse").checked = settings.kanji.reverse;
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
    if (e.target.id === "kanjiReverse") {
      settings.kanji.reverse = e.target.checked;
      saveSettings();
      startKanji();
    }
  });
}
function renderPhraseSettings() {
  if ($("phraseDirection")) $("phraseDirection").value = settings.phrases.direction;
}

let phraseSettingsBound = false;
function bindPhraseSettings() {
  if (phraseSettingsBound) return;
  phraseSettingsBound = true;
  $("phraseSettings")?.addEventListener("change", e => {
    if (e.target.id === "phraseDirection") {
      settings.phrases.direction = e.target.value;
      saveSettings();
      startPhrases();
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

let activeTextbookId = TEXTBOOKS[0]?.id;
let pdfLibPromise = null;
let pdfDoc = null;
let pdfPage = 1;
let pdfScale = 1;
let pdfRenderToken = 0;
let pdfRenderTask = null;

async function pdfLib() {
  if (!pdfLibPromise) {
    pdfLibPromise = import("./assets/pdfjs/pdf.mjs").then(lib => {
      lib.GlobalWorkerOptions.workerSrc = "./assets/pdfjs/pdf.worker.mjs";
      return lib;
    });
  }
  return pdfLibPromise;
}

function setupTextbooks() {
  const mount = $("textbookMode");
  if (!mount) return;
  mount.innerHTML = `
    <div class="textbook-grid" id="textbookList"></div>
    <section class="textbook-view">
      <div class="textbook-view-head">
        <h2 id="textbookTitle"></h2>
        <div class="textbook-actions">
          <button class="small secondary" id="cacheTextbookBtn" type="button" data-i18n="cacheTextbook">${t("cacheTextbook")}</button>
          <a class="btn small secondary" id="textbookOpenLink" target="_blank" rel="noopener" data-i18n="openPdf">${t("openPdf")}</a>
        </div>
      </div>
      <div class="audio-panel" id="textbookAudioPanel" hidden>
        <label class="track-select"><span data-i18n="audioTrack">${t("audioTrack")}</span><select id="audioTrackSelect"></select></label>
        <div class="track-switch-row">
          <button class="small secondary" id="audioPrev" type="button" data-i18n="previousTrack">${t("previousTrack")}</button>
          <button class="small secondary" id="audioNext" type="button" data-i18n="nextTrack">${t("nextTrack")}</button>
        </div>
        <div class="audio-sticky-controls">
          <div class="audio-progress">
            <span id="audioCurrentTime">0:00</span>
            <input id="audioSeek" type="range" min="0" max="0" step="0.1" value="0" aria-label="Audio progress">
            <span id="audioDuration">0:00</span>
          </div>
          <label class="audio-volume"><span data-i18n="audioVolume">${t("audioVolume")}</span><input id="audioVolume" type="range" min="0" max="1" step="0.05" value="${settings.audioVolume}" aria-label="${t("audioVolume")}"></label>
          <div class="audio-controls">
            <button class="small primary" id="audioPlayPause" type="button" data-i18n="playAudio">${t("playAudio")}</button>
            <button class="small secondary" id="audioBack2" type="button" data-i18n="rewind2">${t("rewind2")}</button>
            <button class="small secondary" id="audioBack5" type="button" data-i18n="rewind5">${t("rewind5")}</button>
            <button class="small secondary" id="audioBack10" type="button" data-i18n="rewind10">${t("rewind10")}</button>
          </div>
        </div>
        <audio id="textbookAudio" preload="metadata"></audio>
      </div>
      <section class="pdf-viewer" id="pdfViewer" aria-label="PDF">
        <div class="pdf-toolbar">
          <button class="small secondary" id="pdfPrev" type="button" data-i18n="pdfPrev">${t("pdfPrev")}</button>
          <label class="pdf-page-jump"><input id="pdfPageInput" type="number" min="1" inputmode="numeric" aria-label="PDF page"><span id="pdfPageTotal">/ PDF</span></label>
          <button class="small secondary" id="pdfNext" type="button" data-i18n="pdfNext">${t("pdfNext")}</button>
        </div>
        <div class="pdf-canvas-wrap"><canvas id="pdfCanvas"></canvas><div class="pdf-status" id="pdfStatus" data-i18n="pdfLoading">${t("pdfLoading")}</div></div>
      </section>
    </section>
  `;
  renderTextbookPicker();
  bindTextbooks();
  showTextbook(activeTextbookId);
}

function renderTextbookPicker() {
  const list = $("textbookList");
  if (!list) return;
  list.innerHTML = TEXTBOOKS.map(book => `
    <button class="lesson textbook-card ${book.id === activeTextbookId ? "active" : ""}" type="button" data-textbook="${book.id}">
      <h2>${escapeHtml(book.title)}</h2>
      <p>${book.audioCount ? escapeHtml(t("textbooksModeSub")) : escapeHtml(t("openPdf"))}</p>
    </button>
  `).join("");
}

function bindTextbooks() {
  $("textbookList")?.addEventListener("click", event => {
    const card = event.target.closest("[data-textbook]");
    if (card) showTextbook(card.dataset.textbook);
  });
  $("audioTrackSelect")?.addEventListener("change", event => setAudioTrack(Number(event.target.value)));
  $("audioPrev")?.addEventListener("click", () => setAudioTrack(Number($("audioTrackSelect").value) - 1, true));
  $("audioNext")?.addEventListener("click", () => setAudioTrack(Number($("audioTrackSelect").value) + 1, true));
  $("audioPlayPause")?.addEventListener("click", toggleAudioPlayback);
  $("audioBack2")?.addEventListener("click", () => rewindAudio(2));
  $("audioBack10")?.addEventListener("click", () => rewindAudio(10));
  $("audioBack5")?.addEventListener("click", () => rewindAudio(5));
  $("audioSeek")?.addEventListener("input", event => {
    const audio = $("textbookAudio");
    audio.currentTime = Number(event.target.value) || 0;
    renderAudioProgress();
  });
  $("audioVolume")?.addEventListener("input", event => {
    settings.audioVolume = Number(event.target.value);
    saveSettings();
    applyAudioVolume();
  });
  $("textbookAudio")?.addEventListener("loadedmetadata", renderAudioProgress);
  $("textbookAudio")?.addEventListener("timeupdate", renderAudioProgress);
  $("textbookAudio")?.addEventListener("durationchange", renderAudioProgress);
  $("textbookAudio")?.addEventListener("play", renderAudioProgress);
  $("textbookAudio")?.addEventListener("pause", renderAudioProgress);
  $("textbookAudio")?.addEventListener("ended", renderAudioProgress);
  $("cacheTextbookBtn")?.addEventListener("click", cacheActiveTextbook);
  $("pdfPrev")?.addEventListener("click", () => changePdfPage(-1));
  $("pdfNext")?.addEventListener("click", () => changePdfPage(1));
  $("pdfPageInput")?.addEventListener("change", event => goToPdfPage(Number(event.target.value)));
  $("pdfPageInput")?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      goToPdfPage(Number(event.target.value));
      event.target.blur();
    }
  });
  window.addEventListener("resize", () => renderPdfPage());
}

function showTextbook(id) {
  const book = TEXTBOOKS.find(item => item.id === id) || TEXTBOOKS[0];
  if (!book) return;
  activeTextbookId = book.id;
  renderTextbookPicker();
  $("textbookTitle").textContent = book.title;
  $("textbookOpenLink").href = book.pdf;
  loadPdf(book.pdf);
  const cacheBtn = $("cacheTextbookBtn");
  if (cacheBtn) {
    cacheBtn.disabled = false;
    cacheBtn.textContent = t("cacheTextbook");
  }
  const audioPanel = $("textbookAudioPanel");
  audioPanel.hidden = !book.audioCount;
  if (book.audioCount) {
    const select = $("audioTrackSelect");
    if (select.dataset.book !== book.id) {
      select.dataset.book = book.id;
      select.innerHTML = Array.from({ length: book.audioCount }, (_, index) => {
        const n = index + 1;
        return `<option value="${n}">${String(n).padStart(2, "0")}.mp3</option>`;
      }).join("");
      setAudioTrack(1);
    }
  } else if ($("textbookAudio")) {
    $("textbookAudio").pause();
    $("textbookAudio").removeAttribute("src");
    renderAudioProgress();
  }
  applyGlobal();
}

function setAudioTrack(track, play = false) {
  const book = TEXTBOOKS.find(item => item.id === activeTextbookId);
  if (!book?.audioCount) return;
  const clamped = Math.max(1, Math.min(book.audioCount, track || 1));
  const file = `${String(clamped).padStart(2, "0")}.mp3`;
  $("audioTrackSelect").value = String(clamped);
  const audio = $("textbookAudio");
  audio.src = `${book.audioPrefix}${file}`;
  applyAudioVolume();
  renderAudioProgress();
  if (play) audio.play().catch(() => {});
}

function applyAudioVolume() {
  const volume = Math.max(0, Math.min(1, Number(settings.audioVolume ?? 1)));
  const audio = $("textbookAudio");
  if (audio) audio.volume = volume;
  if ($("audioVolume")) $("audioVolume").value = String(volume);
}

async function loadPdf(url) {
  pdfDoc = null;
  pdfPage = 1;
  pdfRenderToken++;
  if (pdfRenderTask) {
    pdfRenderTask.cancel();
    pdfRenderTask = null;
  }
  if ($("pdfStatus")) {
    $("pdfStatus").hidden = false;
    $("pdfStatus").textContent = t("pdfLoading");
  }
  updatePdfToolbar();
  try {
    const lib = await pdfLib();
    pdfDoc = await lib.getDocument(url).promise;
    updatePdfToolbar();
    await renderPdfPage();
  } catch {
    if ($("pdfStatus")) $("pdfStatus").textContent = t("openPdf");
  }
}

async function renderPdfPage() {
  if (!pdfDoc || !$("pdfCanvas")) return;
  const token = ++pdfRenderToken;
  if (pdfRenderTask) {
    pdfRenderTask.cancel();
    pdfRenderTask = null;
  }
  if ($("pdfStatus")) {
    $("pdfStatus").hidden = false;
    $("pdfStatus").textContent = t("pdfLoading");
  }
  try {
    const page = await pdfDoc.getPage(pdfPage);
    if (token !== pdfRenderToken) return;
    const wrap = document.querySelector(".pdf-canvas-wrap");
    const baseViewport = page.getViewport({ scale: 1 });
    const fitScale = wrap ? Math.max(0.5, (wrap.clientWidth - 24) / baseViewport.width) : 1;
    const viewport = page.getViewport({ scale: fitScale * pdfScale });
    const outputScale = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = $("pdfCanvas");
    const context = canvas.getContext("2d");
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;
    pdfRenderTask = page.render({
      canvasContext: context,
      viewport,
      transform: outputScale === 1 ? null : [outputScale, 0, 0, outputScale, 0, 0]
    });
    await pdfRenderTask.promise;
    if (token !== pdfRenderToken) return;
    if ($("pdfStatus")) $("pdfStatus").hidden = true;
    updatePdfToolbar();
  } catch (error) {
    if (error?.name !== "RenderingCancelledException" && $("pdfStatus")) $("pdfStatus").textContent = t("openPdf");
  } finally {
    if (token === pdfRenderToken) pdfRenderTask = null;
  }
}

function updatePdfToolbar() {
  if ($("pdfPageInput")) {
    $("pdfPageInput").disabled = !pdfDoc;
    $("pdfPageInput").max = pdfDoc ? String(pdfDoc.numPages) : "";
    $("pdfPageInput").value = pdfDoc ? String(pdfPage) : "";
  }
  if ($("pdfPageTotal")) $("pdfPageTotal").textContent = pdfDoc ? `/ ${pdfDoc.numPages}` : "/ PDF";
  if ($("pdfPrev")) $("pdfPrev").disabled = !pdfDoc || pdfPage <= 1;
  if ($("pdfNext")) $("pdfNext").disabled = !pdfDoc || pdfPage >= pdfDoc.numPages;
}

function changePdfPage(delta) {
  if (!pdfDoc) return;
  goToPdfPage(pdfPage + delta);
}

function goToPdfPage(page) {
  if (!pdfDoc) return;
  pdfPage = Math.max(1, Math.min(pdfDoc.numPages, page || 1));
  updatePdfToolbar();
  renderPdfPage();
}

function changePdfScale(delta) {
  pdfScale = Math.max(0.7, Math.min(2, pdfScale + delta));
  renderPdfPage();
}

function rewindAudio(seconds) {
  const audio = $("textbookAudio");
  if (!audio?.src) return;
  audio.currentTime = Math.max(0, audio.currentTime - seconds);
  renderAudioProgress();
}

function toggleAudioPlayback() {
  const audio = $("textbookAudio");
  if (!audio?.src) return;
  if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
  renderAudioProgress();
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function renderAudioProgress() {
  const audio = $("textbookAudio");
  const seek = $("audioSeek");
  if (!audio || !seek) return;
  const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
  seek.max = String(duration);
  seek.value = String(Math.min(audio.currentTime || 0, duration || 0));
  if ($("audioCurrentTime")) $("audioCurrentTime").textContent = formatTime(audio.currentTime || 0);
  if ($("audioDuration")) $("audioDuration").textContent = formatTime(duration);
  if ($("audioPlayPause")) $("audioPlayPause").textContent = audio.paused ? t("playAudio") : t("pauseAudio");
  applyAudioVolume();
}

async function cacheActiveTextbook() {
  const book = TEXTBOOKS.find(item => item.id === activeTextbookId);
  const btn = $("cacheTextbookBtn");
  if (!book || !btn || !("caches" in window)) return;
  btn.disabled = true;
  btn.textContent = t("caching");
  try {
    const urls = [book.pdf];
    if (book.audioCount) {
      for (let i = 1; i <= book.audioCount; i++) urls.push(`${book.audioPrefix}${String(i).padStart(2, "0")}.mp3`);
    }
    const cache = await caches.open("idjlt-textbooks-v1");
    await cache.addAll(urls);
    btn.textContent = t("cacheReady");
  } catch {
    btn.disabled = false;
    btn.textContent = t("cacheTextbook");
  }
}

bindGlobal();
setupShare();
setupAppInfo();
applyGlobal();
setupPwaInstall();
renderDictionaryList();
renderCustomPicker();
renderKanjiSetMenu();
renderKanjiCustomPicker();
renderPhraseSetMenu();
renderPhraseCustomPicker();

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
  const params = new URLSearchParams(location.search);
  const setId = params.get("set");
  const custom = params.get("custom") === "1";
  if (setId) {
    const ids = kanjiSetById(setId) ? [setId] : [kanjiSets()[0]?.id].filter(Boolean);
    $("kanjiSetMenu")?.remove();
    $("kanjiCustomPicker")?.remove();
    document.querySelector("[data-trainer]").hidden = false;
    startKanji(ids);
  } else if (custom) {
    $("kanjiSetMenu")?.remove();
    const picker = $("kanjiCustomPicker");
    if ($("lessonTitle")) $("lessonTitle").textContent = t("customTitle");
    if ($("lessonSub")) $("lessonSub").textContent = settings.lang === "en" ? "Choose several kanji sets and launch one shared pool." : "Выбери несколько наборов кандзи и запускай общий пул.";
    if (picker) picker.hidden = false;
    $("kanjiCustomSelectAllBtn")?.addEventListener("click", () => document.querySelectorAll("#kanjiCustomList input").forEach(i => i.checked = true));
    $("kanjiCustomClearAllBtn")?.addEventListener("click", () => document.querySelectorAll("#kanjiCustomList input").forEach(i => i.checked = false));
    $("startKanjiCustomBtn")?.addEventListener("click", () => {
      const ids = selectedKanjiCustomIds();
      if (!ids.length) return;
      picker.hidden = true;
      document.querySelector("[data-trainer]").hidden = false;
      startKanji(ids);
    });
  } else {
    renderKanjiSetMenu();
  }
}
if (mode === "phrases") {
  const params = new URLSearchParams(location.search);
  const setId = params.get("set");
  const custom = params.get("custom") === "1";
  if (setId) {
    const ids = phraseSetById(setId) ? [setId] : [phraseSets()[0]?.id].filter(Boolean);
    $("phraseSetMenu")?.remove();
    $("phraseCustomPicker")?.remove();
    document.querySelector("[data-trainer]").hidden = false;
    startPhrases(ids);
  } else if (custom) {
    $("phraseSetMenu")?.remove();
    const picker = $("phraseCustomPicker");
    if ($("lessonTitle")) $("lessonTitle").textContent = t("customTitle");
    if ($("lessonSub")) $("lessonSub").textContent = settings.lang === "en" ? "Choose several phrase sets and launch one shared pool." : "Выбери несколько наборов фраз и запускай общий пул.";
    if (picker) picker.hidden = false;
    $("phraseCustomSelectAllBtn")?.addEventListener("click", () => document.querySelectorAll("#phraseCustomList input").forEach(i => i.checked = true));
    $("phraseCustomClearAllBtn")?.addEventListener("click", () => document.querySelectorAll("#phraseCustomList input").forEach(i => i.checked = false));
    $("startPhraseCustomBtn")?.addEventListener("click", () => {
      const ids = selectedPhraseCustomIds();
      if (!ids.length) return;
      picker.hidden = true;
      document.querySelector("[data-trainer]").hidden = false;
      startPhrases(ids);
    });
  } else {
    renderPhraseSetMenu();
  }
}
if (mode === "textbooks") {
  setupTextbooks();
}
