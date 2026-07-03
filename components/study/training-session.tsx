"use client";

import Link from "next/link";

import { usePractice } from "@/hooks/usePractice";

import { QuestionCard } from "./question-card";
import { QuestionFeedback } from "./question-feedback";
import { SessionSummary } from "./session-summary";
import { SubmitBar } from "./submit-bar";

interface TrainingSessionProps {
  article?: string;
}

export function TrainingSession({ article }: TrainingSessionProps) {
  const {
    question,
    selected,
    setSelected,
    submit,
    next,
    restart,
    result,
    progress,
    completed,
  } = usePractice(article);

  const submitted = result !== undefined;

  if (progress.total === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h2 className="text-xl font-bold">No Questions Available</h2>

        <p className="mt-2 text-slate-400">
          {article
            ? `Article ${article} doesn't have any practice questions yet.`
            : "There are no practice questions in the bank yet."}
        </p>

        <Link
          href="/learn"
          className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Learn
        </Link>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="space-y-6">
        <SessionSummary
          score={progress.score}
          total={progress.total}
        />

        <button
          onClick={restart}
          className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700"
        >
          Start New Session
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <QuestionCard
        question={question}
        currentQuestion={progress.current}
        totalQuestions={progress.total}
        selectedAnswer={selected}
        submitted={submitted}
        onSelectAnswer={setSelected}
      />

      {!submitted ? (
        <SubmitBar
          disabled={selected === undefined}
          onSubmit={submit}
        />
      ) : (
        <>
          <QuestionFeedback
            correct={result.correct}
            explanation={result.explanation}
            references={question.references}
          />

          <button
            onClick={next}
            className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700"
          >
            {progress.current === progress.total
              ? "Finish Session"
              : "Next Question →"}
          </button>
        </>
      )}
    </div>
  );
}
