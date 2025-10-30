"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function BrandStoryPreview() {
  const { t } = useI18n()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-0 bg-gradient-to-b from-white to-stone-50">
      <div className="mx-auto max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Text Side - Left */}
          <div className="space-y-8 lg:pr-12 pl-0 sm:pl-0 md:pl-6 lg:pl-8 xl:pl-12">
            <div className="space-y-4">
              <p className="text-sm font-medium text-stone-600 tracking-wider uppercase p-desc">{t.brandStory.title}</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 h-heading">{t.brandStory.subtitle}</h2>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed p-desc">
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
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-4 transition-all duration-300 group p-desc"
            >
              {t.brandStory.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image Side - Right (Nature image) - 50% column, full in its half */}
          <div className="relative h-[600px] overflow-hidden bg-stone-100 w-full">
            <Image
              src="/images/backgrounds/5609849.jpg"
              alt="Nature"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
