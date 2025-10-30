import { Navigation } from "@/components/navigation"
import { VideoHero } from "@/components/video-hero"
import { BestSellers } from "@/components/best-sellers"
import { BrandStoryPreview } from "@/components/brand-story-preview"
import { SocialMediaShowcase } from "@/components/social-media-showcase"
import { PRArticles } from "@/components/pr-articles"
import { PromoSlider } from "@/components/promo-slider"
import { Footer } from "@/components/footer"
import { ProductFeature } from "@/components/product-feature"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <VideoHero />
      <ProductFeature />
      <BestSellers />
      <BrandStoryPreview />
      <SocialMediaShowcase />
      <PromoSlider />
      {/* <PRArticles /> hidden temporarily */}
      <Footer />
    </div>
  )
}
