"use client";

import { useState } from "react";
import { practiceService } from "../services/practice-service";

interface PracticeResult {
  correct: boolean;
  correctAnswer: number;
  explanation: string;
}

export function usePractice() {
  const [question, setQuestion] = useState(
    practiceService.getCurrentQuestion()
  );

  const [selected, setSelected] = useState<number>();

  const [result, setResult] = useState<PracticeResult>();

  const [progress, setProgress] = useState(
    practiceService.getProgress()
  );

  const [completed, setCompleted] = useState(false);

  function submit() {
    if (selected === undefined) return;

    const response = practiceService.submitAnswer(selected);

    setResult(response);
    setProgress(practiceService.getProgress());
  }

  function next() {
    const hasNext = practiceService.nextQuestion();

    if (!hasNext) {
      setCompleted(true);
      return;
    }

    setQuestion(practiceService.getCurrentQuestion());
    setSelected(undefined);
    setResult(undefined);
    setProgress(practiceService.getProgress());
  }

  function restart() {
    practiceService.reset();

    setQuestion(practiceService.getCurrentQuestion());
    setSelected(undefined);
    setResult(undefined);
    setProgress(practiceService.getProgress());
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