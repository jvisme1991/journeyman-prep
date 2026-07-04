import { computeStreakUpdate } from "@/lib/streak";
import type {
  ActiveSession,
  AnsweredQuestion,
  ProgressRecord,
} from "@/types/progress";

const STORAGE_KEY = "journeyman-prep:progress:v1";
const MAX_HISTORY = 500;
const DEFAULT_DAILY_GOAL = 25;

export function defaultProgress(): ProgressRecord {
  return {
    history: [],
    dailyGoal: DEFAULT_DAILY_GOAL,
    currentStreak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    activeSession: null,
  };
}

/**
 * Client-only persistence for study progress. Reads and writes are guarded
 * against SSR (no `window`) and malformed/missing localStorage data, always
 * falling back to a safe default shape.
 */
export const StorageService = {
  load(): ProgressRecord {
    if (typeof window === "undefined") {
      return defaultProgress();
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        return defaultProgress();
      }

      const parsed = JSON.parse(raw) as Partial<ProgressRecord>;

      return { ...defaultProgress(), ...parsed };
    } catch {
      return defaultProgress();
    }
  },

  save(progress: ProgressRecord) {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  clear() {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
  },

  /**
   * Appends an answered question to history and rolls the daily streak
   * forward deterministically based on calendar day (UTC), not wall-clock
   * session length.
   */
  recordAnswer(entry: Omit<AnsweredQuestion, "answeredAt">): ProgressRecord {
    const progress = StorageService.load();
    const now = new Date();

    progress.history.push({ ...entry, answeredAt: now.toISOString() });

    if (progress.history.length > MAX_HISTORY) {
      progress.history = progress.history.slice(-MAX_HISTORY);
    }

    const streak = computeStreakUpdate(progress, now);
    progress.currentStreak = streak.currentStreak;
    progress.bestStreak = streak.bestStreak;
    progress.lastActiveDate = streak.lastActiveDate;

    StorageService.save(progress);
    return progress;
  },

  setDailyGoal(goal: number): ProgressRecord {
    const progress = StorageService.load();

    progress.dailyGoal = Math.max(1, Math.round(goal));

    StorageService.save(progress);
    return progress;
  },

  saveActiveSession(session: ActiveSession): ProgressRecord {
    const progress = StorageService.load();

    progress.activeSession = session;

    StorageService.save(progress);
    return progress;
  },

  clearActiveSession(): ProgressRecord {
    const progress = StorageService.load();

    progress.activeSession = null;

    StorageService.save(progress);
    return progress;
  },
};
