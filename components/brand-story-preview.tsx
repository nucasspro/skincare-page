"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function BrandStoryPreview() {
  const { t } = useI18n()
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    const videoRef = document.getElementById('brand-story-video') as HTMLVideoElement
    if (videoRef) {
      videoRef.play()
      setIsPlaying(true)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Side - Left */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-stone-600 tracking-wider uppercase">{t.brandStory.title}</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">{t.brandStory.subtitle}</h2>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 flex-shrink-0" />
                <p>{t.brandStory.point1}</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 flex-shrink-0" />
                <p>{t.brandStory.point2}</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 flex-shrink-0" />
                <p>{t.brandStory.point3}</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 flex-shrink-0" />
                <p>{t.brandStory.point4}</p>
              </div>
            </div>

            <Link
              href="/brand-story"
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-4 transition-all duration-300 group"
            >
              {t.brandStory.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Video Side - Right */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100">
            <video
              id="brand-story-video"
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/videohero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Play Button */}
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                aria-label="Play video"
              >
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
