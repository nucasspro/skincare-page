"use client"

import Image from "next/image"
import { useMemo } from "react"

export interface FeatureItem {
  title: string
  value: string
}

export interface FeatureHighlightProps {
  features?: FeatureItem[]
}

export function FeatureHighlight({
  features = []
}: FeatureHighlightProps) {
  // Memoize features để tránh re-render không cần thiết
  const memoizedFeatures = useMemo(() => features, [features])

  return (
    <section className="w-full bg-gradient-to-r from-gray-400 to-gray-300">
      {/* Banner with Background Image */}
      <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/banner/bg-2.png"
          alt="Feature background"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-[5]" />

        {/* Text Content - Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-12 text-center">
              {memoizedFeatures.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center justify-center min-w-0 px-2">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white uppercase tracking-wider break-words leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/95 font-light italic mt-2 break-words">
                    {feature.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
