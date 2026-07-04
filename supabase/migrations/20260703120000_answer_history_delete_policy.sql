-- Adds a delete policy for answer_history. The original migration made
-- answer_history append-only from the app's perspective (select + insert
-- only), which is right for normal use, but the "keep local data" conflict
-- resolution choice (see components/providers/auth-provider.tsx,
-- services/supabase-progress-service.ts's replaceCloudWithLocal) needs to
-- clear a user's existing cloud history before replacing it with their
-- local data -- an explicit, user-initiated action, not something the app
-- ever does automatically.
--
-- Run this in the Supabase dashboard's SQL Editor after the initial
-- schema migration. Safe to re-run.

drop policy if exists "answer_history_delete_own" on public.answer_history;
create policy "answer_history_delete_own" on public.answer_history
  for delete using (auth.uid() = user_id);
