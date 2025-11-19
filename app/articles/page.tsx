import { ArticleList } from "@/components/content/article-list"
import { Footer } from "@/components/layout/footer"
import { Navigation } from "@/components/navigation/navigation"
import { ArticleService } from "@/lib/article-service"
import type { Article } from "@/lib/types/article"
import { getBodyContentFont, getKeyHeadingFont } from "@/lib/utils/font-utils"
import Image from "next/image"
import Link from "next/link"

function stripHtml(html?: string | null) {
  if (!html) return ""
  return html.replace(/<[^>]*>/g, "")
}

function FeaturedArticleHero({ article }: { article: Article }) {
  const excerpt = article.excerpt || stripHtml(article.content).slice(0, 220)

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[48px] bg-white shadow-[0_40px_120px_rgba(15,23,42,0.15)]">
        <div className="grid gap-0 overflow-hidden md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6 px-8 py-10 sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
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
                className="inline-flex items-center gap-3 rounded-full bg-gray-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all hover:bg-gray-700"
              >
                Đọc ngay
                <span>↗</span>
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

export default async function ArticlesPage() {
  const [featuredArticle] = await ArticleService.getFeatured(1)
  const kienThucDepArticles = await ArticleService.getByCategory("kien-thuc-dep", 3)
  const hoatDongCellicArticles = await ArticleService.getByCategory("hoat-dong-cellic", 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <Navigation isTransparent={false} />

      <main className="space-y-16 pb-20 pt-10 sm:pt-16">
        {featuredArticle && <FeaturedArticleHero article={featuredArticle} />}

        <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
          <ArticleList
            title="Kiến thức đẹp"
            description="Những bí quyết dưỡng da, chăm sóc cơ thể và lối sống lành mạnh từ đội ngũ chuyên gia Cellic."
            articles={kienThucDepArticles}
            ctaHref="/articles?category=kien-thuc-dep"
          />

          <ArticleList
            title="Hoạt động CELLIC"
            description="Cập nhật hành trình sống xanh, hoạt động cộng đồng và dự án truyền cảm hứng từ Cellic."
            articles={hoatDongCellicArticles}
            ctaHref="/articles?category=hoat-dong-cellic"
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
