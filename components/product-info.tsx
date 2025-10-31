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

  // Check if this is bright-matte-sunscreen product
  const isBrightMatte = product.slug === "bright-matte-sunscreen"

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:sticky lg:top-20 lg:self-start">
      {/* Product Title & Price */}
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-light text-gray-900 text-balance">{product.name}</h1>
          {isBrightMatte && (
            <span className="inline-flex items-center justify-center px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs md:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg animate-pulse">
              NEW ARRIVAL
            </span>
          )}
        </div>
        {product.tagline && (
          <p className="text-xs sm:text-sm md:text-base lg:text-base text-stone-600">
            {isBrightMatte 
              ? "Bảo vệ và kiểm soát dầu hiệu quả"
              : product.tagline
            }
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-2.5 gap-y-1 sm:gap-y-1.5 pt-1 sm:pt-1.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-medium text-gray-900">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm sm:text-base md:text-lg lg:text-lg text-stone-500 line-through">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
          {product.discount && product.discount > 0 && (
            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white bg-red-500 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md shadow-sm inline-flex items-center justify-center leading-none">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Key Benefits / Product Details */}
      {product.benefits && product.benefits.length > 0 && (
        <div className="space-y-2 sm:space-y-3 py-2.5 sm:py-3 border-y border-stone-200">
          {isBrightMatte ? (
            <>
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Công dụng:</h3>
                <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed">
                  Kem chống nắng nâng tone với màng lọc nano siêu mịn SPF50+ PA++++, bảo vệ da toàn diện suốt 8 giờ. Kết hợp PDRN phục hồi da, giúp sáng khỏe và mịn màng.
                </p>
              </div>
              
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Lợi ích:</h3>
                <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed">
                  Kem chống nắng kiềm dầu, nâng tone
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Loại da:</h3>
                <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed">
                  Da thường da dầu, Da nhạy cảm
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Thành phần:</h3>
                <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed">
                  Ultrafine Titanium Dioxide, Nano Zinc Oxide, Uvinul A Plus, Octinoxate, PDRN, Lavender Extract, Propanediol.
                </p>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xs sm:text-sm font-medium text-gray-900 uppercase tracking-wide">{t.productDetail.keyBenefits}</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base text-stone-700">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1 flex-shrink-0">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Product Highlights - 3 Icons */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 py-2 sm:py-3">
        {/* Icon 1: Cho da dầu mụn */}
        <div className="flex flex-col items-center gap-1 sm:gap-1.5 text-center">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-8 lg:h-8 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="9" cy="10" r="1.5" fill="currentColor" />
            <circle cx="15" cy="10" r="1.5" fill="currentColor" />
            <path d="M9 16c.5 1 1.5 1.5 3 1.5s2.5-.5 3-1.5" />
            <circle cx="7" cy="8" r="1.5" fill="currentColor" opacity="0.6" />
            <circle cx="17" cy="8" r="1" fill="currentColor" opacity="0.6" />
            <circle cx="6" cy="13" r="1" fill="currentColor" opacity="0.6" />
            <circle cx="18" cy="14" r="1" fill="currentColor" opacity="0.6" />
          </svg>
          <p className="text-[10px] sm:text-xs font-medium text-gray-900 leading-tight px-1">Cho da dầu mụn</p>
        </div>

        {/* Icon 2: Kiểm soát dầu thông minh */}
        <div className="flex flex-col items-center gap-1 sm:gap-1.5 text-center">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-8 lg:h-8 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6v3M12 15v3M6 12h3M15 12h3" strokeWidth="1.5" />
            <path d="M8.5 8.5l2.5 2.5M13 13l2.5 2.5M8.5 15.5l2.5-2.5M13 11l2.5-2.5" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.2" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
          <p className="text-[10px] sm:text-xs font-medium text-gray-900 leading-tight px-1">Kiểm soát dầu thông minh</p>
        </div>

        {/* Icon 3: PDRN phục hồi tế bào da */}
        <div className="flex flex-col items-center gap-1 sm:gap-1.5 text-center">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-8 lg:h-8 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
          <p className="text-[10px] sm:text-xs font-medium text-gray-900 leading-tight px-1">PDRN phục hồi tế bào da</p>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-medium text-gray-900 uppercase tracking-wide">{t.productDetail.quantity}</label>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center border border-stone-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 sm:p-2 md:p-2.5 hover:bg-stone-50 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <span className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-center min-w-[45px] sm:min-w-[50px] font-medium text-sm sm:text-base">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 sm:p-2 md:p-2.5 hover:bg-stone-50 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
          {isBrightMatte && (
            <span className="inline-flex items-center justify-center px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-white bg-red-500 rounded-md shadow-md">
              Mua 1 tặng 1 giá 219K
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 sm:space-y-2.5 pt-1 sm:pt-1.5">
        {!isHydrated ? (
          <Button
            size="lg"
            className="w-full h-10 sm:h-11 md:h-12 lg:h-12 text-sm sm:text-base bg-gray-300 hover:bg-gray-300 rounded-full cursor-not-allowed"
            disabled
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin mr-2" />
            Đang tải...
          </Button>
        ) : items.some(item => item.id === product.id) ? (
          <Button
            size="lg"
            className="w-full h-10 sm:h-11 md:h-12 lg:h-12 text-sm sm:text-base bg-gray-900 hover:bg-gray-800 rounded-full"
            onClick={() => {
              router.push("/cart")
            }}
          >
            Mua hàng
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full h-10 sm:h-11 md:h-12 lg:h-12 text-sm sm:text-base bg-gray-900 hover:bg-gray-800 rounded-full"
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
                <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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
