"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Heart, Share2 } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function ProductInfo() {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { t } = useI18n()

  return (
    <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* Product Title & Price */}
      <div className="space-y-2">
        <h1 className="text-4xl font-light text-gray-900 text-balance">{t.bestSellers.products.essence.name}</h1>
        <p className="text-lg text-stone-600">{t.bestSellers.products.essence.tagline}</p>
        <div className="flex items-baseline gap-3 pt-2">
          <span className="text-3xl font-medium text-gray-900">$48.00</span>
          <span className="text-lg text-stone-500 line-through">$65.00</span>
          <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">Save 26%</span>
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
        <Button size="lg" className="w-full h-14 text-base bg-gray-900 hover:bg-gray-800 rounded-full">
          {t.productDetail.addToCart}
        </Button>
        <div className="flex gap-3">
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
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-2 pt-4 text-sm text-stone-600">
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{t.productDetail.freeShipping}</span>{" "}
          {t.productDetail.freeShippingText}
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{t.productDetail.returns}</span> {t.productDetail.returnsText}
        </p>
      </div>
    </div>
  )
}
