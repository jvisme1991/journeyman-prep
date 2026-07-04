import { getSessionState } from "@/lib/session-state";
import { StorageService } from "@/services/storage-service";
import {
  clearActiveSessionCloud,
  loadCloudProgress,
  recordAnswerCloud,
  saveActiveSessionCloud,
  setDailyGoalCloud,
} from "@/services/supabase-progress-service";
import type { ActiveSession, AnsweredQuestion, ProgressRecord } from "@/types/progress";

/**
 * Async facade in front of StorageService (localStorage, guests) and
 * supabase-progress-service (Supabase, signed-in users with a resolved
 * migration state). Every consumer -- PracticeService, Home/Stats/Profile
 * -- goes through this instead of StorageService directly, so routing
 * only needs to be decided in one place: lib/session-state.ts's userId,
 * which is only set once a signed-in user's migration/conflict check has
 * fully resolved (see components/providers/auth-provider.tsx). Anyone
 * signed out, or signed in but still checking/awaiting a conflict choice,
 * transparently falls back to localStorage -- identical to guest mode.
 */
export const ProgressService = {
  async load(): Promise<ProgressRecord> {
    const { userId } = getSessionState();
    if (userId) {
      return loadCloudProgress(userId);
    }
    return StorageService.load();
  },

  async recordAnswer(entry: Omit<AnsweredQuestion, "answeredAt">): Promise<ProgressRecord> {
    const { userId } = getSessionState();
    if (userId) {
      return recordAnswerCloud(userId, entry);
    }
    return StorageService.recordAnswer(entry);
  },

  async setDailyGoal(goal: number): Promise<ProgressRecord> {
    const { userId } = getSessionState();
    if (userId) {
      return setDailyGoalCloud(userId, goal);
    }
    return StorageService.setDailyGoal(goal);
  },

  async saveActiveSession(session: ActiveSession): Promise<ProgressRecord> {
    const { userId } = getSessionState();
    if (userId) {
      return saveActiveSessionCloud(userId, session);
    }
    return StorageService.saveActiveSession(session);
  },

  async clearActiveSession(): Promise<ProgressRecord> {
    const { userId } = getSessionState();
    if (userId) {
      return clearActiveSessionCloud(userId);
    }
    return StorageService.clearActiveSession();
  },
};
