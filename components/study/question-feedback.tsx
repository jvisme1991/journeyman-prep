interface QuestionFeedbackProps {
  correct: boolean;
  explanation: string;
}

export function QuestionFeedback({
  correct,
  explanation,
}: QuestionFeedbackProps) {
  return (
    <div
      className={`mt-6 rounded-2xl border p-5 ${
        correct
          ? "border-green-600 bg-green-600/10"
          : "border-red-600 bg-red-600/10"
      }`}
    >
      <h3 className="mb-2 text-lg font-bold">
        {correct ? "✅ Correct" : "❌ Incorrect"}
      </h3>

      <p className="text-slate-300">
        {explanation}
      </p>
    </div>
  );
}