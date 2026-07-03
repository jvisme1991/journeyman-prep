"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { Question } from "@/types/question";

interface DifficultyChartProps {
  questions: Question[];
}

export function DifficultyChart({ questions }: DifficultyChartProps) {
  const data = [
    { difficulty: "Easy", count: questions.filter((q) => q.difficulty === "easy").length },
    { difficulty: "Medium", count: questions.filter((q) => q.difficulty === "medium").length },
    { difficulty: "Hard", count: questions.filter((q) => q.difficulty === "hard").length },
  ];

  return (
    <div className="mt-4 h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />

          <XAxis
            dataKey="difficulty"
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={28}
          />

          <Tooltip
            cursor={{ fill: "var(--border)", opacity: 0.4 }}
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--foreground)",
            }}
          />

          <Bar dataKey="count" fill="var(--muted-foreground)" radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
