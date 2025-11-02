'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { OrderForm, type OrderFormData } from '@/components/admin/order-form'
import { Pagination } from '@/components/admin/pagination'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { usePagination } from '@/hooks/use-pagination'
import { ORDER_STATUS_OPTIONS, PAYMENT_METHOD_LABELS_SHORT, getStatusInfo } from '@/lib/constants/order-status'
import { adminOrderService, type Order } from '@/lib/services/admin/order-service'
import { formatDate, formatVND } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Edit, Eye, Package, RefreshCw, Search, ShoppingCart, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả', color: 'bg-neutral-100 text-neutral-600' },
  ...ORDER_STATUS_OPTIONS,
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isViewMode, setIsViewMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchOrders = async (showToast = false) => {
    try {
      setLoading(true)
      const data = await adminOrderService.getAllOrders()
      setOrders(data)
      if (showToast) {
        toast.success('Đã làm mới dữ liệu')
      }
    } catch (error) {
      toast.error('Không thể tải danh sách đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleSubmit = async (data: OrderFormData) => {
    if (!editingOrder) return

    try {
      await adminOrderService.updateOrder(editingOrder.id, data)
      toast.success('Cập nhật đơn hàng thành công')
      resetForm()
      fetchOrders()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể cập nhật đơn hàng')
    }
  }

  const handleEdit = (order: Order) => {
    setEditingOrder(order)
    setViewingOrder(null)
    setIsViewMode(false)
    setShowForm(true)
  }

  const handleView = (order: Order) => {
    setViewingOrder(order)
    setEditingOrder(null)
    setIsViewMode(true)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) return

    try {
      await adminOrderService.deleteOrder(id)
      toast.success('Xóa đơn hàng thành công')
      fetchOrders()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể xóa đơn hàng')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingOrder(null)
    setViewingOrder(null)
    setIsViewMode(false)
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery)

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedOrders,
    setCurrentPage,
  } = usePagination({
    items: filteredOrders,
    itemsPerPage: 10,
    dependencies: [searchQuery, statusFilter],
  })

  const stats = adminOrderService.getOrderStats(orders)

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
            <h1 className="text-2xl font-semibold text-neutral-900">Đơn hàng</h1>
            <p className="mt-1 text-sm text-neutral-500">
              {orders.length} đơn hàng • Tổng doanh thu: {formatVND(stats.totalRevenue)}
            </p>
          </div>
          <Button
            onClick={() => fetchOrders(true)}
            size="sm"
            variant="outline"
            disabled={loading}
            className="rounded cursor-pointer h-9 px-4 border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATUS_OPTIONS.filter(s => s.value !== 'all').map((status) => (
            <Card key={status.value} className="p-4 border-neutral-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500">{status.label}</p>
                  <p className="text-2xl font-semibold text-neutral-900 mt-1">
                    {stats[status.value as keyof typeof stats] || 0}
                  </p>
                </div>
                <div className={`p-2 rounded ${status.color}`}>
                  <ShoppingCart className="h-4 w-4" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-4 border-neutral-200 bg-white">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo mã đơn, tên, SĐT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm border-neutral-300 focus:border-neutral-400 focus:ring-0"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 rounded border border-neutral-300 bg-white text-sm focus:border-neutral-400 focus:outline-none focus:ring-0"
            >
              {STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery || statusFilter !== 'all') && (
            <p className="mt-3 text-xs text-neutral-500">
              {filteredOrders.length} kết quả
            </p>
          )}
        </Card>

        {/* Orders Table */}
        <Card className="overflow-hidden border-neutral-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500 w-28">
                    Actions
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500">
                    Mã đơn hàng
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500">
                    Khách hàng
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500">
                    Tổng tiền
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500">
                    Thanh toán
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500">
                    Trạng thái
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-neutral-500">
                    Ngày đặt
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-100">
                {paginatedOrders.map((order) => {
                  const statusInfo = getStatusInfo(order.status)

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-neutral-50 transition-colors cursor-pointer"
                      onClick={() => handleView(order)}
                    >
                      <td className="p-2.5 w-28">
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(order)}
                            className="rounded h-7 w-7 cursor-pointer hover:bg-neutral-100"
                            title="Xem"
                          >
                            <Eye className="h-3.5 w-3.5 text-neutral-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(order)}
                            className="rounded h-7 w-7 cursor-pointer hover:bg-neutral-100"
                            title="Sửa"
                          >
                            <Edit className="h-3.5 w-3.5 text-neutral-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(order.id)}
                            className="rounded h-7 w-7 cursor-pointer hover:bg-red-50"
                            title="Xóa"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-600" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-2.5">
                        <span className="text-sm font-mono font-medium text-neutral-900">
                          {order.orderNumber}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <div>
                          <p className="text-sm font-medium text-neutral-900">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {order.customerPhone}
                          </p>
                        </div>
                      </td>
                      <td className="p-2.5">
                        <span className="text-sm font-semibold text-neutral-900">
                          {formatVND(order.total)}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className="text-xs text-neutral-600">
                          {PAYMENT_METHOD_LABELS_SHORT[order.paymentMethod] || order.paymentMethod}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className={`text-xs px-2 py-1 rounded ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className="text-xs text-neutral-500">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="p-12 text-center">
              <Package className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-neutral-900 mb-1">
                {searchQuery || statusFilter !== 'all' ? 'Không tìm thấy đơn hàng nào' : 'Chưa có đơn hàng'}
              </h3>
              <p className="text-xs text-neutral-500">
                {searchQuery || statusFilter !== 'all'
                  ? 'Thử tìm kiếm với từ khóa khác hoặc đổi bộ lọc'
                  : 'Đơn hàng sẽ xuất hiện khi khách đặt hàng'}
              </p>
            </div>
          )}
        </Card>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredOrders.length}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />

        {/* Dialog for Form */}
        <Dialog open={showForm} onOpenChange={(open) => !open && resetForm()}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-50">
            <DialogHeader className="border-b border-neutral-200 pb-4">
              <DialogTitle className="text-lg font-semibold text-neutral-900">
                {isViewMode ? 'Chi tiết đơn hàng' : 'Cập nhật đơn hàng'}
              </DialogTitle>
            </DialogHeader>

            <OrderForm
              order={viewingOrder || editingOrder}
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
