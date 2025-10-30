import { formatCurrency } from "@/lib/currency-util"
import { type Product } from "@/lib/product-service"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
  return (
    <div
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Product Image - Tall aspect ratio like best-sellers */}
        <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-stone-50">
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

          {/* Add to Cart Button - Shows on Hover */}
          <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.preventDefault()
                onAddToCart(product)
              }}
              className="w-full py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              {addToCartLabel}
            </button>
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
    </div>
  )
}
