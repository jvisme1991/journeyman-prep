"use client";

import { useMemo, useState } from "react";

import { PracticeService } from "../services/practice-service";

interface PracticeResult {
  correct: boolean;
  correctAnswer: number;
  explanation: string;
}

export function usePractice() {
  const service = useMemo(() => new PracticeService(), []);

  const [question, setQuestion] = useState(service.getCurrentQuestion());
  const [selected, setSelected] = useState<number>();
  const [result, setResult] = useState<PracticeResult>();
  const [progress, setProgress] = useState(service.getProgress());
  const [completed, setCompleted] = useState(false);

  function submit() {
    if (selected === undefined) return;

    const response = service.submitAnswer(selected);

    setResult(response);
    setProgress(service.getProgress());
  }

  function next() {
    const hasNext = service.nextQuestion();

    if (!hasNext) {
      setCompleted(true);
      return;
    }

    setQuestion(service.getCurrentQuestion());
    setSelected(undefined);
    setResult(undefined);
    setProgress(service.getProgress());
  }

  function restart() {
    const newService = new PracticeService();

    setQuestion(newService.getCurrentQuestion());
    setSelected(undefined);
    setResult(undefined);
    setProgress(newService.getProgress());
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