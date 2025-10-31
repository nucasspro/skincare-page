"use client"

import { CheckCircle2, Package, MapPin, CreditCard, Calendar, Mail, Phone, Copy, Check, User } from "lucide-react"
import { CartItem, useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/currency-util"
import Image from "next/image"
import Link from "next/link"
import { useState, useMemo, useEffect, useRef } from "react"

interface OrderConfirmationProps {
    orderData: {
        name: string
        phone: string
        streetAddress: string
        provinceName?: string
        districtName?: string
        wardName?: string
        paymentMethod: "cod" | "bank" | null
    }
    orderedItems: CartItem[]
}

export function OrderConfirmation({ orderData, orderedItems }: OrderConfirmationProps) {
    const [orderNumber] = useState(() => `ORD-${Date.now().toString().slice(-8)}`)
    const [copied, setCopied] = useState(false)
    const { removeItems } = useCart()
    const hasClearedCart = useRef(false)

    // Xóa sản phẩm khỏi giỏ hàng khi đơn hàng được xác nhận thành công
    useEffect(() => {
        if (!hasClearedCart.current && orderedItems.length > 0) {
            const itemIdsToRemove = orderedItems.map(item => item.id)
            removeItems(itemIdsToRemove)
            hasClearedCart.current = true
        }
    }, [orderedItems, removeItems])

    // Tính toán từ orderedItems thay vì cart context
    const getTotalPrice = useMemo(() => {
        return orderedItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }, [orderedItems])

    const getTotalItems = useMemo(() => {
        return orderedItems.reduce((total, item) => total + item.quantity, 0)
    }, [orderedItems])

    const copyOrderNumber = () => {
        navigator.clipboard.writeText(orderNumber)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3) // 3 ngày sau

    const paymentMethodLabels = {
        cod: "Thanh toán khi nhận hàng (COD)",
        bank: "Chuyển khoản ngân hàng"
    }

    const fullAddress = [
        orderData.streetAddress,
        orderData.wardName,
        orderData.districtName,
        orderData.provinceName
    ].filter(Boolean).join(", ")

    return (
        <div className="space-y-6">
            {/* Success Header */}
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 border-2 border-green-200 rounded-2xl p-8 text-center animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 h-heading">
                    Đặt hàng thành công!
                </h2>
                <p className="text-lg text-gray-700 p-desc mb-4">
                    Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được ghi nhận và đang được xử lý.
                </p>

                {/* Order Number */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl border-2 border-green-200 shadow-sm">
                    <div>
                        <p className="text-xs text-gray-600 mb-1">Mã đơn hàng</p>
                        <p className="text-lg font-bold text-gray-900 font-mono">{orderNumber}</p>
                    </div>
                    <button
                        onClick={copyOrderNumber}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Sao chép mã đơn hàng"
                    >
                        {copied ? (
                            <Check className="w-5 h-5 text-green-600" />
                        ) : (
                            <Copy className="w-5 h-5 text-gray-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center shadow-sm">
                        <Package className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 h-heading">Thông tin đơn hàng</h3>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                    {orderedItems.map((item) => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b border-stone-100 last:border-b-0">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-stone-50">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-base font-semibold text-gray-900 mb-1">{item.name}</h4>
                                <p className="text-sm text-stone-600 mb-2">
                                    {formatCurrency(item.price)} × {item.quantity}
                                </p>
                                <p className="text-base font-bold text-gray-900">
                                    {formatCurrency(item.price * item.quantity)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price Summary */}
                <div className="border-t border-stone-200 pt-4 space-y-3">
                    <div className="flex justify-between text-stone-600">
                        <span>Tạm tính ({getTotalItems} sản phẩm)</span>
                        <span>{formatCurrency(getTotalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                        <span>Phí vận chuyển</span>
                        <span className="text-green-600 font-medium">Miễn phí</span>
                    </div>
                    <div className="border-t border-stone-200 pt-4 mt-4">
                        <div className="flex justify-between text-xl font-bold text-gray-900">
                            <span>Tổng cộng</span>
                            <span>{formatCurrency(getTotalPrice)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                        <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 h-heading">Thông tin giao hàng</h3>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-stone-400 mt-0.5" />
                        <div>
                            <p className="text-sm text-stone-600 mb-1">Người nhận</p>
                            <p className="text-base font-semibold text-gray-900">{orderData.name}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-stone-400 mt-0.5" />
                        <div>
                            <p className="text-sm text-stone-600 mb-1">Số điện thoại</p>
                            <p className="text-base font-semibold text-gray-900">{orderData.phone}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-stone-400 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm text-stone-600 mb-1">Địa chỉ giao hàng</p>
                            <p className="text-base font-semibold text-gray-900 leading-relaxed">{fullAddress}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-stone-400 mt-0.5" />
                        <div>
                            <p className="text-sm text-stone-600 mb-1">Thời gian giao hàng dự kiến</p>
                            <p className="text-base font-semibold text-gray-900">
                                {estimatedDelivery.toLocaleDateString("vi-VN", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                        <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 h-heading">Phương thức thanh toán</h3>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-base font-semibold text-gray-900">
                            {orderData.paymentMethod ? paymentMethodLabels[orderData.paymentMethod] : "Chưa xác định"}
                        </p>
                        {orderData.paymentMethod === "bank" && (
                            <p className="text-sm text-stone-600 mt-1 p-desc">
                                Thông tin chuyển khoản đã được gửi đến email của bạn
                            </p>
                        )}
                        {orderData.paymentMethod === "cod" && (
                            <p className="text-sm text-stone-600 mt-1 p-desc">
                                Thanh toán khi nhận hàng
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 space-y-4">
                <h4 className="text-lg font-bold text-blue-900">Bước tiếp theo</h4>
                <ul className="space-y-3 text-sm text-blue-800">
                    {orderData.paymentMethod === "bank" && (
                        <li className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold mt-0.5">1.</span>
                            <span>Chuyển khoản đúng số tiền <strong>{formatCurrency(getTotalPrice)}</strong> theo thông tin đã gửi</span>
                        </li>
                    )}
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">{orderData.paymentMethod === "bank" ? "2." : "1."}</span>
                        <span>Chúng tôi sẽ xác nhận đơn hàng trong vòng 24 giờ</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">{orderData.paymentMethod === "bank" ? "3." : "2."}</span>
                        <span>Bạn sẽ nhận được thông báo khi đơn hàng được giao</span>
                    </li>
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/"
                    className="px-8 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-bold rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-center"
                >
                    Xác nhận đơn hàng
                </Link>
                <Link
                    href="/products"
                    className="px-8 py-4 bg-white border-2 border-stone-300 rounded-xl text-gray-700 font-semibold hover:bg-stone-50 hover:border-stone-400 transition-all duration-200 text-center"
                >
                    Tiếp tục mua sắm
                </Link>
            </div>

            {/* Support Info */}
            <div className="text-center text-sm text-stone-600 p-desc">
                <p>Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua:</p>
                <p className="mt-2">
                    <strong>Email:</strong> support@cellic.vn | <strong>Hotline:</strong> 1900 xxxx
                </p>
            </div>
        </div>
    )
}

