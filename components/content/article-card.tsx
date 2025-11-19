"use client"

import Image from "next/image"
import Link from "next/link"

import type { Article } from "@/lib/types/article"
import { getBodyContentFont, getKeyHeadingFont } from "@/lib/utils/font-utils"

type ArticleCardVariant = "default" | "compact"

export interface ArticleCardProps {
  article: Article
  variant?: ArticleCardVariant
  className?: string
  showExcerpt?: boolean
  showCategory?: boolean
}

const FALLBACK_IMAGE = "/brand-story/1.png"

function formatPublishedDate(timestamp?: number | null) {
  if (!timestamp) return null

  try {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date)
  } catch {
    return null
  }
}

export function ArticleCard({
  article,
  variant = "default",
  className = "",
  showExcerpt = true,
  showCategory = true,
}: ArticleCardProps) {
  const publishedDate = formatPublishedDate(article.publishedAt)
  const image = article.featuredImage || FALLBACK_IMAGE

  const titleClasses =
    variant === "compact"
      ? getKeyHeadingFont("text-xl font-semibold text-gray-900")
      : getKeyHeadingFont("text-2xl font-semibold text-gray-900")

  const excerptClasses =
    variant === "compact"
      ? getBodyContentFont("text-sm text-gray-600 leading-relaxed")
      : getBodyContentFont("text-base text-gray-600 leading-relaxed")

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)] ${className}`}
    >
      <div className="relative w-full pt-[66%] overflow-hidden">
        <Image
          src={image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {showCategory && (
          <span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-900">
            {article.category?.replace(/-/g, " ")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-6 sm:p-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            {publishedDate || "ĐANG CẬP NHẬT"}
          </p>
          <Link href={`/articles/${article.slug}`} className="block focus:outline-none">
            <h3 className={`${titleClasses} line-clamp-2 transition-colors duration-300 group-hover:text-stone-600`}>
              {article.title}
            </h3>
          </Link>
        </div>

        {showExcerpt && article.excerpt && (
          <p className={`${excerptClasses} line-clamp-3`}>
            {article.excerpt}
          </p>
        )}

        <div className="mt-auto">
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-gray-900 transition-colors hover:text-stone-600"
          >
            ĐỌC THÊM
            <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
