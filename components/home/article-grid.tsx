"use client";

import { articles } from "@/data/articles";
import { questionRepository } from "@/services/question-repository";
import { ArticleCard } from "./article-card";

export function ArticleGrid() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">
          Study by NEC Article
        </h2>

        <p className="text-sm text-slate-400">
          Select an NEC article to begin studying.
        </p>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.number}
            article={{
              ...article,
              questionCount: questionRepository.getQuestionCount(
                article.number
              ),
            }}
          />
        ))}
      </div>
    </section>
  );
}