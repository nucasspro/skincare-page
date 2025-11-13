"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface ProductImage {
  id: number
  url: string
  alt: string
}

const PRODUCT_IMAGES: ProductImage[] = [
  {
    id: 1,
    url: "/product-banner/3.png",
    alt: "Product Banner 1"
  },
  {
    id: 2,
    url: "/product-banner/2.png",
    alt: "Product Banner 2"
  },
  {
    id: 3,
    url: "/product-banner/1.png",
    alt: "Product Banner 3"
  }
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
      <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden bg-stone-200 relative group">
        {/* Images */}
        {PRODUCT_IMAGES.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={image.alt}
            className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
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
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
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
