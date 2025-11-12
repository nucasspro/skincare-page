"use client"

import { cn } from "@/lib/utils/class-name-utils"
import Image from "next/image"
import { useState, useMemo, useEffect, useRef } from "react"
import type { Product } from "@/lib/product-service"

interface ProductImageGalleryProps {
  product: Product
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Tạo danh sách ảnh từ product - ưu tiên images array, nếu không thì dùng image + hoverImage
  const productImages = useMemo(() => {
    let images: string[] = []

    if (product.images && product.images.length > 0) {
      // Nếu có array images, dùng nó
      images = product.images
    } else {
      // Nếu không, dùng image và hoverImage
      images = [product.image]
      if (product.hoverImage && product.hoverImage !== product.image) {
        images.push(product.hoverImage)
      }
    }

    // Đảm bảo có ít nhất 5 ảnh bằng cách lặp lại nếu cần
    while (images.length < 5) {
      images.push(...images)
    }
    return images.slice(0, 5) // Chỉ lấy 5 ảnh đầu tiên
  }, [product.image, product.hoverImage, product.images])

  // Preload tất cả ảnh khi component mount
  useEffect(() => {
    productImages.forEach((imageSrc) => {
      if (imageSrc && imageSrc !== "/placeholder.svg") {
        const link = document.createElement("link")
        link.rel = "preload"
        link.as = "image"
        link.href = imageSrc
        document.head.appendChild(link)
      }
    })

    // Cleanup khi component unmount
    return () => {
      productImages.forEach((imageSrc) => {
        if (imageSrc && imageSrc !== "/placeholder.svg") {
          const links = document.querySelectorAll(`link[href="${imageSrc}"]`)
          links.forEach((link) => link.remove())
        }
      })
    }
  }, [productImages])

  // Auto-play: tự động chuyển ảnh sau mỗi 3 giây (chỉ khi isAutoPlaying = true)
  useEffect(() => {
    if (productImages.length <= 1 || !isAutoPlaying) return // Không cần auto-play nếu chỉ có 1 ảnh hoặc đã pause

    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % productImages.length)
    }, 3000) // 3 giây

    return () => {
      clearInterval(interval)
      // Cleanup timeout nếu có
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
    }
  }, [productImages.length, isAutoPlaying])

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image - Vuông, tràn viền, full width */}
      <div
        className="relative bg-stone-50 overflow-hidden cursor-zoom-in aspect-square w-full"
        onMouseEnter={() => {
          setIsZoomed(true)
          setIsAutoPlaying(false) // Pause auto-play khi hover
        }}
        onMouseLeave={() => {
          setIsZoomed(false)
          setIsAutoPlaying(true) // Resume auto-play khi không hover
        }}
      >
        <Image
          key={productImages[selectedImage]}
          src={productImages[selectedImage] || "/placeholder.svg"}
          alt={product.name}
          fill
          className={cn("object-cover transition-transform duration-500", isZoomed && "scale-150")}
          priority={selectedImage === 0}
          quality={95}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnail Navigation - luôn hiển thị 5 ảnh nhỏ */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3 px-4 sm:px-6 lg:px-0">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedImage(index)
              setIsAutoPlaying(false) // Pause auto-play khi click thumbnail

              // Clear timeout cũ nếu có
              if (resumeTimeoutRef.current) {
                clearTimeout(resumeTimeoutRef.current)
              }

              // Resume sau 5 giây nếu không có tương tác
              resumeTimeoutRef.current = setTimeout(() => {
                setIsAutoPlaying(true)
                resumeTimeoutRef.current = null
              }, 5000)
            }}
            className={cn(
              "relative aspect-square bg-stone-50 overflow-hidden transition-all border-2 rounded",
              selectedImage === index
                ? "border-stone-900 ring-2 ring-stone-900 ring-offset-1"
                : "border-transparent hover:border-stone-300",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${product.name} - ảnh ${index + 1}`}
              fill
              className="object-cover"
              loading="eager"
              quality={85}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
