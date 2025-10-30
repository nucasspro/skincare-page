"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface NatureImage {
  id: number
  url: string
  alt: string
}

const NATURE_IMAGES: NatureImage[] = [
  // {
  //   id: 1,
  //   url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&h=400&fit=crop",
  //   alt: "Green nature landscape"
  // },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&h=400&fit=crop",
    alt: "Forest path"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1469022563149-aa64dbd37c5f?w=1400&h=400&fit=crop",
    alt: "Mountain landscape"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1400&h=400&fit=crop",
    alt: "Natural water fall"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&h=400&fit=crop",
    alt: "Green nature"
  }
]

export function NatureBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NATURE_IMAGES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setAutoPlay(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + NATURE_IMAGES.length) % NATURE_IMAGES.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % NATURE_IMAGES.length)
    setAutoPlay(false)
  }

  return (
    <div className="w-screen relative -ml-[calc((100vw-100%)/2)] mb-0">
      <div className="w-full h-[300px] md:h-[400px] overflow-hidden bg-stone-200 relative group">
        {/* Images */}
        {NATURE_IMAGES.map((image, index) => (
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
          {NATURE_IMAGES.map((_, index) => (
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
