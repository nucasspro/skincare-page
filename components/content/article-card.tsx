"use client"

import Image from "next/image"
import Link from "next/link"

import type { Article } from "@/lib/types/article"
import { getBodyContentFont, getKeyHeadingFont } from "@/lib/utils/font-utils"

type ArticleCardVariant = "default" | "compact" | "large"

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
    const date = new Date(timestamp * 1000)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = String(date.getFullYear()).slice(-2)
    return `${day}.${month}.${year}`
  } catch {
    return null
  }
}

function formatCategory(category?: string | null) {
  if (!category) return ""

  const categoryMap: Record<string, string> = {
    "kien-thuc-dep": "KIẾN THỨC ĐẸP",
    "hoat-dong-cellic": "Hoạt động CELLIC",
  }

  return categoryMap[category] || category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
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
      : variant === "large"
        ? getKeyHeadingFont("text-xl font-semibold text-gray-900")
        : getKeyHeadingFont("text-2xl font-semibold text-gray-900")

  const excerptClasses =
    variant === "compact"
      ? getBodyContentFont("text-sm text-gray-600 leading-relaxed")
      : variant === "large"
        ? getBodyContentFont("text-base text-gray-600 leading-relaxed")
        : getBodyContentFont("text-base text-gray-600 leading-relaxed")

  const categoryLabel = formatCategory(article.category)
  const metadata = publishedDate
    ? showCategory && categoryLabel
      ? `${categoryLabel} | ${publishedDate}`
      : publishedDate
    : "ĐANG CẬP NHẬT"

  return (
    <Link href={`/articles/${article.slug}`} className={`group flex flex-col overflow-hidden transition-all duration-300 cursor-pointer ${className}`}>
      <article className="flex flex-col flex-1">
        <div className={`relative w-full overflow-hidden ${variant === "large" ? "pt-[80%]" : "pt-[66%]"}`}>
          <Image
            src={image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className={`flex flex-1 flex-col space-y-3 ${variant === "large" ? "pl-0 pr-0 py-4" : "pb-6 pt-6"}`}>
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">
              {metadata}
            </p>
            <h3 className={`${titleClasses} line-clamp-2 transition-colors duration-300 group-hover:text-stone-600`}>
              {article.title}
            </h3>
          </div>

          {showExcerpt && article.excerpt && (
            <p className={`${excerptClasses} ${variant === "large" ? "line-clamp-5" : "line-clamp-3"}`}>
              {article.excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}
