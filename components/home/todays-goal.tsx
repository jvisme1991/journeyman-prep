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
    <section className="rounded-card border border-border bg-card p-6 shadow-lg shadow-black/20">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Today&apos;s Goal
        </p>

        <span className="text-sm font-semibold text-accent">
          {percent}%
        </span>
      </div>

      <h2 className="mt-3 text-3xl font-bold text-foreground">
        {completed} / {goal}
      </h2>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Keep going. Every question gets you closer to passing.
      </p>
    </section>
  );
}