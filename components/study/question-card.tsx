"use client";

import type { Question } from "@/types/question";

import { AnswerButton } from "./answer-button";

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: number;
  submitted: boolean;
  onSelectAnswer: (answer: number) => void;
}

export function QuestionCard({
  question,
  selectedAnswer,
  submitted,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="rounded-card border border-border bg-card p-6 shadow-lg shadow-black/20">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {question.topic}
        </div>

        <span className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
          Article {question.article}
        </span>
      </div>

      <h2 className="mt-3 text-2xl font-bold leading-8 text-foreground">
        {question.question}
      </h2>

      <div className="mt-8 space-y-3">
        {question.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            letter={String.fromCharCode(65 + index)}
            text={answer}
            selected={selectedAnswer === index}
            correct={submitted && index === question.correctAnswer}
            incorrect={
              submitted &&
              index === selectedAnswer &&
              index !== question.correctAnswer
            }
            disabled={submitted}
            onClick={() => onSelectAnswer(index)}
          />
        ))}
      </div>
    </div>
  );
}