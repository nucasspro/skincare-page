import { Button } from "@/components/ui/button"
import { getRelatedProducts } from "@/lib/product-service"
import Image from "next/image"
import Link from "next/link"

interface SimilarProductsProps {
  productId: string
}

export function SimilarProducts({ productId }: SimilarProductsProps) {
  // Get related products from service
  const similarProducts = getRelatedProducts(productId, 4)

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-light text-gray-900">You May Also Like</h2>
        <p className="text-stone-600">Complete your skincare routine</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <div className="space-y-4">
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
                <p className="text-sm text-stone-600 truncate" title={product.tagline}>{product.tagline}</p>
                <p className="text-lg font-medium text-gray-900">${product.price}.00</p>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-full group-hover:bg-gray-900 group-hover:text-white transition-colors bg-transparent"
              >
                Quick Add
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
