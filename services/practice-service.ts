import { questionRepository } from "./question-repository";

class PracticeService {
  private questionPool = questionRepository.getRandom(25);

  private currentIndex = 0;

  private score = 0;

  getCurrentQuestion() {
    return this.questionPool[this.currentIndex];
  }

  submitAnswer(answer: number) {
    const question = this.getCurrentQuestion();

    const correct =
      answer === question.correctAnswer;

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

  reset() {
    this.currentIndex = 0;
    this.score = 0;
    this.questionPool = questionRepository.getRandom(25);
  }
}

export const practiceService = new PracticeService();