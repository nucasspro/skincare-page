'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { Pagination } from '@/components/admin/pagination'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { usePagination } from '@/hooks/use-pagination'
import { Edit, FolderTree, Plus, Save, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { adminCategoryService, type Category } from '@/lib/services/admin'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '' })

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const categories = await adminCategoryService.getAllCategories()
      setCategories(categories)
    } catch (error) {
      toast.error('Không thể tải danh sách danh mục')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      toast.error('Tên danh mục là bắt buộc')
      return
    }

    try {
      if (editingCategory) {
        await adminCategoryService.updateCategory(editingCategory.id, formData)
        toast.success('Cập nhật danh mục thành công')
      } else {
        await adminCategoryService.createCategory(formData)
        toast.success('Tạo danh mục thành công')
      }
      resetForm()
      fetchCategories()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể lưu danh mục')
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({ name: category.name, description: category.description || '' })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return

    try {
      await adminCategoryService.deleteCategory(id)
      toast.success('Xóa danh mục thành công')
      fetchCategories()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể xóa danh mục')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingCategory(null)
    setFormData({ name: '', description: '' })
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
              <FolderTree className="h-8 w-8" />
              Quản lý Danh mục
            </h1>
            <p className="mt-2 text-gray-600">Thêm, chỉnh sửa và quản lý danh mục sản phẩm</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} variant="outline" className="gap-2 rounded-sm">
              <Plus className="h-4 w-4" />
              Thêm danh mục
            </Button>
          )}
        </div>

        {showForm && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
              </h2>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Tên danh mục *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <Button type="submit" variant="outline" className="gap-2 rounded-sm">
                  <Save className="h-4 w-4" />
                  {editingCategory ? 'Cập nhật' : 'Tạo mới'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="rounded-sm">
                  Hủy
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.length === 0 ? (
            <Card className="p-12 text-center text-gray-500 col-span-full">
              Chưa có danh mục nào. Nhấn "Thêm danh mục" để bắt đầu.
            </Card>
          ) : (
            categories.map((category) => (
              <Card key={category.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    {category.description && (
                      <p className="mt-2 text-sm text-gray-600">{category.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
