"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

interface Product {
  id: string
  name: string
  tagline: string
  price: number
  image: string
  hoverImage: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Hydrating Essence",
    tagline: "Deep moisture for radiant skin",
    price: 68,
    image: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    hoverImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
  },
  {
    id: "2",
    name: "Vitamin C Serum",
    tagline: "Brightening & anti-aging",
    price: 89,
    image: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    hoverImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
  },
  {
    id: "3",
    name: "Ceramide Cream",
    tagline: "Barrier repair & protection",
    price: 75,
    image: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    hoverImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
  },
  {
    id: "4",
    name: "Gentle Cleanser",
    tagline: "pH-balanced daily cleanse",
    price: 42,
    image: "/luxury-facial-cleanser-bottle-minimal-white-backgr.jpg",
    hoverImage: "/luxury-facial-cleanser-bottle-product-shot-cream-b.jpg",
  },
]

export function BestSellers() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">Best Sellers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most-loved products, trusted by thousands for visible results
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link href={`/product/${product.id}`} className="block">
                {/* Product Image */}
                <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-stone-50">
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

                  {/* Add to Cart Button - Shows on Hover */}
                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        console.log("Added to cart:", product.name)
                      }}
                      className="w-full py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-stone-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">{product.tagline}</p>
                  <p className="text-lg font-medium text-gray-900">${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
