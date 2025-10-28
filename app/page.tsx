import { Navigation } from "@/components/navigation"
import { AnnouncementBar } from "@/components/announcement-bar"
import { VideoHero } from "@/components/video-hero"
import { Product3DShowcase } from "@/components/product-3d-showcase"
import { BestSellers } from "@/components/best-sellers"
import { BrandStoryPreview } from "@/components/brand-story-preview"
import { SocialMediaShowcase } from "@/components/social-media-showcase"
import { PRArticles } from "@/components/pr-articles"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navigation />
      <VideoHero />
      <Product3DShowcase />
      <BestSellers />
      <BrandStoryPreview />
      <SocialMediaShowcase />
      <PRArticles />
      <Footer />
    </div>
  )
}
