import { Navigation } from "@/components/navigation"
import { VideoHero } from "@/components/video-hero"
import { ParallaxProductSection } from "@/components/parallax-product-section"
import { BestSellers } from "@/components/best-sellers"
import { BrandStoryPreview } from "@/components/brand-story-preview"
import { SocialMediaShowcase } from "@/components/social-media-showcase"
import { PRArticles } from "@/components/pr-articles"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <VideoHero />
      <ParallaxProductSection />
      <BestSellers />
      <BrandStoryPreview />
      <SocialMediaShowcase />
      <PRArticles />
      <Footer />
    </div>
  )
}
