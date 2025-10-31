"use client"

import { useCart } from "@/lib/cart-context"
import { useI18n } from "@/lib/i18n-context"
import { searchProducts, type Product } from "@/lib/product-service"
import { formatCurrency } from "@/lib/currency-util"
import { Search, ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

export function SearchModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const { t } = useI18n()
    const { addItem, items, isHydrated } = useCart()

    // Search products in real-time
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return []
        return searchProducts(searchQuery)
    }, [searchQuery])

    // Close modal when pressing Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false)
                setSearchQuery("") // Reset search when closing
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            // Focus on input when modal opens
            setTimeout(() => {
                const input = document.getElementById("search-input")
                if (input) {
                    input.focus()
                }
            }, 100)
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen])

    // Reset search when modal closes
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery("")
        }
    }, [isOpen])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            // Navigate to products page with search query
            window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`
            setIsOpen(false)
        }
    }

    const handleProductClick = (productId: string) => {
        setIsOpen(false)
        setSearchQuery("")
    }

    const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
        e.preventDefault()
        e.stopPropagation()
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            tagline: product.tagline,
        }, 1)
    }

    return (
        <>
            {/* Search Button */}
            <button
                onClick={() => setIsOpen(true)}
                data-slot="button"
                className="h-9 w-9 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tìm kiếm"
            >
                <Search className="h-5 w-5" />
            </button>

            {/* Search Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsOpen(false)
                        }
                    }}
                >
                    <div className="w-full max-w-2xl mx-4">
                        {/* Search Container */}
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-xl font-semibold text-gray-900">Tìm kiếm sản phẩm</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="Đóng"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Search Form */}
                            <form onSubmit={handleSearch} className="p-6">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        id="search-input"
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Nhập tên sản phẩm, thương hiệu hoặc từ khóa..."
                                        className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Search Results - Real-time */}
                                {searchResults.length > 0 && (
                                    <div className="mt-4 max-h-96 overflow-y-auto border border-gray-200 rounded-xl">
                                        <div className="p-4 space-y-2">
                                            <p className="text-sm font-medium text-gray-600 mb-3">
                                                Tìm thấy {searchResults.length} sản phẩm:
                                            </p>
                                            {searchResults.map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/product/${product.slug}`}
                                                    onClick={() => handleProductClick(product.id)}
                                                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                                                >
                                                    <div className="relative w-16 h-16 flex-shrink-0 bg-stone-50 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={product.image || "/placeholder.svg"}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-medium text-gray-900 group-hover:text-stone-600 truncate">
                                                            {product.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 truncate">{product.tagline}</p>
                                                        <p className="text-sm font-medium text-gray-900 mt-1">{formatCurrency(product.price)}</p>
                                                    </div>
                                                    {!isHydrated ? (
                                                        <div className="p-2 rounded-lg flex-shrink-0 flex items-center justify-center">
                                                            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                                                        </div>
                                                    ) : items.some(item => item.id === product.id) ? (
                                                        <Link
                                                            href="/cart"
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                e.stopPropagation()
                                                                setIsOpen(false)
                                                            }}
                                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                                                            aria-label="Mua hàng"
                                                            title="Mua hàng"
                                                        >
                                                            <ShoppingCart className="h-5 w-5 text-green-600" />
                                                        </Link>
                                                    ) : (
                                                        <button
                                                            onClick={(e) => handleQuickAdd(e, product)}
                                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                                                            aria-label="Thêm vào giỏ"
                                                        >
                                                            <ShoppingCart className="h-5 w-5 text-gray-600" />
                                                        </button>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* No Results */}
                                {searchQuery.trim() && searchResults.length === 0 && (
                                    <div className="mt-4 text-center py-8">
                                        <p className="text-gray-600">Không tìm thấy sản phẩm nào cho "{searchQuery}"</p>
                                    </div>
                                )}

                                {/* Search Suggestions - Only show when no query */}
                                {!searchQuery.trim() && (
                                    <div className="mt-6 space-y-2">
                                        <p className="text-sm font-medium text-gray-600 mb-3">Tìm kiếm phổ biến:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "Serum Vitamin C",
                                                "Kem dưỡng ẩm",
                                                "Sữa rửa mặt",
                                                "Toner",
                                                "Mặt nạ",
                                                "Kem chống nắng"
                                            ].map((suggestion) => (
                                                <button
                                                    key={suggestion}
                                                    onClick={() => setSearchQuery(suggestion)}
                                                    className="px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Search Button */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={!searchQuery.trim()}
                                        className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Tìm kiếm
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>

                            {/* Recent Searches */}
                            {/* <div className="px-6 pb-6">
                                <p className="text-sm font-medium text-gray-600 mb-3">Tìm kiếm gần đây:</p>
                                <div className="space-y-2">
                                    {["Serum chống lão hóa", "Kem dưỡng ban đêm", "Mặt nạ đất sét"].map((recent) => (
                                        <button
                                            key={recent}
                                            onClick={() => setSearchQuery(recent)}
                                            className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                                        >
                                            <Search className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-700">{recent}</span>
                                        </button>
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
