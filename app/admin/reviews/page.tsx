'use client'

import { ActionButtons } from '@/components/admin/action-buttons'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Pagination } from '@/components/admin/pagination'
import { ReviewForm, type ReviewFormData } from '@/components/admin/review-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { usePagination } from '@/hooks/use-pagination'
import { adminReviewService, type Review } from '@/lib/services/admin/review-service'
import { formatDate } from '@/lib/utils'
import { MessageSquare, Plus, RefreshCw, Search, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [viewingReview, setViewingReview] = useState<Review | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isViewMode, setIsViewMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchReviews = async (showToast = false) => {
    try {
      setLoading(true)
      const data = await adminReviewService.getAllReviews()
      setReviews(data)
      if (showToast) {
        toast.success('Đã làm mới dữ liệu')
      }
    } catch (error) {
      toast.error('Không thể tải danh sách reviews')
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    fetchReviews()
    fetchProducts()
  }, [])

  const handleSubmit = async (data: ReviewFormData) => {
    try {
      if (editingReview) {
        await adminReviewService.updateReview(editingReview.id, data)
        toast.success('Cập nhật review thành công')
      } else {
        await adminReviewService.createReview(data)
        toast.success('Tạo review thành công')
      }
      resetForm()
      fetchReviews()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể lưu review')
    }
  }

  const handleEdit = (review: Review) => {
    setEditingReview(review)
    setViewingReview(null)
    setIsViewMode(false)
    setShowForm(true)
  }

  const handleView = (review: Review) => {
    setViewingReview(review)
    setEditingReview(null)
    setIsViewMode(true)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa review này?')) return

    try {
      await adminReviewService.deleteReview(id)
      toast.success('Xóa review thành công')
      fetchReviews()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể xóa review')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingReview(null)
    setViewingReview(null)
    setIsViewMode(false)
  }

  const filteredReviews = reviews.filter(review =>
    review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.review.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedReviews,
    setCurrentPage,
  } = usePagination({
    items: filteredReviews,
    itemsPerPage: 10,
    dependencies: [searchQuery],
  })

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-sm text-neutral-500">Đang tải...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Reviews</h1>
            <p className="mt-1 text-sm text-neutral-500">
              {reviews.length} reviews
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => fetchReviews(true)}
              size="sm"
              variant="outline"
              disabled={loading}
              className="rounded cursor-pointer h-9 px-4 border-[var(--admin-neutral-gray)]/50 hover:bg-[var(--admin-hover-bg)] disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Làm mới
            </Button>
            <Button
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              size="sm"
              className="bg-[var(--admin-beige)] hover:bg-[var(--admin-beige)]/80 text-neutral-900 rounded cursor-pointer h-9 px-4 transition-colors font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm mới
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="p-4 border border-[var(--admin-neutral-gray)]/50 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--admin-cool-gray)]" />
            <Input
              type="text"
              placeholder="Tìm kiếm review..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 text-sm border-[var(--admin-neutral-gray)]/50 focus:border-[var(--admin-taupe)] focus:ring-0 bg-white"
            />
          </div>
          {searchQuery && (
            <div className="mt-3 pt-3 border-t border-[var(--admin-neutral-gray)]/30">
              <p className="text-sm text-neutral-600">
                <span className="font-medium text-neutral-900">{filteredReviews.length}</span> kết quả
              </p>
            </div>
          )}
        </Card>

        {/* Reviews Table */}
        <Card className="overflow-hidden border border-[var(--admin-neutral-gray)]/50 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--admin-cool-gray)]/30 border-b-2 border-[var(--admin-neutral-gray)]/50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-32">
                    Actions
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 min-w-[180px]">
                    Reviewer
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-32">
                    Rating
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 min-w-[350px]">
                    Review
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 min-w-[200px]">
                    Product
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-40">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[var(--admin-neutral-gray)]/30">
                {paginatedReviews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <div className="p-6 w-fit mx-auto mb-4 rounded-2xl bg-[var(--admin-lavender)]/20">
                        <MessageSquare className="h-12 w-12 text-[var(--admin-lavender)] mx-auto" />
                      </div>
                      <h3 className="text-base font-semibold text-neutral-900 mb-2">
                        {searchQuery ? 'Không tìm thấy review nào' : 'Chưa có review'}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Thêm review mới để bắt đầu'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedReviews.map((review) => {
                    const product = products.find(p => p.id === review.productId)
                    return (
                      <tr
                        key={review.id}
                        className="border-b border-[var(--admin-neutral-gray)]/30 hover:bg-[var(--admin-hover-bg)] transition-colors cursor-pointer"
                        onClick={() => handleView(review)}
                      >
                        <td className="px-4 py-4 w-32">
                          <ActionButtons
                            onView={() => handleView(review)}
                            onEdit={() => handleEdit(review)}
                            onDelete={() => handleDelete(review.id)}
                          />
                        </td>
                        <td className="px-4 py-4 min-w-[180px]">
                          <span className="text-base font-medium text-neutral-900">
                            {review.reviewerName}
                          </span>
                        </td>
                        <td className="px-4 py-4 w-32">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const starNumber = i + 1
                              const isFullyFilled = starNumber <= review.rating
                              const isHalfFilled = starNumber - 0.5 === review.rating ||
                                                  (starNumber - 1 < review.rating && starNumber > review.rating)

                              return isHalfFilled ? (
                                <div key={i} className="relative h-4 w-4">
                                  <Star className="h-4 w-4 fill-neutral-200 text-neutral-300 absolute inset-0" />
                                  <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  </div>
                                </div>
                              ) : (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    isFullyFilled
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'fill-neutral-200 text-neutral-300'
                                  }`}
                                />
                              )
                            })}
                          </div>
                        </td>
                        <td className="px-4 py-4 min-w-[350px]">
                          <p className="text-sm text-neutral-600 line-clamp-2">
                            {review.review}
                          </p>
                        </td>
                        <td className="px-4 py-4 min-w-[200px]">
                          <span className="text-sm text-neutral-700">
                            {product?.name || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-4 py-4 w-40">
                          <span className="text-sm text-neutral-500">
                            {formatDate(review.createdAt)}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pt-4 px-4 pb-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredReviews.length}
                itemsPerPage={10}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </Card>

        {/* Dialog for Form */}
        <Dialog open={showForm} onOpenChange={(open) => !open && resetForm()}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader className="border-b border-[var(--admin-neutral-gray)]/50 pb-4 bg-[var(--admin-lavender)]/20 px-6 -mx-6 -mt-6 mb-4 py-4">
              <DialogTitle className="text-lg font-semibold text-neutral-900">
                {isViewMode ? 'Chi tiết Review' : editingReview ? 'Chỉnh sửa Review' : 'Thêm Review mới'}
              </DialogTitle>
            </DialogHeader>

            <ReviewForm
              review={viewingReview || editingReview}
              products={products}
              onSubmit={handleSubmit}
              onCancel={resetForm}
              readOnly={isViewMode}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
