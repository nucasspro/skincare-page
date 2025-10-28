"use client"

import { useEffect, useRef } from "react"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"

export default function BrandStoryPage() {
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      parallaxRefs.current.forEach((ref, index) => {
        if (ref) {
          const scrolled = window.scrollY
          const rate = scrolled * 0.3
          ref.style.transform = `translateY(${rate}px)`
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          ref={(el) => {
            parallaxRefs.current[0] = el
          }}
          className="absolute inset-0 h-[120%]"
        >
          <img
            src="/luxury-skincare-brand-story-natural-ingredients-lab.jpg"
            alt="Brand Story Hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-4xl text-center text-white">
            <h1 className="mb-6 font-serif text-5xl leading-tight md:text-7xl text-balance">Our Story</h1>
            <p className="text-lg leading-relaxed opacity-90 md:text-xl text-pretty">
              A journey of science, nature, and dedication to your skin's health
            </p>
          </div>
        </div>
      </section>

      {/* Brand Origin - Text Section */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">Chapter One</span>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl text-balance">Where It All Began</h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p className="text-pretty">
                In 2015, our founder, a dermatologist with over 20 years of experience, noticed a gap in the skincare
                market. Patients were seeking products that combined clinical efficacy with gentle, natural ingredients.
              </p>
              <p className="text-pretty">
                This observation sparked a mission: to create a skincare line that bridges the gap between
                dermatological science and nature's wisdom. Every formula would be developed with the same rigor as
                pharmaceutical products, yet harness the power of botanical ingredients.
              </p>
              <p className="text-pretty">
                What started in a small laboratory has grown into a global movement, touching the lives of millions who
                believe that effective skincare shouldn't compromise on safety or sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Split Screen - Image + Text */}
      <section className="grid md:grid-cols-2">
        <div className="relative h-[400px] overflow-hidden md:h-[600px]">
          <div
            ref={(el) => {
              parallaxRefs.current[1] = el
            }}
            className="h-[120%]"
          >
            <img
              src="/luxury-skincare-laboratory-research-scientist.jpg"
              alt="Our Mission"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex items-center bg-secondary px-8 py-16 md:px-16 md:py-24">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">Chapter Two</span>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl text-balance">Our Mission</h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              We believe that everyone deserves access to skincare that works. Our mission is to democratize
              dermatological expertise through products that are both effective and accessible.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Every product undergoes rigorous clinical testing and is formulated with ingredients that have proven
              efficacy. We never compromise on quality, and we never test on animals.
            </p>
          </div>
        </div>
      </section>

      {/* Full Width Image with Overlay Text */}
      <section className="relative h-[600px] w-full overflow-hidden md:h-[700px]">
        <div
          ref={(el) => {
            parallaxRefs.current[2] = el
          }}
          className="absolute inset-0 h-[120%]"
        >
          <img
            src="/natural-botanical-ingredients-skincare-herbs-plant.jpg"
            alt="Ingredients Philosophy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-3xl text-center text-white">
            <span className="mb-4 block text-sm uppercase tracking-wider opacity-90">Chapter Three</span>
            <h2 className="mb-6 font-serif text-4xl leading-tight md:text-5xl text-balance">Ingredients Philosophy</h2>
            <p className="text-lg leading-relaxed opacity-90 md:text-xl text-pretty">
              We source the finest ingredients from around the world, combining time-tested botanicals with cutting-edge
              actives. Each ingredient is selected for its proven benefits and sustainable sourcing.
            </p>
          </div>
        </div>
      </section>

      {/* Split Screen Reversed - Text + Image */}
      <section className="grid md:grid-cols-2">
        <div className="order-2 flex items-center bg-accent px-8 py-16 md:order-1 md:px-16 md:py-24">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">Chapter Four</span>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl text-balance">Sustainability Commitment</h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Our commitment to the planet is as strong as our commitment to your skin. We use recyclable packaging,
              minimize waste in our production processes, and partner with suppliers who share our environmental values.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              By 2025, we aim to achieve carbon neutrality across our entire supply chain. Every purchase contributes to
              reforestation projects and ocean cleanup initiatives.
            </p>
            <Button className="mt-4 group">
              Learn About Our Impact
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        <div className="relative order-1 h-[400px] overflow-hidden md:order-2 md:h-[600px]">
          <div
            ref={(el) => {
              parallaxRefs.current[3] = el
            }}
            className="h-[120%]"
          >
            <img
              src="/sustainable-eco-friendly-packaging-recycling-natur.jpg"
              alt="Sustainability"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-4xl md:text-5xl text-balance">Our Core Values</h2>
            <p className="text-lg text-muted-foreground text-pretty">The principles that guide everything we do</p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="font-serif text-2xl">Science-Backed</h3>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                Every formula is developed with clinical research and tested for efficacy
              </p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-serif text-2xl">Nature-Inspired</h3>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                We harness the power of botanical ingredients with proven benefits
              </p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="font-serif text-2xl">Sustainable</h3>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                Committed to protecting the planet for future generations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div
          ref={(el) => {
            parallaxRefs.current[4] = el
          }}
          className="absolute inset-0 h-[120%]"
        >
          <img
            src="/luxury-skincare-products-elegant-display.jpg"
            alt="Explore Products"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-2xl text-center text-white">
            <h2 className="mb-6 font-serif text-4xl leading-tight md:text-5xl text-balance">
              Experience the Difference
            </h2>
            <p className="mb-8 text-lg leading-relaxed opacity-90 text-pretty">
              Discover our collection of dermatologist-developed skincare products
            </p>
            <Button size="lg" variant="secondary" className="group">
              Shop Our Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
