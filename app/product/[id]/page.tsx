import { Navigation } from "@/components/navigation"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductInfo } from "@/components/product-info"
import { FeatureHighlight } from "@/components/feature-highlight"
import { ProductDetailsAccordion } from "@/components/product-details-accordion"
import { BeforeAfterReviews } from "@/components/before-after-reviews"
import { SimilarProducts } from "@/components/similar-products"
import { ProductQA } from "@/components/product-qa"
import { RecentlyViewed } from "@/components/recently-viewed"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-20">
        {/* Product Gallery & Info Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <ProductImageGallery />
            <ProductInfo />
          </div>
        </section>

        {/* Feature Highlight Section */}
        <FeatureHighlight />

        {/* Product Details Accordion */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <ProductDetailsAccordion />
        </section>

        {/* Before/After Reviews */}
        <BeforeAfterReviews />

        {/* Similar Products */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <SimilarProducts />
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
    </div>
  )
}
