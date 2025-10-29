import { FeatureHighlight } from "@/components/feature-highlight"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ProductDetailsAccordion } from "@/components/product-details-accordion"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductQA } from "@/components/product-qa"
import { RealResults } from "@/components/real-results"
import { RecentlyViewed } from "@/components/recently-viewed"
import { SimilarProducts } from "@/components/similar-products"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-0">
        {/* Product Gallery & Info Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mobile: 60% image, Desktop: 50% image */}
            <div className="lg:col-span-1">
              <ProductImageGallery />
            </div>
            {/* Mobile: 40% text, Desktop: 50% text */}
            <div className="lg:col-span-1">
              <ProductInfo />
            </div>
          </div>
        </section>

        {/* Feature Highlight Section */}
        <FeatureHighlight />

        {/* Product Details Accordion */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <ProductDetailsAccordion />
        </section>

        <RealResults productId={params.id} />

        {/* Similar Products */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <SimilarProducts productId={params.id} />
        </section>

        {/* Q&A Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 bg-stone-50">
          <ProductQA />
        </section>

        {/* Recently Viewed */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <RecentlyViewed />
        </section>
      </main>

      <Footer />
    </div>
  )
}
