"use client";

import { articles } from "@/data/articles";
import { ArticleCard } from "./article-card";

export function ArticleGrid() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Study by NEC Article
          </h2>

          <p className="text-sm text-slate-400">
            Master one article at a time.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.number}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}