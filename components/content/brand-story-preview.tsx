"use client"

import { getHeroHeadlineClass } from "@/lib/utils/typography-utils"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function BrandStoryPreview() {

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-0 bg-gradient-to-b from-white to-stone-50">
      <div className="mx-auto max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Text Side - Left */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:pr-12 pl-0 sm:pl-0 md:pl-6 lg:pl-8 xl:pl-12 flex flex-col items-center justify-center text-center">
            <div className="space-y-2 sm:space-y-4">
              <p className="text-xs sm:text-sm font-medium text-stone-600 tracking-wider uppercase p-desc">Câu chuyện của chúng tôi</p>
            </div>

            <div className="max-w-2xl py-4 sm:py-6 px-4 sm:px-0">
              <p className={getHeroHeadlineClass("text-gray-900")}>
                Từ khoa học tử tế, Cellic trao lại làn da Việt vẻ đẹp sáng khỏe tự nhiên.
              </p>
            </div>

            <Link
              href="/brand-story"
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-4 transition-all duration-300 group p-desc mt-4"
            >
              Đọc câu chuyện đầy đủ
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image Side - Right (Nature image) - 50% column, full in its half */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-stone-100 w-full">
            <Image
              src="/brand-story/2.png"
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
