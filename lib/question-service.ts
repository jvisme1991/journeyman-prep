import { questions } from "../data/questions";

export const QuestionService = {
  getAll() {
    return questions;
  },

  getByArticle(article: string) {
    return questions.filter((q) => q.article === article);
  },

  getByDifficulty(level: string) {
    return questions.filter((q) => q.difficulty === level);
  },

  getById(id: string) {
    return questions.find((q) => q.id === id);
  },
};