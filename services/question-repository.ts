import { questions } from "@/data/questions";
import type { Question, Difficulty } from "@/types/question";

class QuestionRepository {
  private readonly questions: Question[] = questions;

  getAll(): Question[] {
    return this.questions;
  }

  getRandom(count: number): Question[] {
    return [...this.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  getByArticle(article: string): Question[] {
    return this.questions.filter(
      (q) => q.article === article
    );
  }

  getByDifficulty(
    difficulty: Difficulty
  ): Question[] {
    return this.questions.filter(
      (q) => q.difficulty === difficulty
    );
  }

  getArticles(): string[] {
    return [...new Set(this.questions.map((q) => q.article))].sort();
  }

  getQuestionCount(article: string): number {
    return this.getByArticle(article).length;
  }
}

export const questionRepository = new QuestionRepository();