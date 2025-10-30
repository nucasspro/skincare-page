"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useI18n } from "@/lib/i18n-context"
import { Check, Minus, Plus } from "lucide-react"
import { useState } from "react"

export function ProductInfo() {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { t } = useI18n()
  const { addItem } = useCart()

  return (
    <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* Product Title & Price */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-light text-gray-900 text-balance">{t.bestSellers.products.essence.name}</h1>
        {/* <p className="text-sm sm:text-lg text-stone-600">{t.bestSellers.products.essence.tagline}</p> */}
        <div className="flex items-baseline gap-2 sm:gap-3 pt-2">
          <span className="text-2xl sm:text-3xl font-medium text-gray-900">1.152.000đ</span>
          <span className="text-sm sm:text-lg text-stone-500 line-through">1.560.000đ</span>
          <span className="text-xs sm:text-sm font-medium text-green-700 bg-green-50 px-2 sm:px-3 py-1 rounded-full">Save 26%</span>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="space-y-3 py-4 border-y border-stone-200">
        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">{t.productDetail.keyBenefits}</h3>
        <ul className="space-y-2 text-stone-700">
          <li className="flex items-start gap-2">
            <span className="text-stone-400 mt-1">•</span>
            <span>{t.productDetail.benefits.hydration}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-stone-400 mt-1">•</span>
            <span>{t.productDetail.benefits.antiAging}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-stone-400 mt-1">•</span>
            <span>{t.productDetail.benefits.texture}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-stone-400 mt-1">•</span>
            <span>{t.productDetail.benefits.allSkinTypes}</span>
          </li>
        </ul>
      </div>

      {/* Product Highlights - 4 Icons */}
      <div className="grid grid-cols-4 gap-3 py-4 px-4">
        {/* Icon 1: No Alcohol */}
        <div className="flex flex-col items-center gap-2 text-center">
          <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L9 6H15L12 2Z" />
            <path d="M9 6V18C9 19.66 10.34 21 12 21C13.66 21 15 19.66 15 18V6" />
            <path d="M7 8H17" />
            <line x1="10" y1="12" x2="14" y2="12" strokeLinecap="round" />
          </svg>
          <p className="text-xs font-medium text-gray-900">Không cồn</p>
        </div>

        {/* Icon 2: No Sulfate */}
        <div className="flex flex-col items-center gap-2 text-center">
          <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="7" x2="12" y2="17" />
            <line x1="7" y1="12" x2="17" y2="12" />
          </svg>
          <p className="text-xs font-medium text-gray-900">Không sulfate</p>
        </div>

        {/* Icon 3: No Mineral Oil */}
        <div className="flex flex-col items-center gap-2 text-center">
          <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L19 7V17C19 18.66 15.66 20 12 20C8.34 20 5 18.66 5 17V7L12 2Z" />
            <path d="M12 10L8 12.5V17" />
            <path d="M12 10L16 12.5V17" />
          </svg>
          <p className="text-xs font-medium text-gray-900">Không dầu khoáng</p>
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
        <Button
          size="lg"
          className="w-full h-14 text-base bg-gray-900 hover:bg-gray-800 rounded-full"
          onClick={() => {
            addItem({
              id: "1",
              name: t.bestSellers.products.essence.name,
              price: 48,
              image: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
              tagline: t.bestSellers.products.essence.tagline,
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
