const SETTINGS_KEY = "idjlt.settings.v1";
const SESSION_PREFIX = "idjlt.words.";

const DICTIONARIES = {
  lesson6: {
    title: "6課 単語カード",
    sub: { ru: "Слова из 6 урока.", en: "Lesson 6 vocabulary." },
    href: "lesson6.html",
    cards: [["есть", "たべます"], ["пить", "のみます"], ["курить сигареты", "たばこ を すいます"], ["смотреть, видеть", "みます"], ["читать", "よみます"], ["слушать, слышать", "ききます"], ["писать", "かきます"], ["покупать", "かいます"], ["делать", "します"], ["снимать фотографию", "しゃしん を とります"], ["встречать друга", "ともだち に あいます"], ["еда; варёный рис", "ごはん"], ["завтрак", "あさごはん"], ["обед", "ひるごはん"], ["ужин", "よるごはん"], ["яйцо", "たまご"], ["мясо", "にく"], ["хлеб", "パン"], ["рыба", "さかな"], ["алкоголь", "おさけ"], ["овощи", "やさい"], ["табак, сигареты", "たばこ"], ["фрукты", "くだもの"], ["письмо", "てがみ"], ["вода", "みず"], ["доклад", "レポート"], ["молоко", "ぎゅうにゅう"], ["фотография", "しゃしん"], ["чай; зелёный чай", "おちゃ"], ["видео", "ビデオ"], ["чёрный чай", "こうちゃ"], ["магазин", "みせ"], ["сок", "ジュース"], ["сад", "にわ"], ["пиво", "ビール"], ["домашнее задание", "しゅくだい"], ["теннис", "テニス"], ["футбол", "サッカー"], ["любование сакурой", "おはなみ"], ["что", "なに"], ["вместе", "いっしょに"], ["немного", "ちょっと"], ["всегда", "いつも"], ["иногда", "ときどき"], ["после, далее, затем", "それから"]]
  },
  lesson7: {
    title: "7課 単語カード",
    sub: { ru: "Слова из 7 урока.", en: "Lesson 7 vocabulary." },
    href: "lesson7.html",
    cards: [["давать", "あげます"], ["получать", "もらいます"], ["посылать / отправлять", "おくります"], ["резать / нарезать", "きります"], ["брать в долг", "かります"], ["давать в долг", "かします"], ["изучать", "ならいます"], ["обучать", "おしえます"], ["рука, кисть", "て"], ["звонить по телефону", "でんわ を かけます"], ["ножницы", "はさみ"], ["персональный компьютер", "パソコン"], ["палочки", "はし"], ["ложка", "スプーン"], ["мобильный телефон", "ケータイ"], ["электронное письмо", "メール"], ["новогодняя открытка", "ねんがじょう"], ["дырокол", "パンチ"], ["степлер", "ホッチキス"], ["скотч", "セロテープ"], ["ластик", "けしゴム"], ["билет на транспорт", "きっぷ"], ["нож", "ナイフ"], ["вилка", "フォーク"], ["бумага", "かみ"], ["цветок", "はな"], ["рубашка", "シャツ"], ["подарок", "プレゼント"], ["деньги", "おかね"], ["багаж", "にもつ"], ["мой отец", "ちち"], ["Рождество", "クリスマス"], ["моя мать", "はは"], ["чей-то отец", "おとうさん"], ["чья-то мать", "おかあさん"], ["уже", "もう"], ["ещё не", "まだ"], ["с этих пор, скоро", "これから"], ["Как это прекрасно!", "すてきですね"], ["Добро пожаловать", "いらっしゃい"], ["Заходите, пожалуйста", "どうぞ おあがりください"], ["Извините за беспокойство", "しつれいします"], ["Как насчёт?", "いかがですか"], ["Благодарю за угощение", "ごちそうさまでした"], ["С удовольствием! / Приму", "いただきます"]]
  }
};

const I18N = {
  ru: {
    themeDark: "Тёмная", themeLight: "Светлая", themeOled: "OLED", settings: "Настройки", close: "Закрыть",
    showButtons: "Показывать кнопки «Знаю / Не знаю»", homeTitle: "Тренажёр японского",
    homeSub: "Выбери режим. Сейчас доступен режим слов.", wordsMode: "Слова", wordsTitle: "Словари и уроки",
    wordsSub: "Карточки, свайпы, раунды и стопки «знаю / не знаю».", backHome: "← на главную",
    dictTitle: "Словари", dictSub: "Выбери урок. У каждого словаря отдельная HTML-страница, ссылку можно открыть напрямую.",
    open: "Открыть", cards: "карточек", backWords: "← к словарям", left: "Осталось", known: "Знаю",
    unknown: "Не знаю", round: "Раунд", shuffle: "Перемешать", restart: "Сначала", roundDone: "Раунд закончен",
    repeatUnknown: "Повторить «не знаю»", restartAll: "Начать всё заново", stacks: "Стопки", table: "Таблица слов",
    tapHint: "тыкни, чтобы показать ответ", swipeHint: "свайп вправо — знаю, влево — не знаю",
    chooseHint: "выбери стопку", noItems: "пусто", doneAll: "Все карточки отмечены как известные. Отлично!",
    doneSome: "Неизвестных карточек: {n}. Их можно вернуть в пул и повторить.", ru: "Русский", jp: "日本語"
  },
  en: {
    themeDark: "Dark", themeLight: "Light", themeOled: "OLED", settings: "Settings", close: "Close",
    showButtons: "Show Known / Unknown buttons", homeTitle: "Japanese trainer",
    homeSub: "Choose a mode. Word practice is available now.", wordsMode: "Words", wordsTitle: "Dictionaries and lessons",
    wordsSub: "Cards, swipes, rounds, and known / unknown stacks.", backHome: "← home",
    dictTitle: "Dictionaries", dictSub: "Choose a lesson. Every dictionary has its own HTML page for direct links.",
    open: "Open", cards: "cards", backWords: "← dictionaries", left: "Left", known: "Known",
    unknown: "Unknown", round: "Round", shuffle: "Shuffle", restart: "Restart", roundDone: "Round complete",
    repeatUnknown: "Repeat unknown", restartAll: "Start over", stacks: "Stacks", table: "Word table",
    tapHint: "tap to reveal the answer", swipeHint: "swipe right for known, left for unknown",
    chooseHint: "choose a stack", noItems: "empty", doneAll: "All cards are marked as known. Nice!",
    doneSome: "Unknown cards: {n}. Return them to the pool and repeat.", ru: "Russian", jp: "日本語"
  }
};

let settings = loadSettings();
let session = null;
let dictionary = null;
let current = null;
let shown = false;
let drag = null;
let suppressClick = false;

const $ = id => document.getElementById(id);
const t = key => (I18N[settings.lang] && I18N[settings.lang][key]) || I18N.ru[key] || key;

function loadSettings() {
  try {
    return { theme: "dark", lang: "ru", showButtons: false, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
  } catch {
    return { theme: "dark", lang: "ru", showButtons: false };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function sessionKey(id) {
  return SESSION_PREFIX + id;
}

function makeCards(dict) {
  return dict.cards.map((card, id) => ({ id, ru: card[0], jp: card[1] }));
}

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function applySettings() {
  document.body.dataset.theme = settings.theme;
  document.documentElement.lang = settings.lang;
  if ($("themeSelect")) $("themeSelect").value = settings.theme;
  if ($("langSelect")) $("langSelect").value = settings.lang;
  if ($("showButtonsSetting")) $("showButtonsSetting").checked = settings.showButtons;
  document.querySelectorAll("[data-i18n]").forEach(node => {
    const key = node.dataset.i18n;
    if (node.tagName === "OPTION") node.textContent = t(key);
    else node.textContent = t(key);
  });
  if ($("answerButtons")) $("answerButtons").hidden = !settings.showButtons;
  if (dictionary) updateLessonText();
}

function bindGlobalControls() {
  $("themeSelect")?.addEventListener("change", event => {
    settings.theme = event.target.value;
    saveSettings();
    applySettings();
  });
  $("langSelect")?.addEventListener("change", event => {
    settings.lang = event.target.value;
    saveSettings();
    applySettings();
    renderTable();
    render();
    renderDictionaries();
  });
  $("settingsBtn")?.addEventListener("click", () => $("settingsDialog")?.showModal());
  $("showButtonsSetting")?.addEventListener("change", event => {
    settings.showButtons = event.target.checked;
    saveSettings();
    applySettings();
  });
}

function renderDictionaries() {
  const list = $("dictionaryList");
  if (!list) return;
  list.innerHTML = Object.entries(DICTIONARIES).map(([id, dict]) => `
    <a class="lesson" href="${dict.href}">
      <h2>${dict.title}</h2>
      <p>${dict.sub[settings.lang] || dict.sub.ru}</p>
      <p>${dict.cards.length} ${t("cards")} · ${t("open")}</p>
    </a>
  `).join("");
}

function loadSession(id) {
  const cards = makeCards(DICTIONARIES[id]);
  try {
    const saved = JSON.parse(localStorage.getItem(sessionKey(id)) || "null");
    if (saved && saved.version === 1 && saved.total === cards.length) return saved;
  } catch {}
  return {
    version: 1,
    total: cards.length,
    pool: shuffle(cards.map(card => card.id)),
    known: [],
    unknown: [],
    current: null,
    round: 1,
    done: false
  };
}

function saveSession() {
  if (dictionary && session) localStorage.setItem(sessionKey(dictionary), JSON.stringify(session));
}

function startLesson() {
  dictionary = document.body.dataset.dictionary;
  if (!dictionary || !DICTIONARIES[dictionary]) return;
  session = loadSession(dictionary);
  if (session.current === null && !session.done) nextCard();
  updateLessonText();
  bindLessonControls();
  renderTable();
  render();
}

function updateLessonText() {
  const dict = DICTIONARIES[dictionary];
  if (!dict) return;
  if ($("lessonTitle")) $("lessonTitle").textContent = dict.title;
  if ($("lessonSub")) $("lessonSub").textContent = dict.sub[settings.lang] || dict.sub.ru;
}

function cardById(id) {
  return makeCards(DICTIONARIES[dictionary]).find(card => card.id === id);
}

function nextCard() {
  if (session.pool.length === 0) {
    finishRound();
    return;
  }
  session.current = session.pool.pop();
  current = cardById(session.current);
  shown = false;
  session.done = false;
  saveSession();
}

function reveal() {
  if (!current || shown) return;
  shown = true;
  render();
}

function answer(isKnown) {
  if (!shown || !current) return;
  const target = isKnown ? session.known : session.unknown;
  target.push(current.id);
  session.current = null;
  nextCard();
  render();
}

function finishRound() {
  session.done = true;
  session.current = null;
  current = null;
  shown = false;
  saveSession();
}

function repeatUnknown() {
  session.pool = shuffle(session.unknown);
  session.unknown = [];
  session.round += 1;
  session.done = false;
  nextCard();
  render();
}

function restartAll() {
  const cards = makeCards(DICTIONARIES[dictionary]);
  session = {
    version: 1,
    total: cards.length,
    pool: shuffle(cards.map(card => card.id)),
    known: [],
    unknown: [],
    current: null,
    round: 1,
    done: false
  };
  nextCard();
  render();
}

function bindLessonControls() {
  $("card")?.addEventListener("click", event => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    reveal();
  });
  $("card")?.addEventListener("pointerdown", onPointerDown);
  $("card")?.addEventListener("pointermove", onPointerMove);
  $("card")?.addEventListener("pointerup", onPointerUp);
  $("card")?.addEventListener("pointercancel", clearDrag);
  $("knowBtn")?.addEventListener("click", () => answer(true));
  $("dontBtn")?.addEventListener("click", () => answer(false));
  $("shuffleBtn")?.addEventListener("click", () => {
    session.pool = shuffle(session.pool);
    saveSession();
    render();
  });
  $("resetBtn")?.addEventListener("click", restartAll);
  $("fullRestartBtn")?.addEventListener("click", restartAll);
  $("repeatUnknownBtn")?.addEventListener("click", repeatUnknown);
}

function onPointerDown(event) {
  if (!shown || !current) return;
  const card = $("card");
  drag = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, moved: false };
  card.setPointerCapture(event.pointerId);
  card.classList.add("dragging");
}

function onPointerMove(event) {
  if (!drag || event.pointerId !== drag.id) return;
  drag.dx = event.clientX - drag.x;
  const dy = event.clientY - drag.y;
  if (Math.abs(drag.dx) > 8 || Math.abs(dy) > 8) drag.moved = true;
  const card = $("card");
  const rotate = Math.max(-10, Math.min(10, drag.dx / 18));
  card.style.transform = `translateX(${drag.dx}px) rotate(${rotate}deg)`;
  card.classList.toggle("swiping-right", drag.dx > 55);
  card.classList.toggle("swiping-left", drag.dx < -55);
  card.classList.toggle("known-glow", drag.dx > 55);
  card.classList.toggle("unknown-glow", drag.dx < -55);
}

function onPointerUp(event) {
  if (!drag || event.pointerId !== drag.id) return;
  const dx = drag.dx;
  const wasMoved = drag.moved;
  clearDrag();
  suppressClick = wasMoved;
  if (Math.abs(dx) > 96) answer(dx > 0);
}

function clearDrag() {
  const card = $("card");
  if (card) {
    card.classList.remove("dragging", "swiping-left", "swiping-right", "known-glow", "unknown-glow");
    card.style.transform = "";
  }
  drag = null;
}

function render() {
  if (!dictionary || !session) return;
  current = session.current === null ? null : cardById(session.current);
  const game = $("game");
  const done = $("done");
  if (game) game.style.display = session.done ? "none" : "block";
  if (done) done.style.display = session.done ? "block" : "none";
  if ($("left")) $("left").textContent = session.pool.length + (current ? 1 : 0);
  if ($("knownCount")) $("knownCount").textContent = session.known.length;
  if ($("unknownCount")) $("unknownCount").textContent = session.unknown.length;
  if ($("round")) $("round").textContent = session.round;

  if (current) {
    $("ru").textContent = current.ru;
    $("jp").textContent = current.jp;
    $("jp").style.display = shown ? "block" : "none";
    $("hint").textContent = shown ? (settings.showButtons ? t("chooseHint") : t("swipeHint")) : t("tapHint");
  }

  if ($("knowBtn")) $("knowBtn").disabled = !shown;
  if ($("dontBtn")) $("dontBtn").disabled = !shown;
  if ($("knownList")) $("knownList").innerHTML = stackHtml(session.known);
  if ($("unknownList")) $("unknownList").innerHTML = stackHtml(session.unknown);
  if ($("doneText")) {
    $("doneText").textContent = session.unknown.length ? t("doneSome").replace("{n}", session.unknown.length) : t("doneAll");
  }
  if ($("repeatUnknownBtn")) $("repeatUnknownBtn").style.display = session.unknown.length ? "inline-block" : "none";
}

function stackHtml(ids) {
  if (!ids.length) return t("noItems");
  return ids.map(id => {
    const card = cardById(id);
    return `<div class="item">${card.ru} — ${card.jp}</div>`;
  }).join("");
}

function renderTable() {
  const wrap = $("wordTable");
  if (!wrap || !dictionary) return;
  const cards = makeCards(DICTIONARIES[dictionary]);
  wrap.innerHTML = `<table><thead><tr><th>${t("ru")}</th><th>${t("jp")}</th></tr></thead><tbody>${cards.map(card => `<tr><td>${card.ru}</td><td>${card.jp}</td></tr>`).join("")}</tbody></table>`;
}

bindGlobalControls();
applySettings();
renderDictionaries();
startLesson();
