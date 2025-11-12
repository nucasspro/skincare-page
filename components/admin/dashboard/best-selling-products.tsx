'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatVND } from '@/lib/utils/currency-utils'
import { Package } from 'lucide-react'
import Link from 'next/link'

interface BestSellingProduct {
  id: string
  name: string
  quantity: number
  revenue: number
}

interface BestSellingProductsProps {
  products: BestSellingProduct[]
}

export function BestSellingProducts({ products }: BestSellingProductsProps) {
  const getRankEmoji = (index: number) => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `#${index + 1}`
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Package className="h-5 w-5 text-neutral-700" />
          Sản phẩm bán chạy
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm text-neutral-500">Chưa có dữ liệu bán hàng</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {products.map((product, index) => (
              <Link
                key={product.id}
                href="/admin/products"
                className="block px-6 py-4 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-neutral-900">
                        {getRankEmoji(index)} {product.name}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                        {product.quantity} sản phẩm
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Doanh thu: <strong>{formatVND(product.revenue)}</strong>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
      {products.length > 0 && (
        <CardFooter className="pt-4">
          <Link
            href="/admin/products"
            className="w-full text-center text-sm text-neutral-600 hover:text-neutral-900 font-medium"
          >
            Xem tất cả sản phẩm →
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
