"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function BrandStoryPreview() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div
            className={`relative aspect-[4/5] rounded-3xl overflow-hidden transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <Image
              src="/luxury-skincare-brand-story-natural-ingredients-lab.jpg"
              alt="Brand Story"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Side */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="space-y-4">
              <p className="text-sm font-medium text-stone-600 tracking-wider uppercase">Our Story</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
                Where Science Meets Nature
              </h2>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 flex-shrink-0" />
                <p>
                  Founded in 2018, we believe that effective skincare should be both scientifically proven and naturally
                  derived.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 flex-shrink-0" />
                <p>
                  Our formulations combine cutting-edge dermatological research with sustainably sourced botanical
                  ingredients.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 flex-shrink-0" />
                <p>Every product is clinically tested, cruelty-free, and designed for all skin types.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 flex-shrink-0" />
                <p>
                  We're committed to transparency, sustainability, and helping you achieve your healthiest skin yet.
                </p>
              </div>
            </div>

            <Link
              href="/brand-story"
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-4 transition-all duration-300 group"
            >
              Read Full Story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
