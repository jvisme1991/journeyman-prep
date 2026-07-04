const MS_PER_DAY = 86_400_000;

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

interface StreakState {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
}

/**
 * Shared by the localStorage and Supabase-backed progress stores so streak
 * behavior is identical regardless of which backend is active. Rolls the
 * streak forward deterministically based on calendar day (UTC), not
 * wall-clock session length.
 */
export function computeStreakUpdate(prev: StreakState, now: Date): StreakState {
  const today = isoDate(now);

  if (prev.lastActiveDate === today) {
    return { ...prev, lastActiveDate: today };
  }

  const yesterday = isoDate(new Date(now.getTime() - MS_PER_DAY));
  const currentStreak = prev.lastActiveDate === yesterday ? prev.currentStreak + 1 : 1;
  const bestStreak = Math.max(prev.bestStreak, currentStreak);

  return { currentStreak, bestStreak, lastActiveDate: today };
}
