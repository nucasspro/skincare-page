"use client"

import { useProduct } from "@/hooks/use-products"
import { useCart } from "@/lib/cart-context"
import { useI18n } from "@/lib/i18n-context"
import { getProductTitleFont } from "@/lib/utils/font-utils"
import { Check, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface MobileAddToCartProps {
  productId: string
}

export function MobileAddToCart({ productId }: MobileAddToCartProps) {
  const [isAdded, setIsAdded] = useState(false)
  const { t } = useI18n()
  const { addItem, items, isHydrated } = useCart()
  const router = useRouter()
  const { product, loading: productLoading } = useProduct(productId)

  if (productLoading || !product || !isHydrated) {
    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-gray-900 px-4 py-4 shadow-lg">
        <button
          disabled
          className={getProductTitleFont("w-full h-14 text-lg bg-gray-700 text-white rounded-full cursor-not-allowed flex items-center justify-center")}
        >
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
          <span className="text-lg">Đang tải...</span>
        </button>
      </div>
    )
  }

  const isInCart = items.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    if (isInCart) {
      router.push("/cart")
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      tagline: product.tagline,
    }, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-gray-900 px-4 py-4 shadow-lg">
      <button
        onClick={handleAddToCart}
        className={getProductTitleFont("w-full h-8 text-lg bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors flex items-center justify-center uppercase")}
      >
        {isAdded ? (
          <>
            <Check className="w-6 h-6 mr-3 stroke-[2.5]" />
            <span className="text-lg">Đã thêm vào giỏ</span>
          </>
        ) : isInCart ? (
          <>
            <ShoppingCart className="w-6 h-6 mr-3 stroke-[2.5]" />
            <span className="text-lg">Mua hàng</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-6 h-6 mr-3 stroke-[2.5]" />
            <span className="text-lg">{t.productDetail.addToCart || "Thêm vào giỏ"}</span>
          </>
        )}
      </button>
    </div>
  )
}
