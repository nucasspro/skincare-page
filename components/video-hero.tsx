"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-stone-100">
      {/* Background Video */}
      <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/videohero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Centered Logo/Brand */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <Image
            src="/logo/logo-white.png"
            alt="CELLIC"
            width={300}
            height={100}
            className="mx-auto h-16 md:h-20 lg:h-24 w-auto drop-shadow-lg"
            priority
          />
          <p className="text-lg md:text-xl text-white/90 font-light tracking-wide">Science Meets Nature</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
