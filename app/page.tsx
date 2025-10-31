import { BestSellers } from "@/components/best-sellers"
import { BrandStoryPreview } from "@/components/brand-story-preview"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ProductFeature } from "@/components/product-feature"
import { PromoSlider } from "@/components/promo-slider"
import { SocialMediaShowcase } from "@/components/social-media-showcase"
import { VideoHero } from "@/components/video-hero"

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
