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
          <div className="space-y-8 lg:pr-12 pl-0 sm:pl-0 md:pl-6 lg:pl-8 xl:pl-12 flex flex-col items-center justify-center text-center">
            <div className="space-y-4">
              <p className="text-sm font-medium text-stone-600 tracking-wider uppercase p-desc">{t.brandStory.title}</p>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 p-desc">
                Từ khoa học tử tế, Cellic trao lại làn da Việt vẻ đẹp sáng khỏe tự nhiên.
              </p>
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
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&q=80"
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
