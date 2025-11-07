"use client"

import { Footer } from "@/components/footer"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/utils/currency-utils"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation isTransparent={false} />
        <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16 md:py-20">
          <div className="text-center space-y-4 sm:space-y-5 md:space-y-6 max-w-md">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-stone-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-stone-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-gray-900">Giỏ hàng trống</h1>
            <p className="text-sm sm:text-base text-stone-600 px-4">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm của chúng tôi!
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 rounded-full text-sm sm:text-base px-6 sm:px-8">
                Khám phá sản phẩm
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation isTransparent={false} />

      <main className="pt-[86px] pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-6 sm:mb-8">Giỏ hàng của bạn</h1>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-stone-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6"
                >
                  {/* Product Image */}
                  <div className="relative w-full sm:w-24 md:w-32 h-48 sm:h-24 md:h-32 flex-shrink-0 bg-stone-50 rounded-lg sm:rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-base sm:text-lg font-medium text-gray-900">{item.name}</h3>
                          {item.tagline && (
                            <p className="text-xs sm:text-sm text-stone-600 mt-1">{item.tagline}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors flex-shrink-0 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-300 rounded-lg w-fit">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 sm:p-2 hover:bg-stone-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="px-4 sm:px-6 py-2 text-center min-w-[50px] sm:min-w-[60px] font-medium text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 sm:p-2 hover:bg-stone-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total - Chỉ hiển thị tổng giá */}
                    <div className="text-left sm:text-right sm:flex-shrink-0">
                      <p className="text-lg sm:text-xl font-medium text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-stone-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:sticky lg:top-24">
                <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-5 md:mb-6">Tổng đơn hàng</h2>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5 md:mb-6">
                  <div className="flex justify-between text-sm sm:text-base text-stone-600">
                    <span>Tạm tính ({getTotalItems()} sản phẩm)</span>
                    <span className="font-medium">{formatCurrency(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-stone-600">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                  <div className="border-t border-stone-300 pt-3 sm:pt-4">
                    <div className="flex justify-between text-base sm:text-lg font-medium text-gray-900">
                      <span>Tổng cộng</span>
                      <span>{formatCurrency(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full bg-gray-900 hover:bg-gray-800 rounded-full text-sm sm:text-base">
                    Thanh toán
                  </Button>
                </Link>

                <Link href="/products">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full mt-3 rounded-full text-sm sm:text-base"
                  >
                    Tiếp tục mua sắm
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-stone-300 space-y-2 sm:space-y-3 text-xs sm:text-sm text-stone-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Miễn phí vận chuyển</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Đổi trả trong 30 ngày</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Thanh toán an toàn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
