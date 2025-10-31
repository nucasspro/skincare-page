"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useI18n } from "@/lib/i18n-context"
import { getProductById } from "@/lib/product-service"
import { formatCurrency } from "@/lib/currency-util"
import { Check, Minus, Plus } from "lucide-react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"

interface ProductInfoProps {
  productId: string
}

export function ProductInfo({ productId }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { t } = useI18n()
  const { addItem, items, isHydrated } = useCart()
  const router = useRouter()

  const product = useMemo(() => getProductById(productId), [productId])

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Không tìm thấy sản phẩm</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* Product Title & Price */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-light text-gray-900 text-balance">{product.name}</h1>
        {product.tagline && (
          <p className="text-sm sm:text-lg text-stone-600">{product.tagline}</p>
        )}
        <div className="flex items-baseline gap-2 sm:gap-3 pt-2">
          <span className="text-2xl sm:text-3xl font-medium text-gray-900">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <>
              <span className="text-sm sm:text-lg text-stone-500 line-through">{formatCurrency(product.originalPrice)}</span>
              {product.discount && (
                <span className="text-xs sm:text-sm font-medium text-green-700 bg-green-50 px-2 sm:px-3 py-1 rounded-full">
                  Giảm {product.discount}%
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Key Benefits */}
      {product.benefits && product.benefits.length > 0 && (
        <div className="space-y-3 py-4 border-y border-stone-200">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">{t.productDetail.keyBenefits}</h3>
          <ul className="space-y-2 text-stone-700">
            {product.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-stone-400 mt-1">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Product Highlights - 3 Icons */}
      <div className="grid grid-cols-3 gap-3 py-4 px-4">
        {/* Icon 1: Cho da dầu mụn */}
        <div className="flex flex-col items-center gap-2 text-center">
          <svg className="w-10 h-10 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="9" cy="10" r="1.5" fill="currentColor" />
            <circle cx="15" cy="10" r="1.5" fill="currentColor" />
            <path d="M9 16c.5 1 1.5 1.5 3 1.5s2.5-.5 3-1.5" />
            <circle cx="7" cy="8" r="1.5" fill="currentColor" opacity="0.6" />
            <circle cx="17" cy="8" r="1" fill="currentColor" opacity="0.6" />
            <circle cx="6" cy="13" r="1" fill="currentColor" opacity="0.6" />
            <circle cx="18" cy="14" r="1" fill="currentColor" opacity="0.6" />
          </svg>
          <p className="text-xs font-medium text-gray-900 leading-tight">Cho da dầu mụn</p>
        </div>

        {/* Icon 2: Kiểm soát dầu thông minh */}
        <div className="flex flex-col items-center gap-2 text-center">
          <svg className="w-10 h-10 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6v3M12 15v3M6 12h3M15 12h3" strokeWidth="1.5" />
            <path d="M8.5 8.5l2.5 2.5M13 13l2.5 2.5M8.5 15.5l2.5-2.5M13 11l2.5-2.5" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.2" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
          <p className="text-xs font-medium text-gray-900 leading-tight">Kiểm soát dầu thông minh</p>
        </div>

        {/* Icon 3: PDRN phục hồi tế bào da */}
        <div className="flex flex-col items-center gap-2 text-center">
          <svg className="w-10 h-10 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
            <circle cx="12" cy="12" r="3.5" fill="none" />
            <circle cx="12" cy="8.5" r="1.5" fill="currentColor" />
            <circle cx="12" cy="15.5" r="1.5" fill="currentColor" />
            <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
            <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
            <path d="M10.5 10.5l3 3M13.5 10.5l-3 3" strokeWidth="1.5" />
            <path d="M7 14l10-10M17 14L7 4" strokeWidth="1" opacity="0.4" />
          </svg>
          <p className="text-xs font-medium text-gray-900 leading-tight">PDRN phục hồi tế bào da</p>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-900 uppercase tracking-wide">{t.productDetail.quantity}</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-stone-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 hover:bg-stone-50 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-6 py-3 text-center min-w-[60px] font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 hover:bg-stone-50 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        {!isHydrated ? (
          <Button
            size="lg"
            className="w-full h-14 text-base bg-gray-300 hover:bg-gray-300 rounded-full cursor-not-allowed"
            disabled
          >
            <div className="w-5 h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin mr-2" />
            Đang tải...
          </Button>
        ) : items.some(item => item.id === product.id) ? (
          <Button
            size="lg"
            className="w-full h-14 text-base bg-gray-900 hover:bg-gray-800 rounded-full"
            onClick={() => {
              router.push("/cart")
            }}
          >
            Mua hàng
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full h-14 text-base bg-gray-900 hover:bg-gray-800 rounded-full"
            onClick={() => {
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                tagline: product.tagline,
              }, quantity)
              setIsAdded(true)
              setTimeout(() => setIsAdded(false), 2000)
            }}
          >
            {isAdded ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Đã thêm vào giỏ
              </>
            ) : (
              t.productDetail.addToCart
            )}
          </Button>
        )}
        {/* <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 h-12 rounded-full bg-transparent"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={cn("w-5 h-5 mr-2", isFavorite && "fill-current")} />
            {isFavorite ? t.productDetail.saved : t.productDetail.save}
          </Button>
          <Button variant="outline" size="lg" className="flex-1 h-12 rounded-full bg-transparent">
            <Share2 className="w-5 h-5 mr-2" />
            {t.productDetail.share}
          </Button>
        </div> */}
      </div>

      {/* Additional Info */}
      {/* <div className="space-y-2 pt-4 text-sm text-stone-600">
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{t.productDetail.freeShipping}</span>{" "}
          {t.productDetail.freeShippingText}
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{t.productDetail.returns}</span> {t.productDetail.returnsText}
        </p>
      </div> */}
    </div>
  )
}
