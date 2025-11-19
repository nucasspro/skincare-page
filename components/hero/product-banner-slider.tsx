"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ProductImage {
  id: number
  url: string
  alt: string
}

const PRODUCT_IMAGES: ProductImage[] = [
  { id: 1, url: "/images/img-product/banner-sp1.png", alt: "Banner sản phẩm 1" },
  { id: 2, url: "/images/img-product/banner-sp2.png", alt: "Banner sản phẩm 2" },
  { id: 3, url: "/images/img-product/banner-sp3.png", alt: "Banner sản phẩm 3" },
]

export function ProductBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setAutoPlay(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length)
    setAutoPlay(false)
  }

  return (
    <div className="w-screen relative -ml-[calc((100vw-100%)/2)] mb-0">
      <div className="w-full h-[400px] sm:h-[450px] md:h-[550px] overflow-hidden bg-stone-200 relative group">
        {/* Images */}
        {PRODUCT_IMAGES.map((image, index) => (
          <div key={image.id} className="absolute inset-0">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className={`object-cover transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          onMouseEnter={() => setAutoPlay(false)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-stone-900 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          onMouseEnter={() => setAutoPlay(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-stone-900 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {PRODUCT_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 w-2 hover:bg-white/75"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
