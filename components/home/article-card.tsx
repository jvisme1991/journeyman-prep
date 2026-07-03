"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  answered: number;
  accuracy: number;
}

function MasteryRing({
  accuracy,
  started,
}: {
  accuracy: number;
  started: boolean;
}) {
  const size = 44;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = started ? accuracy : 0;
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="relative flex size-11 shrink-0 items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />

        {started && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        )}
      </svg>

      <span className="absolute text-[10px] font-bold text-foreground">
        {started ? `${Math.round(accuracy)}%` : "—"}
      </span>
    </div>
  );
}

export function ArticleCard({ article, answered, accuracy }: ArticleCardProps) {
  const disabled = article.questionCount === 0;

  const content = (
    <>
      <MasteryRing accuracy={accuracy} started={answered > 0} />

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-foreground">
          Article {article.number}
        </h3>

        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {article.title}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {disabled
            ? "No questions available"
            : `${article.questionCount} question${article.questionCount === 1 ? "" : "s"}${
                answered > 0 ? ` · ${answered} answered` : ""
              }`}
        </p>
      </div>

      {!disabled && (
        <ChevronRight size={18} className="shrink-0 text-muted-foreground" />
      )}
    </>
  );

  if (disabled) {
    return (
      <div className="flex items-center gap-4 rounded-card border border-border bg-card p-4 opacity-50">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/train?article=${article.number}`}
      className="flex items-center gap-4 rounded-card border border-border bg-card p-4 shadow-lg shadow-black/20 transition hover:border-accent/50"
    >
      {content}
    </Link>
  );
}
