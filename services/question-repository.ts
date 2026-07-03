import { questions } from "@/data/questions";
import type { Question } from "@/types/question";

class QuestionRepository {
  private readonly questions: Question[];

  constructor() {
    this.questions = questions;
  }

  getAll(): Question[] {
    return this.questions;
  }

  getById(id: string): Question | undefined {
    return this.questions.find((q) => q.id === id);
  }

  getByArticle(article: string): Question[] {
    return this.questions.filter((q) => q.article === article);
  }

  getByDifficulty(
    difficulty: Question["difficulty"]
  ): Question[] {
    return this.questions.filter(
      (q) => q.difficulty === difficulty
    );
  }
  getRandom(count: number): Question[] {
  const shuffled = [...this.questions].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}
}

export const questionRepository = new QuestionRepository();