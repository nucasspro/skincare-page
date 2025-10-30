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
        playPromise.catch(() => { })
      }
    } catch { }
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
    <section className="relative w-full h-[1080px] md:h-screen overflow-hidden bg-black">
      {/* Background Video full-screen */}
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

      {/* Optional subtle gradient for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      {/* Overlay content (left) */}
      <div className="absolute inset-0 z-10">
        <div className="mx-auto h-full w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-full flex items-center">
            <div className="max-w-xl text-white">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight">
                {slides[current].title}
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/85 leading-relaxed">
                {slides[current].description}
              </p>
              {slides[current].cta ? (
                <a
                  href={slides[current].cta.href}
                  className="inline-flex items-center mt-8 px-6 py-3 rounded-full bg-white text-gray-900 text-sm md:text-base hover:bg-gray-100 transition-colors"
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
                    className={`h-2.5 rounded-full transition-all ${idx === current ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider controls edges */}
      <div className="absolute inset-0 z-10 flex items-center justify-between px-2 sm:px-4">
        <button
          onClick={goPrev}
          className="h-9 w-9 rounded-full bg-white/85 hover:bg-white text-gray-900 shadow transition"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="h-9 w-9 rounded-full bg-white/85 hover:bg-white text-gray-900 shadow transition"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  )
}
