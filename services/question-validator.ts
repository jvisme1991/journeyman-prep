import type { Question } from "../types/question";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateQuestion(
  question: Question
): ValidationResult {
  const errors: string[] = [];

  if (!question.id.trim()) {
    errors.push("Missing question ID.");
  }

  if (!question.article.trim()) {
    errors.push("Missing article.");
  }

  if (question.answers.length !== 4) {
    errors.push("Exactly four answers are required.");
  }

  if (
    question.correctAnswer < 0 ||
    question.correctAnswer > 3
  ) {
    errors.push("Correct answer index is invalid.");
  }

  if (!question.explanation.trim()) {
    errors.push("Explanation is required.");
  }

  if (question.references.length === 0) {
    errors.push("At least one NEC reference is required.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}