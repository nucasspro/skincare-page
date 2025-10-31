"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState, useMemo } from "react"
import type { Product } from "@/lib/product-service"

interface ProductImageGalleryProps {
  product: Product
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

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
          alt={product.name}
          fill
          className={cn("object-cover transition-transform duration-500", isZoomed && "scale-150")}
          priority
        />
      </div>

      {/* Thumbnail Navigation - luôn hiển thị 5 ảnh nhỏ */}
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
              alt={`${product.name} - ảnh ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
