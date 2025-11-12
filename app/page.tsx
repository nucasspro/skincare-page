import { BestSellers } from "@/components/product-listing/best-sellers"
import { BrandStoryPreview } from "@/components/content/brand-story-preview"
import { Footer } from "@/components/layout/footer"
import { Navigation } from "@/components/navigation/navigation"
import { ProductFeature } from "@/components/product/product-feature"
import { PromoSlider } from "@/components/hero/promo-slider"
import { SocialMediaShowcase } from "@/components/content/social-media-showcase"
import { VideoHero } from "@/components/hero/video-hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation isHomePage={true} />
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
