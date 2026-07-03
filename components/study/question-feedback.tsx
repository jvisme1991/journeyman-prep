"use client";

interface QuestionFeedbackProps {
  correct: boolean;
  explanation: string;
  references?: string[];
}

export function QuestionFeedback({
  correct,
  explanation,
  references = [],
}: QuestionFeedbackProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div
        className={`text-xl font-bold ${
          correct ? "text-green-400" : "text-red-400"
        }`}
      >
        {correct ? "✓ Correct" : "✗ Incorrect"}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Explanation</h3>

        <p className="mt-2 text-slate-300 leading-7">
          {explanation}
        </p>
      </div>

      {references.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold">
            NEC Reference
          </h3>

          <div className="mt-2 flex flex-wrap gap-2">
            {references.map((reference) => (
              <span
                key={reference}
                className="rounded-lg bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-400"
              >
                {reference}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}