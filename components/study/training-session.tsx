"use client";

import Link from "next/link";

import { usePractice } from "@/hooks/usePractice";

import { QuestionCard } from "./question-card";
import { QuestionFeedback } from "./question-feedback";
import { QuestionProgress } from "./question-progress";
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
    loading,
  } = usePractice(article);

  const submitted = result !== undefined;

  // Session data (random pool or resumed session) is only built client-side
  // after mount to avoid a hydration mismatch — render nothing until then.
  // Checked before the empty-pool case below, since `loading` is the only
  // state where `question` is expected to be undefined for a reason other
  // than "this article has no questions."
  if (loading) {
    return null;
  }

  if (progress.total === 0 || !question) {
    return (
      <div className="rounded-card border border-border bg-card p-8 text-center">
        <h2 className="text-xl font-bold text-foreground">No Questions Available</h2>

        <p className="mt-2 text-muted-foreground">
          {article
            ? `Article ${article} doesn't have any practice questions yet.`
            : "There are no practice questions in the bank yet."}
        </p>

        <Link
          href="/learn"
          className="mt-6 inline-block rounded-card bg-accent px-6 py-3 font-semibold text-accent-foreground transition hover:bg-accent/90"
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
          className="w-full rounded-card bg-accent py-4 text-lg font-semibold text-accent-foreground hover:bg-accent/90"
        >
          Start New Session
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <QuestionProgress current={progress.current} total={progress.total} />

      <QuestionCard
        question={question}
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
            className="w-full rounded-card bg-accent py-4 text-lg font-semibold text-accent-foreground hover:bg-accent/90"
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
