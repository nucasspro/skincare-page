"use client"

import { FAQSection, type FAQItem } from "@/components/faq-section"
import { FeaturedArticle } from "@/components/featured-article"
import { Footer } from "@/components/footer"
import { NatureBannerSlider } from "@/components/nature-banner-slider"
import Navigation from "@/components/navigation"
import { NavigationFilterBar } from "@/components/navigation-filter-bar"
import { ProductCard } from "@/components/product-card"
import PromoSlider from "@/components/promo-slider"
import { useCart } from "@/lib/cart-context"
import { getCategoriesAsObject } from "@/lib/category-service"
import { useI18n } from "@/lib/i18n-context"
import { ProductService, type Product } from "@/lib/product-service"
import { useMemo, useState } from "react"

export default function ProductsPage() {
  const { t } = useI18n()
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const productsPerPage = 12

  // Get categories from service
  const categories = getCategoriesAsObject()

  // Get all products (no filters)
  const filteredAndSortedProducts = useMemo(() => {
    return ProductService.filterProducts({
      category: selectedCategory,
      needs: [],
      priceRange: [0, 1000],
    })
  }, [selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage)

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      tagline: product.tagline,
    }, 1)

    setAddedItems((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  // FAQ items data
  const faqItems: FAQItem[] = [
    {
      id: "faq-1",
      question: "Làm cách nào tôi có thể biết sản phẩm nào phù hợp với loại da của tôi?",
      answer: "Chúng tôi cung cấp bộ lọc theo 'Nhu cầu' để giúp bạn tìm sản phẩm phù hợp. Bạn có thể lọc theo loại da (da khô, da dầu, da nhạy cảm) hoặc theo nhu cầu cụ thể (dưỡng ẩm, chống lão hóa, làm sáng)."
    },
    {
      id: "faq-2",
      question: "Có thể sử dụng nhiều sản phẩm cùng một lúc không?",
      answer: "Có, tuy nhiên chúng tôi khuyên bạn nên bắt đầu với một sản phẩm mới tại một thời điểm để theo dõi cách làn da của bạn phản ứng. Hầu hết các sản phẩm của chúng tôi được thiết kế để phối hợp tốt với nhau."
    },
    {
      id: "faq-3",
      question: "Tôi cần bao lâu để thấy kết quả?",
      answer: "Hầu hết khách hàng nhận thấy sự cải thiện trong vòng 2-4 tuần sử dụng thường xuyên. Tuy nhiên, để có kết quả tối ưu, chúng tôi khuyên sử dụng liên tục trong 6-8 tuần."
    },
    {
      id: "faq-4",
      question: "Các sản phẩm có an toàn cho da nhạy cảm không?",
      answer: "Tất cả sản phẩm của chúng tôi đều được điều chế mà không có paraben, sulfate, và đã được kiểm nghiệm với da nhạy cảm. Tuy nhiên, nếu bạn có da rất nhạy cảm, hãy làm test patch trước."
    },
    {
      id: "faq-5",
      question: "Chính sách hoàn trả của bạn là gì?",
      answer: "Chúng tôi cung cấp hoàn trả đầy đủ trong 30 ngày nếu sản phẩm chưa được mở. Nếu bạn không hoàn toàn hài lòng, chúng tôi sẽ hoàn tiền 100%."
    },
  ]

  return (
    <>
      <Navigation isTransparent={false} />
      {/* <NavigationFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        isSticky={isSticky}
      /> */}
      <div className="min-h-screen bg-stone-50">
        {/* Nature Images Banner Slider */}
        <NatureBannerSlider />

        {/* Main Products Section */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">



          {/* Category Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
              {selectedCategory === "all"
                ? "Tất cả sản phẩm"
                : (categories[selectedCategory] || "Tất cả sản phẩm")}
            </h1>
          </div>

            <NavigationFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

          {/* Products Grid - Full width - 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 w-full">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isHovered={hoveredId === product.id}
                onHover={() => setHoveredId(product.id)}
                onLeave={() => setHoveredId(null)}
                onAddToCart={handleAddToCart}
                addToCartLabel={t.productListing.addToCart}
                isShowPrice={true}
              />
            ))}
          </div>

          {/* Pagination */}
          {/* {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mb-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-stone-200 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50"
              >
                {t.productListing.pagination.previous}
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded text-sm ${
                    currentPage === page
                      ? "bg-stone-900 text-white"
                      : "bg-white border border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-stone-200 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50"
              >
                {t.productListing.pagination.next}
              </button>
            </div>
          )} */}
        </div>

        { /* Break component */ }
          <PromoSlider />
        {/* <VideoHero /> */}
            {/* <div className="relative w-full h-[200px] md:h-[340px] lg:h-[850px] mb-12 flex items-center justify-center overflow-hidden">
              <img
                src="/luxury-skincare-brand-story-natural-ingredients-lab.jpg"
                alt="Skin close up"
                className="object-cover w-full h-full"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white font-semibold text-xl md:text-2xl lg:text-3xl drop-shadow-md uppercase tracking-wide">
                  SKIN CHECK
                </span>
              </span>
            </div> */}

        {/* Featured Article Section */}
        <FeaturedArticle
          label="Những điều bạn nên biết"
          title="Một làn da khỏe mạnh và rạng rỡ"
          description="Chăm sóc da đúng cách là bước quan trọng để duy trì sức khỏe và vẻ đẹp. Một quy trình chăm sóc da tốt giúp làm sạch, dưỡng ẩm và bảo vệ da khỏi tác động của môi trường bên ngoài."
          readMoreLink="#"
          readMoreText="Xem thêm"
          imageUrl="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=900&fit=crop"
        />


        {/* Q&A Section */}
        <FAQSection items={faqItems} />
      </div>
      <Footer />
    </>
  )
}
