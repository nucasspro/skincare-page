"use client"

import { useProducts } from "@/hooks/use-products"
import { useCart } from "@/lib/cart-context"
import { useI18n } from "@/lib/i18n-context"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function BestSellers() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { t } = useI18n()
  const { addItem, items, isHydrated } = useCart()
  const router = useRouter()
  const { products, loading: productsLoading } = useProducts()

  // Get featured products from database (first 4 products)
  const featuredProducts = products.slice(0, 4)

  return (
    <section className="py-14 sm:py-18 md:py-20 lg:py-24 bg-white">
      <div className="w-full">
        {/* Section Header - Centered */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900">Tất cả sản phẩm</h2>
        </div>

        {productsLoading ? (
          <div className="text-center py-12">
            <div className="w-6 h-6 border-2 border-gray-500 border-t-white rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gray-600">Đang tải sản phẩm...</p>
          </div>
        ) : (
          <>
            {/* Product List - Mobile: 1 per row, Desktop: 4 per row with square images */}
            <div className="space-y-0 md:space-y-0">
              {/* Mobile: 1 product per row */}
              <div className="md:hidden">
                {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={`/product/${product.slug}`} className="block">
                  {/* Spacing với nền xám trên mobile */}
                  {index > 0 && (
                    <div className="h-[10px] bg-gray-200"></div>
                  )}
                  {/* Product Image - Full width, tràn lề màn hình - Ảnh dọc */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-stone-50">
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
                    <div className="absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                      <div className="pointer-events-auto max-w-xs">
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

                  {/* Product Info - Padding như Facebook */}
                  <div className="space-y-2 px-4 sm:px-6 py-4 sm:py-5">
                    <h3
                      className="text-xl sm:text-2xl font-medium text-gray-900 group-hover:text-stone-600 transition-colors"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed" title={product.tagline}>
                      {product.tagline}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

              {/* Desktop: 4 products per row, taller images - Container with max-width */}
              <div className="hidden md:block">
                <div className="w-full px-3 sm:px-4 lg:px-6">
                  <div className="grid md:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
                {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={`/product/${product.slug}`} className="block">
                  {/* Product Image - Taller on desktop */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-stone-50">
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
                    <div className="absolute inset-x-5 bottom-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                      <div className="pointer-events-auto">
                        {!isHydrated ? (
                          <div className="w-full py-2.5 bg-gray-100 rounded-full flex items-center justify-center gap-2 shadow-lg">
                            <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                            <span className="text-gray-500 text-xs">Đang tải...</span>
                          </div>
                        ) : items.some(item => item.id === product.id) ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              router.push("/cart")
                            }}
                            className="w-full py-2.5 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg text-sm"
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
                            className="w-full py-2.5 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg text-sm"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {t.bestSellers.addToCart}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2 mt-5">
                    <h3
                      className="text-lg lg:text-xl xl:text-2xl font-medium text-gray-900 group-hover:text-stone-600 transition-colors line-clamp-2"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed line-clamp-2" title={product.tagline}>
                      {product.tagline}
                    </p>
                  </div>
                </Link>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </section>
  )
}
