import { FeatureHighlight } from "@/components/feature-highlight"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ProductDetailsAccordion } from "@/components/product-details-accordion"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductQA } from "@/components/product-qa"
import { RealResults } from "@/components/real-results"
import { SimilarProducts } from "@/components/similar-products"
import { getProductBySlug } from "@/lib/product-service"

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params in Next.js 15+
  const { slug } = await params
  const product = getProductBySlug(slug)

  // Redirect to 404 if product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sản phẩm không tồn tại</h1>
          <p className="text-gray-600">Không tìm thấy sản phẩm với slug: {slug}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation isTransparent={false} />

      <main className="pt-0">
        {/* Product Gallery & Info Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mobile: 60% image, Desktop: 50% image */}
            <div className="lg:col-span-1">
              <ProductImageGallery product={product} />
            </div>
            {/* Mobile: 40% text, Desktop: 50% text */}
            <div className="lg:col-span-1">
              <ProductInfo productId={product.id} />
            </div>
          </div>
        </section>

        {/* Feature Highlight Section */}
        <FeatureHighlight features={[
          { title: "CHỐNG NẮNG", value: "SPF 50+" },
          { title: "NÂNG TONE", value: "8/10" },
          { title: "KIỀM DẦU", value: "9/10" }
        ]} />

        {/* Product Details Accordion */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <ProductDetailsAccordion />
        </section>

        <RealResults productId={product.id} />

        {/* Similar Products */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <SimilarProducts productId={product.id} />
        </section>

        {/* Q&A Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 bg-stone-50">
          <ProductQA limit={3} />
        </section>

        <div className="h-40"></div>


      </main>

      <Footer />
    </div>
  )
}

