import { articles } from "@/data/articles";
import { questionRepository } from "@/services/question-repository";
import type { DailyGoal, DashboardStats, ReadinessData } from "@/types/dashboard";
import type { ProgressRecord } from "@/types/progress";

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getDailyGoalProgress(progress: ProgressRecord): DailyGoal {
  const today = isoDate(new Date());

  const completed = progress.history.filter(
    (entry) => entry.answeredAt.slice(0, 10) === today
  ).length;

  return { goal: progress.dailyGoal, completed };
}

export function getDashboardStats(progress: ProgressRecord): DashboardStats {
  const total = progress.history.length;
  const correct = progress.history.filter((entry) => entry.correct).length;
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);

  const byArticle = new Map<string, { correct: number; total: number }>();

  for (const entry of progress.history) {
    const stat = byArticle.get(entry.article) ?? { correct: 0, total: 0 };

    stat.total += 1;
    if (entry.correct) stat.correct += 1;

    byArticle.set(entry.article, stat);
  }

  let weakestArticle = "—";
  let lowestAccuracy = Infinity;

  for (const [article, stat] of byArticle) {
    const articleAccuracy = stat.correct / stat.total;

    if (articleAccuracy < lowestAccuracy) {
      lowestAccuracy = articleAccuracy;
      weakestArticle = article;
    }
  }

  return {
    questionsAnswered: total,
    accuracy,
    streak: progress.currentStreak,
    weakestArticle,
  };
}

/**
 * Readiness blends accuracy (70%) with bank coverage (30%) so a user who
 * has only answered a handful of questions correctly isn't shown a
 * misleadingly high score. Deterministic given the same progress record.
 */
export function getReadinessData(progress: ProgressRecord): ReadinessData {
  const stats = getDashboardStats(progress);
  const bankSize = questionRepository.getAll().length;
  const coverage = bankSize === 0 ? 0 : Math.min(1, stats.questionsAnswered / bankSize);

  const readiness =
    stats.questionsAnswered === 0
      ? 0
      : Math.round(stats.accuracy * 0.7 + coverage * 100 * 0.3);

  const weakestArticleMeta = articles.find(
    (article) => article.number === stats.weakestArticle
  );

  const nextLesson =
    stats.questionsAnswered === 0
      ? "Complete your first practice session to get a personalized study plan."
      : weakestArticleMeta
      ? `Focus on Article ${weakestArticleMeta.number}: ${weakestArticleMeta.title}.`
      : "Keep practicing to build exam readiness.";

  return { readiness, nextLesson };
}
