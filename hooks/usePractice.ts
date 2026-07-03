"use client";

import { useEffect, useRef, useState } from "react";

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

function buildState(article?: string): PracticeState {
  const service = new PracticeService(article);

  return {
    service,
    question: service.getCurrentQuestion(),
    progress: service.getProgress(),
  };
}

export function usePractice(article?: string) {
  const [state, setState] = useState(() => buildState(article));
  const [selected, setSelected] = useState<number>();
  const [result, setResult] = useState<PracticeResult>();
  const [completed, setCompleted] = useState(false);

  // Skip the effect on mount: initial state is already built above. Only
  // rebuild the session when `article` changes on a later render.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setState(buildState(article));
    setSelected(undefined);
    setResult(undefined);
    setCompleted(false);
  }, [article]);

  const { service, question, progress } = state;

  function submit() {
    if (selected === undefined) return;

    const response = service.submitAnswer(selected);

    setResult(response);
    setState((prev) => ({ ...prev, progress: service.getProgress() }));
  }

  function next() {
    const hasNext = service.nextQuestion();

    if (!hasNext) {
      setCompleted(true);
      return;
    }

    setSelected(undefined);
    setResult(undefined);
    setState((prev) => ({
      ...prev,
      question: service.getCurrentQuestion(),
      progress: service.getProgress(),
    }));
  }

  function restart() {
    setState(buildState(article));
    setSelected(undefined);
    setResult(undefined);
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
  };
}
