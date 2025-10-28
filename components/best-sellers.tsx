"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useI18n } from "@/lib/i18n-context"

interface Product {
  id: string
  name: string
  tagline: string
  price: number
  image: string
  hoverImage: string
}

export function BestSellers() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { t } = useI18n()

  const products: Product[] = [
    {
      id: "1",
      name: t.bestSellers.products.essence.name,
      tagline: t.bestSellers.products.essence.tagline,
      price: 68,
      image: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
      hoverImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
    },
    {
      id: "2",
      name: t.bestSellers.products.serum.name,
      tagline: t.bestSellers.products.serum.tagline,
      price: 89,
      image: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
      hoverImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
    },
    {
      id: "3",
      name: t.bestSellers.products.cream.name,
      tagline: t.bestSellers.products.cream.tagline,
      price: 75,
      image: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
      hoverImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
    },
    {
      id: "4",
      name: t.bestSellers.products.cleanser.name,
      tagline: t.bestSellers.products.cleanser.tagline,
      price: 42,
      image: "/luxury-facial-cleanser-bottle-minimal-white-backgr.jpg",
      hoverImage: "/luxury-facial-cleanser-bottle-product-shot-cream-b.jpg",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">{t.bestSellers.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.bestSellers.subtitle}</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link href={`/product/${product.id}`} className="block">
                {/* Product Image */}
                <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-stone-50">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-500"
                    style={{ opacity: hoveredId === product.id ? 0 : 1 }}
                  />
                  <Image
                    src={product.hoverImage || "/placeholder.svg"}
                    alt={`${product.name} alternate view`}
                    fill
                    className="object-cover transition-opacity duration-500"
                    style={{ opacity: hoveredId === product.id ? 1 : 0 }}
                  />

                  {/* Add to Cart Button - Shows on Hover */}
                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        console.log("Added to cart:", product.name)
                      }}
                      className="w-full py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {t.bestSellers.addToCart}
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-stone-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">{product.tagline}</p>
                  <p className="text-lg font-medium text-gray-900">${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
