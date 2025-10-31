'use client'

import { Product } from '@/lib/product-service'
import { CategoryService } from '@/lib/category-service'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Edit, Trash2, Tag, DollarSign, Image as ImageIcon, Package, Search } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

interface ProductItemProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export function ProductItem({ product, onEdit, onDelete }: ProductItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price * 1000)
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Image */}
      <td className="p-5">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </td>

      {/* Name & Tagline */}
      <td className="p-5">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-1.5">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.tagline}
          </p>
        </div>
      </td>

      {/* Category */}
      <td className="p-5">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700">
            {CategoryService.getCategoryName(product.category)}
          </span>
        </div>
      </td>

      {/* Price */}
      <td className="p-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900">
            <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
            {formatPrice(product.price)}
          </div>
          {product.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              {product.discount && (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">
                  -{product.discount}%
                </span>
              )}
            </div>
          )}
        </div>
      </td>

      {/* Needs */}
      <td className="p-5">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700">
            {product.needs?.length || 0}
          </span>
        </div>
      </td>

      {/* Info */}
      <td className="p-5">
        <div className="flex flex-col gap-1.5 text-sm text-gray-600 max-w-xs">
          {product.benefits && product.benefits.length > 0 && (
            <span className="font-medium">
              {product.benefits.length} lợi ích
            </span>
          )}
          {product.ingredients && product.ingredients.length > 0 && (
            <span className="font-medium">
              {product.ingredients.length} thành phần
            </span>
          )}
          {product.description && (
            <span className="line-clamp-2 text-gray-500">
              {product.description.replace(/<[^>]*>/g, '').substring(0, 80)}...
            </span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="p-5">
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(product)}
            className="gap-2 rounded-sm"
          >
            <Edit className="h-4 w-4" />
            Sửa
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(product.id)}
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Xóa
          </Button>
        </div>
      </td>
    </tr>
  )
}

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (products.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Chưa có sản phẩm
        </h3>
        <p className="text-gray-600">
          Bắt đầu bằng cách thêm sản phẩm mới vào hệ thống
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm sản phẩm theo tên, tagline hoặc danh mục..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-600">
            Tìm thấy <span className="font-semibold">{filteredProducts.length}</span> sản phẩm
          </p>
        )}
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Nhu cầu
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Thông tin
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && searchQuery && (
          <div className="p-12 text-center text-gray-600">
            <p className="text-base">
              Không tìm thấy sản phẩm nào phù hợp với "{searchQuery}"
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
