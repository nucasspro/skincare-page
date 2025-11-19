import { RelatedArticles } from "@/components/content/related-articles"
import { Footer } from "@/components/layout/footer"
import { Navigation } from "@/components/navigation/navigation"
import { ArticleService } from "@/lib/article-service"
import type { Article } from "@/lib/types/article"
import { getBodyContentFont, getKeyHeadingFont } from "@/lib/utils/font-utils"
import Image from "next/image"
import { notFound } from "next/navigation"

function formatDate(timestamp?: number | null) {
  if (!timestamp) return null
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(timestamp))
  } catch {
    return null
  }
}

function getExcerpt(article: Article) {
  if (article.excerpt) return article.excerpt
  return article.content.replace(/<[^>]*>/g, "").slice(0, 150)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await ArticleService.getBySlug(slug)

  if (!article) {
    return {
      title: "Bài viết",
    }
  }

  return {
    title: `${article.title} | Cellic`,
    description: getExcerpt(article),
    openGraph: {
      title: article.title,
      description: getExcerpt(article),
      images: article.featuredImage ? [{ url: article.featuredImage }] : undefined,
    },
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await ArticleService.getBySlug(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await ArticleService.getRelatedArticles(slug, {
    category: article!.category,
    limit: 3,
  })

  const publishedDate = formatDate(article!.publishedAt)

  return (
    <div className="min-h-screen bg-white">
      <Navigation isTransparent={false} />

      <main className="pb-20">
        <section className="relative h-[50vh] w-full min-h-[420px]">
          <Image
            src={article!.featuredImage || "/brand-story/4.png"}
            alt={article!.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto mb-10 max-w-4xl px-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                {article!.category?.replace(/-/g, " ")}
              </p>
              <h1 className={getKeyHeadingFont("text-4xl sm:text-5xl text-white leading-tight mt-4")}>
                {article!.title}
              </h1>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                {article!.author ? `${article!.author} • ` : ""}{publishedDate || "Đang cập nhật"}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl space-y-16 px-4 py-16 sm:px-6 lg:px-0">
          <article
            className={`${getBodyContentFont("text-lg leading-relaxed text-gray-800")} prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-stone-600`}
            dangerouslySetInnerHTML={{ __html: article!.content }}
          />

          <RelatedArticles articles={relatedArticles} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
