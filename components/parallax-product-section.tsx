"use client"

import { useI18n } from "@/lib/i18n-context"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useParallax } from 'react-scroll-parallax'

export function ParallaxProductSection() {
    const { t } = useI18n()
    const [scrollY, setScrollY] = useState(0)

    // Scroll effect để tracking vertical movement
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Parallax hooks với tốc độ tối ưu
    const background = useParallax({ speed: -20 })
    const gradientLayer1 = useParallax({ speed: -15 })
    const gradientLayer2 = useParallax({ speed: -25 })

    const leftText = useParallax({ speed: 10 })
    const productImage = useParallax({ speed: 5 })
    const rightText = useParallax({ speed: 15 })

    return (
        <section
            className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white/50 via-white to-white/50"
        >
            {/* Background Image with Parallax Scroll */}
            <div
                ref={background.ref as React.RefObject<HTMLDivElement>}
                className="absolute inset-0 -top-32 -bottom-32"
            >
                <Image
                    src="/images/bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Bright overlay to make product stand out */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/90 backdrop-blur-sm" />
            </div>

            {/* Additional parallax layers for depth */}
            <div
                ref={gradientLayer1.ref as React.RefObject<HTMLDivElement>}
                className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"
            />
            <div
                ref={gradientLayer2.ref as React.RefObject<HTMLDivElement>}
                className="absolute inset-0 bg-gradient-to-tl from-white/5 via-transparent to-white/5"
            />

            <div className="max-w-7xl mx-auto relative">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center min-h-[600px]">

                    {/* Left Column - Title */}
                    <div
                        ref={leftText.ref as React.RefObject<HTMLDivElement>}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <p className="text-sm font-medium text-stone-600 tracking-wider uppercase">
                                Sản phẩm cao cấp
                            </p>
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-tight">
                                Serum Làm Sáng Da
                                <span className="block text-3xl md:text-4xl text-stone-600 mt-2">
                                    Cao Cấp
                                </span>
                            </h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="w-2 h-2 rounded-full bg-stone-400" />
                                <span className="text-sm">Công thức độc quyền</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="w-2 h-2 rounded-full bg-stone-400" />
                                <span className="text-sm">Dermatologist tested</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="w-2 h-2 rounded-full bg-stone-400" />
                                <span className="text-sm">Cruelty-free</span>
                            </div>
                        </div>
                    </div>

                    {/* Center Column - Premium Product Image with Parallax */}
                    <div
                        ref={productImage.ref as React.RefObject<HTMLDivElement>}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative w-96 h-[600px] md:w-full md:h-[650px]">

                            {/* Decorative leaves - left side */}
                            <div className="absolute -left-16 top-20 w-32 h-32 opacity-40 pointer-events-none animate-pulse">
                                <div className="w-full h-full bg-gradient-to-br from-green-300 via-green-400 to-green-500 rounded-full blur-2xl" />
                            </div>

                            {/* Decorative leaves - right bottom */}
                            <div className="absolute -right-12 bottom-20 w-28 h-28 opacity-30 pointer-events-none">
                                <div className="w-full h-full bg-gradient-to-tl from-green-300 to-transparent rounded-full blur-3xl" />
                            </div>

                            {/* Main product image - much larger */}
                            <Image
                                src="/images/products/TachNen1.png"
                                alt="Radiance Renewal Serum"
                                fill
                                className="object-contain"
                                style={{
                                    filter: "brightness(1.35) contrast(1.1) drop-shadow(0 40px 80px rgba(0,0,0,0.25))",
                                    transform: `rotate(-12deg) scale(1.5) translateX(-6%) translateY(${scrollY * 0.02 - 80}px)`,
                                    transformOrigin: "center",
                                }}
                                priority
                            />

                            {/* Radial glow background - yellow/warm tone */}
                            <div className="absolute inset-0 bg-gradient-radial from-amber-100/40 via-yellow-50/20 to-transparent blur-3xl" />

                            {/* Inner bright glow */}
                            <div className="absolute inset-0 bg-gradient-radial from-white/40 via-transparent to-transparent blur-2xl" />

                            {/* Shine effect - top */}
                            <div className="absolute top-0 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-white/50 via-white/20 to-transparent blur-3xl rounded-full pointer-events-none" />

                            {/* Shine effect - bottom right */}
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-white/40 via-transparent to-transparent blur-2xl rounded-full pointer-events-none" />
                        </div>
                    </div>

                    {/* Right Column - Description */}
                    <div
                        ref={rightText.ref as React.RefObject<HTMLDivElement>}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h3 className="text-2xl font-light text-gray-900">
                                Radiance Renewal Serum
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Công thức tiên tiến với vitamin C và axit hyaluronic giúp làm sáng da,
                                giảm nếp nhăn và cải thiện kết cấu da một cách tự nhiên.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                                <span>Giảm nếp nhăn hiệu quả</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                                <span>Làm sáng da tự nhiên</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                                <span>Dưỡng ẩm sâu</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                                <span>Đã được kiểm nghiệm lâm sàn</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-medium">
                                Mua ngay - $89
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom animations */}
            <style jsx>{`
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(8px, -8px); }
          50% { transform: translate(-4px, -16px); }
          75% { transform: translate(-8px, -8px); }
        }
        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }

        /* Gradient radial support */
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
        </section>
    )
}
