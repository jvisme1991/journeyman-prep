"use client";

import { useEffect, useState } from "react";

import { articles } from "@/data/articles";
import { useAuth } from "@/hooks/useAuth";
import { questionRepository } from "@/services/question-repository";
import { ProgressService } from "@/services/progress-service";
import type { ProgressRecord } from "@/types/progress";

import { ArticleCard } from "./article-card";

const CHAPTER_LABELS: Record<number, string> = {
  0: "Introduction",
  1: "Chapter 1 — General",
  2: "Chapter 2 — Wiring and Protection",
  3: "Chapter 3 — Wiring Methods and Materials",
  4: "Chapter 4 — Equipment for General Use",
};

function getChapter(articleNumber: string): number {
  const [firstQuestion] = questionRepository.getByArticle(articleNumber);
  return firstQuestion?.chapter ?? -1;
}

export function ArticleGrid() {
  const [progress, setProgress] = useState<ProgressRecord | null>(null);
  const { user, migrationStatus } = useAuth();

  // Client-only load; see home-dashboard.tsx for why this can't be
  // computed during the initial render, and why it depends on auth state.
  useEffect(() => {
    ProgressService.load().then(setProgress);
  }, [user, migrationStatus]);

  const grouped = new Map<number, typeof articles>();

  for (const article of articles) {
    const chapter = getChapter(article.number);
    const list = grouped.get(chapter) ?? [];

    list.push(article);
    grouped.set(chapter, list);
  }

  const chapters = [...grouped.keys()].sort((a, b) => a - b);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Study by NEC Article
        </h2>

        <p className="text-sm text-muted-foreground">
          Select an NEC article to begin studying.
        </p>
      </div>

      {chapters.map((chapter) => (
        <div key={chapter} className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {CHAPTER_LABELS[chapter] ?? "Other Articles"}
          </h3>

          <div className="space-y-3">
            {grouped.get(chapter)!.map((article) => {
              const history =
                progress?.history.filter((entry) => entry.article === article.number) ?? [];
              const answered = history.length;
              const correct = history.filter((entry) => entry.correct).length;
              const accuracy = answered === 0 ? 0 : Math.round((correct / answered) * 100);

              return (
                <ArticleCard
                  key={article.number}
                  article={{
                    ...article,
                    questionCount: questionRepository.getQuestionCount(article.number),
                  }}
                  answered={answered}
                  accuracy={accuracy}
                />
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
