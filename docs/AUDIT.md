# IDJLT-N5: audit and implementation decisions

Baseline: 0.19.1, commit 0a31057. Reviewed static HTML entry points, shared app,
interview module, experimental grammar UI, all data shapes, CSS, PWA and tests.
No build pipeline, backend or account required. Keep that property.

## Research (20 September 2026)

- [Duolingo practice hub](https://blog.duolingo.com/guide-to-duolingo-practice-hub/):
  focused vocabulary/listening practice and explicit mistake review. Adopt short
  sessions and an accessible review destination, not currencies or punitive lives.
- [Duolingo lesson path](https://blog.duolingo.com/new-duolingo-home-screen-design/):
  small units interleave earlier concepts with new material. Adopt bounded sessions
  mixing due, weak and new items without locking the existing free-choice lessons.
- [WaniKani SRS](https://knowledge.wanikani.com/wanikani/srs/): successful recalls
  increase intervals; difficult items return sooner. Use a transparent local
  scheduler; do not claim the hand-tuned schedule is a validated learning model.

## Baseline evidence

Browser checks at 360, 768 and 1440 px: home, lesson 11, kana, kanji, phrases,
interview and demo open without page errors or document-level horizontal overflow.
Main content remains 820 px wide on desktop (interview: 980 px). Several visible
controls are below 40 px. Word tables contain only meaning and Japanese; no
reading, search, practice status or contextual actions. Settings and tables are
buried below the card. Keyboard study controls are missing.

Good: consistent theme variables, mobile-first cards, explicit lesson links,
small deployment surface, offline shell, existing user settings and stable IDs.

## Findings and priorities

1. Card stacks are session-local, not a measure of mastery. Interview SRS is
   separate; the demo has no saved results. Introduce versioned practice progress
   without deleting or silently reinterpreting existing session keys.
2. Open-ended translations need explicit alternatives and feedback. Do not use
   substring matching or accept a changed negation as a typo. Sentence ordering
   needs curated tokens; whitespace in existing Japanese is not reliable tokenization.
3. Tables eagerly render every row even while collapsed. Add bounded rendering,
   search/filter/sort, readings, statuses and direct study links. Mobile uses rows
   that stack, desktop uses aligned columns.
4. App code mixes settings, renderer, data access, input and persistence. Extract
   reusable input and learning services; retain proven trainers and their URLs.
5. Duplicate nativeText; partially merged settings; writes can throw when storage
   is unavailable; invalid lesson IDs can crash title rendering; sequential kana
   pops the last item; PDF loads can race; interview timers/media outlive navigation.
6. Kanji related examples perform repeated pairwise scans; compute a character
   index instead. Keep original descriptions/readings intact.
7. Service worker caches all responses including media ranges, and substitutes HTML
   for failed binary requests. Restrict caches to successful full responses, handle
   navigation and resource failures separately, retain private-document retirement.

## Delivery stages

1. Reusable storage, progress, answer checking, scheduling and romaji input; tests.
2. Exercise adapters and registry: typed vocabulary both ways, typed sentences,
   sentence builder, particles, kanji readings and existing conjugation material.
   Saved sessions, explanations, mistake review, summary and personal alternatives.
3. Readable vocabulary browser and legacy table integration; home progress,
   responsive navigation, keyboard shortcuts, safe touch and accessibility states.
4. Targeted legacy fixes, cache/version updates, regression and viewport checks.

Preserve dark/light/OLED palettes and rounded cards. No personal documents or links
to them. Keep short original practice examples distinct from imported lesson data.

## Delivered

Implemented the four stages above. The expanded vocabulary uses search, statuses,
flags, pronunciation, practice links and pagination; responsive rows replace the
two-column word table. Seven exercise types share grading, progress and resumed
sessions. Home has a daily summary and direct practice/resume entry. Existing
trainers retain their data, with keyboard controls and safer settings handling.
Fixed sequential kana, invalid lesson titles, duplicate translation helper,
kanji example lookup, PDF load races and interview timer/recording cleanup.
The offline shell includes every lesson and new page; failed resources no longer
receive HTML, partial responses are not cached, and saved audio supports ranges.

Automated checks pass. Scope, model rules, test commands and remaining limitations
are documented in [LEARNING.md](LEARNING.md). The redesign preserves the original
palette, rounded cards, RU/EN interface, themes and legacy navigation URLs.
