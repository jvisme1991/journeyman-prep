"use client";

import { usePractice } from "../../hooks/usePractice";

import { QuestionCard } from "./question-card";
import { SubmitBar } from "./submit-bar";
import { QuestionFeedback } from "./question-feedback";
import { SessionSummary } from "./session-summary";

export function TrainingSession() {
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
  } = usePractice();

  const submitted = result !== undefined;

  if (completed) {
    return (
      <div className="space-y-6">
        <SessionSummary
          score={progress.score}
          total={progress.total}
        />

        <button
          onClick={restart}
          className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          Start New Practice Session
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
          />

          <button
            onClick={next}
            className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
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