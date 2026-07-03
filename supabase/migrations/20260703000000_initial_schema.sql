-- Journeyman Prep: initial Supabase schema (Phase 2)
--
-- Mirrors the shape currently held in localStorage (see
-- services/storage-service.ts, type ProgressRecord in types/progress.ts)
-- so it can eventually replace it. Not wired up to the app yet -- this
-- migration only creates the tables; storage-service.ts and
-- practice-service.ts still read/write localStorage exclusively.
--
-- Run this in the Supabase dashboard's SQL Editor (Project -> SQL Editor
-- -> New query), paste the whole file, and click Run. Safe to re-run --
-- every statement uses IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS
-- guards.

-- ---------------------------------------------------------------------
-- user_preferences
-- One row per signed-in user. Mirrors ProgressRecord's top-level fields
-- (everything except `history` and `activeSession`, which get their own
-- tables below).
-- ---------------------------------------------------------------------
create table if not exists public.user_preferences (
  user_id uuid primary key references auth.users (id) on delete cascade,
  daily_goal integer not null default 25,
  current_streak integer not null default 0,
  best_streak integer not null default 0,
  last_active_date date,
  updated_at timestamptz not null default now()
);

alter table public.user_preferences enable row level security;

drop policy if exists "user_preferences_select_own" on public.user_preferences;
create policy "user_preferences_select_own" on public.user_preferences
  for select using (auth.uid() = user_id);

drop policy if exists "user_preferences_insert_own" on public.user_preferences;
create policy "user_preferences_insert_own" on public.user_preferences
  for insert with check (auth.uid() = user_id);

drop policy if exists "user_preferences_update_own" on public.user_preferences;
create policy "user_preferences_update_own" on public.user_preferences
  for update using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- answer_history
-- One row per answered question. Mirrors AnsweredQuestion
-- ({ questionId, article, correct, answeredAt }) from types/progress.ts.
-- Append-only from the app's perspective -- no update/delete policy, to
-- match the localStorage version's behavior (history.push(), never
-- edited or removed except for the 500-entry cap, which can be handled
-- with a scheduled job later if needed).
-- ---------------------------------------------------------------------
create table if not exists public.answer_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id text not null,
  article text not null,
  correct boolean not null,
  answered_at timestamptz not null default now()
);

create index if not exists answer_history_user_id_idx on public.answer_history (user_id);
create index if not exists answer_history_article_idx on public.answer_history (article);

alter table public.answer_history enable row level security;

drop policy if exists "answer_history_select_own" on public.answer_history;
create policy "answer_history_select_own" on public.answer_history
  for select using (auth.uid() = user_id);

drop policy if exists "answer_history_insert_own" on public.answer_history;
create policy "answer_history_insert_own" on public.answer_history
  for insert with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- active_sessions
-- One row per signed-in user, holding the in-progress practice session
-- (if any). Mirrors ActiveSession from types/progress.ts -- needed to
-- eventually support resuming a session across devices, the same way
-- localStorage currently supports resuming across page reloads on one
-- device (including the submitted-but-not-advanced question fix from
-- practice-service.ts's submittedAnswer field).
-- ---------------------------------------------------------------------
create table if not exists public.active_sessions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  article text,
  question_ids text[] not null,
  current_index integer not null default 0,
  score integer not null default 0,
  submitted_answer integer,
  updated_at timestamptz not null default now()
);

alter table public.active_sessions enable row level security;

drop policy if exists "active_sessions_select_own" on public.active_sessions;
create policy "active_sessions_select_own" on public.active_sessions
  for select using (auth.uid() = user_id);

drop policy if exists "active_sessions_insert_own" on public.active_sessions;
create policy "active_sessions_insert_own" on public.active_sessions
  for insert with check (auth.uid() = user_id);

drop policy if exists "active_sessions_update_own" on public.active_sessions;
create policy "active_sessions_update_own" on public.active_sessions
  for update using (auth.uid() = user_id);

drop policy if exists "active_sessions_delete_own" on public.active_sessions;
create policy "active_sessions_delete_own" on public.active_sessions
  for delete using (auth.uid() = user_id);
