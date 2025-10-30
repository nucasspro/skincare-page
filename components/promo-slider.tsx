"use client"

import { useEffect, useMemo, useState } from "react"

type Banner = {
  title: string
  subtitle?: string
  imageUrl: string
  cta?: { label: string; href: string }
}

export function PromoSlider() {
  const banners: Banner[] = useMemo(
    () => [
      {
        title: "Ưu đãi chăm sóc da mùa lễ hội",
        subtitle: "Giảm đến 30% cho bộ sản phẩm dưỡng sáng",
        imageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80",
        cta: { label: "Mua ngay", href: "/products" },
      },
      {
        title: "Khoa học và thiên nhiên hòa quyện",
        subtitle: "Công thức dịu nhẹ, hiệu quả rõ rệt",
        imageUrl:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80",
        cta: { label: "Khám phá", href: "/brand-story" },
      },
      {
        title: "Miễn phí vận chuyển toàn quốc",
        subtitle: "Cho đơn từ 500k trong tuần này",
        imageUrl:
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=2000&q=80",
        cta: { label: "Xem chi tiết", href: "/" },
      },
    ],
    []
  )

  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % banners.length), 5000)
    return () => clearInterval(id)
  }, [banners.length])

  return (
    <section className="relative w-full">
      <div className="relative h-[400px] w-full overflow-hidden">
        {/* Slider track */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {banners.map((b, i) => (
            <div key={i} className="relative h-full w-full flex-shrink-0">
              {/* Background image */}
              <img
                src={b.imageUrl}
                alt={b.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-black/40" />
              <div className="absolute inset-0 backdrop-blur-[1px]" />
              {/* Content */}
              <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
                <div className="transition-opacity duration-500">
                  <h3 className="h-heading text-2xl md:text-3xl text-white drop-shadow-sm">{b.title}</h3>
                  {b.subtitle ? (
                    <p className="p-desc mt-2 text-sm md:text-base text-white/90">{b.subtitle}</p>
                  ) : null}
                  {b.cta ? (
                    <a
                      href={b.cta.href}
                      className="inline-flex items-center mt-4 px-4 py-2 rounded-md bg-white/95 text-gray-900 text-sm hover:bg-white transition-colors"
                    >
                      {b.cta.label}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              aria-label={`banner-${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2.5 rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-2.5 bg-white/60 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromoSlider


