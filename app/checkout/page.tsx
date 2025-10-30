"use client"

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/currency-util"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function CheckoutPage() {
  const { items, getTotalPrice, getTotalItems } = useCart()

  // Redirect to products if no items
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-24 h-24 mx-auto bg-stone-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-stone-400" />
            </div>
            <h1 className="text-3xl font-light text-gray-900">Giỏ hàng trống</h1>
            <p className="text-stone-600">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm của chúng tôi!
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      <main className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-light text-gray-900 mb-12">Thanh toán</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form - Left */}
            <div className="lg:col-span-2">
              <CheckoutForm />
            </div>

            {/* Order Summary - Right */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-stone-200 sticky top-24 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Đơn hàng của bạn</h2>

                {/* Items Summary */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b border-stone-100 last:border-b-0">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-stone-50">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-stone-600 mt-1">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="border-t border-stone-200 pt-4 space-y-3">
                  <div className="flex justify-between text-stone-600">
                    <span>Tạm tính ({getTotalItems()} sản phẩm)</span>
                    <span>{formatCurrency(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Mã giảm giá</span>
                    <span>-{formatCurrency(0)}</span>
                  </div>

                  <div className="border-t border-stone-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Tổng cộng</span>
                      <span>{formatCurrency(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-blue-900">ℹ️ Thông tin thanh toán</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Hoàn thành form để tiếp tục</li>
                    <li>• Hỗ trợ thanh toán online & COD</li>
                    <li>• Miễn phí vận chuyển toàn quốc</li>
                  </ul>
                </div>

                {/* Back Link */}
                <Link
                  href="/cart"
                  className="text-center text-sm text-stone-600 hover:text-gray-900 transition-colors underline"
                >
                  ← Quay lại giỏ hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
