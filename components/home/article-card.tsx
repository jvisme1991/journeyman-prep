"use client";

import Link from "next/link";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const disabled = article.questionCount === 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold">
            Article {article.number}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {article.title}
          </p>
        </div>

        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
          {article.questionCount}
        </span>
      </div>

      <div className="mt-5">
        {disabled ? (
          <div className="rounded-xl bg-slate-800 px-4 py-3 text-center text-sm text-slate-500">
            No questions available
          </div>
        ) : (
          <Link
            href={`/train?article=${article.number}`}
            className="block rounded-xl bg-blue-600 py-3 text-center font-semibold transition hover:bg-blue-700"
          >
            Study Article →
          </Link>
        )}
      </div>
    </div>
  );
}