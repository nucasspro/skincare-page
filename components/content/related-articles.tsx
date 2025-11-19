import type { Article } from "@/lib/types/article"
import { getKeyHeadingFont } from "@/lib/utils/font-utils"

import { ArticleCard } from "./article-card"

interface RelatedArticlesProps {
  articles: Article[]
  title?: string
  className?: string
}

export function RelatedArticles({
  articles,
  title = "Bài viết liên quan",
  className = "",
}: RelatedArticlesProps) {
  if (!articles.length) return null

  return (
    <section className={`space-y-6 ${className}`}>
      <h3 className={getKeyHeadingFont("text-xl text-gray-900 uppercase tracking-tight")}>
        {title}
      </h3>

      <div className="flex flex-col gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            variant="compact"
            showCategory={false}
          />
        ))}
      </div>
    </section>
  )
}
