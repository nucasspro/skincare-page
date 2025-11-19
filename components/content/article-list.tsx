import Link from "next/link"

import type { Article } from "@/lib/types/article"
import { getBodyContentFont, getKeyHeadingFont } from "@/lib/utils/font-utils"

import { ArticleCard } from "./article-card"

export interface ArticleListProps {
  title: string
  description?: string
  articles: Article[]
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function ArticleList({
  title,
  description,
  articles,
  ctaLabel = "Xem thêm",
  ctaHref = "#",
  className = "",
}: ArticleListProps) {
  return (
    <section className={`space-y-10 ${className}`}>
      <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="space-y-4">
          <h2 className={getKeyHeadingFont("text-3xl md:text-4xl text-gray-900 tracking-tight uppercase")}>
            {title}
          </h2>
          {description && (
            <p className={getBodyContentFont("text-base md:text-lg text-gray-600 max-w-2xl")}>
              {description}
            </p>
          )}
        </div>

        {ctaHref && (
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-3 rounded-full border border-gray-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-900 transition-all hover:bg-gray-900 hover:text-white"
          >
            {ctaLabel}
            <span>↗</span>
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
