# QA Report

Full walkthrough of every screen and interaction after the industrial/amber redesign and the `/train` hydration fix. Covers: Home, Learn (opened articles 210 and 250), Train (random session, article-filtered session, correct/incorrect answers, finishing a session, resuming after leaving), Stats (zero-data, one-data-point, and multi-data-point states), and Profile (daily goal edit + persistence across a full reload). Checked at both 375px (mobile) and 768px (tablet) viewports.

**Methodology note:** the screenshot tool was unresponsive for this session (timed out consistently, including after a server restart). Verification below was done via the accessibility snapshot, computed-style/bounding-box inspection, `localStorage` inspection, console/network log checks, and horizontal-overflow checks (`document.documentElement.scrollWidth` vs `window.innerWidth`) instead of pixel screenshots. This catches broken data flow, dead links, layout overflow, and console errors reliably, but wouldn't catch a purely cosmetic misalignment that doesn't affect layout width — worth a quick visual pass once screenshots are working again.

---

## Bugs Found

### Fixed during this pass

- **Resuming a question you already submitted (but didn't advance past) let you re-submit it, duplicating your answer history and inflating your score/accuracy.**

  Repro was: answer a question, tap Submit, then leave the app *before* tapping "Next Question." Resuming showed the same question in its *unanswered* state, letting you submit again — confirmed via `localStorage`, the same `questionId` appeared twice in `history` and the session's `score` incremented a second time for the same question.

  Root cause: `ActiveSession` only persisted `{article, questionIds, currentIndex, score}` — nothing captured whether the *current* question had already been submitted, or what was picked. `usePractice.ts`'s `selected`/`result` state is pure client state that always reset on remount, so the UI had no memory of the earlier submission either.

  Fix: `ActiveSession` now also persists `submittedAnswer` (the answer index for the current question, if submitted). `PracticeService.getSubmittedResult()` reconstructs the same `{correct, correctAnswer, explanation}` feedback `submitAnswer()` would have returned, from the current question plus the persisted answer. `usePractice.ts` calls this on every load/resume and, if present, restores `selected`/`result` from it instead of resetting to "unanswered" — so `TrainingSession`'s existing `submitted` rendering path (disabled answer buttons, feedback view, "Next" as the only way forward) kicks in automatically, exactly as if the question had just been submitted in the current tab. `submittedAnswer` is cleared in `nextQuestion()` so a genuinely fresh question is never affected.

  Verified: submitted a question, left before advancing, resumed — same question, "✓ Correct" and its explanation restored, all four answer buttons disabled, no Submit button, only "Next Question →" present, and `localStorage` history still showed exactly one entry for that question. Confirmed normal advancement (clearing `submittedAnswer`, moving to a fresh interactive question) and normal first-time submission both still work unaffected.

  Checked existing `localStorage` history data left over from testing for duplicate-signature entries (same `questionId`, same session, near-identical timestamps) per the fix task's request — found none; the duplicate entries created while originally reproducing this bug had already been wiped by an unrelated `localStorage` clear performed later in the same QA session (for the Stats zero-data edge case test), so there was nothing left to clean up.

- **`/train` hydration mismatch** — the random question pool was selected via `Math.random()` inside a `useState` initializer, which runs during both SSR and the client's first render, so the two diverged and React discarded/regenerated the tree on every load. Fixed by deferring session construction to a post-mount `useEffect` (see commit history). Verified via a genuine fresh page load: the raw SSR HTML for `/train` now contains no question content, and the console shows zero hydration warnings.
- **Regression introduced by the hydration fix, caught during this walkthrough** — the new loading guard (`if (loading || !question) return null`) accidentally also swallowed the legitimate "no questions for this article" empty state, since an empty question pool also has `question === undefined`. A user hitting `/train?article=999` (or any article with zero questions) saw a permanently blank page instead of the "No Questions Available" message. Fixed by checking `loading` on its own, then checking `progress.total === 0 || !question` together for the empty state. Verified both the normal random session and the invalid-article case render correctly now.
- **Next.js 16 console warning on every single page load** — `scroll-behavior: smooth` was set via CSS on `<html>` without the `data-scroll-behavior="smooth"` attribute Next 16 wants for route-transition handling. Added the attribute to `app/layout.tsx`.

### Minor

- **Article-filtered practice sessions always present questions in the same fixed order.** `questionRepository.getByArticle()` returns questions in their original array order with no shuffling (unlike the random/unfiltered session, which does shuffle). Not incorrect, but repeat practice on a single article will always show the same question 1 → 2 → 3 sequence, which is easier to pattern-match/memorize than actually recall.

---

## UI/UX Gaps

*Documented only — not fixed in this pass, per instructions.*

- **No loading indicator anywhere in the app.** Home, Learn, Stats, and now Train all render nothing (a blank flash) during the brief client-only data-loading window after mount, rather than a skeleton or spinner. Usually imperceptible on a fast connection, but there's no visual feedback if it isn't.
- **No way to review missed questions after finishing a session.** `SessionSummary` shows only the aggregate score (`X / Y Correct`) — there's no list of which specific questions were missed or a way to jump back to them, which is a common and expected feature in a quiz/study app.
- **Minor spacing inconsistency between two visually identical row patterns.** Home's icon-led Study/Practice/Statistics rows use `p-5`; Learn's article rows use `p-4`. Both are the same "icon badge + title/description + chevron" layout, so the padding should probably match.
- **No search or filter on the Learn screen's article list.** With 13 articles grouped across 5 chapters, finding a specific article means scrolling through the whole list.
- **"13% Ready" reads a little awkwardly** as a label under the big readiness percentage on the dashboard/stats readiness card — worth a copy pass (e.g. "13% Exam Ready" or restructuring the label).
- **No tablet/desktop layout.** Content stays capped at the mobile `max-w-md` shell and centers with wide empty margins at 768px+. This is very likely intentional (the redesign brief explicitly said to keep the mobile-first shell), but flagging in case a wider layout is ever wanted.
- **Leftover dead files still reference the pre-redesign slate/blue palette**: `components/dashboard/todays-goal.tsx` (a superseded duplicate of `components/home/todays-goal.tsx`, not imported anywhere) and the unused shadcn `components/ui/*` primitives (`dialog.tsx`, `tooltip.tsx`, `button.tsx`, etc.). Harmless since nothing renders them, but they're repo clutter and could confuse a future search for "where is this styled."
- **`data/articles.ts`'s static `questionCount` field is stale** (still shows pre-content-expansion values like `0` and `1` for articles that now have 15 questions). Never touched per the task's data-file constraints, and harmless in practice since every screen that displays a count computes it live from `questionRepository` instead of reading this field — but confusing if anyone reads the file directly expecting it to be accurate.

---

## What's Solid

*Confirmed working through direct interaction — no need to re-touch or re-verify these.*

- **Answer color-coding on Train**: neutral → amber (selected) → teal (correct) / red (incorrect) — verified by actually submitting both a correct and an incorrect answer and inspecting the resulting classes/colors.
- **Session resume**, for both the random/unfiltered pool and an article-filtered session — verified round-trip by answering a question, navigating to Home and back, and confirming it resumed at the right question rather than restarting, including the now-fixed case of resuming mid-question (submitted but not yet advanced).
- **Article-filter routing end to end**: Learn → `/train?article=X` → Home's "Continue Practice" card correctly preserves the article filter in its resume link.
- **Session completion flow**: finishing a 3-question session showed the correct score (2/3, 67%), and "Start New Session" correctly restarted with a fresh session.
- **Stats charts across all data states**: zero history (empty-state message, no crash), exactly one data point (renders a single bar correctly, no layout break), and many data points — all verified directly, no console errors in any state.
- **Daily Goal edit on Profile**: change + Save persists to `localStorage` and survives a genuine full page reload, not just client-side state.
- **No horizontal overflow** on any of the 5 screens at either 375px or 768px.
- **Zero console errors, zero failed network requests, zero dead/broken links** across the entire app during this walkthrough.
- **Design tokens hold consistently everywhere reachable** — no leftover hardcoded `slate-*`/`blue-*` classes in any component that's actually rendered by a route (the only matches are the dead files noted above).
