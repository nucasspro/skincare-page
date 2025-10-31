import { formatCurrency } from "@/lib/currency-util"
import Image from "next/image"
import Link from "next/link"

const recentProducts = [
  {
    id: 1,
    name: "Retinol Night Serum",
    price: 68,
    image: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    tags: ["Anti-aging", "Night Care"],
  },
  {
    id: 2,
    name: "Hydrating Toner",
    price: 38,
    image: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    tags: ["Hydration", "Toner"],
  },
  {
    id: 3,
    name: "SPF 50 Sunscreen",
    price: 42,
    image: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    tags: ["Sun Protection", "Daily Care"],
  },
  {
    id: 4,
    name: "Eye Cream",
    price: 55,
    image: "/luxury-facial-cleanser-bottle-minimal-white-backgr.jpg",
    tags: ["Eye Care", "Anti-aging"],
  },
]

export function RecentlyViewed() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-light text-gray-900 text-center">Recently Viewed</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <div className="space-y-3">
              <div className="relative aspect-square bg-stone-50 rounded-xl overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <h3
                  className="font-medium text-gray-900 group-hover:text-stone-600 transition-colors truncate"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-xs text-stone-600 bg-stone-100 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-lg font-medium text-gray-900">{formatCurrency(product.price)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Products with Same Tags */}
      <div className="pt-12 border-t border-stone-200">
        <h3 className="text-2xl font-light text-gray-900 text-center mb-8">More Hydration Products</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProducts.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="space-y-3">
                <div className="relative aspect-square bg-stone-50 rounded-xl overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h3
                    className="font-medium text-gray-900 group-hover:text-stone-600 transition-colors truncate"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <p className="text-lg font-medium text-gray-900">{formatCurrency(product.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
