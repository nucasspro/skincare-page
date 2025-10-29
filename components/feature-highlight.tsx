"use client"

import { Droplets, Leaf, Shield, Sun } from "lucide-react"
import Image from "next/image"

export function FeatureHighlight() {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      label: "Độ Bảo Vệ",
      value: "SPF 50+ PA++++"
    },
    {
      icon: <Sun className="w-6 h-6" />,
      label: "Chống UV",
      value: "UVA/UVB"
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: "Dạng Sản Phẩm",
      value: "Kem Chống Nắng"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      label: "Thành Phần",
      value: "Natural Organic"
    }
  ]

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Clean background with image */}
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/5609849.jpg"
          alt="Background"
          fill
          className="object-cover blur-md"
          priority
        />
        {/* Dark overlay for product contrast */}
        <div className="absolute inset-0 bg-black/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 p-8 md:p-12">

            {/* Left features - 2 items */}
            <div className="flex flex-col justify-center space-y-8 md:col-span-1">
              {features.slice(0, 2).map((feature, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <div className="text-orange-400 mb-3">
                    {feature.icon}
                  </div>
                  <div className="text-stone-300 text-sm uppercase tracking-wider font-semibold mb-2">
                    {feature.label}
                  </div>
                  <div className="text-base md:text-lg font-light text-white">
                    {feature.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Center product image */}
            <div className="flex items-center justify-center md:col-span-3 py-8 md:py-0">
              <div className="relative w-full h-96 md:h-[600px]">
                <Image
                  src="/images/products/TachNen1.png"
                  alt="Kem chống nắng"
                  fill
                  className="object-contain drop-shadow-2xl"
                  style={{
                    filter: "brightness(1.15) contrast(1.05) drop-shadow(0 0 40px rgba(255,255,255,0.3))"
                  }}
                />
                {/* Glow effect around product */}
                <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent blur-3xl" />
              </div>
            </div>

            {/* Right features - 2 items */}
            <div className="flex flex-col justify-center space-y-8 md:col-span-1">
              {features.slice(2, 4).map((feature, idx) => (
                <div key={idx} className="text-center md:text-right">
                  <div className="text-orange-400 mb-3 flex justify-center md:justify-end">
                    {feature.icon}
                  </div>
                  <div className="text-stone-300 text-sm uppercase tracking-wider font-semibold mb-2">
                    {feature.label}
                  </div>
                  <div className="text-base md:text-lg font-light text-white">
                    {feature.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  )
}
