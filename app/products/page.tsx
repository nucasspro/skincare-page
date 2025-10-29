"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, ShoppingCart, X, Check } from "lucide-react"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useI18n } from "@/lib/i18n-context"
import { useCart } from "@/lib/cart-context"
import { ProductService, type Product } from "@/lib/product-service"

export default function ProductsPage() {
  const { t } = useI18n()
  const { addItem } = useCart()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const productsPerPage = 6

  // Get products from service and apply filters
  const filteredAndSortedProducts = useMemo(() => {
    // Filter products
    const filtered = ProductService.filterProducts({
      category: selectedCategory,
      needs: selectedNeeds,
      priceRange: [priceRange[0], priceRange[1]],
    })

    // Sort products
    return ProductService.sortProducts(filtered, sortBy)
  }, [selectedCategory, selectedNeeds, priceRange, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage)

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) => (prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]))
  }

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedNeeds([])
    setPriceRange([0, 200])
  }

  const hasActiveFilters = selectedCategory !== "all" || selectedNeeds.length > 0 || priceRange[1] < 200

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

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-stone-50 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-4">
              {t.productListing.title}
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-stone-200"
              >
                <Filter className="w-4 h-4" />
                {t.productListing.filters.title}
                {hasActiveFilters && (
                  <span className="ml-1 px-2 py-0.5 bg-stone-900 text-white text-xs rounded-full">
                    {selectedNeeds.length + (selectedCategory !== "all" ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Filter Sidebar */}
            <aside
              className={`${
                showFilters ? "block" : "hidden"
              } lg:block w-full lg:w-64 flex-shrink-0 bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-32`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">{t.productListing.filters.title}</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-stone-600 hover:text-stone-900 flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    {t.productListing.filters.clear}
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">{t.productListing.filters.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(t.productListing.filters.categories).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === key
                          ? "bg-stone-900 text-white shadow-sm"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Needs Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">{t.productListing.filters.needs}</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(t.productListing.filters.skinNeeds)
                    .filter(([key]) => key !== "all")
                    .map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => toggleNeed(key)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedNeeds.includes(key)
                            ? "bg-stone-900 text-white shadow-sm"
                            : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">{t.productListing.filters.priceRange}</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-stone-900"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Sort and Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">
                  {filteredAndSortedProducts.length} {t.productListing.productsCount}
                </p>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">{t.productListing.sort.label}</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
                  >
                    <option value="featured">{t.productListing.sort.featured}</option>
                    <option value="priceLowHigh">{t.productListing.sort.priceLowHigh}</option>
                    <option value="priceHighLow">{t.productListing.sort.priceHighLow}</option>
                    <option value="newest">{t.productListing.sort.newest}</option>
                    <option value="bestSelling">{t.productListing.sort.bestSelling}</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-600">{t.productListing.filters.active}:</span>
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-900 text-white text-sm rounded-full">
                      {
                        t.productListing.filters.categories[
                          selectedCategory as keyof typeof t.productListing.filters.categories
                        ]
                      }
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="hover:bg-stone-800 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedNeeds.map((need) => (
                    <span
                      key={need}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-stone-900 text-white text-sm rounded-full"
                    >
                      {t.productListing.filters.skinNeeds[need as keyof typeof t.productListing.filters.skinNeeds]}
                      <button onClick={() => toggleNeed(need)} className="hover:bg-stone-800 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
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
                      </div>
                    </Link>

                    <div className="p-4">
                      <Link href={`/product/${product.id}`}>
                        <h3
                          className="text-lg font-medium text-gray-900 mb-1 group-hover:text-stone-600 transition-colors truncate"
                          title={product.name}
                        >
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 truncate" title={product.tagline}>{product.tagline}</p>
                        <p className="text-lg font-medium text-gray-900 mb-4">${product.price}</p>
                      </Link>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-2.5 rounded-full font-medium transition-colors flex items-center justify-center gap-2 ${
                          addedItems.has(product.id)
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-stone-900 hover:bg-stone-800 text-white"
                        }`}
                      >
                        {addedItems.has(product.id) ? (
                          <>
                            <Check className="w-4 h-4" />
                            Đã thêm vào giỏ
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            {t.productListing.addToCart}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50"
                  >
                    {t.productListing.pagination.previous}
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg text-sm ${
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
                    className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50"
                  >
                    {t.productListing.pagination.next}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
