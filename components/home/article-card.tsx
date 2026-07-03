"use client";

import Link from "next/link";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/train?article=${article.number}`}
      className="block w-full rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-500"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold">
            Article {article.number}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {article.title}
          </p>
        </div>

        <div className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
          {article.questionCount}
        </div>
      </div>

      <div className="mt-5 text-sm text-slate-500">
        {article.questionCount} Questions
      </div>
    </Link>
  );
}