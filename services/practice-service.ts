import { questionRepository } from "./question-repository";
import { StorageService } from "./storage-service";
import type { Question } from "@/types/question";
import type { ActiveSession } from "@/types/progress";

const RANDOM_SESSION_LENGTH = 25;

interface ResumedSession {
  pool: Question[];
  currentIndex: number;
  score: number;
  submittedAnswer?: number;
}

export class PracticeService {
  private questionPool: Question[];
  private currentIndex = 0;
  private score = 0;
  private submittedAnswer?: number;
  private readonly article?: string;

  constructor(article?: string) {
    this.article = article;

    const resumed = this.tryResume(article);

    if (resumed) {
      this.questionPool = resumed.pool;
      this.currentIndex = resumed.currentIndex;
      this.score = resumed.score;
      this.submittedAnswer = resumed.submittedAnswer;
    } else {
      this.questionPool = article
        ? questionRepository.getByArticle(article)
        : questionRepository.getRandom(RANDOM_SESSION_LENGTH);

      this.persistSession();
    }
  }

  /**
   * Resumes an in-progress session from storage if one exists for the same
   * mode (matching article filter, or matching "random" when undefined).
   * Falls back to a fresh session if the saved question ids no longer
   * resolve against the current question bank.
   */
  private tryResume(article?: string): ResumedSession | null {
    const saved = StorageService.load().activeSession;

    if (
      !saved ||
      saved.article !== article ||
      saved.currentIndex >= saved.questionIds.length
    ) {
      return null;
    }

    const byId = new Map(questionRepository.getAll().map((q) => [q.id, q]));
    const pool = saved.questionIds
      .map((id) => byId.get(id))
      .filter((q): q is Question => Boolean(q));

    if (pool.length !== saved.questionIds.length) {
      return null;
    }

    return {
      pool,
      currentIndex: saved.currentIndex,
      score: saved.score,
      submittedAnswer: saved.submittedAnswer,
    };
  }

  private persistSession() {
    const session: ActiveSession = {
      article: this.article,
      questionIds: this.questionPool.map((q) => q.id),
      currentIndex: this.currentIndex,
      score: this.score,
      submittedAnswer: this.submittedAnswer,
    };

    StorageService.saveActiveSession(session);
  }

  getCurrentQuestion() {
    return this.questionPool[this.currentIndex];
  }

  getArticle() {
    return this.article;
  }

  submitAnswer(answer: number) {
    const question = this.getCurrentQuestion();

    const correct = answer === question.correctAnswer;

    if (correct) {
      this.score++;
    }

    StorageService.recordAnswer({
      questionId: question.id,
      article: question.article,
      correct,
    });

    this.submittedAnswer = answer;
    this.persistSession();

    return {
      correct,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    };
  }

  /**
   * If the current question has already been submitted (e.g. the session
   * was resumed after leaving mid-question), returns the same feedback
   * submitAnswer() would have returned, so the UI can restore it instead
   * of presenting the question as fresh and allowing a duplicate submit.
   */
  getSubmittedResult() {
    if (this.submittedAnswer === undefined) {
      return undefined;
    }

    const question = this.getCurrentQuestion();

    return {
      answer: this.submittedAnswer,
      correct: this.submittedAnswer === question.correctAnswer,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    };
  }

  nextQuestion() {
    if (this.currentIndex >= this.questionPool.length - 1) {
      StorageService.clearActiveSession();
      return false;
    }

    this.currentIndex++;
    this.submittedAnswer = undefined;
    this.persistSession();
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
