"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/currency-util"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    note: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect
    clearCart()
    alert("Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.")
    router.push("/")
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-light text-gray-900 mb-8">Thanh toán</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Information */}
                <div className="bg-white border border-stone-200 rounded-2xl p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Thông tin liên hệ</h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Nguyễn Văn A"
                        className="h-12"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="email@example.com"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0123456789"
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white border border-stone-200 rounded-2xl p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Địa chỉ giao hàng</h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-900 mb-2">
                        Địa chỉ <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Số nhà, tên đường"
                        className="h-12"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-900 mb-2">
                          Tỉnh/Thành phố <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="TP. Hồ Chí Minh"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-900 mb-2">
                          Quận/Huyện <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="district"
                          name="district"
                          type="text"
                          required
                          value={formData.district}
                          onChange={handleInputChange}
                          placeholder="Quận 1"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label htmlFor="ward" className="block text-sm font-medium text-gray-900 mb-2">
                          Phường/Xã <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="ward"
                          name="ward"
                          type="text"
                          required
                          value={formData.ward}
                          onChange={handleInputChange}
                          placeholder="Phường Bến Nghé"
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="note" className="block text-sm font-medium text-gray-900 mb-2">
                        Ghi chú
                      </label>
                      <textarea
                        id="note"
                        name="note"
                        rows={3}
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white border border-stone-200 rounded-2xl p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Phương thức thanh toán</h2>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 border-2 border-gray-900 rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        defaultChecked
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Thanh toán khi nhận hàng (COD)</div>
                        <div className="text-sm text-stone-600 mt-1">
                          Thanh toán bằng tiền mặt khi nhận hàng
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 border border-stone-300 rounded-lg cursor-pointer hover:border-gray-900 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="banking"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Chuyển khoản ngân hàng</div>
                        <div className="text-sm text-stone-600 mt-1">
                          Chuyển khoản trước, giao hàng sau
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-stone-50 rounded-2xl p-6 sticky top-24">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Đơn hàng của bạn</h2>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                            <p className="text-sm text-stone-600">{formatCurrency(item.price)}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 mb-6 pt-6 border-t border-stone-300">
                    <div className="flex justify-between text-stone-600">
                      <span>Tạm tính</span>
                      <span>{formatCurrency(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Phí vận chuyển</span>
                      <span className="text-green-600">Miễn phí</span>
                    </div>
                    <div className="border-t border-stone-300 pt-3">
                      <div className="flex justify-between text-xl font-medium text-gray-900">
                        <span>Tổng cộng</span>
                        <span>{formatCurrency(getTotalPrice())}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isProcessing}
                    className="w-full bg-gray-900 hover:bg-gray-800 rounded-full disabled:opacity-50"
                  >
                    {isProcessing ? "Đang xử lý..." : "Đặt hàng"}
                  </Button>

                  <Link href="/cart">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full mt-3 rounded-full"
                    >
                      Quay lại giỏ hàng
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
