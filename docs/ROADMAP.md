# Roadmap

This roadmap sequences the [Project Vision](PRODUCT_VISION.md) into phases, ordered against the current state of the app rather than the idealized end state.

## Current State (baseline for this roadmap)

* **Question bank:** 12 questions total, covering 9 of 13 tracked NEC articles. Articles 90, 100, 110, and 300 have zero questions and render "No questions available" in Train mode.
* **Content model:** `data/questions.ts` (flat array, `Question` type) is the only source of truth. `data/articles.ts` (article metadata/question counts) is out of sync with the actual question data — it lists inflated counts and is missing articles (215, 314, 450) that already have questions.
* **Persistence:** `localStorage` for guests (unchanged default); Supabase-backed accounts, cross-device sync, and Google sign-in now exist for signed-in users as of Phase 2 (see below).
* **Hosting:** Static export (`next build`) for every route except `/train`, which is server-rendered on demand because of a dynamic search param. No backend, no auth, no database.
* **Feature surface:** Dashboard, Learn (article picker), Train (randomized or article-filtered practice with resume), Stats, Profile. No exam simulator, no calculators, no lessons, no flashcards, no NEC browser, no admin tooling.

---

## ⚠️ Standing Constraint: NFPA Copyright

**This applies to every phase that touches NEC content (1, 5, and anything downstream of them) and must be enforced for the life of the project, not just called out once.**

The NEC (NFPA 70) is copyrighted by NFPA. The app must **never reproduce article/table/section text verbatim** — no copy-pasted code language, no scanned or transcribed tables, no verbatim informational notes.

Instead, all content must:

* Cite section/table/article **numbers** (e.g., "See 250.66, Table 250.66") rather than quoting their text.
* Use **original explanations** written in the app's own words.
* Link out to **NFPA's free access portal** (NFPA LiNK free access / nfpa.org "Free Access" program) for anyone who needs to read the actual code text.
* Apply this rule equally to lesson content (Phase 5), flashcards (Phase 6), and any content imported through the admin portal (Phase 7) — the constraint is on the *pipeline*, not just the initial question bank.

Any content-import tooling built in Phase 7 should include a review step that makes this easy to enforce, not just a policy documented here.

---

## Phase 1 — Content Growth

**Goal:** Make the existing app worth using before building anything new on top of it.

* Reconcile `data/articles.ts` with reality: add missing articles (215, 314, 450), fix inflated question counts, and either backfill or explicitly zero-out 90, 100, 110, 300 until they have content.
* Expand the question bank across all 13 tracked articles to a level where randomized practice and (eventually) exam generation don't repeat constantly — this is the volume floor every later phase assumes.
* Write all new questions/explanations under the NFPA copyright constraint above: original wording, section-number citations only.
* No schema changes required — this phase works entirely within the existing `Question` type and `question-repository`/`practice-service` code.

**Depends on:** nothing. This is the unblocking phase — every other phase either needs question volume (Exam Simulator, Flashcards) or a clean content model to build against (Learn Mode, Admin Portal).

---

## Phase 2 — Supabase / Auth Migration ✅ Complete

**Shipped:** Google OAuth sign-in via Supabase Auth, client-side only — no middleware, no API routes, no server-side auth helpers. This turned out to mean the original assumption below (that static export "no longer fits" and hosting would need to change) wasn't necessary — the app kept its existing deployment model unchanged.

Signed-out users are entirely unaffected: all reads/writes still go to `localStorage` via `StorageService`, exactly as before. Signed-in users read/write Supabase instead (`answer_history`, `user_preferences`, `active_sessions`), scoped to `auth.uid()` with Row Level Security enabled on every table. Routing between the two backends lives in one place (`services/progress-service.ts`), so `PracticeService` and every UI consumer didn't need backend-specific branching.

A one-time local-to-cloud migration runs on first sign-in per browser: local guest data with no existing cloud data gets pushed up automatically (local data is never deleted — left in place either way). Local data *and* existing cloud data together triggers an explicit choice on Profile ("Keep Cloud Data" vs. "Keep Local Data") instead of guessing at a merge; both resolution paths were tested. The submit/resume no-duplicate fix (`services/practice-service.ts`'s `submittedAnswer`/`getSubmittedResult`) needed zero changes to carry over to the Supabase-backed path — same logic, either backend.

**Verified:** all 5 test scenarios confirmed via direct database queries — fresh sign-in, guest fallback after sign-out, clean migration push-up, conflict prompt (both "keep cloud" and "keep local" resolutions), and resume-with-no-duplicate against live Supabase data.

**Known limitations, not yet addressed** (candidates for a future polish pass, not blockers):
* Network failure mid-write to Supabase (e.g., the connection drops during `recordAnswer`) is untested and unhandled — no retry logic, no user-facing error state.
* No confirmed loading indicator during the post-sign-in migration check — there's a brief window where Stats/Home could flash stale or incorrect numbers before the check resolves and real data loads.

**Unblocked:** Phase 3 (durable exam attempts), Phase 6 (per-user mastery/streak data), and Phase 7 (admin portal needs a backend and role-based access) can now build on this.

---

## Phase 3 — Exam Simulator

**Goal:** Realistic, PSI-style timed exam experience.

* Start with configurable-length **Practice Exams** (20/40/80 questions, timed or untimed) as an extension of the existing randomized session logic in `practice-service.ts`/`usePractice.ts`.
* Build up to the full **Exam Simulator**: four-hour timer, on-screen calculator, NEC lookup panel, flag-for-review, review screen, submit confirmation, score report.
* Exam attempts (especially a 4-hour session) must survive tab close/reopen the way practice sessions already do — but backed by Supabase rather than `localStorage`, since exam history needs to be durable and tied to a user account.

**Depends on:** Phase 1 (enough question volume across all articles that a randomized exam doesn't visibly repeat), Phase 2 (durable, per-user storage for long-running timed attempts and score history).

---

## Phase 4 — Calculation Center

**Goal:** Interactive calculators (voltage drop, box fill, conduit fill, motor FLC, service load, transformer sizing, conductor ampacity, derating, GEC/EGC sizing, OCPD sizing), each explaining its math and citing the applicable NEC sections (subject to the same copyright constraint — cite, don't quote).

**Depends on:** Phase 1 only, for the citation/explanation conventions established while writing question content. This module is largely self-contained (pure computation + UI) and doesn't require Supabase, though attaching "recently used calculators" to a user profile would piggyback on Phase 2 if desired.

---

## Phase 5 — Learn Mode + NEC Reference Module

**Goal:** Structured lessons and an NEC "browser" (chapter → article → section → subsection → exception → table → figure), with search and bookmarking.

* Learn Mode lessons (concept, NEC reference, original explanation, examples, field application, linked practice questions) require a richer content taxonomy than the current flat `Question` type provides — the NEC hierarchy (chapter/article/section/subsection/exception/table/figure) needs to be modeled explicitly.
* The NEC Browser is the module most at risk of copyright violation, since its entire purpose is letting users navigate the code structure — it must present original summaries and section/table **references**, not the underlying NFPA text, and should link to NFPA's free access portal for the real language.
* Bookmarking frequently used sections is per-user state.

**Depends on:** Phase 1 (content and citation conventions), Phase 2 (bookmarks and lesson progress need per-user backend storage).

---

## Phase 6 — Flashcards, Spaced Repetition, Gamification

**Goal:** Bookmarking, difficulty rating, mastery tracking, spaced repetition scheduling, XP/streaks/mastery-percentage display.

**Depends on:** Phase 1 (question pool to draw flashcards from), Phase 2 (mastery/XP/streak state must persist per-user across devices, not just in `localStorage`), and benefits from Phase 5's chapter/article taxonomy for "chapter mode" filtering.

---

## Phase 7 — Admin Portal

**Goal:** A separate interface for non-developers to create/edit/delete questions and lessons, import question banks, upload diagrams, and publish content updates without code changes.

**Depends on:** Phase 2 (needs Supabase + auth with role-based/admin access — there's no portal to build without a backend), and effectively supersedes the manual TS-file content process used in Phase 1. Should come after Phase 5 and Phase 6 define their content shapes (lessons, flashcard metadata), since the admin portal needs to manage all content types it will eventually own, not just questions. Include the copyright-review step described above as part of the content-import workflow.

---

## Phase 8 — Future Expansion (Other Exam Types)

**Goal:** Texas Master Electrician, Residential Wireman, Continuing Education, OSHA, NFPA 70E, and beyond, per the vision doc's long-term roadmap.

**Depends on:** everything before it — a generalized Supabase schema (exam-type as a first-class dimension, not a hardcoded assumption), the Admin Portal (to manage multiple content sets without redeploying code), and a proven content pipeline from Phases 1–7. This phase is explicitly out of scope until the Texas Journeyman product is mature.
