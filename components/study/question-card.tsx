"use client";

import type { Question } from "../../types/question";

import { AnswerButton } from "./answer-button";
import { QuestionProgress } from "./question-progress";

interface QuestionCardProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer?: number;
  submitted?: boolean;
  onSelectAnswer: (index: number) => void;
}

export function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  submitted = false,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <QuestionProgress
        current={currentQuestion}
        total={totalQuestions}
      />

      <div className="mb-6">
        <div className="mb-3 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
          NEC Article {question.article}
        </div>

        <h2 className="text-2xl font-bold leading-tight">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {question.answers.map((answer, index) => {
          const isCorrect =
            submitted && index === question.correctAnswer;

          const isIncorrect =
            submitted &&
            selectedAnswer === index &&
            index !== question.correctAnswer;

          return (
            <AnswerButton
              key={index}
              letter={String.fromCharCode(65 + index)}
              text={answer}
              selected={!submitted && selectedAnswer === index}
              correct={isCorrect}
              incorrect={isIncorrect}
              disabled={submitted}
              onClick={() => onSelectAnswer(index)}
            />
          );
        })}
      </div>
    </div>
  );
}