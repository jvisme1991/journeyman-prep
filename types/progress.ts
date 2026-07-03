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
}

export interface ProgressRecord {
  history: AnsweredQuestion[];
  dailyGoal: number;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
  activeSession: ActiveSession | null;
}
