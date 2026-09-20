/* Shared, DOM-independent learning model. Existing trainer keys remain untouched. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory;
  else root.IDJLTStudy = factory(() => root.localStorage);
})(typeof window === "undefined" ? globalThis : window, function (getStorage) {
  "use strict";
  const KEY = "idjlt.study.v1", SESSION_KEY = "idjlt.practice.session.v1";
  const memory = new Map();
  let persistenceError = false;
  const object = value => value && typeof value === "object" && !Array.isArray(value);
  const safeKey = key => typeof key === "string" && !["__proto__", "constructor", "prototype"].includes(key);
  const number = n => Number.isFinite(n) && n >= 0 ? n : 0;
  function read(key, fallback) {
    if (persistenceError && memory.has(key)) return memory.get(key);
    try { return JSON.parse(getStorage().getItem(key) || "null") ?? fallback; }
    catch { persistenceError = true; return memory.get(key) ?? fallback; }
  }
  function write(key, value) {
    memory.set(key, value);
    try { getStorage().setItem(key, JSON.stringify(value)); return true; }
    catch { persistenceError = true; return false; }
  }
  function empty() { return { version: 1, items: {}, flags: {}, days: {}, alternatives: {} }; }
  function sanitize(raw) {
    const clean = empty();
    if (!object(raw) || raw.version !== 1) return clean;
    for (const [id, item] of Object.entries(object(raw.items) ? raw.items : {})) {
      if (!safeKey(id) || !object(item) || typeof item.ref !== "string") continue;
      clean.items[id] = { ref: item.ref, correct: number(item.correct), errors: number(item.errors), streak: number(item.streak), lastAt: number(item.lastAt), due: number(item.due), lastCorrect: !!item.lastCorrect, lastAnswer: String(item.lastAnswer || "").slice(0, 500), lastAttempt: String(item.lastAttempt || ""), difficulty: Math.min(1, number(item.difficulty)), assisted: !!item.assisted };
    }
    for (const [id, flag] of Object.entries(object(raw.flags) ? raw.flags : {})) if (safeKey(id) && flag === true) clean.flags[id] = true;
    for (const [day, count] of Object.entries(object(raw.days) ? raw.days : {})) if (/^\d{4}-\d{2}-\d{2}$/.test(day)) clean.days[day] = number(count);
    for (const [id, answers] of Object.entries(object(raw.alternatives) ? raw.alternatives : {})) if (safeKey(id) && Array.isArray(answers)) clean.alternatives[id] = answers.filter(a => typeof a === "string" && a.trim()).slice(0, 20).map(a => a.slice(0, 500));
    return clean;
  }
  let state = sanitize(read(KEY, null));
  let progressIndex = null;
  function persist() { progressIndex = null; return write(KEY, state); }
  function dayKey(time = Date.now()) {
    const date = new Date(time);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }
  function normalize(value, japanese = false) {
    let text = String(value || "").normalize("NFKC").toLowerCase().replace(/ё/g, "е").replace(/[’‘]/g, "'");
    if (japanese) text = text.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 96));
    text = text.replace(/[。！？!?.,、;:：；"「」『』“”]/g, "").trim();
    return japanese ? text.replace(/[\s~〜]/g, "") : text.replace(/\s+/g, " ");
  }
  function alternatives(text) {
    const raw = String(text || "");
    const base = raw.replace(/\([^)]*\)|（[^）]*）/g, "").trim();
    return [...new Set([raw, base, ...base.split(/\s*[;,／/]\s*/)].map(a => a.trim()).filter(Boolean))];
  }
  function check(exercise, answer) {
    const accepted = [...exercise.answers, ...(state.alternatives[exercise.id] || [])];
    const value = normalize(answer, exercise.answerLanguage === "ja");
    return !!value && accepted.some(a => normalize(a, exercise.answerLanguage === "ja") === value);
  }
  function status(item) {
    if (!item || !(item.correct + item.errors)) return "new";
    if ((item.errors > 0 && item.streak < 2) || item.assisted) return "weak";
    if (item.streak >= 5) return "mastered";
    return item.streak >= 3 ? "familiar" : "learning";
  }
  function evolve(previous, result, now) {
    const old = previous || { correct: 0, errors: 0, streak: 0 };
    const correct = !!result.correct && !result.assisted;
    const streak = correct ? old.streak + 1 : 0;
    const success = old.correct + Number(correct), errors = old.errors + Number(!correct);
    const intervals = [0, 3600000, 86400000, 259200000, 604800000, 1209600000];
    return { ref: result.ref, correct: success, errors, streak, lastAt: now, due: now + (correct ? intervals[Math.min(streak, 5)] : 600000), lastCorrect: correct, lastAnswer: String(result.answer || "").slice(0, 500), lastAttempt: result.attemptId, assisted: !!result.assisted, difficulty: errors / (success + errors) };
  }
  function record(exercise, result) {
    const now = result.now ?? Date.now();
    if (!safeKey(exercise.id) || typeof result.attemptId !== "string") throw new Error("Invalid attempt");
    if (state.items[exercise.id]?.lastAttempt === result.attemptId) return false;
    // Save only the immediate previous counters, so a visible answer can be regraded once.
    const before = state.items[exercise.id] ? { ...state.items[exercise.id] } : null;
    if (before) delete before.previous;
    state.items[exercise.id] = { ...evolve(before, { ...result, ref: exercise.ref }, now), previous: before };
    const day = dayKey(now); state.days[day] = (state.days[day] || 0) + 1;
    persist(); return true;
  }
  function acceptAlternative(exercise, attemptId, answer) {
    const item = state.items[exercise.id];
    if (!item || item.lastAttempt !== attemptId || item.lastCorrect || item.assisted || exercise.answerLanguage === "ja" || !answer.trim()) return false;
    const previous = item.previous || { correct: item.correct, errors: Math.max(0, item.errors - 1), streak: 0 };
    state.items[exercise.id] = evolve(previous, { ref: exercise.ref, attemptId, answer, correct: true }, item.lastAt);
    const options = state.alternatives[exercise.id] || [];
    state.alternatives[exercise.id] = [...new Set([...options, answer.trim().slice(0, 500)])].slice(-20);
    persist(); return true;
  }
  function progressFor(ref) {
    if (!progressIndex) {
      progressIndex = new Map();
      Object.values(state.items).forEach(item => { if (!progressIndex.has(item.ref)) progressIndex.set(item.ref, []); progressIndex.get(item.ref).push(item); });
    }
    const items = progressIndex.get(ref) || [];
    const latest = items.slice().sort((a,b) => b.lastAt - a.lastAt)[0];
    return { ...latest, difficulty: state.flags[ref] ? 1 : Math.max(0,...items.map(i=>i.difficulty)), correct: items.reduce((n,i)=>n+i.correct,0), errors: items.reduce((n,i)=>n+i.errors,0), status: state.flags[ref] || items.some(i=>status(i)==="weak") ? "weak" : status(latest), flagged: !!state.flags[ref] };
  }
  function markDifficult(ref) {
    if (!safeKey(ref)) return;
    if (state.flags[ref]) delete state.flags[ref]; else state.flags[ref] = true;
    persist();
  }
  const hash = text => [...text].reduce((h,c)=>(h*31+c.charCodeAt(0))>>>0,0);
  function select(exercises, { count = 10, review = false, now = Date.now() } = {}) {
    const pool = exercises.filter(e => !review || state.flags[e.ref] || status(state.items[e.id]) === "weak");
    const score = e => {
      const item = state.items[e.id];
      if (state.flags[e.ref]) return 10000;
      if (!item) return 100;
      const overdue = Math.max(0, now-item.due)/86400000;
      return (status(item)==="weak" ? 2000 : 0) + (item.due<=now ? 500+overdue : -100) + item.difficulty*100;
    };
    const ranked = pool.slice().sort((a,b) => score(b)-score(a) || hash(a.id+dayKey(now))-hash(b.id+dayKey(now)));
    const chosen = [], seen = new Set();
    const add = e => { if (e && !seen.has(e.ref)) { chosen.push(e); seen.add(e.ref); } };
    // Reserve room for new material; errors should not permanently block discovery.
    if (!review) ranked.filter(e=>!state.items[e.id] && !state.flags[e.ref]).slice(0,Math.max(1,Math.floor(count/4))).forEach(add);
    ranked.forEach(e=>{if(chosen.length<count)add(e);});
    return chosen.sort((a,b)=>score(b)-score(a)).slice(0,count);
  }
  function summary() {
    const refs = [...new Set([...Object.values(state.items).map(i=>i.ref), ...Object.keys(state.flags)])];
    const counts = { new:0, learning:0, familiar:0, mastered:0, weak:0 };
    refs.forEach(ref=>counts[progressFor(ref).status]++);
    let streak=0; const date=new Date();
    if (!state.days[dayKey(date.getTime())]) date.setDate(date.getDate()-1);
    while(state.days[dayKey(date.getTime())]) {streak++;date.setDate(date.getDate()-1);}
    return { ...counts, today: state.days[dayKey()] || 0, streak, due: Object.values(state.items).filter(i=>i.due<=Date.now()).length, total:refs.length };
  }
  return { KEY, SESSION_KEY, read, write, normalize, alternatives, check, status, evolve, record, acceptAlternative, progressFor, markDifficult, select, summary, dayKey, sanitize,
    get state() { return state; }, get persistenceError() { return persistenceError; },
    refresh() { state = sanitize(read(KEY, null)); progressIndex = null; },
    exportProgress() { return JSON.stringify(state, null, 2); }
  };
});
