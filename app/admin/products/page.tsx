'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { ProductForm } from '@/components/admin/product-form'
import { ProductList } from '@/components/admin/product-list'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Product } from '@/lib/product-service'
import { adminProductService } from '@/lib/services/admin'
import { Plus, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { isAdmin, canDelete } = useCurrentUser()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isViewMode, setIsViewMode] = useState(false)

  // Fetch products
  const fetchProducts = async (showToast = false) => {
    try {
      setLoading(true)
      const data = await adminProductService.getAllProducts()
      setProducts(data)
      if (showToast) {
        toast.success('Đã làm mới dữ liệu')
      }
    } catch (error) {
      toast.error('Không thể tải danh sách sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Handle form submit
  const handleSubmit = async (data: {
    name: string
    tagline: string
    price: number
    originalPrice?: number | null
    discount?: number | null
    category: string
    needs: string[]
    image: string
    hoverImage: string
    description: string
    benefits: string[]
    ingredients: string[]
    howToUse?: string
  }) => {
    try {
      if (editingProduct) {
        await adminProductService.updateProduct(editingProduct.id, data)
        toast.success('Cập nhật sản phẩm thành công')
      } else {
        await adminProductService.createProduct(data)
        toast.success('Tạo sản phẩm thành công')
      }
      setShowForm(false)
      setEditingProduct(null)
      setIsEditMode(false)
      fetchProducts()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể lưu sản phẩm')
    }
  }

  // Handle edit - opens dialog
  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setViewingProduct(null)
    setIsEditMode(true)
    setIsViewMode(false)
    setShowForm(true)
  }

  // Handle view - opens dialog in read-only mode
  const handleView = (product: Product) => {
    setViewingProduct(product)
    setEditingProduct(null)
    setIsViewMode(true)
    setIsEditMode(false)
    setShowForm(true)
  }

  // Handle delete
  const handleDelete = async (id: string) => {
    // Check if user can delete (only admin can delete)
    if (!canDelete) {
      toast.error('Bạn không có quyền xóa sản phẩm')
      return
    }

    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return

    try {
      await adminProductService.deleteProduct(id)
      toast.success('Xóa sản phẩm thành công')
      fetchProducts()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể xóa sản phẩm')
    }
  }

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
    setViewingProduct(null)
    setIsEditMode(false)
    setIsViewMode(false)
  }

  // Handle dialog close
  const handleDialogChange = (open: boolean) => {
    setShowForm(open)
    if (!open) {
      setEditingProduct(null)
      setViewingProduct(null)
      setIsEditMode(false)
      setIsViewMode(false)
    }
  }

  // Handle add new - opens dialog
  const handleAddNew = () => {
    setEditingProduct(null)
    setViewingProduct(null)
    setIsEditMode(false)
    setIsViewMode(false)
    setShowForm(true)
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Sản phẩm</h1>
            <p className="mt-1 text-sm text-neutral-500">
              {products.length} sản phẩm
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => fetchProducts(true)}
              size="sm"
              variant="outline"
              disabled={loading}
              className="rounded cursor-pointer h-9 px-4 border-[var(--admin-neutral-gray)]/50 hover:bg-[var(--admin-hover-bg)] disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Làm mới
            </Button>
            <Button
              onClick={handleAddNew}
              size="sm"
              className="bg-[var(--admin-beige)] hover:bg-[var(--admin-beige)]/80 text-neutral-900 rounded cursor-pointer h-9 px-4 transition-colors font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm mới
            </Button>
          </div>
        </div>

        {/* Products List */}
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          canDelete={canDelete}
        />

        {/* Dialog for Form */}
        <Dialog open={showForm} onOpenChange={handleDialogChange}>
          <DialogContent
            className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border-2 border-[var(--admin-neutral-gray)]/30"
          >
            <DialogHeader className="border-b border-[var(--admin-neutral-gray)]/50 pb-4 bg-gradient-to-r from-[var(--admin-lavender)]/20 via-[var(--admin-lavender)]/15 to-transparent px-6 -mx-6 -mt-6 mb-4 py-4 rounded-t-2xl">
              <DialogTitle className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                {isViewMode ? '📋 Chi tiết sản phẩm' : isEditMode ? '✏️ Chỉnh sửa sản phẩm' : '➕ Thêm sản phẩm mới'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={viewingProduct || editingProduct}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              readOnly={isViewMode}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
