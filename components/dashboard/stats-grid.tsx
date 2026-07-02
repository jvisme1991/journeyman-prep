import { DashboardStats } from "@/types/dashboard";

interface Props {
  stats: DashboardStats;
}

export function StatsGrid({ stats }: Props) {
  const items = [
    {
      label: "Questions",
      value: stats.questionsAnswered,
    },
    {
      label: "Accuracy",
      value: `${stats.accuracy}%`,
    },
    {
      label: "Streak",
      value: `${stats.streak} Days`,
    },
    {
      label: "Weakest",
      value: stats.weakestArticle,
    },
  ];

  return (
    <section className="mb-6 grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {item.label}
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {item.value}
          </h3>
        </div>
      ))}
    </section>
  );
}