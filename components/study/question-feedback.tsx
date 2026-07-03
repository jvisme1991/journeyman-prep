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
    <div
      className={`rounded-card border p-6 shadow-lg shadow-black/20 ${
        correct ? "border-success/40 bg-success/10" : "border-danger/40 bg-danger/10"
      }`}
    >
      <div
        className={`text-xl font-bold ${
          correct ? "text-success" : "text-danger"
        }`}
      >
        {correct ? "✓ Correct" : "✗ Incorrect"}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-foreground">Explanation</h3>

        <p className="mt-2 leading-7 text-muted-foreground">
          {explanation}
        </p>
      </div>

      {references.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-foreground">
            NEC Reference
          </h3>

          <div className="mt-2 flex flex-wrap gap-2">
            {references.map((reference) => (
              <span
                key={reference}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-accent"
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