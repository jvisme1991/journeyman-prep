import type { Question } from "../types/question";

export const questions: Question[] = [
  {
    id: "Q0001",

    article: "250",

    section: "250.4(A)(5)",

    chapter: 2,

    topic: "Grounding & Bonding",

    difficulty: "easy",

    question:
      "Which NEC article primarily covers grounding and bonding?",

    answers: [
      "Article 210",
      "Article 220",
      "Article 250",
      "Article 430",
    ],

    correctAnswer: 2,

    explanation:
      "Article 250 contains the grounding and bonding requirements of the NEC.",

    references: ["250"],

    tags: ["grounding", "bonding"],
  },
];