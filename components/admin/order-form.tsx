'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ORDER_STATUS_OPTIONS, PAYMENT_METHOD_LABELS, getStatusInfo } from '@/lib/constants/order-status'
import { Order } from '@/lib/services/admin/order-service'
import { formatDate } from '@/lib/utils/date-utils'
import { formatVND } from '@/lib/utils/currency-utils'
import { Calendar, CreditCard, Edit, Mail, MapPin, Package2, Phone, Save, ShoppingBag, User, X } from 'lucide-react'
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

// Internal reusable components
interface InfoCardProps {
  icon: React.ReactNode
  label: string
  value: string | React.ReactNode
  color: 'cool-gray' | 'beige' | 'lavender' | 'taupe'
  className?: string
}

function InfoCard({ icon, label, value, color, className = '' }: InfoCardProps) {
  const colorClasses = {
    'cool-gray': {
      bg: 'bg-gradient-to-br from-[var(--admin-cool-gray)]/20 to-[var(--admin-cool-gray)]/5',
      border: 'border-[var(--admin-cool-gray)]/30 hover:border-[var(--admin-cool-gray)]/50',
      iconBg: 'bg-[var(--admin-cool-gray)]/30',
    },
    'beige': {
      bg: 'bg-gradient-to-br from-[var(--admin-beige)]/20 to-[var(--admin-beige)]/5',
      border: 'border-[var(--admin-beige)]/30 hover:border-[var(--admin-beige)]/50',
      iconBg: 'bg-[var(--admin-beige)]/30',
    },
    'lavender': {
      bg: 'bg-gradient-to-br from-[var(--admin-lavender)]/20 to-[var(--admin-lavender)]/5',
      border: 'border-[var(--admin-lavender)]/30 hover:border-[var(--admin-lavender)]/50',
      iconBg: 'bg-[var(--admin-lavender)]/30',
    },
    'taupe': {
      bg: 'bg-gradient-to-br from-[var(--admin-taupe)]/20 to-[var(--admin-taupe)]/5',
      border: 'border-[var(--admin-taupe)]/30 hover:border-[var(--admin-taupe)]/50',
      iconBg: 'bg-[var(--admin-taupe)]/30',
    },
  }

  const colors = colorClasses[color]

  return (
    <div className={`group relative overflow-hidden rounded-xl ${colors.bg} p-5 border-2 ${colors.border} transition-all cursor-pointer ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${colors.iconBg}`}>
          {icon}
        </div>
      </div>
      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-1.5">{label}</p>
      <div className="text-base font-bold text-neutral-900">{value}</div>
    </div>
  )
}

interface InfoSectionCardProps {
  icon: React.ReactNode
  label: string
  value: string | React.ReactNode
  color: 'cool-gray' | 'beige' | 'lavender' | 'taupe'
  fullWidth?: boolean
}

function InfoSectionCard({ icon, label, value, color, fullWidth = false }: InfoSectionCardProps) {
  const colorClasses = {
    'cool-gray': {
      bg: 'bg-gradient-to-br from-[var(--admin-cool-gray)]/10 to-transparent',
      border: 'border-[var(--admin-cool-gray)]/50 hover:border-[var(--admin-cool-gray)]/70',
      iconBg: 'bg-[var(--admin-cool-gray)]/30 group-hover:bg-[var(--admin-cool-gray)]/40',
    },
    'beige': {
      bg: 'bg-gradient-to-br from-[var(--admin-beige)]/10 to-transparent',
      border: 'border-[var(--admin-beige)]/50 hover:border-[var(--admin-beige)]/70',
      iconBg: 'bg-[var(--admin-beige)]/30 group-hover:bg-[var(--admin-beige)]/40',
    },
    'lavender': {
      bg: 'bg-gradient-to-br from-[var(--admin-lavender)]/10 to-transparent',
      border: 'border-[var(--admin-lavender)]/50 hover:border-[var(--admin-lavender)]/70',
      iconBg: 'bg-[var(--admin-lavender)]/30 group-hover:bg-[var(--admin-lavender)]/40',
    },
    'taupe': {
      bg: 'bg-gradient-to-br from-[var(--admin-taupe)]/10 to-transparent',
      border: 'border-[var(--admin-taupe)]/50 hover:border-[var(--admin-taupe)]/70',
      iconBg: 'bg-[var(--admin-taupe)]/30 group-hover:bg-[var(--admin-taupe)]/40',
    },
  }

  const colors = colorClasses[color]

  return (
    <div className={`group p-5 rounded-xl ${colors.bg} border-2 ${colors.border} transition-all ${fullWidth ? 'md:col-span-2' : ''}`}>
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-lg ${colors.iconBg} transition-colors`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <Label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2 block">{label}</Label>
          <div className="text-base font-bold text-neutral-900">{value}</div>
        </div>
      </div>
    </div>
  )
}

interface SectionHeaderProps {
  icon: React.ReactNode
  title: string
  badge?: React.ReactNode
  color: 'cool-gray' | 'beige' | 'lavender' | 'taupe'
}

function SectionHeader({ icon, title, badge, color }: SectionHeaderProps) {
  const colorClasses = {
    'cool-gray': 'from-[var(--admin-cool-gray)]/25',
    'beige': 'from-[var(--admin-beige)]/25',
    'lavender': 'from-[var(--admin-lavender)]/25',
    'taupe': 'from-[var(--admin-taupe)]/25',
  }

  const iconBgClasses = {
    'cool-gray': 'bg-[var(--admin-cool-gray)]/40',
    'beige': 'bg-[var(--admin-beige)]/40',
    'lavender': 'bg-[var(--admin-lavender)]/40',
    'taupe': 'bg-[var(--admin-taupe)]/40',
  }

  return (
    <div className={`px-6 py-4 bg-gradient-to-r ${colorClasses[color]} to-transparent border-b-2 border-[var(--admin-neutral-gray)]/50`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg ${iconBgClasses[color]}`}>
            {icon}
          </div>
          <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
        </div>
        {badge}
      </div>
    </div>
  )
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

  const statusInfo = getStatusInfo(formData.status)

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-admin>
      {/* Order Header - Modern Design */}
      <div className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 shadow-sm overflow-hidden">
        <div className="relative bg-gradient-to-br from-[var(--admin-lavender)]/40 via-[var(--admin-beige)]/30 to-[var(--admin-cool-gray)]/20 px-8 py-6">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(217,220,227,0.1)_0%,rgba(215,206,201,0.1)_50%,rgba(212,213,208,0.1)_100%)]" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/60 backdrop-blur-sm shadow-md border-2 border-white/50">
                <ShoppingBag className="h-6 w-6 text-neutral-800" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 tracking-tight mb-1">{order.orderNumber}</h2>
                <p className="text-sm text-neutral-600 font-medium">Đơn hàng • {formatDate(order.createdAt)}</p>
              </div>
            </div>
            {!readOnly ? (
              <div className="flex items-center gap-2">
                <Edit className="h-4 w-4 text-neutral-600" />
                <div className={`relative rounded-lg shadow-sm border-2 border-white/40 ${statusInfo.color}`}>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm bg-transparent cursor-pointer transition-all appearance-none focus:outline-none focus:ring-2 focus:ring-white/50 pr-8"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    {ORDER_STATUS_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className={`px-4 py-2 rounded-lg text-sm font-bold shadow-sm ${statusInfo.color} backdrop-blur-sm bg-white/60 border-2 border-white/40`}>
                {statusInfo.label}
              </div>
            )}
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard
              icon={<Calendar className="h-5 w-5 text-neutral-700" />}
              label="Ngày đặt"
              value={formatDate(order.createdAt)}
              color="cool-gray"
            />
            <InfoCard
              icon={<CreditCard className="h-5 w-5 text-neutral-700" />}
              label="Phương thức"
              value={PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod}
              color="beige"
            />
            <InfoCard
              icon={<Package2 className="h-5 w-5 text-neutral-700" />}
              label="Tổng tiền"
              value={<span className="text-xl">{formatVND(order.total)}</span>}
              color="lavender"
            />
          </div>
        </div>
      </div>

      {/* Customer Info - Clean Modern Layout */}
      <div className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 shadow-sm overflow-hidden">
        <SectionHeader
          icon={<User className="h-5 w-5 text-neutral-800" />}
          title="Thông tin khách hàng"
          color="cool-gray"
        />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoSectionCard
              icon={<User className="h-5 w-5 text-neutral-700" />}
              label="Tên khách hàng"
              value={order.customerName}
              color="cool-gray"
            />
            <InfoSectionCard
              icon={<Phone className="h-5 w-5 text-neutral-700" />}
              label="Số điện thoại"
              value={order.customerPhone}
              color="beige"
            />
            {order.customerEmail && (
              <InfoSectionCard
                icon={<Mail className="h-5 w-5 text-neutral-700" />}
                label="Email"
                value={<span className="text-blue-600">{order.customerEmail}</span>}
                color="lavender"
              />
            )}
            <InfoSectionCard
              icon={<MapPin className="h-5 w-5 text-neutral-700" />}
              label="Địa chỉ giao hàng"
              value={<span className="text-base font-normal leading-relaxed">{fullAddress}</span>}
              color="taupe"
              fullWidth
            />
          </div>
        </div>
      </div>

      {/* Order Items - Enhanced Product Cards */}
      <div className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 shadow-sm overflow-hidden">
        <SectionHeader
          icon={<Package2 className="h-5 w-5 text-neutral-800" />}
          title="Sản phẩm trong đơn"
          badge={
            <span className="px-3 py-1.5 rounded-full text-xs font-bold text-neutral-700 bg-[var(--admin-beige)]/30 border-2 border-[var(--admin-beige)]/50">
              {order.items.length} {order.items.length === 1 ? 'sản phẩm' : 'sản phẩm'}
            </span>
          }
          color="beige"
        />
        <div className="p-6">
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="group flex gap-5 p-5 rounded-xl border-2 border-[var(--admin-neutral-gray)]/50 bg-gradient-to-r from-white to-[var(--admin-lavender)]/5 hover:from-[var(--admin-lavender)]/10 hover:to-[var(--admin-beige)]/10 hover:border-[var(--admin-beige)]/70 hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-[var(--admin-cool-gray)]/20 border-2 border-[var(--admin-neutral-gray)]/40 group-hover:border-[var(--admin-beige)]/70 transition-all shadow-sm group-hover:shadow-md">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package2 className="h-8 w-8 text-[var(--admin-cool-gray)]" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-lg font-bold text-neutral-900 mb-2.5 group-hover:text-neutral-950 transition-colors line-clamp-2">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <span className="px-2.5 py-1 rounded-md bg-[var(--admin-cool-gray)]/20 text-neutral-700 font-semibold">
                      {formatVND(item.price)}
                    </span>
                    <span className="text-neutral-400">×</span>
                    <span className="px-2.5 py-1 rounded-md bg-[var(--admin-beige)]/20 text-neutral-700 font-semibold">
                      {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <p className="text-2xl font-bold text-neutral-900 mb-1">
                    {formatVND(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total Summary - Prominent Display */}
          <div className="mt-6 pt-6 border-t-2 border-[var(--admin-neutral-gray)]/60">
            <div className="flex justify-between items-center p-6 rounded-xl bg-gradient-to-br from-[var(--admin-lavender)]/20 via-[var(--admin-beige)]/15 to-[var(--admin-cool-gray)]/10 border-2 border-[var(--admin-lavender)]/50 shadow-sm">
              <span className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Tổng cộng</span>
              <span className="text-3xl font-bold text-neutral-900">{formatVND(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editable Fields - Modern Form Design */}
      {!readOnly && (
        <div className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 shadow-sm overflow-hidden">
          <SectionHeader
            icon={<Save className="h-5 w-5 text-neutral-800" />}
            title="Cập nhật đơn hàng"
            color="taupe"
          />
          <div className="p-6 space-y-6">
            {/* Status */}
            <div>
              <Label htmlFor="status" className="text-sm font-bold text-neutral-900 mb-3 block uppercase tracking-wide">
                <div className="flex items-center gap-2">
                  <span>Trạng thái đơn hàng <span className="text-red-500">*</span></span>
                  <Edit className="h-4 w-4 text-neutral-500" />
                </div>
              </Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="h-12 w-full rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 text-sm focus:border-[var(--admin-taupe)] focus:ring-2 focus:ring-[var(--admin-taupe)]/20 cursor-pointer transition-all font-semibold shadow-sm hover:shadow-md"
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
              <Label htmlFor="notes" className="text-sm font-bold text-neutral-900 mb-3 block uppercase tracking-wide">
                Ghi chú
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Thêm ghi chú cho đơn hàng..."
                className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 min-h-[140px] shadow-sm focus:border-[var(--admin-taupe)] focus:ring-2 focus:ring-[var(--admin-taupe)]/20 text-sm transition-all resize-none px-4 py-3 font-medium hover:shadow-md"
              />
            </div>

            {/* Buttons - Enhanced Design */}
            <div className="flex gap-4 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 text-neutral-700 hover:bg-[var(--admin-hover-bg)] hover:border-[var(--admin-cool-gray)]/70 shadow-sm hover:shadow-md h-12 text-sm font-bold cursor-pointer transition-all"
              >
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="flex-1 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 text-neutral-700 hover:bg-[var(--admin-hover-bg)] hover:border-[var(--admin-cool-gray)]/70 shadow-sm hover:shadow-md h-12 text-sm font-bold cursor-pointer transition-all"
              >
                <Save className="h-4 w-4" />
                Cập nhật đơn hàng
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
