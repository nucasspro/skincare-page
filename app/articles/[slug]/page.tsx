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
        </section>

        <section className="mx-auto w-full max-w-full px-4 py-16 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-16 lg:flex-row">
            {/* Left Column: Title and Metadata */}
            <aside className="lg:w-64 lg:flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div>
                  <p className={getBodyContentFont("text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 mb-4")}>
                    {article!.category?.replace(/-/g, " ").toUpperCase()}
                  </p>
                  <h1 className={getKeyHeadingFont("text-3xl text-gray-900 leading-tight mb-4")}>
                    {article!.title}
                  </h1>
                  <div className="space-y-2">
                    {article!.author && (
                      <p className={getBodyContentFont("text-sm text-gray-600")}>
                        <span className="font-semibold">Tác giả:</span> {article!.author}
                      </p>
                    )}
                    {publishedDate && (
                      <p className={getBodyContentFont("text-sm text-gray-600")}>
                        <span className="font-semibold">Ngày đăng:</span> {publishedDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Middle Column: Article Content */}
            <article className="lg:flex-[2]">
              <div
                className={`${getBodyContentFont("text-lg leading-relaxed text-gray-800")} prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-stone-600`}
                dangerouslySetInnerHTML={{ __html: article!.content }}
              />
            </article>

            {/* Right Column: Related Articles */}
            <aside className="lg:w-64 lg:flex-shrink-0">
              <RelatedArticles articles={relatedArticles} />
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
