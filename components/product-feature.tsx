"use client"

import Image from "next/image"

export function ProductFeature() {
  return (
    <section className="relative w-full bg-gray-50 py-14 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Left: Text */}
          <div className="space-y-4">
            <p className="text-sm text-stone-600 tracking-wide">Bộ sưu tập nổi bật</p>
            <h3 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight">
              Radiance Renewal Serum
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Công thức tiên tiến giúp làm sáng da, giảm nếp nhăn và cải thiện kết cấu da một cách tự nhiên.
            </p>
            <div className="pt-2">
              <button className="px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                Mua ngay
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-[680px] h-[440px] md:h-[560px] lg:h-[620px]">
              <Image
                src="/images/products/TachNen1.png"
                alt="Radiance Renewal Serum"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


