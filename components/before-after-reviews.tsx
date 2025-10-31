"use client"

import { getReviewsByProductId } from "@/lib/review-service";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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

interface BeforeAfterReviewsProps {
  productId?: string
}

export function BeforeAfterReviews({ productId = "1" }: BeforeAfterReviewsProps) {
  // Get reviews from service
  const reviews = getReviewsByProductId(productId)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Items to show per page
  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const goToNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentReviews = () => {
    const start = currentIndex * itemsPerPage;
    return reviews.slice(start, start + itemsPerPage);
  };

  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-light text-gray-900">Đánh giá từ khách hàng</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Xem kết quả thực tế mà khách hàng đã trải nghiệm
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => { goToPrev(); setIsAutoPlaying(false); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>

          <button
            onClick={() => { goToNext(); setIsAutoPlaying(false); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next"
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
              {/* Before/After Images */}
              <div className="grid grid-cols-2">
                <div className="relative aspect-square">
                  <Image src={review.beforeImage || "/placeholder.svg"} alt="Before" fill className="object-cover" />
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    Trước
                  </div>
                </div>
                <div className="relative aspect-square">
                  <Image src={review.afterImage || "/placeholder.svg"} alt="After" fill className="object-cover" />
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    Sau
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="p-6 space-y-3">
                {renderRatingStars(review.rating)}
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
                onClick={() => { setCurrentIndex(index); setIsAutoPlaying(false); }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-gray-900'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Video Testimonials */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-8">Video Testimonials</h3>
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
