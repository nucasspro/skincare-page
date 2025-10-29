"use client"

import Image from "next/image"
import { useParallax } from 'react-scroll-parallax'
import { useI18n } from "@/lib/i18n-context"

export function ParallaxProductSection() {
    const { t } = useI18n()

    // Parallax hooks với tốc độ tối ưu
    const background = useParallax({ speed: -20 })
    const gradientLayer1 = useParallax({ speed: -15 })
    const gradientLayer2 = useParallax({ speed: -25 })

    const leftText = useParallax({ speed: 10 })
    const centerProduct = useParallax({ speed: 5 })
    const rightText = useParallax({ speed: 15 })

    return (
        <section
            className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
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
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
            </div>

            {/* Additional parallax layers for depth */}
            <div
                ref={gradientLayer1.ref as React.RefObject<HTMLDivElement>}
                className="absolute inset-0 bg-gradient-to-br from-stone-200/20 via-transparent to-stone-300/20"
            />
            <div
                ref={gradientLayer2.ref as React.RefObject<HTMLDivElement>}
                className="absolute inset-0 bg-gradient-to-tl from-stone-100/30 via-transparent to-stone-200/30"
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

                    {/* Center Column - Product Image */}
                    <div
                        ref={centerProduct.ref as React.RefObject<HTMLDivElement>}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative w-80 h-96 md:w-96 md:h-[480px]">
                            <Image
                                src="/images/demo.png"
                                alt="Radiance Renewal Serum"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />

                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-radial from-stone-200/20 via-transparent to-transparent blur-xl" />
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
                                <span>Đã được kiểm nghiệm lâm sàng</span>
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
      `}</style>
        </section>
    )
}
