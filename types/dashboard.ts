export interface DashboardStats {
  questionsAnswered: number;
  accuracy: number;
  streak: number;
  weakestArticle: string;
}

export interface ReadinessData {
  readiness: number;
  nextLesson: string;
}

export interface DailyGoal {
  goal: number;
  completed: number;
}