'use client'

import { Pagination } from '@/components/admin/pagination'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { usePagination } from '@/hooks/use-pagination'
import { CategoryService } from '@/lib/category-service'
import { Product } from '@/lib/product-service'
import { formatDate, formatVND } from '@/lib/utils'
import { Edit, Eye, Image as ImageIcon, LayoutGrid, MoreVertical, Package, Search, Table, Trash2 } from 'lucide-react'
import { useState } from 'react'

type ViewMode = 'table' | 'card'

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onView: (product: Product) => void
}

interface ProductTableItemProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onView: (product: Product) => void
  canDelete?: boolean
}

function ProductTableItem({ product, onEdit, onDelete, onView, canDelete = true }: ProductTableItemProps) {
  const productData = product as Product & { createdAt?: number }

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
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
      className="border-b border-[var(--admin-neutral-gray)]/30 hover:bg-[var(--admin-hover-bg)] transition-colors cursor-pointer"
      onClick={handleRowClick}
    >
      {/* Actions */}
      <td className="px-4 py-4 w-32">
        <div className="flex gap-2 justify-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleButtonClick(e, () => onView(product))}
            className="rounded-md h-9 w-9 cursor-pointer bg-[var(--admin-cool-gray)]/20 hover:bg-[var(--admin-cool-gray)]/40 border border-[var(--admin-cool-gray)]/30 hover:border-[var(--admin-cool-gray)]/50 transition-all shadow-sm hover:shadow-md"
            title="Xem chi tiết"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleButtonClick(e, () => onEdit(product))}
            className="rounded-md h-9 w-9 cursor-pointer bg-[var(--admin-beige)]/20 hover:bg-[var(--admin-beige)]/40 border border-[var(--admin-beige)]/30 hover:border-[var(--admin-beige)]/50 transition-all shadow-sm hover:shadow-md"
            title="Sửa"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleButtonClick(e, () => onDelete(product.id))}
            disabled={!canDelete}
            className="rounded-md h-9 w-9 cursor-pointer bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-50"
            title={canDelete ? 'Xóa' : 'Không có quyền xóa'}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </td>

      {/* ID */}
      <td className="px-4 py-4 w-36">
        <span className="text-neutral-400 text-sm font-mono">
          {String(product.id || '').substring(0, 8)}
        </span>
      </td>

      {/* Name */}
      <td className="px-4 py-4 min-w-[350px]">
        <h3 className="text-neutral-900 text-base font-medium">
          {product.name}
        </h3>
      </td>

      {/* Category */}
      <td className="px-4 py-4 w-48">
        <span className="text-sm text-neutral-600">
          {CategoryService.getCategoryName(product.category)}
        </span>
      </td>

      {/* Price */}
      <td className="px-4 py-4 w-64">
        <div className="flex items-center gap-3 flex-wrap">
          {product.originalPrice && (
            <span className="text-sm text-neutral-400 line-through">
              {formatVND(product.originalPrice)}
            </span>
          )}
          <span className="text-base text-neutral-900 font-semibold">
            {formatVND(product.price)}
          </span>
          {product.discount && (
            <span className="bg-[var(--admin-taupe)] text-neutral-700 px-2 py-1 rounded-md text-xs font-semibold">
              -{product.discount}%
            </span>
          )}
        </div>
      </td>

      {/* Created Date */}
      <td className="px-4 py-4 w-40">
        <span className="text-sm text-neutral-500">
          {formatDate(productData.createdAt)}
        </span>
      </td>
    </tr>
  )
}

function ProductCard({ product, onEdit, onDelete, onView }: ProductCardProps) {
  const productData = product as Product & { createdAt?: number }
  const [showActions, setShowActions] = useState(false)

  return (
    <Card className="group relative overflow-hidden border border-[var(--admin-neutral-gray)]/50 bg-white hover:shadow-md transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--admin-cool-gray)]/20">
        {product.image ? (
          <>
            <div className="absolute inset-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-[var(--admin-cool-gray)]" />
          </div>
        )}

        {/* Actions Menu - Top Right */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setShowActions(!showActions)
              }}
              className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <MoreVertical className="h-4 w-4 text-neutral-700" />
            </Button>

            {/* Actions Dropdown */}
            {showActions && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowActions(false)}
                />
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-[var(--admin-neutral-gray)]/50 z-20 overflow-hidden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowActions(false)
                      onView(product)
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-[var(--admin-hover-bg)] transition-colors flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Xem chi tiết
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowActions(false)
                      onEdit(product)
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-[var(--admin-hover-bg)] transition-colors flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowActions(false)
                      if (canDelete) {
                        onDelete(product.id)
                      }
                    }}
                    disabled={!canDelete}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 border-t border-[var(--admin-neutral-gray)]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    title={canDelete ? 'Xóa' : 'Không có quyền xóa'}
                  >
                    <Trash2 className="h-4 w-4" />
                    Xóa
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-700 shadow-sm">
            {CategoryService.getCategoryName(product.category)}
          </span>
        </div>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 bg-[var(--admin-taupe)] text-neutral-900 rounded-full text-xs font-semibold shadow-sm">
              -{product.discount}%
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Product Name & Tagline */}
        <div>
          <h3 className="text-base font-semibold text-neutral-900 line-clamp-1 group-hover:text-neutral-950 transition-colors">
            {product.name}
          </h3>
          {product.tagline && (
            <p className="text-sm text-neutral-500 mt-1 line-clamp-1">
              {product.tagline}
            </p>
          )}
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 flex-wrap">
          {product.originalPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {formatVND(product.originalPrice)}
            </span>
          )}
          <span className="text-lg font-bold text-neutral-900">
            {formatVND(product.price)}
          </span>
        </div>

        {/* Footer Info */}
        <div className="pt-3 border-t border-[var(--admin-neutral-gray)]/30 flex items-center justify-between text-xs text-neutral-500">
          <span className="font-mono">{String(product.id || '').substring(0, 8)}</span>
          <span>{formatDate(productData.createdAt)}</span>
        </div>
      </div>
    </Card>
  )
}

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onView: (product: Product) => void
  canDelete?: boolean
}

export function ProductList({ products, onEdit, onDelete, onView, canDelete = true }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('table')

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)))

  // Pagination - different items per page for table vs card
  const itemsPerPage = viewMode === 'table' ? 10 : 12

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    setCurrentPage,
  } = usePagination({
    items: filteredProducts,
    itemsPerPage,
    dependencies: [searchQuery, selectedCategory, viewMode],
  })

  if (products.length === 0) {
    return (
      <Card className="p-16 text-center border border-[var(--admin-neutral-gray)]/50 bg-white">
        <div className="p-6 w-fit mx-auto mb-6 rounded-2xl bg-[var(--admin-cool-gray)]/20">
          <Package className="h-16 w-16 text-[var(--admin-cool-gray)] mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          Chưa có sản phẩm
        </h3>
        <p className="text-sm text-neutral-500 max-w-sm mx-auto">
          Bắt đầu bằng cách thêm sản phẩm đầu tiên vào danh sách
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <Card className="p-4 border border-[var(--admin-neutral-gray)]/50 bg-white">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--admin-cool-gray)]" />
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm, tagline, danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 text-sm border-[var(--admin-neutral-gray)]/50 focus:border-[var(--admin-taupe)] focus:ring-0 bg-white"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 px-3 text-sm border border-[var(--admin-neutral-gray)]/50 rounded-md focus:border-[var(--admin-taupe)] focus:ring-0 bg-white text-neutral-700"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {CategoryService.getCategoryName(cat)}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 border border-[var(--admin-neutral-gray)]/50 rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('table')}
              className={`h-10 px-3 rounded-none border-0 ${
                viewMode === 'table'
                  ? 'bg-[var(--admin-cool-gray)]/30 text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-[var(--admin-hover-bg)]'
              } transition-colors`}
              title="Xem dạng bảng"
            >
              <Table className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-[var(--admin-neutral-gray)]/50" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('card')}
              className={`h-10 px-3 rounded-none border-0 ${
                viewMode === 'card'
                  ? 'bg-[var(--admin-beige)]/30 text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-[var(--admin-hover-bg)]'
              } transition-colors`}
              title="Xem dạng thẻ"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="mt-3 pt-3 border-t border-[var(--admin-neutral-gray)]/30 flex items-center justify-between">
            <p className="text-sm text-neutral-600">
              <span className="font-medium text-neutral-900">{filteredProducts.length}</span> sản phẩm
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="text-xs text-[var(--admin-taupe)] hover:text-neutral-900 transition-colors"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        )}
      </Card>

      {/* Products Content */}
      {filteredProducts.length === 0 ? (
        <Card className="p-16 text-center border border-[var(--admin-neutral-gray)]/50 bg-white">
          <div className="p-6 w-fit mx-auto mb-6 rounded-2xl bg-[var(--admin-lavender)]/20">
            <Search className="h-16 w-16 text-[var(--admin-lavender)] mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Không tìm thấy sản phẩm
          </h3>
          <p className="text-sm text-neutral-500">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </p>
        </Card>
      ) : viewMode === 'table' ? (
        <>
          {/* Table View */}
          <Card className="overflow-hidden border border-[var(--admin-neutral-gray)]/50 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--admin-cool-gray)]/30 border-b-2 border-[var(--admin-neutral-gray)]/50">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-32">
                      Actions
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-36">
                      ID
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 min-w-[350px]">
                      Tên sản phẩm
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-48">
                      Danh mục
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-64">
                      Giá
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-40">
                      Ngày tạo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[var(--admin-neutral-gray)]/30">
                  {paginatedProducts.map((product) => (
                    <ProductTableItem
                      key={product.id}
                      product={product}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onView={onView}
                      canDelete={canDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-4 px-4 pb-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredProducts.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </Card>
        </>
      ) : (
        <>
          {/* Card View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
                canDelete={canDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredProducts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
