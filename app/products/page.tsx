"use client"

import { FAQSection, type FAQItem } from "@/components/feature/faq-section"
import { FeaturedArticle } from "@/components/content/featured-article"
import { Footer } from "@/components/layout/footer"
import { NatureBannerSlider } from "@/components/hero/nature-banner-slider"
import Navigation from "@/components/navigation/navigation"
import { NavigationFilterBar } from "@/components/navigation/navigation-filter-bar"
import PromoSlider from "@/components/hero/promo-slider"
import { useCategoriesAsObject } from "@/hooks/use-categories"
import { useProducts } from "@/hooks/use-products"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/utils/currency-utils"
import { useI18n } from "@/lib/i18n-context"
import { ProductService, type Product } from "@/lib/product-service"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

export default function ProductsPage() {
  const { t } = useI18n()
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const productsPerPage = 12

  // Get categories from admin service
  const { categories, loading: categoriesLoading } = useCategoriesAsObject()

  // Get products from database
  const { products: dbProducts, loading: productsLoading } = useProducts()

  // Get all products (from database)
  const filteredAndSortedProducts = useMemo(() => {
    // Use database products if available
    if (dbProducts.length === 0) return []

    let filtered = dbProducts

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      const categoryFilter = ProductService.CATEGORY_FILTER_MAP[selectedCategory]

      if (categoryFilter) {
        // Use mapped filter logic for known category slugs
        filtered = filtered.filter(categoryFilter)
      } else {
        // Standard category filter for other categories
        filtered = filtered.filter((p) => p.category === selectedCategory)
      }
    }

    // Filter by needs (empty array, so no filtering)
    // Filter by price range (0 to 1000000, so no filtering)

    return filtered
  }, [selectedCategory, dbProducts])

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
        <div className="w-full py-12">
          {/* Category Title */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
              {categoriesLoading
                ? "Đang tải..."
                : selectedCategory === "all"
                ? "Tất cả sản phẩm"
                : (categories[selectedCategory] || "Tất cả sản phẩm")}
            </h1>
          </div>

          {!categoriesLoading && (
            <NavigationFilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          )}

          {/* Products List - Mobile: 1 per row, Desktop: 4 per row with square images */}
          <div className="space-y-0">
            {/* Mobile: 1 product per row */}
            <div className="md:hidden">
              {paginatedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="block"
                  >
                    {/* Spacing với nền xám trên mobile */}
                    {index > 0 && (
                      <div className="h-[10px] bg-gray-200"></div>
                    )}
                    {/* Product Image - Full width, tràn lề màn hình - Ảnh dọc */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-stone-50">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-opacity duration-500"
                        style={{ opacity: hoveredId === product.id ? 0 : 1 }}
                      />
                      <Image
                        src={product.hoverImage || "/placeholder.svg"}
                        alt={`${product.name} alternate view`}
                        fill
                        className="object-cover transition-opacity duration-500"
                        style={{ opacity: hoveredId === product.id ? 1 : 0 }}
                      />

                      {/* Add to Cart Button - Shows on Hover - Inside Image Container */}
                      <div className="absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        <div className="pointer-events-auto max-w-xs">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleAddToCart(product)
                            }}
                            className="w-full py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {t.productListing.addToCart}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Info - Padding như Facebook */}
                    <div className="space-y-2 px-4 sm:px-6 py-4 sm:py-5">
                      <h3
                        className="text-xl sm:text-2xl font-medium text-gray-900 group-hover:text-stone-600 transition-colors"
                        title={product.name}
                      >
                        {product.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed" title={product.tagline}>
                        {product.tagline}
                      </p>
                      {/* Price display */}
                      <div className="mt-2">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg font-medium text-gray-900">
                              {formatCurrency(product.price)}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-sm sm:text-base text-gray-500 line-through">
                                {formatCurrency(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          {product.discount && product.discount > 0 && (
                            <span className="text-xs sm:text-sm font-bold text-white bg-red-500 px-2 py-0.5 rounded-md inline-flex items-center justify-center leading-none">
                              -{product.discount}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Desktop: 4 products per row, square images - Container with max-width */}
            <div className="hidden md:block">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="block"
                  >
                    {/* Product Image - Square on desktop */}
                    <div className="relative w-full aspect-square overflow-hidden bg-stone-50">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-opacity duration-500"
                        style={{ opacity: hoveredId === product.id ? 0 : 1 }}
                      />
                      <Image
                        src={product.hoverImage || "/placeholder.svg"}
                        alt={`${product.name} alternate view`}
                        fill
                        className="object-cover transition-opacity duration-500"
                        style={{ opacity: hoveredId === product.id ? 1 : 0 }}
                      />

                      {/* Add to Cart Button - Shows on Hover - Inside Image Container */}
                      <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        <div className="pointer-events-auto">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleAddToCart(product)
                            }}
                            className="w-full py-2.5 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer text-sm"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {t.productListing.addToCart}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1.5 mt-4">
                      <h3
                        className="text-base lg:text-lg font-medium text-gray-900 group-hover:text-stone-600 transition-colors line-clamp-2"
                        title={product.name}
                      >
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2" title={product.tagline}>
                        {product.tagline}
                      </p>
                      {/* Price display */}
                      <div className="mt-2">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm lg:text-base font-medium text-gray-900">
                              {formatCurrency(product.price)}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-xs lg:text-sm text-gray-500 line-through">
                                {formatCurrency(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          {product.discount && product.discount > 0 && (
                            <span className="text-[10px] lg:text-xs font-bold text-white bg-red-500 px-1.5 lg:px-2 py-0.5 rounded-md inline-flex items-center justify-center leading-none">
                              -{product.discount}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                ))}
                </div>
              </div>
            </div>
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
