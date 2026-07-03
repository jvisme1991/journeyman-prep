import { questionRepository } from "./question-repository";
import type { Question } from "@/types/question";

export class PracticeService {
  private questionPool: Question[];
  private currentIndex = 0;
  private score = 0;

  constructor(article?: string) {
    this.questionPool = article
      ? questionRepository.getByArticle(article)
      : questionRepository.getRandom(25);
  }

  getCurrentQuestion() {
    return this.questionPool[this.currentIndex];
  }

  submitAnswer(answer: number) {
    const question = this.getCurrentQuestion();

    const correct = answer === question.correctAnswer;

    if (correct) {
      this.score++;
    }

    return {
      correct,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    };
  }

  nextQuestion() {
    if (this.currentIndex >= this.questionPool.length - 1) {
      return false;
    }

    this.currentIndex++;
    return true;
  }

  getProgress() {
    return {
      current: this.currentIndex + 1,
      total: this.questionPool.length,
      score: this.score,
    };
  }
}

/*
 * This singleton keeps the existing app working.
 * usePractice.ts imports this.
 */
export const practiceService = new PracticeService();