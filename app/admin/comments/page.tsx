'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { adminCommentService, type Comment } from '@/lib/services/admin'
import { MessageSquare, Edit, Trash2, X, Save, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

const statusLabels: Record<string, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Đã từ chối',
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [editingComment, setEditingComment] = useState<Comment | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    content: '',
    rating: 5,
    status: 'pending',
  })

  const fetchComments = async (showToast = false) => {
    try {
      setLoading(true)
      const comments = await adminCommentService.getAllComments()
      setComments(comments)
      if (showToast) {
        toast.success('Đã làm mới dữ liệu')
      }
    } catch (error) {
      toast.error('Không thể tải danh sách bình luận')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment)
    setFormData({
      content: comment.content,
      rating: comment.rating,
      status: comment.status,
    })
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingComment || !formData.content.trim()) {
      toast.error('Nội dung bình luận là bắt buộc')
      return
    }

    try {
      await adminCommentService.updateComment(editingComment.id, formData)
      toast.success('Cập nhật bình luận thành công')
      resetForm()
      fetchComments()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể cập nhật bình luận')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return

    try {
      await adminCommentService.deleteComment(id)
      toast.success('Xóa bình luận thành công')
      fetchComments()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể xóa bình luận')
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const comment = comments.find(c => c.id === id)
      if (!comment) return

      await adminCommentService.updateComment(id, {
        content: comment.content,
        rating: comment.rating,
        status: newStatus,
      })

      toast.success('Cập nhật trạng thái thành công')
      fetchComments()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể cập nhật trạng thái')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingComment(null)
    setFormData({
      content: '',
      rating: 5,
      status: 'pending',
    })
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('vi-VN')
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Đang tải...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="h-8 w-8" />
              Quản lý Bình luận
            </h1>
            <p className="mt-2 text-gray-600">Xem và quản lý bình luận sản phẩm</p>
          </div>
          <Button
            onClick={() => fetchComments(true)}
            size="sm"
            variant="outline"
            disabled={loading}
            className="rounded cursor-pointer h-9 px-4 border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
        </div>

        {showForm && editingComment && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Chỉnh sửa bình luận</h2>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="content">Nội dung *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="mt-1"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Đánh giá</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="range"
                      id="rating"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      className="flex-1"
                    />
                    <div className="flex items-center gap-1 w-24">
                      {renderStars(formData.rating)}
                      <span className="text-sm font-medium ml-1">{formData.rating}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Trạng thái</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <Button type="submit" variant="outline" className="gap-2 rounded-sm">
                  <Save className="h-4 w-4" />
                  Cập nhật
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="rounded-sm">
                  Hủy
                </Button>
              </div>
            </form>
          </Card>
        )}

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nội dung
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đánh giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      Chưa có bình luận nào.
                    </td>
                  </tr>
                ) : (
                  comments.map((comment) => (
                    <tr key={comment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {comment.productName || `Product #${comment.productId.slice(-6)}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div className="font-medium">{comment.userName || 'Ẩn danh'}</div>
                          {comment.userEmail && (
                            <div className="text-xs text-gray-400">{comment.userEmail}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        <div className="line-clamp-2">{comment.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {renderStars(comment.rating)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={comment.status}
                          onChange={(e) => handleStatusChange(comment.id, e.target.value)}
                          className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer ${
                            statusColors[comment.status] || statusColors.pending
                          }`}
                        >
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleEdit(comment)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDelete(comment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
