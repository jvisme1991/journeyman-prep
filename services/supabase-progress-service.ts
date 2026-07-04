import { defaultProgress } from "@/services/storage-service";
import { computeStreakUpdate } from "@/lib/streak";
import { supabase } from "@/lib/supabase-client";
import type { ActiveSession, AnsweredQuestion, ProgressRecord } from "@/types/progress";

/**
 * Supabase-backed equivalent of services/storage-service.ts, used instead
 * of localStorage once a signed-in user's migration/conflict check has
 * resolved (see components/providers/auth-provider.tsx). Mirrors the same
 * ProgressRecord shape and the same streak logic (via lib/streak.ts) so
 * behavior is identical to the localStorage version from the app's
 * perspective -- only the storage medium differs.
 */

export async function loadCloudProgress(userId: string): Promise<ProgressRecord> {
  if (!supabase) {
    return defaultProgress();
  }

  const [prefsResult, historyResult, sessionResult] = await Promise.all([
    supabase.from("user_preferences").select("*").eq("user_id", userId).maybeSingle(),
    supabase
      .from("answer_history")
      .select("*")
      .eq("user_id", userId)
      .order("answered_at", { ascending: true }),
    supabase.from("active_sessions").select("*").eq("user_id", userId).maybeSingle(),
  ]);

  if (prefsResult.error) throw prefsResult.error;
  if (historyResult.error) throw historyResult.error;
  if (sessionResult.error) throw sessionResult.error;

  const prefs = prefsResult.data;

  const history: AnsweredQuestion[] = (historyResult.data ?? []).map((row) => ({
    questionId: row.question_id,
    article: row.article,
    correct: row.correct,
    answeredAt: row.answered_at,
  }));

  const sessionRow = sessionResult.data;
  const activeSession: ActiveSession | null = sessionRow
    ? {
        article: sessionRow.article ?? undefined,
        questionIds: sessionRow.question_ids,
        currentIndex: sessionRow.current_index,
        score: sessionRow.score,
        submittedAnswer: sessionRow.submitted_answer ?? undefined,
      }
    : null;

  return {
    history,
    dailyGoal: prefs?.daily_goal ?? 25,
    currentStreak: prefs?.current_streak ?? 0,
    bestStreak: prefs?.best_streak ?? 0,
    lastActiveDate: prefs?.last_active_date ?? null,
    activeSession,
  };
}

export async function recordAnswerCloud(
  userId: string,
  entry: Omit<AnsweredQuestion, "answeredAt">
): Promise<ProgressRecord> {
  if (!supabase) {
    return loadCloudProgress(userId);
  }

  const now = new Date();

  const { error: insertError } = await supabase.from("answer_history").insert({
    user_id: userId,
    question_id: entry.questionId,
    article: entry.article,
    correct: entry.correct,
    answered_at: now.toISOString(),
  });
  if (insertError) throw insertError;

  const { data: prefsRow, error: prefsReadError } = await supabase
    .from("user_preferences")
    .select("daily_goal, current_streak, best_streak, last_active_date")
    .eq("user_id", userId)
    .maybeSingle();
  if (prefsReadError) throw prefsReadError;

  const streak = computeStreakUpdate(
    {
      currentStreak: prefsRow?.current_streak ?? 0,
      bestStreak: prefsRow?.best_streak ?? 0,
      lastActiveDate: prefsRow?.last_active_date ?? null,
    },
    now
  );

  const { error: upsertError } = await supabase.from("user_preferences").upsert({
    user_id: userId,
    daily_goal: prefsRow?.daily_goal ?? 25,
    current_streak: streak.currentStreak,
    best_streak: streak.bestStreak,
    last_active_date: streak.lastActiveDate,
    updated_at: now.toISOString(),
  });
  if (upsertError) throw upsertError;

  return loadCloudProgress(userId);
}

export async function setDailyGoalCloud(userId: string, goal: number): Promise<ProgressRecord> {
  if (!supabase) {
    return loadCloudProgress(userId);
  }

  const clamped = Math.max(1, Math.round(goal));

  const { data: existing, error: readError } = await supabase
    .from("user_preferences")
    .select("current_streak, best_streak, last_active_date")
    .eq("user_id", userId)
    .maybeSingle();
  if (readError) throw readError;

  const { error } = await supabase.from("user_preferences").upsert({
    user_id: userId,
    daily_goal: clamped,
    current_streak: existing?.current_streak ?? 0,
    best_streak: existing?.best_streak ?? 0,
    last_active_date: existing?.last_active_date ?? null,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;

  return loadCloudProgress(userId);
}

export async function saveActiveSessionCloud(
  userId: string,
  session: ActiveSession
): Promise<ProgressRecord> {
  if (!supabase) {
    return loadCloudProgress(userId);
  }

  const { error } = await supabase.from("active_sessions").upsert({
    user_id: userId,
    article: session.article ?? null,
    question_ids: session.questionIds,
    current_index: session.currentIndex,
    score: session.score,
    submitted_answer: session.submittedAnswer ?? null,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;

  return loadCloudProgress(userId);
}

export async function clearActiveSessionCloud(userId: string): Promise<ProgressRecord> {
  if (!supabase) {
    return loadCloudProgress(userId);
  }

  const { error } = await supabase.from("active_sessions").delete().eq("user_id", userId);
  if (error) throw error;

  return loadCloudProgress(userId);
}

export async function getCloudSummary(
  userId: string
): Promise<{ hasData: boolean; historyCount: number }> {
  if (!supabase) {
    return { hasData: false, historyCount: 0 };
  }

  const { count, error } = await supabase
    .from("answer_history")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);
  if (error) throw error;

  const historyCount = count ?? 0;
  return { hasData: historyCount > 0, historyCount };
}

/**
 * Pushes local guest data up to a signed-in user's (currently empty)
 * cloud account. Does not touch localStorage -- the caller is
 * responsible for deciding when it's safe to do so, and this app never
 * clears it automatically.
 */
export async function pushLocalToCloud(userId: string, local: ProgressRecord): Promise<void> {
  if (!supabase) {
    return;
  }

  if (local.history.length > 0) {
    const rows = local.history.map((entry) => ({
      user_id: userId,
      question_id: entry.questionId,
      article: entry.article,
      correct: entry.correct,
      answered_at: entry.answeredAt,
    }));

    const { error } = await supabase.from("answer_history").insert(rows);
    if (error) throw error;
  }

  const { error: prefsError } = await supabase.from("user_preferences").upsert({
    user_id: userId,
    daily_goal: local.dailyGoal,
    current_streak: local.currentStreak,
    best_streak: local.bestStreak,
    last_active_date: local.lastActiveDate,
    updated_at: new Date().toISOString(),
  });
  if (prefsError) throw prefsError;

  if (local.activeSession) {
    const { error: sessionError } = await supabase.from("active_sessions").upsert({
      user_id: userId,
      article: local.activeSession.article ?? null,
      question_ids: local.activeSession.questionIds,
      current_index: local.activeSession.currentIndex,
      score: local.activeSession.score,
      submitted_answer: local.activeSession.submittedAnswer ?? null,
      updated_at: new Date().toISOString(),
    });
    if (sessionError) throw sessionError;
  }
}

/**
 * The "keep local data" conflict-resolution choice: clears this user's
 * existing cloud data, then pushes the local data up as a full replacement.
 * Only called after the user has explicitly chosen this in the conflict UI
 * -- never automatically.
 */
export async function replaceCloudWithLocal(userId: string, local: ProgressRecord): Promise<void> {
  if (!supabase) {
    return;
  }

  const { error: deleteHistoryError } = await supabase
    .from("answer_history")
    .delete()
    .eq("user_id", userId);
  if (deleteHistoryError) throw deleteHistoryError;

  const { error: deleteSessionError } = await supabase
    .from("active_sessions")
    .delete()
    .eq("user_id", userId);
  if (deleteSessionError) throw deleteSessionError;

  await pushLocalToCloud(userId, local);
}
