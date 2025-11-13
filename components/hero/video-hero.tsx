"use client"

import { getHeroHeadlineClass } from "@/lib/utils/typography-utils"
import { useEffect, useRef, useState } from "react"

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  // Lazy load video when component enters viewport
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            setShouldLoadVideo(true)
          }
        })
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.1,
      }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [shouldLoadVideo])

  // Load and play video when shouldLoadVideo becomes true
  useEffect(() => {
    if (!shouldLoadVideo) return

    const el = videoRef.current
    if (!el) return

    // Set video source only when we want to load it
    if (!isVideoLoaded) {
      el.load()
      setIsVideoLoaded(true)
    }

    // Play video
    try {
      const playPromise = el.play()
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Auto-play was prevented, user interaction required
        })
      }
    } catch {
      // Play failed
    }
  }, [shouldLoadVideo, isVideoLoaded])

  return (
    <section ref={sectionRef} className="relative w-full h-[60vh] sm:h-[70vh] md:h-screen overflow-hidden bg-black">
      {/* Background Video full-screen - Only load when in viewport */}
      {shouldLoadVideo ? (
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          loop
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
          suppressHydrationWarning
        >
          <source src="/videos/1.mov" type="video/mp4" />
        </video>
      ) : (
        // Placeholder background while video is not loaded
        <div className="absolute inset-0 h-full w-full bg-black" />
      )}

      {/* Optional subtle gradient for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      {/* Overlay content (left) */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white px-4">
            <h2 className="font-light tracking-tight">
              <span className={`${getHeroHeadlineClass("text-white")} drop-shadow-lg whitespace-nowrap`}>
                "BRIGHT BEAUTY"
              </span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/85 leading-relaxed">
              Vẻ đẹp sáng khỏe, tự hào thương hiệu Việt.
            </p>
            <a
              href="/products"
              className="inline-flex items-center mt-6 sm:mt-8 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-gray-900 text-xs sm:text-sm md:text-base hover:bg-gray-100 transition-colors"
            >
              Xem thêm
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
