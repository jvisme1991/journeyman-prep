"use client";

import type { Question } from "@/types/question";

import { AnswerButton } from "./answer-button";

interface QuestionCardProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer?: number;
  submitted: boolean;
  onSelectAnswer: (answer: number) => void;
}

export function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  submitted,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
          Question {currentQuestion} / {totalQuestions}
        </span>

        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
          Article {question.article}
        </span>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium uppercase tracking-wide text-slate-400">
          {question.topic}
        </div>

        <h2 className="mt-2 text-2xl font-bold leading-8">
          {question.question}
        </h2>
      </div>

      <div className="mt-8 space-y-3">
        {question.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            letter={String.fromCharCode(65 + index)}
            text={answer}
            selected={selectedAnswer === index}
            disabled={submitted}
            onClick={() => onSelectAnswer(index)}
          />
        ))}
      </div>
    </div>
  );
}