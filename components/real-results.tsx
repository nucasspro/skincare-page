"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { useI18n } from "@/lib/i18n-context"
import { getReviewsByProductId } from "@/lib/review-service"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"

interface BeforeAfterImage {
  productId: string
  productName: string
  beforeImage: string
  afterImage: string
  duration: string
  description: string
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
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

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

  // Get reviews from service
  const reviews = getReviewsByProductId(productId)

  const currentResult = resultsData.find((r) => r.productId === productId) || resultsData[0]

  // Carousel logic for reviews
  const itemsPerPage = 3
  const totalPages = Math.ceil(reviews.length / itemsPerPage)

  // Auto-scroll effect for reviews
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection('next')
      setCurrentReviewIndex((prev) => (prev + 1) % totalPages)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalPages])

  const goToNextReview = () => {
    setDirection('next')
    setCurrentReviewIndex((prev) => (prev + 1) % totalPages)
  }

  const goToPrevReview = () => {
    setDirection('prev')
    setCurrentReviewIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const getCurrentReviews = () => {
    const start = currentReviewIndex * itemsPerPage
    return reviews.slice(start, start + itemsPerPage)
  }

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

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => { goToPrevReview(); setIsAutoPlaying(false); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>

            <button
              onClick={() => { goToNextReview(); setIsAutoPlaying(false); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </button>

            {/* Reviews Grid with Animation */}
            <div className="overflow-hidden">
              <div
                className="grid md:grid-cols-3 gap-8 transition-all duration-700 ease-in-out"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {getCurrentReviews().map((review) => (
              <div key={review.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm ${direction === 'next' ? 'animate-slideFromRight' : 'animate-slideFromLeft'}`}>
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

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentReviewIndex(index); setIsAutoPlaying(false); }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentReviewIndex
                      ? 'w-8 bg-gray-900'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to review page ${index + 1}`}
                />
              ))}
            </div>
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

      {/* Animations */}
      <style jsx>{`
        @keyframes slideFromRight {
          from {
            opacity: 0.3;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideFromLeft {
          from {
            opacity: 0.3;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideFromRight {
          animation: slideFromRight 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-slideFromLeft {
          animation: slideFromLeft 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  )
}
