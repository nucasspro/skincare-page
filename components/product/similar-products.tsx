"use client"

import { useProduct, useProducts } from "@/hooks/use-products"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/product-service"
import { formatCurrency } from "@/lib/utils/currency-utils"
import { getBodyContentFont, getKeyHeadingFont, getNavigationFont } from "@/lib/utils/font-utils"
import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"

interface SimilarProductsProps {
  productId: string
}

export function SimilarProducts({ productId }: SimilarProductsProps) {
  const { items, isHydrated, addItem } = useCart()
  const { products: allProducts, loading: productsLoading } = useProducts()
  const { product, loading: productLoading } = useProduct(productId)

  // Calculate related products from database
  const similarProducts = useMemo(() => {
    if (!product || allProducts.length === 0) return []

    const otherProducts = allProducts.filter(p => p.id !== productId)

    if (otherProducts.length === 0) return []

    // Helper function to calculate similarity score
    const calculateScore = (p: Product): number => {
      let score = 0

      // Priority 1: Same category and shared needs (highest priority)
      if (p.category === product.category) {
        score += 100
        const sharedNeeds = p.needs.filter(need => product.needs.includes(need))
        score += sharedNeeds.length * 20 // Each shared need adds 20 points
      }

      // Priority 3: Different category but shared needs
      if (p.category !== product.category) {
        const sharedNeeds = p.needs.filter(need => product.needs.includes(need))
        score += sharedNeeds.length * 10 // Each shared need adds 10 points
      }

      return score
    }

    // Sort by score (highest first) and take limit
    const sortedProducts = otherProducts
      .map(p => ({ product: p, score: calculateScore(p) }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.product)
      .slice(0, 4)

    // If we don't have enough products, fill with any remaining products
    if (sortedProducts.length < 4) {
      const remaining = otherProducts.filter(
        p => !sortedProducts.some(sp => sp.id === p.id)
      )
      sortedProducts.push(...remaining.slice(0, 4 - sortedProducts.length))
    }

    return sortedProducts
  }, [product, allProducts, productId])

  const loading = productsLoading || productLoading

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-7 md:space-y-8">
        <div className="text-center space-y-1.5 sm:space-y-2">
          <h2 className={getKeyHeadingFont("text-2xl sm:text-3xl md:text-4xl text-gray-900 uppercase tracking-tight")}>CÓ THỂ BẠN CŨNG THÍCH</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-stone-200" />
              <div className="mt-2 space-y-2">
                <div className="h-4 bg-stone-200 rounded w-3/4" />
                <div className="h-3 bg-stone-200 rounded w-1/2" />
                <div className="h-4 bg-stone-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (similarProducts.length === 0) {
    return null
  }

  return (
    <div className="space-y-6 sm:space-y-7 md:space-y-8">
      <div className="text-center space-y-1.5 sm:space-y-2">
        <h2 className={getKeyHeadingFont("text-2xl sm:text-3xl md:text-4xl text-gray-900 uppercase tracking-tight")}>CÓ THỂ BẠN CŨNG THÍCH</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {similarProducts.map((product: Product) => (
          <div key={product.id} className="group space-y-2 sm:space-y-3 md:space-y-4 w-full flex flex-col">
            <Link href={`/product/${product.slug}`} className="block w-full flex flex-col">
              <div className="relative aspect-square bg-stone-50 overflow-hidden w-full">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-0.5 sm:space-y-1 mt-2 sm:mt-3 md:mt-4 w-full">
                <h3
                  className={getKeyHeadingFont("text-sm sm:text-base font-medium text-gray-900 group-hover:text-stone-600 transition-colors truncate")}
                  title={product.name}
                >
                  {product.name}
                </h3>
                <p className={getBodyContentFont("text-xs sm:text-sm text-stone-600 truncate")} title={product.tagline}>{product.tagline}</p>
                <p className={getBodyContentFont("text-base sm:text-lg font-medium text-gray-900")}>{formatCurrency(product.price)}</p>
              </div>
            </Link>
            {!isHydrated ? (
              <div className="w-full h-9 sm:h-10 px-3 sm:px-4 rounded-full border border-stone-300 bg-gray-100 flex items-center justify-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                <span className="text-gray-500 text-[10px] sm:text-xs">Đang tải...</span>
              </div>
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
                  }, 1)
                }}
                className={getNavigationFont("w-full h-9 sm:h-10 px-3 sm:px-4 rounded-full border border-stone-300 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-colors bg-transparent text-center flex items-center justify-center text-xs sm:text-sm font-medium")}
              >
                Thêm vào giỏ
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
