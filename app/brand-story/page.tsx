"use client"

import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { useI18n } from "@/lib/i18n-context"
import Link from "next/link"

export default function BrandStoryPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative grid min-h-screen md:grid-cols-2">
        <div className="flex items-center justify-center bg-stone-50 px-8 py-24 md:px-16">
          <div className="max-w-xl space-y-8">
            <div>
              <h1 className="mb-2 font-serif text-6xl leading-tight md:text-7xl">{t.brandStory.page.hero.title}</h1>
              <p className="text-xl text-muted-foreground">{t.brandStory.page.hero.subtitle}</p>
            </div>
            <div className="space-y-3 border-l-2 border-stone-300 pl-6">
              <p className="text-lg leading-relaxed">{t.brandStory.page.hero.value1}</p>
              <p className="text-lg leading-relaxed">{t.brandStory.page.hero.value2}</p>
              <p className="text-lg leading-relaxed">{t.brandStory.page.hero.value3}</p>
              <p className="text-lg leading-relaxed">{t.brandStory.page.hero.value4}</p>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] md:h-auto">
          <img src="/brand-hero-natural-lab.jpg" alt="Brand Story Hero" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">
              {t.brandStory.page.chapter1.label}
            </span>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl text-balance">
              {t.brandStory.page.chapter1.title}
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p className="text-pretty">{t.brandStory.page.chapter1.p1}</p>
              <p className="text-pretty">{t.brandStory.page.chapter1.p2}</p>
              <p className="text-pretty">{t.brandStory.page.chapter1.p3}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative h-[400px] md:h-[600px]">
          <img src="/brand-research-scientist.jpg" alt="Our Mission" className="h-full w-full object-cover" />
        </div>
        <div className="flex items-center bg-stone-50 px-8 py-16 md:px-16 md:py-24">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">
              {t.brandStory.page.chapter2.label}
            </span>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl text-balance">
              {t.brandStory.page.chapter2.title}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t.brandStory.page.chapter2.p1}</p>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t.brandStory.page.chapter2.p2}</p>
          </div>
        </div>
      </section>

      <section className="relative h-[600px] w-full md:h-[700px]">
        <img
          src="/brand-botanical-ingredients.jpg"
          alt="Ingredients Philosophy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="max-w-3xl text-center text-white">
            <span className="mb-4 block text-sm uppercase tracking-wider opacity-90">
              {t.brandStory.page.chapter3.label}
            </span>
            <h2 className="mb-6 font-serif text-4xl leading-tight md:text-5xl text-balance">
              {t.brandStory.page.chapter3.title}
            </h2>
            <p className="text-lg leading-relaxed opacity-90 md:text-xl text-pretty">
              {t.brandStory.page.chapter3.description}
            </p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="order-2 flex items-center bg-stone-100 px-8 py-16 md:order-1 md:px-16 md:py-24">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">
              {t.brandStory.page.chapter4.label}
            </span>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl text-balance">
              {t.brandStory.page.chapter4.title}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t.brandStory.page.chapter4.p1}</p>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t.brandStory.page.chapter4.p2}</p>
            <Button className="mt-4 group">
              {t.brandStory.page.chapter4.cta}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        <div className="relative order-1 h-[400px] md:order-2 md:h-[600px]">
          <img src="/brand-sustainable-packaging.jpg" alt="Sustainability" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative h-[400px] md:h-[600px]">
          <img
            src="/brand-expert-dermatologist.jpg"
            alt="Expert Collaboration"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center bg-stone-50 px-8 py-16 md:px-16 md:py-24">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">
              {t.brandStory.page.chapter5.label}
            </span>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl text-balance">
              {t.brandStory.page.chapter5.title}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t.brandStory.page.chapter5.p1}</p>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t.brandStory.page.chapter5.p2}</p>
          </div>
        </div>
      </section>

      <section className="relative h-[600px] w-full md:h-[700px]">
        <img src="/brand-innovation-future.jpg" alt="Future of Skincare" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="max-w-3xl text-center text-white">
            <span className="mb-4 block text-sm uppercase tracking-wider opacity-90">
              {t.brandStory.page.chapter6.label}
            </span>
            <h2 className="mb-6 font-serif text-4xl leading-tight md:text-5xl text-balance">
              {t.brandStory.page.chapter6.title}
            </h2>
            <p className="text-lg leading-relaxed opacity-90 md:text-xl text-pretty">
              {t.brandStory.page.chapter6.description}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-4xl md:text-5xl text-balance">{t.brandStory.page.values.title}</h2>
            <p className="text-lg text-muted-foreground text-pretty">{t.brandStory.page.values.subtitle}</p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-900/10">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="font-serif text-2xl">{t.brandStory.page.values.value1.title}</h3>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                {t.brandStory.page.values.value1.description}
              </p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-900/10">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-serif text-2xl">{t.brandStory.page.values.value2.title}</h3>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                {t.brandStory.page.values.value2.description}
              </p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-900/10">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="font-serif text-2xl">{t.brandStory.page.values.value3.title}</h3>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                {t.brandStory.page.values.value3.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[500px] w-full">
        <img src="/brand-product-collection.jpg" alt="Explore Products" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="max-w-2xl text-center text-white">
            <h2 className="mb-6 font-serif text-4xl leading-tight md:text-5xl text-balance">
              {t.brandStory.page.cta.title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed opacity-90 text-pretty">{t.brandStory.page.cta.description}</p>
            <Link href="/products">
              <Button size="lg" variant="secondary" className="group">
                {t.brandStory.page.cta.button}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
