const SETTINGS_KEY = "idjlt.settings.v1";
const SESSION_PREFIX = "idjlt.words.";

const DICTIONARIES = {
  lesson6: {
    title: "6課 単語カード",
    sub: { ru: "Слова из 6 урока.", en: "Lesson 6 vocabulary." },
    href: "lesson6.html",
    cards: [["есть", "to eat", "たべます"], ["пить", "to drink", "のみます"], ["курить сигареты", "to smoke cigarettes", "たばこ を すいます"], ["смотреть, видеть", "to watch / see", "みます"], ["читать", "to read", "よみます"], ["слушать, слышать", "to listen / hear", "ききます"], ["писать", "to write", "かきます"], ["покупать", "to buy", "かいます"], ["делать", "to do", "します"], ["снимать фотографию", "to take a photo", "しゃしん を とります"], ["встречать друга", "to meet a friend", "ともだち に あいます"], ["еда; варёный рис", "meal; cooked rice", "ごはん"], ["завтрак", "breakfast", "あさごはん"], ["обед", "lunch", "ひるごはん"], ["ужин", "dinner", "よるごはん"], ["яйцо", "egg", "たまご"], ["мясо", "meat", "にく"], ["хлеб", "bread", "パン"], ["рыба", "fish", "さかな"], ["алкоголь", "alcohol", "おさけ"], ["овощи", "vegetables", "やさい"], ["табак, сигареты", "tobacco, cigarettes", "たばこ"], ["фрукты", "fruit", "くだもの"], ["письмо", "letter", "てがみ"], ["вода", "water", "みず"], ["доклад", "report", "レポート"], ["молоко", "milk", "ぎゅうにゅう"], ["фотография", "photo", "しゃしん"], ["чай; зелёный чай", "tea; green tea", "おちゃ"], ["видео", "video", "ビデオ"], ["чёрный чай", "black tea", "こうちゃ"], ["магазин", "shop", "みせ"], ["сок", "juice", "ジュース"], ["сад", "garden", "にわ"], ["пиво", "beer", "ビール"], ["домашнее задание", "homework", "しゅくだい"], ["теннис", "tennis", "テニス"], ["футбол", "football / soccer", "サッカー"], ["любование сакурой", "cherry blossom viewing", "おはなみ"], ["что", "what", "なに"], ["вместе", "together", "いっしょに"], ["немного", "a little", "ちょっと"], ["всегда", "always", "いつも"], ["иногда", "sometimes", "ときどき"], ["после, далее, затем", "after that", "それから"]]
  },
  lesson7: {
    title: "7課 単語カード",
    sub: { ru: "Слова из 7 урока.", en: "Lesson 7 vocabulary." },
    href: "lesson7.html",
    cards: [["давать", "to give", "あげます"], ["получать", "to receive", "もらいます"], ["посылать / отправлять", "to send", "おくります"], ["резать / нарезать", "to cut", "きります"], ["брать в долг", "to borrow", "かります"], ["давать в долг", "to lend", "かします"], ["изучать", "to learn", "ならいます"], ["обучать", "to teach", "おしえます"], ["рука, кисть", "hand", "て"], ["звонить по телефону", "to make a phone call", "でんわ を かけます"], ["ножницы", "scissors", "はさみ"], ["персональный компьютер", "personal computer", "パソコン"], ["палочки", "chopsticks", "はし"], ["ложка", "spoon", "スプーン"], ["мобильный телефон", "mobile phone", "ケータイ"], ["электронное письмо", "email", "メール"], ["новогодняя открытка", "New Year's card", "ねんがじょう"], ["дырокол", "hole punch", "パンチ"], ["степлер", "stapler", "ホッチキス"], ["скотч", "adhesive tape", "セロテープ"], ["ластик", "eraser", "けしゴム"], ["билет на транспорт", "ticket", "きっぷ"], ["нож", "knife", "ナイフ"], ["вилка", "fork", "フォーク"], ["бумага", "paper", "かみ"], ["цветок", "flower", "はな"], ["рубашка", "shirt", "シャツ"], ["подарок", "present", "プレゼント"], ["деньги", "money", "おかね"], ["багаж", "luggage", "にもつ"], ["мой отец", "my father", "ちち"], ["Рождество", "Christmas", "クリスマス"], ["моя мать", "my mother", "はは"], ["чей-то отец", "someone's father", "おとうさん"], ["чья-то мать", "someone's mother", "おかあさん"], ["уже", "already", "もう"], ["ещё не", "not yet", "まだ"], ["с этих пор, скоро", "from now, soon", "これから"], ["Как это прекрасно!", "How nice!", "すてきですね"], ["Добро пожаловать", "Welcome", "いらっしゃい"], ["Заходите, пожалуйста", "Please come in", "どうぞ おあがりください"], ["Извините за беспокойство", "Excuse me for disturbing you", "しつれいします"], ["Как насчёт?", "How about?", "いかがですか"], ["Благодарю за угощение", "Thank you for the meal", "ごちそうさまでした"], ["С удовольствием! / Приму", "Thank you for the food", "いただきます"]]
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
  return dict.cards.map((card, id) => ({ id, ru: card[0], en: card[1], jp: card[2] }));
}

function nativeText(card) {
  return settings.lang === "en" ? card.en : card.ru;
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
    $("ru").textContent = nativeText(current);
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
    return `<div class="item">${nativeText(card)} — ${card.jp}</div>`;
  }).join("");
}

function renderTable() {
  const wrap = $("wordTable");
  if (!wrap || !dictionary) return;
  const cards = makeCards(DICTIONARIES[dictionary]);
  const nativeHeader = settings.lang === "en" ? "English" : t("ru");
  wrap.innerHTML = `<table><thead><tr><th>${nativeHeader}</th><th>${t("jp")}</th></tr></thead><tbody>${cards.map(card => `<tr><td>${nativeText(card)}</td><td>${card.jp}</td></tr>`).join("")}</tbody></table>`;
}

bindGlobalControls();
applySettings();
renderDictionaries();
startLesson();
