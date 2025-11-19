import Link from "next/link"

import type { Article } from "@/lib/types/article"
import { getKeyHeadingFont } from "@/lib/utils/font-utils"

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
  articles,
  ctaLabel = "TẤT CẢ BÀI VIẾT",
  ctaHref,
  className = "",
}: ArticleListProps) {
  return (
    <section className={`space-y-10 ${className}`}>
      <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="space-y-4">
          <h2 className={getKeyHeadingFont("text-3xl md:text-4xl text-gray-900 tracking-tight uppercase")}>
            {title}
          </h2>
        </div>

        {ctaHref && (
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-between gap-3 rounded-none border border-stone-300 bg-stone-50 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 transition-colors hover:bg-stone-100"
          >
            <span>{ctaLabel}</span>
            <span>→</span>
          </Link>
        )}
      </div>

      <div className="grid gap-12 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
