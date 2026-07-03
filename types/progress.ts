export interface AnsweredQuestion {
  questionId: string;
  article: string;
  correct: boolean;
  answeredAt: string;
}

export interface ActiveSession {
  article?: string;
  questionIds: string[];
  currentIndex: number;
  score: number;
  /**
   * The answer index submitted for the question at currentIndex, if any.
   * Undefined means that question hasn't been submitted yet. Cleared when
   * advancing to the next question, so resuming can tell whether to show
   * the current question fresh or restore its submitted feedback.
   */
  submittedAnswer?: number;
}

export interface ProgressRecord {
  history: AnsweredQuestion[];
  dailyGoal: number;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
  activeSession: ActiveSession | null;
}
