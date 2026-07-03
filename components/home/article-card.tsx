"use client";

import type { NecArticle } from "../../types/article";

interface ArticleCardProps {
  article: NecArticle;
}

export function ArticleCard({
  article,
}: ArticleCardProps) {
  const percent =
    article.questionCount === 0
      ? 0
      : Math.round(
          (article.completed / article.questionCount) * 100
        );

  return (
    <button className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500 hover:bg-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold">
            Article {article.id}
          </div>

          <div className="mt-1 text-sm text-slate-400">
            {article.title}
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-bold text-blue-400">
            {percent}%
          </div>

          <div className="text-xs text-slate-500">
            Complete
          </div>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <div className="mt-3 text-sm text-slate-400">
        {article.completed} of {article.questionCount} Questions
      </div>
    </button>
  );
}