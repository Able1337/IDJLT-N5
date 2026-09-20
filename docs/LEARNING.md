# Learning architecture and validation

The site remains static HTML, JavaScript and CSS. No build step or production
package manager is required. Existing lesson URLs and storage keys are retained.

## Modules

- `study-core.js`: DOM-independent answer normalization, bounded personal answer
  alternatives, progress, scheduling and safe storage. A CommonJS factory also
  supports tests with an isolated storage implementation.
- `exercise-data.js`: immutable adapters over existing datasets and a small bank
  of 12 original N5 sentences. `register(type, adapter)` invalidates the exercise
  cache. Each exercise has `id`, `ref`, `type`, `lesson`, `prompt`, `answers`,
  `answerLanguage`, `jp`, `reading`, `meaning`, `hint`, `explanation`, `difficulty`.
  `id` identifies the task; `ref` groups related exercises for word status.
- `practice.js`: session controller and renderer registry (typed, token builder,
  particle choice). Additional task types register a data adapter and renderer.
- `japanese-input.js`: reusable WanaKana binding, IME handling and finalization.
- `vocabulary.js`: shared search/filter/sort/pagination view used on the vocabulary
  page and inside the existing word trainer. Thirty rows are rendered per page.
- `study-navigation.js` and `study.css`: shared navigation, home progress and
  responsive enhancements using the original palette and panels.

Load original data, supplemental data, study core, WanaKana, exercise adapters,
vocabulary, then `app.js`; load the page controller and shared navigation last.
Kanji readings are available on pages that include `kanji-data.js`.

## Persistence and grading

`idjlt.study.v1` stores versioned per-exercise results, difficult-word flags,
daily answer counts and user-confirmed translation alternatives.
`idjlt.practice.session.v1` stores queue IDs, current index, typed draft, selected
tokens, hint usage and already-graded feedback. Reloading visible feedback does
not count another answer. Invalid session structures are discarded.

Existing flashcard stacks and interview SRS remain independent: historical
self-assessments are not silently converted into correct typed answers. New
practice and vocabulary share the new model. Local progress is not cloud-synced.
Concurrent active sessions in different tabs are not a supported collaboration
workflow; storage events refresh inactive views, but writes are not transactional.

Statuses: new; learning; familiar after three consecutive unassisted successes;
mastered after five; weak after mistakes or assistance, until two subsequent
unassisted successes. A manual difficult flag persists until explicitly removed.
Intervals after success: 1 hour, 1 day, 3 days, 7 days, 14 days. Mistakes: 10 minutes.
Flags, weak items and due items rank ahead of established material; normal sessions
reserve room for new material. These are practice heuristics, not a proficiency test.

Checking normalizes width, case, punctuation, kana script and Japanese spacing.
It compares explicit alternatives, never arbitrary substrings (negations matter).
Kana/kanji are interchangeable only when supplied by the exercise's data.
Free translation is not semantic AI grading: an unlisted valid native-language
answer can be accepted explicitly by the learner and remembered locally.
Hints/revealed answers schedule review and do not count as unassisted successes.

Progress export is available in Practice → answer checking and progress. Storage
failure is visible and falls back to tab memory. Export is a JSON backup; there is
currently no import UI. Pronunciation uses a Japanese browser/OS voice when
available; it is not bundled recorded audio. No personal source documents are
published or linked.

## Validation

Run from the repository root:

```sh
node --test tests/*.test.cjs
python -m http.server 4173 --bind 127.0.0.1
# In another terminal with Playwright and a browser installed:
node tests/browser.cjs
```

Optional environment variables: `PLAYWRIGHT_MODULE` (module path),
`BROWSER_CHANNEL` (for example `msedge`), `TEST_URL` (default localhost:4173).
Playwright is a development-only dependency; it is not loaded by the site.

Unit suites cover data integrity, unchanged old sets, conjugation exceptions,
normalization, scheduling, idempotent grading, status changes, storage failure,
retired-document cleanup, non-cacheable errors/partial responses and audio ranges.
Browser regressions cover all seven task types, romaji typing, resume, reviews,
personal alternatives, vocabulary controls, legacy keyboard controls, timer exit,
corrupt settings/session data and quota errors. Eleven key pages are checked for
overflow at 320/768/1440 px in dark/light/OLED themes. Fresh-install offline checks
visit practice, vocabulary, kana, lesson 14 and demo without prior online visits.

Validated in headless Microsoft Edge on Windows. Viewport emulation does not
replace testing physical mobile keyboards or Safari. Native microphone permission,
voice quality and every large textbook/audio asset were not manually verified.
