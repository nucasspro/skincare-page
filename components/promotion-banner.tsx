"use client"

import { useState, useEffect } from "react"

const promotions = [
    "🎁 Nhận ngay mẫu thử miễn phí serum vitamin C - nhận tại đây",
    "✨ Giảm 30% tất cả sản phẩm chăm sóc da - áp dụng ngay",
    "💎 Combo chăm sóc da cao cấp chỉ 1.299k - mua ngay",
    "🌟 Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500k",
    "🔥 Sale cuối tuần - giảm đến 50% tất cả sản phẩm",
    "🎯 Chương trình tích điểm đổi quà - tham gia ngay"
]

export function PromotionBanner() {
    const [currentPromotion, setCurrentPromotion] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPromotion((prev) => (prev + 1) % promotions.length)
        }, 4000) // Thay đổi mỗi 4 giây

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative bg-black text-white py-1 px-4 text-center text-xs font-medium h-[30px] flex items-center justify-center overflow-hidden z-50">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black animate-pulse opacity-50" />

            {/* Promotion text */}
            <div className="relative z-10 flex items-center justify-center w-full">
                <span className="animate-pulse mr-2">✨</span>
                <span className="tracking-wide">
                    {promotions[currentPromotion]}
                </span>
                <span className="animate-pulse ml-2">✨</span>
            </div>

            {/* Decorative elements */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full animate-bounce" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-1 bg-white/20 rounded-full animate-ping" />
        </div>
    )
}
