"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, ShoppingCart, X } from "lucide-react"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useI18n } from "@/lib/i18n-context"

interface Product {
  id: string
  name: string
  tagline: string
  price: number
  category: string
  needs: string[]
  image: string
  hoverImage: string
}

export default function ProductsPage() {
  const { t } = useI18n()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const productsPerPage = 6

  // Product data
  const allProducts: Product[] = [
    {
      id: "1",
      name: "Hydrating Essence",
      tagline: t.bestSellers.products.essence.tagline,
      price: 68,
      category: "serums",
      needs: ["hydration", "sensitive"],
      image: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
      hoverImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
    },
    {
      id: "2",
      name: "Vitamin C Serum",
      tagline: t.bestSellers.products.serum.tagline,
      price: 89,
      category: "serums",
      needs: ["brightening", "antiAging"],
      image: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
      hoverImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
    },
    {
      id: "3",
      name: "Ceramide Cream",
      tagline: t.bestSellers.products.cream.tagline,
      price: 75,
      category: "moisturizers",
      needs: ["hydration", "sensitive"],
      image: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
      hoverImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
    },
    {
      id: "4",
      name: "Gentle Cleanser",
      tagline: t.bestSellers.products.cleanser.tagline,
      price: 42,
      category: "cleansers",
      needs: ["sensitive", "hydration"],
      image: "/luxury-facial-cleanser-bottle-minimal-white-backgr.jpg",
      hoverImage: "/luxury-facial-cleanser-bottle-product-shot-cream-b.jpg",
    },
    {
      id: "5",
      name: "Eye Renewal Cream",
      tagline: t.bestSellers.products.eyeCream.tagline,
      price: 95,
      category: "eyeCare",
      needs: ["antiAging", "brightening"],
      image: "/luxury-eye-cream-jar-minimal-white-background.jpg",
      hoverImage: "/luxury-eye-cream-jar-product-shot-cream-background.jpg",
    },
    {
      id: "6",
      name: "Radiance Renewal Serum",
      tagline: t.product3d.subtitle,
      price: 125,
      category: "serums",
      needs: ["brightening", "antiAging", "hydration"],
      image: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
      hoverImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
    },
  ]

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory
    const needMatch = selectedNeeds.length === 0 || selectedNeeds.some((need) => product.needs.includes(need))
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
    return categoryMatch && needMatch && priceMatch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "priceLowHigh":
        return a.price - b.price
      case "priceHighLow":
        return b.price - a.price
      case "newest":
        return Number(b.id) - Number(a.id)
      default:
        return 0
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage)

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) => (prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]))
  }

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedNeeds([])
    setPriceRange([0, 200])
  }

  const hasActiveFilters = selectedCategory !== "all" || selectedNeeds.length > 0 || priceRange[1] < 200

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
                  {sortedProducts.length} {t.productListing.productsCount}
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
                        <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-stone-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{product.tagline}</p>
                        <p className="text-lg font-medium text-gray-900 mb-4">${product.price}</p>
                      </Link>

                      <button
                        onClick={() => console.log("Added to cart:", product.name)}
                        className="w-full py-2.5 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {t.productListing.addToCart}
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
