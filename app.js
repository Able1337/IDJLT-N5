"use strict";

const STORAGE_KEY = "jpTrainerState.v1";
const RAW_AUDIO_BASE = "https://raw.githubusercontent.com/Able1337/7-.pdf/main/cd/";

const GROUP_LABELS = {
  lesson1: "Урок 1",
  countries: "Страны",
  lesson2: "Урок 2",
  fruits: "Фрукты",
  lesson3: "Урок 3",
  lesson4: "Урок 4",
  lesson6: "Урок 6",
  lesson7: "Урок 7",
  family_own: "Семья (своя)",
  family_other: "Семья (вежл.)",
  colors: "Цвета",
  food: "Еда и напитки",
  body: "Тело",
  clothes: "Одежда",
  house: "Дом и мебель",
  transport: "Транспорт",
  adj_i: "Прилагательные い",
  adj_na: "Прилагательные な",
  questions: "Вопросы",
  verbs_lesson4: "Глаголы: урок 4",
  verbs_lesson5: "Глаголы: урок 5",
  verbs_motion: "Глаголы: движение",
  verbs_daily: "Глаголы: повседневные",
  verbs_comm: "Глаголы: общение"
};

const GROUP_ORDER = [
  "lesson1",
  "countries",
  "lesson2",
  "fruits",
  "lesson3",
  "lesson4",
  "family_own",
  "family_other",
  "lesson6",
  "lesson7",
  "colors",
  "food",
  "body",
  "clothes",
  "house",
  "transport",
  "adj_i",
  "adj_na",
  "questions",
  "verbs_lesson4",
  "verbs_lesson5",
  "verbs_motion",
  "verbs_daily",
  "verbs_comm"
];

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
  ["kya", "きゃ", "キャ"], ["kyu", "きゅ", "キュ"], ["kyo", "きょ", "キョ"],
  ["sha", "しゃ", "シャ"], ["shu", "しゅ", "シュ"], ["sho", "しょ", "ショ"],
  ["cha", "ちゃ", "チャ"], ["chu", "ちゅ", "チュ"], ["cho", "ちょ", "チョ"],
  ["nya", "にゃ", "ニャ"], ["nyu", "にゅ", "ニュ"], ["nyo", "にょ", "ニョ"],
  ["hya", "ひゃ", "ヒャ"], ["hyu", "ひゅ", "ヒュ"], ["hyo", "ひょ", "ヒョ"],
  ["mya", "みゃ", "ミャ"], ["myu", "みゅ", "ミュ"], ["myo", "みょ", "ミョ"],
  ["rya", "りゃ", "リャ"], ["ryu", "りゅ", "リュ"], ["ryo", "りょ", "リョ"],
  ["gya", "ぎゃ", "ギャ"], ["gyu", "ぎゅ", "ギュ"], ["gyo", "ぎょ", "ギョ"],
  ["ja", "じゃ", "ジャ"], ["ju", "じゅ", "ジュ"], ["jo", "じょ", "ジョ"],
  ["bya", "びゃ", "ビャ"], ["byu", "びゅ", "ビュ"], ["byo", "びょ", "ビョ"],
  ["pya", "ぴゃ", "ピャ"], ["pyu", "ぴゅ", "ピュ"], ["pyo", "ぴょ", "ピョ"]
].map(([r, h, k]) => ({ row: "yoon", r, h, k }));

const state = {
  theme: "dark",
  activeView: "words",
  selectedGroups: [],
  wordFront: "native",
  wordOrder: "random",
  wordRevealed: false,
  wordSession: {
    sourceKey: "",
    poolIds: [],
    knownIds: [],
    unknownIds: [],
    currentId: null,
    round: 1,
    complete: false
  },
  groupStats: {},
  kana: {
    script: "hiragana",
    order: "random",
    dakuten: false,
    yoon: false,
    reverse: false,
    choices: 6,
    rows: ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w"],
    index: 0,
    revealed: false,
    known: 0,
    unknown: 0
  }
};

let allWords = [];
let wordDeck = [];
let kanaDeck = [];
let currentWord = null;
let currentKana = null;

const $ = id => document.getElementById(id);

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    Object.assign(state, saved);
    state.kana = { ...state.kana, ...(saved.kana || {}) };
    state.wordSession = { ...state.wordSession, ...(saved.wordSession || {}) };
    state.groupStats = saved.groupStats || {};
    state.selectedGroups = Array.isArray(saved.selectedGroups) ? saved.selectedGroups : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function parseCsv(text) {
  return text.split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"))
    .map(line => {
      const out = [];
      let cell = "";
      let quoted = false;
      for (const ch of line) {
        if (ch === '"') quoted = !quoted;
        else if (ch === "," && !quoted) {
          out.push(cell.trim());
          cell = "";
        } else {
          cell += ch;
        }
      }
      out.push(cell.trim());
      return out;
    });
}

async function loadWordData() {
  const [vocabText, verbsText, lesson6Text, lesson7Text] = await Promise.all([
    fetch("data/vocab.csv").then(r => r.text()),
    fetch("data/verbs.csv").then(r => r.text()),
    fetch("data/lesson6.csv").then(r => r.text()),
    fetch("data/lesson7.csv").then(r => r.text())
  ]);

  const makeVocab = (text, prefix) => parseCsv(text).map(([group, ru, en, jp, romaji, script], i) => ({
    id: `${prefix}-${group}-${i}`,
    type: "vocab",
    group,
    ru,
    en,
    jp,
    romaji,
    script: script || "h"
  }));

  const vocab = makeVocab(vocabText, "vocab");
  const lesson6 = makeVocab(lesson6Text, "lesson6");
  const lesson7 = makeVocab(lesson7Text, "lesson7");

  const verbs = parseCsv(verbsText).map(([group, ru, en, stem, romajiStem], i) => ({
    id: `verb-${group}-${i}`,
    type: "verb",
    group: `verbs_${group}`,
    ru,
    en,
    jp: `${stem}ます`,
    romaji: `${romajiStem}masu`,
    script: "h"
  }));

  allWords = [...vocab, ...lesson6, ...lesson7, ...verbs];
  allWords.forEach((word, index) => { word.order = index; });
  if (!state.selectedGroups.length) {
    state.selectedGroups = ["lesson7"];
  }
  for (const group of new Set(allWords.map(w => w.group))) {
    if (!state.groupStats[group]) state.groupStats[group] = { known: 0, unknown: 0 };
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function groupLabel(group) {
  return GROUP_LABELS[group] || group.replace(/_/g, " ");
}

function groupRank(group) {
  const index = GROUP_ORDER.indexOf(group);
  return index === -1 ? GROUP_ORDER.length + 100 : index;
}

function selectedWords() {
  const selected = new Set(state.selectedGroups);
  return allWords
    .filter(word => selected.has(word.group))
    .sort((a, b) => groupRank(a.group) - groupRank(b.group) || a.order - b.order);
}

function wordById(id) {
  return allWords.find(word => word.id === id) || null;
}

function makeWordSourceKey() {
  return JSON.stringify({
    groups: [...state.selectedGroups].sort(),
    order: state.wordOrder
  });
}

function orderedWordIds(words) {
  const ids = words.map(word => word.id);
  return state.wordOrder === "random" ? shuffle(ids) : ids;
}

function resetWordSession() {
  const words = selectedWords();
  const ids = orderedWordIds(words);
  state.wordSession = {
    sourceKey: makeWordSourceKey(),
    poolIds: ids,
    knownIds: [],
    unknownIds: [],
    currentId: null,
    round: 1,
    complete: ids.length === 0
  };
  nextWordFromPool();
}

function ensureWordSession() {
  const key = makeWordSourceKey();
  const validIds = new Set(selectedWords().map(word => word.id));
  const sessionIds = [
    ...state.wordSession.poolIds,
    ...state.wordSession.knownIds,
    ...state.wordSession.unknownIds,
    state.wordSession.currentId
  ].filter(Boolean);
  const stale = state.wordSession.sourceKey !== key || sessionIds.some(id => !validIds.has(id));
  if (stale || (!state.wordSession.currentId && !state.wordSession.poolIds.length && !state.wordSession.complete)) {
    resetWordSession();
  } else {
    currentWord = wordById(state.wordSession.currentId);
  }
}

function nextWordFromPool() {
  if (!state.wordSession.poolIds.length) {
    if (state.wordSession.unknownIds.length) {
      state.wordSession.poolIds = state.wordOrder === "random" ? shuffle(state.wordSession.unknownIds) : [...state.wordSession.unknownIds];
      state.wordSession.unknownIds = [];
      state.wordSession.round += 1;
    } else {
      state.wordSession.currentId = null;
      state.wordSession.complete = true;
      currentWord = null;
      state.wordRevealed = false;
      return;
    }
  }

  state.wordSession.currentId = state.wordSession.poolIds.shift() || null;
  state.wordSession.complete = false;
  currentWord = wordById(state.wordSession.currentId);
  state.wordRevealed = false;
}

function rebuildWordDeck() {
  resetWordSession();
}

function renderSets() {
  const list = $("setList");
  const groups = [...new Set(allWords.map(w => w.group))]
    .sort((a, b) => groupRank(a) - groupRank(b) || groupLabel(a).localeCompare(groupLabel(b), "ru"));
  const selected = new Set(state.selectedGroups);
  list.innerHTML = groups.map(group => {
    const count = allWords.filter(w => w.group === group).length;
    const stats = state.groupStats[group] || { known: 0, unknown: 0 };
    return `
      <label class="set-item">
        <input type="checkbox" data-group="${group}" ${selected.has(group) ? "checked" : ""}>
        <span>
          <span class="set-title">${groupLabel(group)} <small>${count}</small></span>
          <span class="set-stats"><span>знаю: <b>${stats.known}</b></span><span>не знаю: <b>${stats.unknown}</b></span></span>
        </span>
      </label>
    `;
  }).join("");
  $("setSummary").textContent = `${state.selectedGroups.length} выбрано, ${selectedWords().length} карточек`;
}

function renderWordCard() {
  ensureWordSession();
  const front = $("cardFront");
  const answer = $("cardAnswer");
  const meta = $("cardGroup");
  const canAnswer = Boolean(currentWord && state.wordRevealed);
  front.classList.remove("jp");
  answer.classList.toggle("shown", state.wordRevealed);
  $("knownBtn").disabled = !canAnswer;
  $("unknownBtn").disabled = !canAnswer;

  if (!currentWord) {
    meta.textContent = "";
    front.textContent = state.wordSession.complete && selectedWords().length ? "Все слова в стопке «Знаю»" : "Выберите набор слов";
    answer.innerHTML = "";
    renderWordPools();
    return;
  }

  const left = state.wordSession.poolIds.length + 1;
  meta.textContent = `${groupLabel(currentWord.group)} · осталось ${left} · раунд ${state.wordSession.round}`;
  if (state.wordFront === "jp") {
    front.classList.add("jp");
    front.textContent = currentWord.jp;
    answer.innerHTML = `<span class="answer-main">${currentWord.ru}</span><span class="answer-sub">${currentWord.en} · ${currentWord.romaji}</span>`;
  } else {
    front.textContent = currentWord.ru;
    answer.innerHTML = `<span class="answer-main">${currentWord.jp}</span><span class="answer-sub">${currentWord.romaji} · ${currentWord.en}</span>`;
  }
  renderWordPools();
}

function advanceWord(mark) {
  if (!currentWord || !state.wordRevealed) return;
  if (mark) {
    const stats = state.groupStats[currentWord.group] || { known: 0, unknown: 0 };
    stats[mark] += 1;
    state.groupStats[currentWord.group] = stats;
    const target = mark === "known" ? state.wordSession.knownIds : state.wordSession.unknownIds;
    target.push(currentWord.id);
  }
  nextWordFromPool();
  saveState();
  renderSets();
  renderWordCard();
}

function renderWordPools() {
  const knownWords = state.wordSession.knownIds.map(wordById).filter(Boolean);
  const unknownWords = state.wordSession.unknownIds.map(wordById).filter(Boolean);
  $("roundSummary").textContent = `Раунд ${state.wordSession.round} · в пуле ${state.wordSession.poolIds.length + (currentWord ? 1 : 0)}`;
  $("knownPoolCount").textContent = knownWords.length;
  $("unknownPoolCount").textContent = unknownWords.length;
  $("knownPoolList").innerHTML = poolHtml(knownWords);
  $("unknownPoolList").innerHTML = poolHtml(unknownWords);
}

function poolHtml(words) {
  if (!words.length) return "пусто";
  return words.map(word => `<div class="pool-item"><strong>${word.ru}</strong><br>${word.jp} · ${word.romaji}</div>`).join("");
}

function buildKanaDeck() {
  const rows = new Set(state.kana.rows);
  const deck = [];
  if (rows.has("vowels")) deck.push(...VOWELS);
  for (const row of MAIN_ROWS) {
    if (rows.has(row.id)) deck.push(...row.cells.map(([r, h, k]) => ({ row: row.id, r, h, k })));
  }
  if (state.kana.dakuten) {
    for (const row of DAKUTEN_ROWS) {
      if (rows.has(row.id) || rows.has("vowels")) deck.push(...row.cells.map(([r, h, k]) => ({ row: row.id, r, h, k })));
    }
  }
  if (state.kana.yoon) deck.push(...YOON);
  kanaDeck = state.kana.order === "random" ? shuffle(deck) : deck;
  state.kana.index = Math.min(state.kana.index, Math.max(kanaDeck.length - 1, 0));
  currentKana = kanaDeck[state.kana.index] || null;
  state.kana.revealed = false;
}

function kanaFrontText(entry) {
  if (!entry) return "";
  if (state.kana.reverse) return entry.r;
  if (state.kana.script === "hiragana") return entry.h;
  if (state.kana.script === "katakana") return entry.k;
  if (state.kana.script === "both_together") return `${entry.h} / ${entry.k}`;
  return Math.random() > .5 ? entry.h : entry.k;
}

function renderKanaRows() {
  const rows = [
    ["vowels", "あ"],
    ...MAIN_ROWS.map(row => [row.id, row.label]),
    ...DAKUTEN_ROWS.map(row => [row.id, row.label]),
    ["yoon", "きゃ"]
  ];
  const selected = new Set(state.kana.rows);
  $("kanaRows").innerHTML = rows.map(([id, label]) => `<button data-row="${id}" class="${selected.has(id) ? "active" : ""}">${label}</button>`).join("");
}

function renderKanaCard() {
  currentKana = kanaDeck[state.kana.index] || null;
  const answer = $("kanaAnswer");
  const front = $("kanaFront");
  const choices = $("kanaChoices");
  answer.classList.toggle("shown", state.kana.revealed);
  choices.innerHTML = "";

  if (!currentKana) {
    $("kanaMeta").textContent = "";
    front.textContent = "Выберите ряды";
    answer.textContent = "";
    return;
  }

  $("kanaMeta").textContent = `${state.kana.index + 1}/${kanaDeck.length} · знаю ${state.kana.known} · не знаю ${state.kana.unknown}`;
  front.textContent = kanaFrontText(currentKana);
  answer.innerHTML = `<span class="answer-main">${currentKana.r}</span><span class="answer-sub">${currentKana.h} · ${currentKana.k}</span>`;

  if (state.kana.reverse) {
    const choiceCount = Math.max(2, Math.min(10, Number(state.kana.choices) || 6));
    const variants = shuffle([currentKana, ...shuffle(kanaDeck.filter(k => k !== currentKana)).slice(0, choiceCount - 1)]);
    choices.innerHTML = variants.map(item => `<button data-r="${item.r}">${state.kana.script === "katakana" ? item.k : item.h}</button>`).join("");
  }
}

function advanceKana(mark) {
  if (!currentKana) return;
  if (mark === "known") state.kana.known += 1;
  if (mark === "unknown") state.kana.unknown += 1;
  state.kana.index = kanaDeck.length ? (state.kana.index + 1) % kanaDeck.length : 0;
  state.kana.revealed = false;
  saveState();
  renderKanaCard();
}

function renderKanaTable() {
  const rows = [
    ["Гласные", VOWELS],
    ...MAIN_ROWS.map(row => [row.label, row.cells.map(([r, h, k]) => ({ r, h, k }))]),
    ...DAKUTEN_ROWS.map(row => [row.label, row.cells.map(([r, h, k]) => ({ r, h, k }))]),
    ["Ёон", YOON]
  ];
  $("tableTitle").textContent = "Таблица каны";
  $("tableContent").innerHTML = `<table><tbody>${rows.map(([label, cells]) => `
    <tr class="group-row"><td colspan="4">${label}</td></tr>
    ${cells.map(c => `<tr><td>${c.h}</td><td>${c.k}</td><td>${c.r}</td><td>${c.row || ""}</td></tr>`).join("")}
  `).join("")}</tbody></table>`;
  $("tableDialog").showModal();
}

function renderWordTable() {
  const words = selectedWords();
  $("tableTitle").textContent = `Выбранные слова: ${words.length}`;
  let lastGroup = "";
  $("tableContent").innerHTML = `<table>
    <thead><tr><th>Набор</th><th>Русский</th><th>日本語</th><th>Romaji</th><th>English</th></tr></thead>
    <tbody>
      ${words.map(word => {
        const groupRow = word.group !== lastGroup ? `<tr class="group-row"><td colspan="5">${groupLabel(word.group)}</td></tr>` : "";
        lastGroup = word.group;
        return `${groupRow}<tr><td>${groupLabel(word.group)}</td><td>${word.ru}</td><td>${word.jp}</td><td>${word.romaji}</td><td>${word.en}</td></tr>`;
      }).join("")}
    </tbody>
  </table>`;
  $("tableDialog").showModal();
}

function applyStateToControls() {
  document.body.dataset.theme = state.theme;
  $("themeSelect").value = state.theme;
  $("wordFront").value = state.wordFront;
  $("wordOrder").value = state.wordOrder;
  $("kanaScript").value = state.kana.script;
  $("kanaOrder").value = state.kana.order;
  $("kanaDakuten").checked = state.kana.dakuten;
  $("kanaYoon").checked = state.kana.yoon;
  $("kanaReverse").checked = state.kana.reverse;
  $("kanaChoicesN").value = String(state.kana.choices || 6);
}

function switchView(view) {
  state.activeView = view;
  document.querySelectorAll(".tab").forEach(tab => tab.classList.toggle("active", tab.dataset.view === view));
  document.querySelectorAll(".view").forEach(node => node.classList.toggle("active", node.id === `${view}View`));
  saveState();
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => switchView(tab.dataset.view)));
  $("themeSelect").addEventListener("change", event => {
    state.theme = event.target.value;
    document.body.dataset.theme = state.theme;
    saveState();
  });

  $("setList").addEventListener("change", event => {
    const group = event.target.dataset.group;
    if (!group) return;
    const selected = new Set(state.selectedGroups);
    event.target.checked ? selected.add(group) : selected.delete(group);
    state.selectedGroups = [...selected];
    rebuildWordDeck();
    saveState();
    renderSets();
    renderWordCard();
  });
  $("selectAllBtn").addEventListener("click", () => {
    const allGroups = [...new Set(allWords.map(w => w.group))];
    state.selectedGroups = state.selectedGroups.length === allGroups.length ? [] : allGroups;
    rebuildWordDeck();
    saveState();
    renderSets();
    renderWordCard();
  });
  $("wordFront").addEventListener("change", event => { state.wordFront = event.target.value; state.wordRevealed = false; saveState(); renderWordCard(); });
  $("wordOrder").addEventListener("change", event => { state.wordOrder = event.target.value; rebuildWordDeck(); saveState(); renderWordCard(); });
  $("wordCard").addEventListener("click", () => { state.wordRevealed = true; saveState(); renderWordCard(); });
  $("knownBtn").addEventListener("click", () => advanceWord("known"));
  $("unknownBtn").addEventListener("click", () => advanceWord("unknown"));
  $("wordTableBtn").addEventListener("click", renderWordTable);
  $("resetWordsBtn").addEventListener("click", () => {
    state.groupStats = {};
    for (const group of new Set(allWords.map(w => w.group))) state.groupStats[group] = { known: 0, unknown: 0 };
    resetWordSession();
    saveState();
    renderSets();
    renderWordCard();
  });

  $("kanaRows").addEventListener("click", event => {
    const row = event.target.dataset.row;
    if (!row) return;
    const rows = new Set(state.kana.rows);
    rows.has(row) ? rows.delete(row) : rows.add(row);
    state.kana.rows = [...rows];
    buildKanaDeck();
    saveState();
    renderKanaRows();
    renderKanaCard();
  });
  for (const [id, key] of [["kanaScript", "script"], ["kanaOrder", "order"]]) {
    $(id).addEventListener("change", event => { state.kana[key] = event.target.value; buildKanaDeck(); saveState(); renderKanaCard(); });
  }
  $("kanaChoicesN").addEventListener("change", event => {
    state.kana.choices = Number(event.target.value) || 6;
    saveState();
    renderKanaCard();
  });
  for (const [id, key] of [["kanaDakuten", "dakuten"], ["kanaYoon", "yoon"], ["kanaReverse", "reverse"]]) {
    $(id).addEventListener("change", event => { state.kana[key] = event.target.checked; buildKanaDeck(); saveState(); renderKanaCard(); });
  }
  $("kanaCard").addEventListener("click", event => {
    if (event.target.closest(".choice-grid")) return;
    state.kana.revealed = true;
    saveState();
    renderKanaCard();
  });
  $("kanaChoices").addEventListener("click", event => {
    const r = event.target.dataset.r;
    if (!r) return;
    advanceKana(r === currentKana.r ? "known" : "unknown");
  });
  $("kanaRevealBtn").addEventListener("click", () => { state.kana.revealed = true; saveState(); renderKanaCard(); });
  $("kanaKnownBtn").addEventListener("click", () => advanceKana("known"));
  $("kanaUnknownBtn").addEventListener("click", () => advanceKana("unknown"));
  $("kanaTableBtn").addEventListener("click", renderKanaTable);
  $("resetKanaBtn").addEventListener("click", () => { state.kana.known = 0; state.kana.unknown = 0; state.kana.index = 0; buildKanaDeck(); saveState(); renderKanaCard(); });

  $("closeTableBtn").addEventListener("click", () => $("tableDialog").close());
  $("exportBtn").addEventListener("click", exportSave);
  $("importInput").addEventListener("change", importSave);
  bindBooks();
}

function bindBooks() {
  document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".book-btn").forEach(item => item.classList.toggle("active", item === btn));
      $("pdfFrame").src = btn.dataset.pdf;
    });
  });
  const list = $("audioList");
  list.innerHTML = Array.from({ length: 87 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `<button class="audio-track ${i === 0 ? "active" : ""}" data-track="${n}">${n}</button>`;
  }).join("");
  list.addEventListener("click", event => {
    const track = event.target.dataset.track;
    if (!track) return;
    document.querySelectorAll(".audio-track").forEach(btn => btn.classList.toggle("active", btn.dataset.track === track));
    $("audioTitle").textContent = `Трек ${track}`;
    $("audioPlayer").src = `${RAW_AUDIO_BASE}${track}.mp3`;
    $("audioPlayer").play().catch(() => {});
  });
}

function exportSave() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "japanese-trainer-save.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function importSave(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    Object.assign(state, imported);
    state.kana = { ...state.kana, ...(imported.kana || {}) };
    saveState();
    location.reload();
  } catch {
    alert("Не удалось загрузить сохранение");
  }
}

async function boot() {
  loadSavedState();
  await loadWordData();
  applyStateToControls();
  bindEvents();
  switchView(state.activeView || "words");
  renderSets();
  rebuildWordDeck(false);
  renderWordCard();
  renderKanaRows();
  buildKanaDeck();
  renderKanaCard();
}

boot();
