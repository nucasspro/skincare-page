"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Slide = {
  title: string
  description: string
  videoSrc: string
  cta?: { label: string; href: string }
}

export function VideoHero() {
  const slides: Slide[] = useMemo(
    () => [
      {
        title: "Khoa học gặp gỡ thiên nhiên",
        description:
          "Công thức được chứng minh lâm sàng, kết hợp thành phần tự nhiên tinh khiết cho làn da khỏe mạnh.",
        videoSrc: "/videos/1.mp4",
        cta: { label: "Khám phá ngay", href: "/products" },
      },
      {
        title: "Tối ưu hoá liệu trình chăm sóc",
        description:
          "Thiết kế cho mọi loại da. Dịu nhẹ nhưng hiệu quả, phù hợp sử dụng hằng ngày.",
        videoSrc: "/videos/2.mp4",
        cta: { label: "Xem bộ sưu tập", href: "/products" },
      },
      {
        title: "Kết quả thấy rõ rệt",
        description:
          "Làm sáng, cấp ẩm sâu, giảm nếp nhăn. Trải nghiệm sự thay đổi từ tuần đầu tiên.",
        videoSrc: "/videos/3.mp4",
        cta: { label: "Mua ngay", href: "/products" },
      },
    ],
    []
  )

  const [current, setCurrent] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play when slide changes
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    try {
      el.load()
      const playPromise = el.play()
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {})
      }
    } catch {}
  }, [current])

  const goPrev = () => setCurrent((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setCurrent((i) => (i + 1) % slides.length)

  // Auto-advance every 5s
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <section className="relative w-full bg-white mt-0">
      <div className="mx-auto w-full pl-4 sm:pl-6 lg:pl-8 pr-0">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 pt-0 md:pt-0 pb-10 md:pb-16">
          {/* Left: Text */}
          <div className="order-2 md:order-1">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900">
                {slides[current].title}
              </h2>
              <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
                {slides[current].description}
              </p>
              {slides[current].cta ? (
                <a
                  href={slides[current].cta.href}
                  className="inline-flex items-center mt-6 px-5 py-2.5 rounded-md bg-gray-900 text-white text-sm md:text-base hover:bg-black transition-colors"
                >
                  {slides[current].cta.label}
                </a>
              ) : null}

              {/* Dots */}
              <div className="mt-8 flex items-center gap-3">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`slide-${idx + 1}`}
                    onClick={() => setCurrent(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === current ? "w-8 bg-gray-900" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Video */}
          <div className="order-1 md:order-2">
            <div className="group relative w-full aspect-[16/9] md:aspect-[4/3] overflow-hidden bg-stone-100">
              <video
                key={current}
                ref={videoRef}
                muted
                playsInline
                autoPlay
                loop
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={slides[current].videoSrc} type="video/mp4" />
              </video>

              {/* Hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gray-500/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Controls */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 sm:px-4">
                <button
                  onClick={goPrev}
                  className="pointer-events-auto h-9 w-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow transition"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={goNext}
                  className="pointer-events-auto h-9 w-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow transition"
                  aria-label="Next"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
