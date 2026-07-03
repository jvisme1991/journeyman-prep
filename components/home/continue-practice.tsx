"use client";

import Link from "next/link";

interface ContinuePracticeProps {
  current: number;
  total: number;
}

export function ContinuePractice({
  current,
  total,
}: ContinuePracticeProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
        Continue Practice
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        Question {current} of {total}
      </h2>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <Link
        href="/train"
        className="mt-6 block w-full rounded-2xl bg-blue-600 py-4 text-center text-lg font-semibold transition hover:bg-blue-700"
      >
        Resume Session →
      </Link>
    </section>
  );
}