"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ProgressRecord } from "@/types/progress";

interface AccuracyByArticleChartProps {
  history: ProgressRecord["history"];
}

interface ArticleAccuracy {
  article: string;
  accuracy: number;
  total: number;
}

function buildChartData(history: ProgressRecord["history"]): ArticleAccuracy[] {
  const byArticle = new Map<string, { correct: number; total: number }>();

  for (const entry of history) {
    const stat = byArticle.get(entry.article) ?? { correct: 0, total: 0 };

    stat.total += 1;
    if (entry.correct) stat.correct += 1;

    byArticle.set(entry.article, stat);
  }

  return [...byArticle.entries()]
    .map(([article, stat]) => ({
      article,
      accuracy: Math.round((stat.correct / stat.total) * 100),
      total: stat.total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
}

export function AccuracyByArticleChart({ history }: AccuracyByArticleChartProps) {
  const data = buildChartData(history);
  const height = Math.max(160, data.length * 40);

  return (
    <section className="mb-6 rounded-card border border-border bg-card p-6 shadow-lg shadow-black/20">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Accuracy by Article
      </h3>

      <p className="mt-1 text-xs text-muted-foreground">
        Weakest articles first — based on your answer history.
      </p>

      <div className="mt-4" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 24, top: 0, bottom: 0 }}>
            <CartesianGrid horizontal={false} stroke="var(--border)" />

            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
              unit="%"
            />

            <YAxis
              type="category"
              dataKey="article"
              width={44}
              tick={{ fill: "var(--foreground)", fontSize: 13, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "var(--border)", opacity: 0.4 }}
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--foreground)",
              }}
              labelFormatter={(label) => `Article ${label}`}
              formatter={(value, _name, item) => [
                `${value}% (${item.payload.total} answered)`,
                "Accuracy",
              ]}
            />

            <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} maxBarSize={20}>
              {data.map((entry) => (
                <Cell
                  key={entry.article}
                  fill={
                    entry.accuracy < 50
                      ? "var(--danger)"
                      : entry.accuracy < 80
                      ? "var(--accent)"
                      : "var(--success)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
