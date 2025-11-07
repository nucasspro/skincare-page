"use client"

import { Footer } from "@/components/footer"
import Navigation from "@/components/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { CheckoutStepper } from "@/components/checkout-stepper"
import { PaymentStep } from "@/components/payment-step"
import { OrderConfirmation } from "@/components/order-confirmation"
import { useCart, CartItem } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/utils/currency-utils"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useState, useEffect } from "react"

const CHECKOUT_STEPS = [
  {
    id: "shipping",
    title: "Thông tin giao hàng",
    description: "Nhập địa chỉ nhận hàng"
  },
  {
    id: "payment",
    title: "Thanh toán",
    description: "Chọn phương thức thanh toán"
  },
  {
    id: "review",
    title: "Xác nhận",
    description: "Kiểm tra và xác nhận đơn hàng"
  }
]

interface OrderData {
  name: string
  phone: string
  streetAddress: string
  provinceName?: string
  districtName?: string
  wardName?: string
  paymentMethod: "cod" | "bank" | null
}

export default function CheckoutPage() {
  const { items, getTotalPrice, getTotalItems, removeItems } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [orderedItems, setOrderedItems] = useState<CartItem[]>([])
  const [orderData, setOrderData] = useState<OrderData>({
    name: "",
    phone: "",
    streetAddress: "",
    paymentMethod: null
  })

  // Lưu snapshot của cart items khi bắt đầu checkout (chỉ lần đầu)
  useEffect(() => {
    if (items.length > 0 && orderedItems.length === 0) {
      setOrderedItems([...items])
    }
  }, [items, orderedItems.length])

  // Chỉ hiển thị "Giỏ hàng trống" nếu:
  // - Không có items VÀ
  // - Không phải đang ở step 3 (màn hình cảm ơn) VÀ
  // - Chưa có orderedItems (chưa checkout thành công)
  const isEmptyCart = items.length === 0 && currentStep !== 3 && orderedItems.length === 0

  if (isEmptyCart) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation isTransparent={false} />
        <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16 md:py-20 pt-[86px]">
          <div className="text-center space-y-4 sm:space-y-5 md:space-y-6 max-w-md">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-stone-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-stone-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-gray-900">Giỏ hàng trống</h1>
            <p className="text-sm sm:text-base text-stone-600 px-4">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm của chúng tôi!
            </p>
            <Link
              href="/products"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors text-sm sm:text-base"
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
      <Navigation isTransparent={false} />

      <main className="pt-[86px] pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-6 sm:mb-8">Thanh toán</h1>

          {/* Stepper */}
          <CheckoutStepper currentStep={currentStep} steps={CHECKOUT_STEPS} />

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Checkout Form - Left */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <CheckoutForm
                  onStepChange={(step, data) => {
                    setCurrentStep(step)
                    if (data) {
                      setOrderData(prev => ({ ...prev, ...data }))
                    }
                  }}
                  currentStep={currentStep}
                />
              )}
              {currentStep === 2 && (
                <PaymentStep
                  onBack={() => setCurrentStep(1)}
                  onContinue={(paymentMethod) => {
                    setOrderData(prev => ({ ...prev, paymentMethod }))
                    setCurrentStep(3)
                  }}
                />
              )}
              {currentStep === 3 && (
                <OrderConfirmation
                  orderData={orderData}
                  orderedItems={orderedItems}
                />
              )}
            </div>

            {/* Order Summary - Right (Hide on step 3) */}
            {currentStep !== 3 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-stone-200 lg:sticky lg:top-24 space-y-4 sm:space-y-5 md:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Đơn hàng của bạn</h2>

                  {/* Items Summary */}
                  <div className="space-y-2 sm:space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-stone-100 last:border-b-0">
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-stone-50">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-stone-600 mt-0.5 sm:mt-1">
                            {formatCurrency(item.price)} × {item.quantity}
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5 sm:mt-1">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-stone-200 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm text-stone-600">
                      <span>Tạm tính ({getTotalItems()} sản phẩm)</span>
                      <span className="font-medium">{formatCurrency(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm text-stone-600">
                      <span>Phí vận chuyển</span>
                      <span className="text-green-600 font-medium">Miễn phí</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm text-stone-600">
                      <span>Mã giảm giá</span>
                      <span>-{formatCurrency(0)}</span>
                    </div>

                    <div className="border-t border-stone-200 pt-3 sm:pt-4">
                      <div className="flex justify-between text-base sm:text-lg font-bold text-gray-900">
                        <span>Tổng cộng</span>
                        <span>{formatCurrency(getTotalPrice())}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-blue-900">ℹ️ Thông tin thanh toán</p>
                    <ul className="text-xs text-blue-800 space-y-0.5 sm:space-y-1">
                      <li>• Hoàn thành form để tiếp tục</li>
                      <li>• Hỗ trợ thanh toán online & COD</li>
                      <li>• Miễn phí vận chuyển toàn quốc</li>
                    </ul>
                  </div>

                  {/* Back Link */}
                  <Link
                    href="/cart"
                    className="block text-center text-xs sm:text-sm text-stone-600 hover:text-gray-900 transition-colors underline"
                  >
                    ← Quay lại giỏ hàng
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
