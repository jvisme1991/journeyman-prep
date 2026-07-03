import { Flame } from "lucide-react";
import { DailyGoal } from "@/types/dashboard";

interface Props {
  goal: DailyGoal;
}

export function TodaysGoal({ goal }: Props) {
  const percent =
    goal.goal === 0 ? 0 : (goal.completed / goal.goal) * 100;

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            Today&apos;s Goal
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {goal.goal} Questions
          </h2>
        </div>

        <div className="rounded-2xl bg-orange-500/10 p-3">
          <Flame className="text-orange-400" />
        </div>
      </div>

      <div className="mb-2 flex justify-between text-sm text-slate-400">
        <span>Completed</span>
        <span>
          {goal.completed} / {goal.goal}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-orange-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </section>
  );
}