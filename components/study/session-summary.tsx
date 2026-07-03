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
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
      <h2 className="text-3xl font-bold">
        Practice Complete
      </h2>

      <p className="mt-2 text-slate-400">
        Great work. Here&apos;s how you did.
      </p>

      <div className="mt-8">
        <div className="text-6xl font-black text-blue-400">
          {percent}%
        </div>

        <div className="mt-2 text-xl">
          {score} / {total} Correct
        </div>
      </div>
    </div>
  );
}