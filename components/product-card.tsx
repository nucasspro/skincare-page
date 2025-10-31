"use client"

import { formatCurrency } from "@/lib/currency-util"
import { type Product } from "@/lib/product-service"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
export interface ProductCardProps {
  product: Product
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onAddToCart: (product: Product) => void
  addToCartLabel: string,
  isShowPrice: boolean
}

export function ProductCard({
  product,
  isHovered,
  onHover,
  onLeave,
  onAddToCart,
  addToCartLabel,
  isShowPrice,
}: ProductCardProps) {
  const { items, isHydrated } = useCart()
  const router = useRouter()
  const isInCart = items.some(item => item.id === product.id)
  return (
    <div
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Product Image - Square aspect ratio */}
        <div className="relative aspect-square mb-4 overflow-hidden bg-stone-50">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-500"
            style={{ opacity: isHovered ? 0 : 1 }}
          />
          <Image
            src={product.hoverImage || "/placeholder.svg"}
            alt={`${product.name} alternate view`}
            fill
            className="object-cover transition-opacity duration-500"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3
            className="text-lg font-medium text-gray-900 group-hover:text-stone-600 transition-colors truncate"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 truncate" title={product.tagline}>
            {product.tagline}
          </p>

          {isShowPrice && (
            <p className="text-base font-medium text-gray-900 mt-2">
              {formatCurrency(product.price)}
            </p>
          )}
        </div>
      </Link>

      {/* Add to Cart / Go to Cart Button - Shows on Hover */}
      <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="pointer-events-auto">
          {!isHydrated ? (
            <div className="w-full py-3 bg-gray-100 rounded-full flex items-center justify-center gap-2 shadow-lg">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              <span className="text-gray-500 text-sm">Đang tải...</span>
            </div>
          ) : isInCart ? (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                router.push("/cart")
              }}
              className="w-full py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Mua hàng
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onAddToCart(product)
              }}
              className="w-full py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              {addToCartLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
