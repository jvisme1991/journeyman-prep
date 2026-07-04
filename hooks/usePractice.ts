"use client";

import { useEffect, useState } from "react";

import { PracticeService } from "../services/practice-service";

interface PracticeResult {
  correct: boolean;
  correctAnswer: number;
  explanation: string;
}

interface PracticeState {
  service: PracticeService;
  question: ReturnType<PracticeService["getCurrentQuestion"]>;
  progress: ReturnType<PracticeService["getProgress"]>;
}

async function buildState(article?: string): Promise<PracticeState> {
  const service = await PracticeService.create(article);

  return {
    service,
    question: service.getCurrentQuestion(),
    progress: service.getProgress(),
  };
}

export function usePractice(article?: string) {
  // Starts as null (not built via a useState initializer) because building
  // a session calls PracticeService -> ProgressService, which for guests
  // uses Math.random() for question selection and for signed-in users
  // reads from Supabase -- both are unsafe to do during the initial
  // render, since it would make the server-rendered HTML diverge from the
  // client's first render and trigger a hydration mismatch.
  const [state, setState] = useState<PracticeState | null>(null);
  const [selected, setSelected] = useState<number>();
  const [result, setResult] = useState<PracticeResult>();
  const [completed, setCompleted] = useState(false);

  // Builds (or resumes) a session and syncs `selected`/`result` to match.
  // If the resumed question was already submitted before the session was
  // left, this restores its feedback view instead of presenting it as an
  // unanswered question a user could submit a second time.
  async function loadState(article?: string) {
    const built = await buildState(article);
    const submitted = built.service.getSubmittedResult();

    setState(built);
    setSelected(submitted?.answer);
    setResult(
      submitted
        ? {
            correct: submitted.correct,
            correctAnswer: submitted.correctAnswer,
            explanation: submitted.explanation,
          }
        : undefined
    );
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadState(article);
    setCompleted(false);
  }, [article]);

  const loading = state === null;
  const service = state?.service;
  const question = state?.question;
  const progress = state?.progress ?? { current: 0, total: 0, score: 0 };

  async function submit() {
    if (selected === undefined || !service) return;

    const response = await service.submitAnswer(selected);

    setResult(response);
    setState((prev) => (prev ? { ...prev, progress: service.getProgress() } : prev));
  }

  async function next() {
    if (!service) return;

    const hasNext = await service.nextQuestion();

    if (!hasNext) {
      setCompleted(true);
      return;
    }

    setSelected(undefined);
    setResult(undefined);
    setState((prev) =>
      prev
        ? {
            ...prev,
            question: service.getCurrentQuestion(),
            progress: service.getProgress(),
          }
        : prev
    );
  }

  function restart() {
    loadState(article);
    setCompleted(false);
  }

  return {
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
  };
}
