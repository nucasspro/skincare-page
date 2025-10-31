'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ORDER_STATUS_OPTIONS, PAYMENT_METHOD_LABELS, getStatusInfo } from '@/lib/constants/order-status'
import { Order } from '@/lib/services/admin/order-service'
import { formatDate, formatVND } from '@/lib/utils'
import { Mail, MapPin, Package, Phone, Save, User } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface OrderFormProps {
  order: Order | null
  onSubmit: (data: OrderFormData) => void
  onCancel: () => void
  readOnly?: boolean
}

export interface OrderFormData {
  status: string
  notes?: string
}

export function OrderForm({ order, onSubmit, onCancel, readOnly = false }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    status: 'pending',
    notes: '',
  })

  useEffect(() => {
    if (order) {
      setFormData({
        status: order.status,
        notes: order.notes || '',
      })
    }
  }, [order])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (!order) return null

  const fullAddress = [
    order.streetAddress,
    order.wardName,
    order.districtName,
    order.provinceName
  ].filter(Boolean).join(', ')

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Order Info Section */}
      <div className="bg-white rounded-lg p-6 border border-neutral-200">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-1.5  rounded">
            <Package className="h-4 w-4 " />
          </div>
          <h3 className="text-sm font-semibold text-neutral-900">Thông tin đơn hàng</h3>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-xs text-neutral-500 mb-1.5 block">Mã đơn hàng</Label>
            <p className="text-sm font-semibold text-neutral-900">
              {order.orderNumber}
            </p>
          </div>
          <div>
            <Label className="text-xs text-neutral-500 mb-1.5 block">Ngày đặt</Label>
            <p className="text-sm text-neutral-900">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div>
            <Label className="text-xs text-neutral-500 mb-1.5 block">Trạng thái</Label>
            <span className={`inline-block text-xs px-2.5 py-1 rounded ${getStatusInfo(order.status).color}`}>
              {getStatusInfo(order.status).label}
            </span>
          </div>
          <div>
            <Label className="text-xs text-neutral-500 mb-1.5 block">Thanh toán</Label>
            <p className="text-sm text-orange-600 font-medium">
              {PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Info Section */}
      <div className="bg-white rounded-lg p-6 border border-neutral-200">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-1.5  rounded">
            <User className="h-4 w-4 " />
          </div>
          <h3 className="text-sm font-semibold text-neutral-900">Thông tin khách hàng</h3>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex items-start gap-2.5">
            <User className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <Label className="text-xs text-neutral-500 mb-1 block">Tên khách hàng</Label>
              <p className="text-sm text-neutral-900">{order.customerName}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <Label className="text-xs text-neutral-500 mb-1 block">Số điện thoại</Label>
              <p className="text-sm text-neutral-900">{order.customerPhone}</p>
            </div>
          </div>

          {order.customerEmail && (
            <div className="flex items-start gap-2.5">
              <Mail className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Label className="text-xs text-neutral-500 mb-1 block">Email</Label>
                <p className="text-sm text-blue-600">{order.customerEmail}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2.5">
            <MapPin className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <Label className="text-xs text-neutral-500 mb-1 block">Địa chỉ giao hàng</Label>
              <p className="text-sm text-neutral-900 leading-relaxed">{fullAddress}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items Section */}
      <div className="bg-white rounded-lg p-6 border border-neutral-200">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-1.5  rounded">
            <Package className="h-4 w-4 " />
          </div>
          <h3 className="text-sm font-semibold text-neutral-900">Sản phẩm</h3>
        </div>

        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex gap-4 pb-4 border-b border-neutral-100 last:border-b-0 last:pb-0">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-50 border border-neutral-200">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-900 mb-1">{item.name}</p>
                  <p className="text-xs text-neutral-500">
                    {formatVND(item.price)} × {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col justify-between items-end">
                <p className="text-base font-semibold text-neutral-900">
                  {formatVND(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-neutral-200 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-900">Tổng cộng</span>
            <span className="text-xl font-bold text-neutral-900">{formatVND(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Editable Fields */}
      {!readOnly && (
        <div className="bg-white rounded-lg p-6 border border-neutral-200 space-y-4">
          {/* Status */}
          <div>
            <Label htmlFor="status" className="text-neutral-700 text-sm font-medium mb-2 block">
              Trạng thái đơn hàng <span className="text-red-500">*</span>
            </Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm focus:border-neutral-400 focus:outline-none focus:ring-0 cursor-pointer"
            >
              {ORDER_STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-neutral-700 text-sm font-medium mb-2 block">
              Ghi chú
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Thêm ghi chú cho đơn hàng..."
              className="bg-white rounded-lg border border-neutral-300 min-h-[100px] shadow-none focus:border-neutral-400 focus:outline-none focus:ring-0 text-sm transition-colors resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 rounded-lg border-neutral-300 text-neutral-700 hover:bg-neutral-50 shadow-none h-10 text-sm font-medium cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white border-0 shadow-none h-10 text-sm font-medium cursor-pointer"
            >
              <Save className="h-4 w-4" />
              Cập nhật đơn hàng
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}
