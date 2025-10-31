"use client"

import { useEffect, useRef } from "react"

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play video on mount
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
  }, [])

  return (
    <section className="relative w-full h-[1080px] md:h-screen overflow-hidden bg-black">
      {/* Background Video full-screen */}
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        loop
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/1.mp4" type="video/mp4" />
      </video>

      {/* Optional subtle gradient for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      {/* Overlay content (left) */}
      <div className="absolute inset-0 z-10">
        <div className="mx-auto h-full w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-full flex items-center">
            <div className="max-w-xl text-white">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight">
                <span className="font-air text-white drop-shadow-lg tracking-[0.15em] uppercase text-[2rem] md:text-[3rem] font-light leading-tight">
                  "BRING BEAUTY"
                </span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/85 leading-relaxed">
                Vẻ đẹp sáng khỏe, tự hào thương hiệu Việt. (slogan)
              </p>
              <a
                href="/products"
                className="inline-flex items-center mt-8 px-6 py-3 rounded-full bg-white text-gray-900 text-sm md:text-base hover:bg-gray-100 transition-colors"
              >
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
