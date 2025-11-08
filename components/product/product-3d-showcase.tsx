"use client"

/**
 * NOTE: This component is currently UNUSED
 * TODO: Remove this component if not needed in the future
 * Last checked: Component exists but not imported/used anywhere in the codebase
 */

import { useI18n } from "@/lib/i18n-context"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function Product3DShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    // Mark as hydrated
    setIsHydrated(true)

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollProgress = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
        )
        setScrollY(scrollProgress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const layer1Offset = scrollY * 300
  const layer2Offset = scrollY * 200
  const layer3Offset = scrollY * 120
  const layer4Offset = scrollY * 80
  const fadeIn = Math.min(1, scrollY * 2)
  const rotation = scrollY * 15

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-50 to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100/50 via-transparent to-stone-100/50 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50">
            <div
              className="absolute inset-0 bg-gradient-to-br from-stone-200/50 to-stone-100/50"
              style={{
                transform: `translateY(${layer4Offset}px) scale(${1 + scrollY * 0.05})`,
                transition: "transform 0.1s ease-out",
              }}
            />

            <div
              className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-stone-300/30 to-transparent blur-sm animate-float-slow"
              style={{
                transform: `translateX(${layer3Offset}px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div
              className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-stone-300/20 to-transparent blur-sm animate-float-slower"
              style={{
                transform: `translateX(${-layer3Offset}px)`,
                transition: "transform 0.1s ease-out",
              }}
            />

            <div
              className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-stone-300/40 to-stone-200/20 blur-3xl animate-spin-slow"
              style={{
                transform: `translate(${-layer2Offset}px, ${layer2Offset}px) rotate(${rotation}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-stone-300/40 to-stone-200/20 blur-3xl animate-spin-reverse"
              style={{
                transform: `translate(${layer2Offset}px, ${-layer2Offset}px) rotate(${-rotation}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            />

            <div
              className="absolute top-1/3 left-10 w-32 h-32 rounded-full bg-stone-300/20 blur-2xl animate-pulse-slow"
              style={{
                transform: `translate(${layer3Offset * 0.5}px, ${-layer3Offset * 0.8}px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div
              className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-stone-300/15 blur-2xl animate-pulse-slower"
              style={{
                transform: `translate(${-layer3Offset * 0.7}px, ${layer3Offset * 0.6}px)`,
                transition: "transform 0.1s ease-out",
              }}
            />

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `translateY(${-layer1Offset}px) scale(${1 + scrollY * 0.2}) rotate(${rotation * 0.5}deg)`,
                opacity: fadeIn,
                transition: "transform 0.1s ease-out, opacity 0.3s ease-out",
              }}
            >
              <div className="relative w-64 h-96 md:w-80 md:h-[480px] animate-float">
                <Image
                  src="/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg"
                  alt="Radiance Renewal Serum"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-radial from-stone-300/30 via-transparent to-transparent blur-xl animate-pulse-slow" />
              </div>
            </div>

            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-stone-400/30 animate-float-particle"
                style={{
                  width: `${4 + (i % 3) * 2}px`,
                  height: `${4 + (i % 3) * 2}px`,
                  top: `${(i * 5) % 100}%`,
                  left: `${(i * 7) % 100}%`,
                  transform: `translateY(${-layer2Offset * (1 + i * 0.15)}px) translateX(${layer3Offset * (0.5 - (i % 10) * 0.1)}px)`,
                  transition: "transform 0.1s ease-out",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}

            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
              style={{
                transform: `translateX(${layer2Offset}px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-stone-600 tracking-wider uppercase">{t.product3d.subtitle}</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">{t.product3d.title}</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">{t.product3d.description}</p>
            <ul className="space-y-3">
              {["Reduces fine lines", "Brightens complexion", "Deeply hydrates", "Clinically tested"].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <button className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                {t.product3d.cta} - 2.136.000đ
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-40px); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-5px, -20px); }
          75% { transform: translate(-10px, -10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: float-particle 8s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
