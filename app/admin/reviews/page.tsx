'use client'

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
import { Edit, Eye, MessageSquare, Plus, RefreshCw, Search, Star, Trash2 } from 'lucide-react'
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
              className="rounded cursor-pointer h-9 px-4 border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
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
              className="bg-neutral-900 hover:bg-neutral-800 text-white rounded cursor-pointer h-9 px-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm mới
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="p-3 border-neutral-200 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm review..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm border-neutral-300 focus:border-neutral-400 focus:ring-0"
            />
          </div>
          {searchQuery && (
            <p className="mt-2 text-xs text-neutral-500">
              {filteredReviews.length} kết quả
            </p>
          )}
        </Card>

        {/* Reviews Table */}
        <Card className="overflow-hidden border-neutral-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500 w-28">
                    Actions
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500">
                    Reviewer
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500">
                    Rating
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500 min-w-[300px]">
                    Review
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500">
                    Product
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-100">
                {paginatedReviews.map((review) => {
                  const product = products.find(p => p.id === review.productId)
                  return (
                    <tr
                      key={review.id}
                      className="hover:bg-neutral-50 transition-colors cursor-pointer"
                      onClick={() => handleView(review)}
                    >
                      <td className="p-2.5 w-28">
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(review)}
                            className="rounded h-7 w-7 cursor-pointer hover:bg-neutral-100"
                            title="Xem"
                          >
                            <Eye className="h-3.5 w-3.5 text-neutral-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(review)}
                            className="rounded h-7 w-7 cursor-pointer hover:bg-neutral-100"
                            title="Sửa"
                          >
                            <Edit className="h-3.5 w-3.5 text-neutral-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(review.id)}
                            className="rounded h-7 w-7 cursor-pointer hover:bg-red-50"
                            title="Xóa"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-600" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-2.5">
                        <span className="text-sm font-medium text-neutral-900">
                          {review.reviewerName}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => {
                            const starNumber = i + 1
                            const isFullyFilled = starNumber <= review.rating
                            const isHalfFilled = starNumber - 0.5 === review.rating ||
                                                (starNumber - 1 < review.rating && starNumber > review.rating)

                            return isHalfFilled ? (
                              <div key={i} className="relative h-3 w-3">
                                <Star className="h-3 w-3 fill-neutral-200 text-neutral-300 absolute inset-0" />
                                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                </div>
                              </div>
                            ) : (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  isFullyFilled
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-neutral-200 text-neutral-300'
                                }`}
                              />
                            )
                          })}
                        </div>
                      </td>
                      <td className="p-2.5 min-w-[300px]">
                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {review.review}
                        </p>
                      </td>
                      <td className="p-2.5">
                        <span className="text-xs text-neutral-600">
                          {product?.name || 'Unknown'}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className="text-xs text-neutral-500">
                          {formatDate(review.createdAt)}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredReviews.length === 0 && (
            <div className="p-12 text-center">
              <MessageSquare className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-neutral-900 mb-1">
                {searchQuery ? 'Không tìm thấy review nào' : 'Chưa có review'}
              </h3>
              <p className="text-xs text-neutral-500">
                {searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Thêm review mới để bắt đầu'}
              </p>
            </div>
          )}
        </Card>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredReviews.length}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />

        {/* Dialog for Form */}
        <Dialog open={showForm} onOpenChange={(open) => !open && resetForm()}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-50">
            <DialogHeader className="border-b border-neutral-200 pb-4">
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
