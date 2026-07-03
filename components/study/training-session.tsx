"use client";

import { usePractice } from "../../hooks/usePractice";

import { QuestionCard } from "./question-card";
import { SubmitBar } from "./submit-bar";
import { QuestionFeedback } from "./question-feedback";

export function TrainingSession() {
  const {
    question,
    selected,
    setSelected,
    submit,
    next,
    result,
    progress,
  } = usePractice();

  const submitted = result !== undefined;

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
            Next Question →
          </button>
        </>
      )}
    </div>
  );
}