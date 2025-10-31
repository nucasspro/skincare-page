"use client"

import { useCart } from "@/lib/cart-context"
import { useI18n } from "@/lib/i18n-context"
import { getFeaturedProducts } from "@/lib/product-service"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function BestSellers() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { t } = useI18n()
  const { addItem, items, isHydrated } = useCart()
  const router = useRouter()

  // Get featured products from service
  const products = getFeaturedProducts(4)

  return (
    <section className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">{t.bestSellers.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.bestSellers.subtitle}</p>
        </div>

        {/* Product Grid - Full width with gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link href={`/product/${product.slug}`} className="block">
                {/* Product Image - To lớn, không rounded */}
                <div className="relative aspect-square mb-4 overflow-hidden bg-stone-50">
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

                  {/* Add to Cart / Go to Cart Button - Shows on Hover - Inside Image Container */}
                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="pointer-events-auto">
                      {!isHydrated ? (
                        <div className="w-full py-3 bg-gray-100 rounded-full flex items-center justify-center gap-2 shadow-lg">
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                          <span className="text-gray-500 text-sm">Đang tải...</span>
                        </div>
                      ) : items.some(item => item.id === product.id) ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            router.push("/cart")
                          }}
                          className="w-full py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Mua hàng
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              tagline: product.tagline,
                            })
                          }}
                          className="w-full py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {t.bestSellers.addToCart}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h3
                    className="text-lg font-medium text-gray-900 group-hover:text-stone-600 transition-colors truncate"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate" title={product.tagline}>{product.tagline}</p>
                  {/* Ẩn giá theo yêu cầu */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
