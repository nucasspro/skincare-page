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
import { Product } from '@/lib/product-service'
import { adminProductService } from '@/lib/services/admin'
import { Package, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await adminProductService.getAllProducts()
      setProducts(data)
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
    setIsEditMode(true)
    setShowForm(true)
  }

  // Handle delete
  const handleDelete = async (id: string) => {
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
    setIsEditMode(false)
  }

  // Handle dialog close
  const handleDialogChange = (open: boolean) => {
    setShowForm(open)
    if (!open) {
      setEditingProduct(null)
      setIsEditMode(false)
    }
  }

  // Handle add new - opens dialog
  const handleAddNew = () => {
    setEditingProduct(null)
    setIsEditMode(false)
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
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="h-10 w-10" />
              Quản lý Sản phẩm
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Thêm, chỉnh sửa và quản lý sản phẩm ({products.length} sản phẩm)
            </p>
          </div>
          <Button onClick={handleAddNew} size="lg" variant="outline" className="gap-2 rounded-sm">
            <Plus className="h-5 w-5" />
            Thêm sản phẩm
          </Button>
        </div>

        {/* Products List */}
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Dialog for Form */}
        <Dialog open={showForm} onOpenChange={handleDialogChange}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
