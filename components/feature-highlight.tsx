"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function FeatureHighlight() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/videohero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-3xl text-center space-y-6 text-white">
          <h2 className="text-5xl md:text-6xl font-light text-balance">Science Meets Nature</h2>
          <p className="text-xl md:text-2xl font-light text-stone-100 text-pretty">
            Our advanced formula combines hyaluronic acid, peptides, and botanical extracts to deliver visible results
            in just 7 days
          </p>
          <div className="grid md:grid-cols-3 gap-8 pt-8">
            <div className="space-y-2">
              <div className="text-4xl font-light">98%</div>
              <div className="text-sm text-stone-200">Saw improved hydration</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light">92%</div>
              <div className="text-sm text-stone-200">Noticed smoother texture</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light">7 Days</div>
              <div className="text-sm text-stone-200">To visible results</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
