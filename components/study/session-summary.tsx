"use client";

interface SessionSummaryProps {
  score: number;
  total: number;
}

export function SessionSummary({
  score,
  total,
}: SessionSummaryProps) {
  const percent =
    total === 0 ? 0 : Math.round((score / total) * 100);

  return (
    <div className="rounded-card border border-border bg-card p-8 text-center shadow-lg shadow-black/20">
      <h2 className="text-3xl font-bold text-foreground">
        Practice Complete
      </h2>

      <p className="mt-2 text-muted-foreground">
        Great work. Here&apos;s how you did.
      </p>

      <div className="mt-8">
        <div className="text-6xl font-black text-accent">
          {percent}%
        </div>

        <div className="mt-2 text-xl text-foreground">
          {score} / {total} Correct
        </div>
      </div>
    </div>
  );
}