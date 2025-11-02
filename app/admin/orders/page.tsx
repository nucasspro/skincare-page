'use client'

import { ActionButtons } from '@/components/admin/action-buttons'
import { AdminLayout } from '@/components/admin/admin-layout'
import { OrderForm, type OrderFormData } from '@/components/admin/order-form'
import { Pagination } from '@/components/admin/pagination'
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
import { ORDER_STATUS_OPTIONS, PAYMENT_METHOD_LABELS_SHORT, getStatusInfo } from '@/lib/constants/order-status'
import { adminOrderService, type Order } from '@/lib/services/admin/order-service'
import { formatDate, formatVND } from '@/lib/utils'
import { Package, RefreshCw, Search, ShoppingCart } from 'lucide-react'
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
            className="rounded cursor-pointer h-9 px-4 border-[var(--admin-neutral-gray)]/50 hover:bg-[var(--admin-hover-bg)] disabled:opacity-50 transition-colors"
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
        <Card className="p-4 border border-[var(--admin-neutral-gray)]/50 bg-white">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--admin-cool-gray)]" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo mã đơn, tên, SĐT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-sm border-[var(--admin-neutral-gray)]/50 focus:border-[var(--admin-taupe)] focus:ring-0 bg-white"
              />
            </div>

            {/* Status Filter */}
            <div className="md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-[var(--admin-neutral-gray)]/50 bg-white text-sm focus:border-[var(--admin-taupe)] focus:ring-0 text-neutral-700"
              >
                {STATUS_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(searchQuery || statusFilter !== 'all') && (
            <div className="mt-3 pt-3 border-t border-[var(--admin-neutral-gray)]/30 flex items-center justify-between">
              <p className="text-sm text-neutral-600">
                <span className="font-medium text-neutral-900">{filteredOrders.length}</span> kết quả
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setStatusFilter('all')
                }}
                className="text-xs text-[var(--admin-taupe)] hover:text-neutral-900 transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </Card>

        {/* Orders Table */}
        <Card className="overflow-hidden border border-[var(--admin-neutral-gray)]/50 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--admin-cool-gray)]/30 border-b-2 border-[var(--admin-neutral-gray)]/50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-32">
                    Actions
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 min-w-[150px]">
                    Mã đơn hàng
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 min-w-[200px]">
                    Khách hàng
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-40">
                    Tổng tiền
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-36">
                    Thanh toán
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-40">
                    Trạng thái
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-40">
                    Ngày đặt
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[var(--admin-neutral-gray)]/30">
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <div className="p-6 w-fit mx-auto mb-4 rounded-2xl bg-[var(--admin-lavender)]/20">
                        <Package className="h-12 w-12 text-[var(--admin-lavender)] mx-auto" />
                      </div>
                      <h3 className="text-base font-semibold text-neutral-900 mb-2">
                        {searchQuery || statusFilter !== 'all' ? 'Không tìm thấy đơn hàng nào' : 'Chưa có đơn hàng'}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {searchQuery || statusFilter !== 'all'
                          ? 'Thử tìm kiếm với từ khóa khác hoặc đổi bộ lọc'
                          : 'Đơn hàng sẽ xuất hiện khi khách đặt hàng'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status)

                    return (
                      <tr
                        key={order.id}
                        className="border-b border-[var(--admin-neutral-gray)]/30 hover:bg-[var(--admin-hover-bg)] transition-colors cursor-pointer"
                        onClick={() => handleView(order)}
                      >
                        <td className="px-4 py-4 w-32">
                          <ActionButtons
                            onView={() => handleView(order)}
                            onEdit={() => handleEdit(order)}
                            onDelete={() => handleDelete(order.id)}
                          />
                        </td>
                        <td className="px-4 py-4 min-w-[150px]">
                          <span className="text-sm font-mono font-medium text-neutral-900">
                            {order.orderNumber}
                          </span>
                        </td>
                        <td className="px-4 py-4 min-w-[200px]">
                          <div>
                            <p className="text-base font-medium text-neutral-900">
                              {order.customerName}
                            </p>
                            <p className="text-sm text-neutral-500 mt-1">
                              {order.customerPhone}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 w-40">
                          <span className="text-base font-semibold text-neutral-900">
                            {formatVND(order.total)}
                          </span>
                        </td>
                        <td className="px-4 py-4 w-36">
                          <span className="text-sm text-neutral-600">
                            {PAYMENT_METHOD_LABELS_SHORT[order.paymentMethod] || order.paymentMethod}
                          </span>
                        </td>
                        <td className="px-4 py-4 w-40">
                          <span className={`text-sm px-2.5 py-1 rounded-md font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-4 py-4 w-40">
                          <span className="text-sm text-neutral-500">
                            {formatDate(order.createdAt)}
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
                totalItems={filteredOrders.length}
                itemsPerPage={10}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </Card>

        {/* Dialog for Form */}
        <Dialog open={showForm} onOpenChange={(open) => !open && resetForm()}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader className="border-b border-[var(--admin-neutral-gray)]/50 pb-4 bg-[var(--admin-lavender)]/20 px-6 -mx-6 -mt-6 mb-4 py-4">
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
