export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  article: string;
  section?: string;
  chapter: number;
  topic: string;
  difficulty: Difficulty;
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
  references: string[];
  tags: string[];
}