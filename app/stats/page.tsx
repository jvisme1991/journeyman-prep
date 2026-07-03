import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ProgressOverview } from "@/components/stats/progress-overview";
import { questions } from "@/data/questions";

export default function StatsPage() {
  const total = questions.length;
  const articles = new Set(questions.map((q) => q.article)).size;
  const easy = questions.filter((q) => q.difficulty === "easy").length;
  const medium = questions.filter((q) => q.difficulty === "medium").length;
  const hard = questions.filter((q) => q.difficulty === "hard").length;

  return (
    <>
      <AppShell>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold">Statistics</h1>

            <p className="mt-2 text-slate-400">
              Track your progress and review the question bank.
            </p>
          </div>

          <ProgressOverview />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Question Bank</h2>

            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Questions" value={total} />
              <StatCard title="Articles" value={articles} />
              <StatCard title="Easy" value={easy} />
              <StatCard title="Medium / Hard" value={`${medium} / ${hard}`} />
            </div>
          </div>
        </div>
      </AppShell>

      <BottomNav />
    </>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="text-sm text-slate-400">{title}</div>

      <div className="mt-2 text-3xl font-bold">
        {value}
      </div>
    </div>
  );
}
