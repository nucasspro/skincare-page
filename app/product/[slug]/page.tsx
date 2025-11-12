import { RealResults } from "@/components/content/real-results"
import { FeatureHighlight } from "@/components/feature/feature-highlight"
import { Footer } from "@/components/layout/footer"
import { Navigation } from "@/components/navigation/navigation"
import { MobileAddToCart } from "@/components/product/mobile-add-to-cart"
import { ProductDetailsAccordion } from "@/components/product/product-details-accordion"
import { ProductImageGallery } from "@/components/product/product-image-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { ProductQA } from "@/components/product/product-qa"
import { SimilarProducts } from "@/components/product/similar-products"
import { ProductService } from "@/lib/product-service"

// Stable reference để tránh lỗi React children
const DEFAULT_FEATURE_ITEMS = [
  { title: "Chỉ số chống nắng", value: "SPF 100/ PA ++++" },
  { title: "Kiểm soát dầu thông minh", value: "9/10" },
  { title: "Kết cấu ổn định", value: "9/10" }
]

const BRIGHT_MATTE_FEATURE_ITEMS = [
  { title: "Hiệu quả chống nắng", value: "10/10" },
  { title: "Mức độ nâng tone", value: "8/10" },
  { title: "Độ kiềm dầu/ khô ráo", value: "9/10" }
]

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params in Next.js 15+
  const { slug } = await params

  // Fetch product from database
  const product = await ProductService.getProductBySlug(slug)
  console.log("product", product)

  // Chọn feature items dựa trên slug
  const featureItems = slug === "bright-matte-sunscreen" ? BRIGHT_MATTE_FEATURE_ITEMS : DEFAULT_FEATURE_ITEMS

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

      <main className="pt-0 md:pt-12 lg:pt-16 pb-20 lg:pb-0">
        {/* Product Gallery & Info Section */}
        <section className="w-full">
          {/* Mobile: Full width */}
          <div className="lg:hidden">
            <div className="space-y-4">
              {/* Image Section - Full width trên mobile */}
              <div className="w-full">
                <ProductImageGallery product={product} />
              </div>
              {/* Info Section - Có padding trên mobile */}
              <div className="px-4 sm:px-6 py-4 sm:py-6">
                <ProductInfo productId={product.id} />
              </div>
            </div>
          </div>

          {/* Desktop: Container with max-width, nhỏ gọn hơn */}
          <div className="hidden lg:block">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Image Section - Container trên desktop, đẩy lên top ít hơn */}
                <div className="lg:col-span-1 lg:-mt-[30px] lg:pb-4">
                  <ProductImageGallery product={product} />
                </div>
                {/* Info Section - Container trên desktop, nhỏ gọn hơn */}
                <div className="lg:col-span-1">
                  <div className="py-4 sm:py-6 md:py-8 lg:py-10">
                    <ProductInfo productId={product.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlight Section */}
        <FeatureHighlight features={featureItems} />

        {/* Product Details Accordion */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <ProductDetailsAccordion productSlug={product.slug} />
        </section>

        <RealResults productId={product.id} />

        {/* Similar Products */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <SimilarProducts productId={product.id} />
        </section>

        {/* Q&A Section */}
        <section className="w-full bg-stone-50 py-8 sm:py-12 md:py-16 pb-12 sm:pb-16 md:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProductQA limit={3} />
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile Add to Cart Button - Fixed at bottom */}
      <MobileAddToCart productId={product.id} />
    </div>
  )
}
