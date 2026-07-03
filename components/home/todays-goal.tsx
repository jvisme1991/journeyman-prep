"use client";

interface TodaysGoalProps {
  completed: number;
  goal: number;
}

export function TodaysGoal({
  completed,
  goal,
}: TodaysGoalProps) {
  const percent =
    goal === 0 ? 0 : Math.round((completed / goal) * 100);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
        Today&apos;s Goal
      </p>

      <div className="mt-3 flex items-end justify-between">
        <h2 className="text-3xl font-bold">
          {completed} / {goal}
        </h2>

        <span className="text-lg font-semibold text-blue-400">
          {percent}%
        </span>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-green-500 transition-all"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-400">
        Keep going. Every question gets you closer to passing.
      </p>
    </section>
  );
}