"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { useReviewsByProductId } from "@/hooks/use-reviews"
import { getKeyHeadingFont, getProductTitleFont, getProductDescriptionFont } from "@/lib/utils/font-utils"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"

// Helper function to render rating stars with half star support
function renderRatingStars(rating: number) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <div className="relative w-4 h-4">
          <Star className="w-4 h-4 absolute fill-gray-300 text-gray-300" />
          <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 fill-gray-300 text-gray-300" />
      ))}
    </div>
  )
}

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
          <span className={getProductTitleFont("text-sm text-gray-900 uppercase")}>{afterLabel}</span>
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <Image src={beforeImage || "/placeholder.svg"} alt={beforeLabel} fill className="object-cover" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className={getProductTitleFont("text-sm text-gray-900 uppercase")}>{beforeLabel}</span>
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
        <span className={getProductDescriptionFont("text-xs text-white")}>{dragLabel}</span>
      </div>
    </div>
  )
}

export function RealResults({ productId }: { productId: string }) {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  // Get reviews from database
  const { reviews, loading: reviewsLoading } = useReviewsByProductId(productId)

  // Carousel logic for reviews
  const itemsPerPage = 3
  const totalPages = reviews.length > 0 ? Math.ceil(reviews.length / itemsPerPage) : 1

  // Auto-scroll effect for reviews
  useEffect(() => {
    if (!isAutoPlaying || reviews.length === 0) return

    const interval = setInterval(() => {
      setDirection('next')
      setCurrentReviewIndex((prev) => (prev + 1) % totalPages)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalPages, reviews.length])

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

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6 sm:mb-8 md:mb-10 pb-3 sm:pb-4 md:pb-5">
          <h2 className={getKeyHeadingFont("text-xl sm:text-2xl md:text-3xl text-gray-900 mb-3 sm:mb-4 md:mb-5 text-center uppercase tracking-tight")}>
            Đánh giá từ khách hàng
          </h2>

          {/* Show message if no reviews */}
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className={getProductDescriptionFont("text-stone-600 text-lg")}>Chưa có đánh giá nào cho sản phẩm này.</p>
            </div>
          ) : (
          <div className="relative">
            {/* Carousel Container */}
            {/* Navigation Buttons - Positioned Outside */}
            <button
              onClick={() => { goToPrevReview(); setIsAutoPlaying(false); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -left-12 md:-left-14 z-10 bg-white rounded-full p-2 sm:p-2.5 shadow-md hover:bg-gray-50 hover:shadow-lg transition-all cursor-pointer group"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => { goToNextReview(); setIsAutoPlaying(false); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 -right-12 md:-right-14 z-10 bg-white rounded-full p-2 sm:p-2.5 shadow-md hover:bg-gray-50 hover:shadow-lg transition-all cursor-pointer group"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Reviews Grid with Animation */}
            <div className="overflow-hidden px-2 sm:px-4 md:px-6 min-h-[220px] sm:min-h-[240px] md:min-h-[260px]">
              <div
                className="grid md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 transition-all duration-700 ease-in-out items-stretch"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {getCurrentReviews().map((review) => (
              <div key={review.id} className={`bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm h-full flex flex-col ${direction === 'next' ? 'animate-slideFromRight' : 'animate-slideFromLeft'}`}>


                {/* Review Content */}
                <div className="p-3 sm:p-4 md:p-5 space-y-1.5 sm:space-y-2 md:space-y-2.5 flex flex-col flex-1">
                  {renderRatingStars(review.rating)}
                  <p className={getProductDescriptionFont("text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed flex-1")}>{review.review}</p>
                  <div className={getProductDescriptionFont("flex items-center justify-between text-[10px] sm:text-xs md:text-sm mt-auto")}>
                    <span className={getProductTitleFont("text-gray-900")}>{review.name}</span>
                    <span className="text-stone-500">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-1.5 mt-3 sm:mt-4 md:mt-5 mb-1 sm:mb-2 md:mb-3">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => { setCurrentReviewIndex(index); setIsAutoPlaying(false); }}
                    className={`h-1 sm:h-1.5 rounded-full transition-all ${
                      index === currentReviewIndex
                        ? 'w-4 sm:w-6 bg-gray-900'
                        : 'w-1 sm:w-1.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to review page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          )}
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
