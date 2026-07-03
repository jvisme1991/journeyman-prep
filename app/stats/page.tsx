import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { DifficultyChart } from "@/components/stats/difficulty-chart";
import { ProgressOverview } from "@/components/stats/progress-overview";
import { questions } from "@/data/questions";

export default function StatsPage() {
  const total = questions.length;
  const articles = new Set(questions.map((q) => q.article)).size;

  return (
    <>
      <AppShell>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Statistics</h1>

            <p className="mt-2 text-muted-foreground">
              Track your progress and review the question bank.
            </p>
          </div>

          <ProgressOverview />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Question Bank</h2>

            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Questions" value={total} />
              <StatCard title="Articles" value={articles} />
            </div>

            <div className="rounded-card border border-border bg-card p-5 shadow-lg shadow-black/20">
              <div className="text-sm text-muted-foreground">
                Questions by Difficulty
              </div>

              <DifficultyChart questions={questions} />
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
    <div className="rounded-card border border-border bg-card p-5 shadow-lg shadow-black/20">
      <div className="text-sm text-muted-foreground">{title}</div>

      <div className="mt-2 text-3xl font-bold text-foreground">
        {value}
      </div>
    </div>
  );
}
