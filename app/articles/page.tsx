import { ArticleCard } from "@/components/content/article-card"
import { ArticleList } from "@/components/content/article-list"
import { Footer } from "@/components/layout/footer"
import { Navigation } from "@/components/navigation/navigation"
import { QuickContact } from "@/components/shared/quick-contact"
import { ArticleService } from "@/lib/article-service"
import type { Article } from "@/lib/types/article"
import { getBodyContentFont, getKeyHeadingFont } from "@/lib/utils/font-utils"
import Image from "next/image"
import Link from "next/link"

function stripHtml(html?: string | null) {
  if (!html) return ""
  return html.replace(/<[^>]*>/g, "")
}

function formatCategoryForHeader(category: string): string {
  const categoryMap: Record<string, string> = {
    "kien-thuc-dep": "KIẾN THỨC ĐẸP",
    "hoat-dong-cellic": "HOẠT ĐỘNG CELLIC",
  }
  return categoryMap[category] || category.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ").toUpperCase()
}

function FeaturedArticleHero({ article }: { article: Article }) {
  const excerpt = article.excerpt || stripHtml(article.content).slice(0, 220)

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-12">
      <div className="mx-auto w-full max-w-full bg-white shadow-[0_40px_120px_rgba(15,23,42,0.15)]">
        <div className="grid gap-0 overflow-hidden md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6 px-8 py-10 sm:p-12">
            <p className={getBodyContentFont("text-xs font-semibold uppercase tracking-[0.3em] text-gray-500")}>
              Bài viết nổi bật
            </p>
            <h1 className={getKeyHeadingFont("text-4xl sm:text-5xl text-gray-900 leading-tight")}>
              {article.title}
            </h1>
            <p className={getBodyContentFont("text-lg text-gray-600 leading-relaxed")}>
              {excerpt}...
            </p>
            <div>
              <Link
                href={`/articles/${article.slug}`}
                className={getBodyContentFont("inline-flex items-center gap-2 border border-stone-300 bg-stone-50 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 transition-colors hover:bg-stone-100")}
              >
                ĐỌC BÀI VIẾT
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden">
            <Image
              src={article.featuredImage || "/brand-story/2.png"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FilteredArticlesPage({ category, articles }: { category: string; articles: Article[] }) {
  const categoryLabel = formatCategoryForHeader(category)

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <Navigation isTransparent={false} />

      <main className="relative mx-auto w-full max-w-full px-4 pb-32 pt-16 sm:px-6 sm:pt-24 lg:px-12">
        {/* Header - Top left */}
        <div className="mb-12 pl-0">
          <h1 className={getKeyHeadingFont("text-2xl text-gray-900 uppercase tracking-wide")}>
            <Link href="/articles" className="hover:text-gray-700 transition-colors">
              BÀI VIẾT
            </Link>
            {" / "}
            {categoryLabel.toUpperCase()}
          </h1>
        </div>

        {/* Articles Grid - Layout: 3 top, 1 bottom left, contact button bottom right */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Top row: First 3 articles */}
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} variant="large" showExcerpt={true} />
            ))}
          </div>

          {/* Bottom row: 4th article on left, contact button on right */}
          {articles.length > 3 && (
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="md:col-span-1">
                <ArticleCard article={articles[3]} variant="large" showExcerpt={true} />
              </div>
              {/* Spacer for contact button */}
              <div className="hidden md:block md:col-span-2" />
            </div>
          )}

          {/* Contact button - bottom right (only show if less than 4 articles or on mobile) */}
          {articles.length <= 3 && (
            <div className="mt-6 flex justify-end md:absolute md:bottom-0 md:right-0">
              <QuickContact />
            </div>
          )}
        </div>

        {/* Contact button - fixed bottom right for larger screens */}
        {articles.length > 3 && (
          <div className="fixed bottom-8 right-8 z-50 hidden md:block">
            <QuickContact />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const category = params.category

  // If category filter is present, show filtered page
  if (category) {
    const response = await ArticleService.list({ category, pageSize: 12 })
    const articles = response.data || []

    return <FilteredArticlesPage category={category} articles={articles} />
  }

  // Default: show listing page with featured and sections
  const [featuredArticle] = await ArticleService.getFeatured(1)
  const kienThucDepArticles = await ArticleService.getByCategory("kien-thuc-dep", 3)
  const hoatDongCellicArticles = await ArticleService.getByCategory("hoat-dong-cellic", 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <Navigation isTransparent={false} />

      <main className="space-y-16 pb-20 pt-10 sm:pt-16">
        {featuredArticle && <FeaturedArticleHero article={featuredArticle} />}

        <div className="mx-auto w-full max-w-full px-4 pb-32 pt-16 sm:px-6 sm:pt-24 lg:px-12 space-y-16">
          <ArticleList
            title="Kiến thức đẹp"
            articles={kienThucDepArticles}
            ctaHref="/articles?category=kien-thuc-dep"
          />

          <ArticleList
            title="Hoạt động CELLIC"
            articles={hoatDongCellicArticles}
            ctaHref="/articles?category=hoat-dong-cellic"
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
