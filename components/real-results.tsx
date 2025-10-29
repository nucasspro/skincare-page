"use client"

import type React from "react"
import { useState, useEffect } from "react"

import Image from "next/image"
import { Star } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface BeforeAfterImage {
  productId: string
  productName: string
  beforeImage: string
  afterImage: string
  duration: string
  description: string
}

interface Review {
  id: number
  name: string
  rating: number
  date: string
  review: string
  beforeImage: string
  afterImage: string
}

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  dragLabel,
  className = "",
}: {
  beforeImage: string
  afterImage: string
  beforeLabel: string
  afterLabel: string
  dragLabel: string
  className?: string
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  return (
    <div
      className={`relative overflow-hidden bg-white cursor-ew-resize select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image src={afterImage || "/placeholder.svg"} alt={afterLabel} fill className="object-cover" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-sm font-medium text-gray-900">{afterLabel}</span>
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <Image src={beforeImage || "/placeholder.svg"} alt={beforeLabel} fill className="object-cover" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-sm font-medium text-gray-900">{beforeLabel}</span>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-gray-400"></div>
            <div className="w-0.5 h-4 bg-gray-400"></div>
          </div>
        </div>
      </div>

      {/* Instruction Text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-xs font-medium text-white">{dragLabel}</span>
      </div>
    </div>
  )
}

export function RealResults({ productId }: { productId: string }) {
  const { t } = useI18n()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const resultsData: BeforeAfterImage[] = [
    {
      productId: "1",
      productName: "Hydrating Essence",
      beforeImage: "/before-essence.jpg",
      afterImage: "/after-essence.jpg",
      duration: "4 " + t.productDetail.realResults.weeks,
      description: "Improved hydration and skin texture",
    },
    {
      productId: "2",
      productName: "Vitamin C Serum",
      beforeImage: "/before-serum.jpg",
      afterImage: "/after-serum.jpg",
      duration: "6 " + t.productDetail.realResults.weeks,
      description: "Brighter, more even skin tone",
    },
    {
      productId: "3",
      productName: "Ceramide Cream",
      beforeImage: "/before-cream.jpg",
      afterImage: "/after-cream.jpg",
      duration: "8 " + t.productDetail.realResults.weeks,
      description: "Restored skin barrier and reduced redness",
    },
    {
      productId: "4",
      productName: "Gentle Cleanser",
      beforeImage: "/before-cleanser.jpg",
      afterImage: "/after-cleanser.jpg",
      duration: "2 " + t.productDetail.realResults.weeks,
      description: "Clearer, smoother complexion",
    },
  ]

  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      review: "My skin has never looked better! The hydration is incredible and my fine lines are visibly reduced.",
      beforeImage: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
      afterImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
    },
    {
      id: 2,
      name: "Jessica L.",
      rating: 5,
      date: "1 month ago",
      review: "This serum transformed my dry, dull skin into radiant, plump skin. Worth every penny!",
      beforeImage: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
      afterImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
    },
    {
      id: 3,
      name: "Emily R.",
      rating: 5,
      date: "3 weeks ago",
      review: "I was skeptical at first, but the results speak for themselves. My skin texture is so much smoother.",
      beforeImage: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
      afterImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
    },
  ]

  const currentResult = resultsData.find((r) => r.productId === productId) || resultsData[0]

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
            {t.productDetail.realResults.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.productDetail.realResults.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <BeforeAfterSlider
            beforeImage={currentResult.beforeImage}
            afterImage={currentResult.afterImage}
            beforeLabel={t.productDetail.realResults.before}
            afterLabel={t.productDetail.realResults.after}
            dragLabel={t.productDetail.realResults.dragSlider}
            className="aspect-[4/3] rounded-2xl shadow-2xl"
          />

          {/* Result Info */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-lg font-medium text-gray-900">{currentResult.productName}</p>
            <p className="text-gray-600">{currentResult.description}</p>
            <p className="text-sm text-gray-500">
              {t.productDetail.realResults.after} {currentResult.duration}
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">
            {t.productDetail.realResults.customerReviews || "Customer Reviews"}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                {/* Before/After Slider */}
                <BeforeAfterSlider
                  beforeImage={review.beforeImage}
                  afterImage={review.afterImage}
                  beforeLabel={t.productDetail.realResults.before}
                  afterLabel={t.productDetail.realResults.after}
                  dragLabel={t.productDetail.realResults.dragSlider}
                  className="aspect-square"
                />

                {/* Review Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-stone-700 leading-relaxed">{review.review}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{review.name}</span>
                    <span className="text-stone-500">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-8">
            {t.productDetail.realResults.videoTestimonials || "Video Testimonials"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="relative aspect-video bg-stone-100 rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image src={`/social-video-${i}.jpg`} alt={`Video testimonial ${i}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-[16px] border-l-gray-900 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
