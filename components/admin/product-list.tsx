'use client'

import { Pagination } from '@/components/admin/pagination'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { usePagination } from '@/hooks/use-pagination'
import { CategoryService } from '@/lib/category-service'
import { Product } from '@/lib/product-service'
import { formatDate, formatVND } from '@/lib/utils'
import { Edit, Eye, Package, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface ProductItemProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onView: (product: Product) => void
}

export function ProductItem({ product, onEdit, onDelete, onView }: ProductItemProps) {
  const productData = product as Product & { createdAt?: number }

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    // Don't trigger if clicking on buttons or interactive elements
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('a')) {
      return
    }
    onView(product)
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, action: () => void) => {
    e.stopPropagation()
    action()
  }

  return (
    <tr
      className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer"
      onClick={handleRowClick}
    >
      {/* Actions */}
      <td className="p-2.5 w-28">
        <div className="flex gap-1 justify-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleButtonClick(e, () => onView(product))}
            className="rounded h-7 w-7 cursor-pointer hover:bg-neutral-100"
            title="Xem chi tiết"
          >
            <Eye className="h-3.5 w-3.5 text-neutral-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleButtonClick(e, () => onEdit(product))}
            className="rounded h-7 w-7 cursor-pointer hover:bg-neutral-100"
            title="Sửa"
          >
            <Edit className="h-3.5 w-3.5 text-neutral-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleButtonClick(e, () => onDelete(product.id))}
            className="rounded h-7 w-7 cursor-pointer hover:bg-red-50"
            title="Xóa"
          >
            <Trash2 className="h-3.5 w-3.5 text-red-600" />
          </Button>
        </div>
      </td>

      {/* ID */}
      <td className="p-2.5 w-32">
        <span className="text-neutral-400 text-xs font-mono">
          {product.id.substring(0, 8)}
        </span>
      </td>

      {/* Name */}
      <td className="p-2.5 min-w-[300px]">
        <h3 className="text-neutral-900 text-sm font-medium">
          {product.name}
        </h3>
      </td>

      {/* Category */}
      <td className="p-2.5 w-40">
        <span className="text-xs text-neutral-600">
          {CategoryService.getCategoryName(product.category)}
        </span>
      </td>

      {/* Price */}
      <td className="p-2.5 w-56">
        <div className="flex items-center gap-2 flex-wrap">
          {product.originalPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {formatVND(product.originalPrice)}
            </span>
          )}
          <span className="text-sm text-neutral-900 font-medium">
            {formatVND(product.price)}
          </span>
          {product.discount && (
            <span className="bg-neutral-900 text-white px-1.5 py-0.5 rounded text-xs">
              -{product.discount}%
            </span>
          )}
        </div>
      </td>

      {/* Created Date */}
      <td className="p-2.5 w-32">
        <span className="text-xs text-neutral-500">
          {formatDate(productData.createdAt)}
        </span>
      </td>
    </tr>
  )
}

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onView: (product: Product) => void
}

export function ProductList({ products, onEdit, onDelete, onView }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    setCurrentPage,
  } = usePagination({
    items: filteredProducts,
    itemsPerPage: 10,
    dependencies: [searchQuery],
  })

  if (products.length === 0) {
    return (
      <Card className="p-12 text-center border-neutral-200 bg-white">
        <Package className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
        <h3 className="text-sm font-medium text-neutral-900 mb-1">
          Chưa có sản phẩm
        </h3>
        <p className="text-xs text-neutral-500">
          Thêm sản phẩm mới để bắt đầu
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card className="p-3 border-neutral-200 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm border-neutral-300 focus:border-neutral-400 focus:ring-0"
          />
        </div>
        {searchQuery && (
          <p className="mt-2 text-xs text-neutral-500">
            {filteredProducts.length} kết quả
          </p>
        )}
      </Card>

      {/* Table */}
      <Card className="overflow-hidden border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500 w-28">
                  Actions
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500 w-32">
                  ID
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500 min-w-[300px]">
                  Tên sản phẩm
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500 w-40">
                  Danh mục
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500 w-56">
                  Giá
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500 w-32">
                  Ngày tạo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-100">
              {paginatedProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onView={onView}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProducts.length}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />

        {filteredProducts.length === 0 && searchQuery && (
          <div className="p-12 text-center text-neutral-400">
            <p className="text-sm">
              Không tìm thấy sản phẩm nào
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
