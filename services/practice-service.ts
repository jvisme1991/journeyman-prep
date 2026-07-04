import { questionRepository } from "./question-repository";
import { ProgressService } from "./progress-service";
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
  private readonly article?: string;

  private constructor(
    article: string | undefined,
    private questionPool: Question[],
    private currentIndex: number,
    private score: number,
    private submittedAnswer: number | undefined
  ) {
    this.article = article;
  }

  /**
   * Async because resuming (or starting fresh) now goes through
   * ProgressService, which reads from Supabase for signed-in users --
   * this can no longer be a plain synchronous constructor.
   */
  static async create(article?: string): Promise<PracticeService> {
    const resumed = await PracticeService.tryResume(article);

    if (resumed) {
      return new PracticeService(
        article,
        resumed.pool,
        resumed.currentIndex,
        resumed.score,
        resumed.submittedAnswer
      );
    }

    const pool = article
      ? questionRepository.getByArticle(article)
      : questionRepository.getRandom(RANDOM_SESSION_LENGTH);

    const service = new PracticeService(article, pool, 0, 0, undefined);
    await service.persistSession();
    return service;
  }

  /**
   * Resumes an in-progress session from storage if one exists for the same
   * mode (matching article filter, or matching "random" when undefined).
   * Falls back to a fresh session if the saved question ids no longer
   * resolve against the current question bank.
   */
  private static async tryResume(article?: string): Promise<ResumedSession | null> {
    const saved = (await ProgressService.load()).activeSession;

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

  private async persistSession(): Promise<void> {
    const session: ActiveSession = {
      article: this.article,
      questionIds: this.questionPool.map((q) => q.id),
      currentIndex: this.currentIndex,
      score: this.score,
      submittedAnswer: this.submittedAnswer,
    };

    await ProgressService.saveActiveSession(session);
  }

  getCurrentQuestion() {
    return this.questionPool[this.currentIndex];
  }

  getArticle() {
    return this.article;
  }

  async submitAnswer(answer: number) {
    const question = this.getCurrentQuestion();

    const correct = answer === question.correctAnswer;

    if (correct) {
      this.score++;
    }

    await ProgressService.recordAnswer({
      questionId: question.id,
      article: question.article,
      correct,
    });

    this.submittedAnswer = answer;
    await this.persistSession();

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

  async nextQuestion(): Promise<boolean> {
    if (this.currentIndex >= this.questionPool.length - 1) {
      await ProgressService.clearActiveSession();
      return false;
    }

    this.currentIndex++;
    this.submittedAnswer = undefined;
    await this.persistSession();
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
