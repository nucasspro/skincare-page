"use client"

import { getFeaturedProducts } from "@/lib/product-service"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function ProductFeature() {
  // Lấy sản phẩm đầu tiên để hiển thị
  const featuredProduct = getFeaturedProducts(1)[0]
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Tính toán progress dựa trên vị trí của section trong viewport
        // progress = 0 khi section ở dưới màn hình, 1 khi section ở trên màn hình
        // Khi section ở giữa viewport, progress sẽ tăng dần
        const sectionTop = rect.top
        const sectionHeight = rect.height

        // Progress từ 0 (section chưa vào viewport) đến 1 (section ra khỏi viewport phía trên)
        let progress = 0
        if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
          // Section đang trong viewport hoặc vừa mới vào
          progress = 1 - (sectionTop / (windowHeight + sectionHeight))
          progress = Math.max(0, Math.min(1, progress))
        } else if (sectionTop <= -sectionHeight) {
          // Section đã scroll qua hết
          progress = 1
        }

        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Call once to set initial value

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!featuredProduct) {
    return null
  }

  // Config vị trí ban đầu của mỗi layer (khi chưa scroll đến section)
  // speed: tốc độ di chuyển về vị trí trung tâm (càng cao càng nhanh)
  const layerConfigs = [
    { layer: 6, startX: 0, startY: 550, speed: 1 },       // Đẩy xuống bottom nhiều
    { layer: 5, startX: -420, startY: 100, speed: 1 },    // Đẩy xuống trái dưới nhiều
    { layer: 4, startX: -300, startY: -80, speed: 1 },    // Đẩy sang trái trên nhiều
    { layer: 3, startX: 520, startY: 100, speed: 1 },     // Đẩy sang phải dưới nhiều
    { layer: 2, startX: 0, startY: -680, speed: 1.3 },    // Đẩy lên trên top cao hơn, di chuyển nhanh hơn
    { layer: 1, startX: 230, startY: -90, speed: 1 },     // Đẩy sang phải trên nhiều
  ]

  // Tính toán vị trí của layer dựa trên scroll progress
  // progress = 0: layer ở vị trí ban đầu (startX, startY)
  // progress = 1: layer ở vị trí trung tâm (0, 0) - xếp chồng hoàn toàn
  const getLayerTransform = (layerNum: number) => {
    const config = layerConfigs.find(c => c.layer === layerNum)
    if (!config) return { x: 0, y: 0 }

    // Tính progress với speed multiplier
    // Layer có speed cao sẽ đạt vị trí 0 nhanh hơn
    const adjustedProgress = Math.min(1, scrollProgress * config.speed)

    // Interpolate từ vị trí ban đầu về 0
    const x = config.startX * (1 - adjustedProgress)
    const y = config.startY * (1 - adjustedProgress)

    return { x, y }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gray-50 py-14 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Layer 7 (nền) - Phủ từ trái sang phải toàn màn hình */}
      <div
        className="absolute left-0 top-0 right-0 bottom-0"
        style={{
          zIndex: 0, // Nằm dưới tất cả content
        }}
      >
        <Image
          src={`/parallax-images/7.png`}
          alt="Background layer"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "left center", // Sát lề trái
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8">
          {/* Right: Text (desktop) - 50% */}
          <div className="space-y-4 md:order-2 md:pl-8 lg:pl-12 flex flex-col justify-center">
            <p className="text-sm text-stone-600 tracking-wide">Bộ sưu tập nổi bật</p>
            <h3 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight">
              {featuredProduct.name}
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {featuredProduct.tagline}
            </p>
            <div className="pt-2">
              <Link
                href={`/product/${featuredProduct.slug}`}
                className="inline-block px-6 py-2.5 rounded-full border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
              >
                Mua ngay
              </Link>
            </div>
          </div>

          {/* Left: Image Layers - parallax xếp chồng - 50% */}
          <div className="relative flex items-center justify-start md:order-1 w-full">
            <div className="relative w-full h-[440px] md:h-[560px] lg:h-[620px]">
              {/* Render các layer với parallax effect - di chuyển về trung tâm khi scroll */}
              {layerConfigs.map((config, index) => {
                const { x, y } = getLayerTransform(config.layer)
                return (
                  <div
                    key={config.layer}
                    className="absolute inset-0"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      zIndex: index + 1, // z-index: 1 (layer 6) -> 6 (layer 1)
                    }}
                  >
                    <Image
                      src={`/parallax-images/${config.layer}.png`}
                      alt={`Layer ${config.layer}`}
                      fill
                      className="object-contain"
                      priority={config.layer === 1 || config.layer === 6}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}