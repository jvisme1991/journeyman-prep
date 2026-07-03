import article250 from "../data/articles/article-250.json";
import type { Question } from "../types/question";

class QuestionRepository {
  private readonly questions: Question[];

  constructor() {
    this.questions = [
      ...(article250 as Question[]),
    ];
  }

  getAll(): Question[] {
    return this.questions;
  }

  getByArticle(article: string): Question[] {
    return this.questions.filter(
      (q) => q.article === article
    );
  }

  getByDifficulty(
    difficulty: Question["difficulty"]
  ): Question[] {
    return this.questions.filter(
      (q) => q.difficulty === difficulty
    );
  }

  getById(id: string): Question | undefined {
    return this.questions.find(
      (q) => q.id === id
    );
  }

  getRandom(count: number): Question[] {
    const shuffled = [...this.questions];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [
        shuffled[j],
        shuffled[i],
      ];
    }

    return shuffled.slice(0, count);
  }
}

export const questionRepository =
  new QuestionRepository();