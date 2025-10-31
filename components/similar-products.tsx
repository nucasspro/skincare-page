"use client"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/currency-util"
import { getRelatedProducts } from "@/lib/product-service"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SimilarProductsProps {
  productId: string
}

export function SimilarProducts({ productId }: SimilarProductsProps) {
  const { items, isHydrated } = useCart()
  const router = useRouter()
  // Get related products from service
  const similarProducts = getRelatedProducts(productId, 4)

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-4xl text-gray-900">Có thể bạn cũng thích</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
          <div key={product.id} className="group space-y-4 w-full flex flex-col">
            <Link href={`/product/${product.slug}`} className="block w-full flex flex-col">
              <div className="relative aspect-square bg-stone-50 rounded-xl overflow-hidden w-full">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1 mt-4 w-full">
                <h3
                  className="font-medium text-gray-900 group-hover:text-stone-600 transition-colors truncate"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-stone-600 truncate" title={product.tagline}>{product.tagline}</p>
                <p className="text-lg font-medium text-gray-900">{formatCurrency(product.price)}</p>
              </div>
            </Link>
            {!isHydrated ? (
              <div className="w-full h-10 px-4 rounded-full border border-stone-300 bg-gray-100 flex items-center justify-center gap-2">
                <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                <span className="text-gray-500 text-xs">Đang tải...</span>
              </div>
            ) : items.some(item => item.id === product.id) ? (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.push("/cart")
                }}
                className="w-full h-10 px-4 rounded-full border border-stone-300 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-colors bg-transparent text-center flex items-center justify-center text-sm font-medium"
              >
                Mua hàng
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                className="w-full h-10 px-4 rounded-full border border-stone-300 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-colors bg-transparent text-center flex items-center justify-center text-sm font-medium"
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
