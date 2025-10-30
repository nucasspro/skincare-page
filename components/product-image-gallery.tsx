"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

const productImages = [
  "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
  "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
  "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
  "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
  "/luxury-facial-cleanser-bottle-minimal-white-backgr.jpg",
]

export function ProductImageGallery() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Image - Responsive ratio: 4/3 on mobile, square on desktop */}
      <div
        className="relative bg-stone-50 overflow-hidden cursor-zoom-in aspect-[4/3] sm:aspect-square lg:aspect-square"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={productImages[selectedImage] || "/placeholder.svg"}
          alt="Product image"
          fill
          className={cn("object-cover transition-transform duration-500", isZoomed && "scale-150")}
          priority
        />
      </div>

      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-5 gap-3">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative aspect-square bg-stone-50 overflow-hidden transition-all",
              selectedImage === index
                ? "border-stone-900 ring-2 ring-stone-900 ring-offset-2"
                : "border-transparent hover:border-stone-300",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
