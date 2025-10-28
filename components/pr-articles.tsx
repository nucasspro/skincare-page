"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface Article {
  id: string
  title: string
  source: string
  thumbnail: string
  url: string
  excerpt: string
}

const articles: Article[] = [
  {
    id: "1",
    title: "The Science Behind Ceramide-Rich Skincare",
    source: "Vogue Beauty",
    thumbnail: "/pr-article-1.jpg",
    url: "#",
    excerpt: "Discover how ceramides transform your skin barrier and why dermatologists recommend them.",
  },
  {
    id: "2",
    title: "Top 10 Clean Beauty Brands to Watch in 2025",
    source: "Elle Magazine",
    thumbnail: "/pr-article-2.jpg",
    url: "#",
    excerpt: "Our brand makes the list for innovative formulations and sustainable practices.",
  },
  {
    id: "3",
    title: "K-Beauty Meets Science: A New Era of Skincare",
    source: "Harper's Bazaar",
    thumbnail: "/pr-article-3.jpg",
    url: "#",
    excerpt: "How Korean skincare innovation is revolutionizing the beauty industry worldwide.",
  },
  {
    id: "4",
    title: "Dermatologist-Approved Routines for Sensitive Skin",
    source: "Allure",
    thumbnail: "/pr-article-4.jpg",
    url: "#",
    excerpt: "Expert recommendations for building a gentle yet effective skincare routine.",
  },
]

export function PRArticles() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-24 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4 text-balance">Featured In</h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto text-pretty">
            Discover what beauty editors and skincare experts are saying about our products
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              onMouseEnter={() => setHoveredId(article.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <Image
                    src={article.thumbnail || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      hoveredId === article.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  {/* Overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-stone-900/40 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredId === article.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-sm font-medium">Read Article</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Source */}
                  <div className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">
                    {article.source}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-stone-900 mb-3 leading-tight group-hover:text-stone-700 transition-colors text-balance">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-stone-600 leading-relaxed text-pretty">{article.excerpt}</p>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
