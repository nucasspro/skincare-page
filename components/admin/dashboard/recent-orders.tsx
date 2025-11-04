'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getStatusInfo } from '@/lib/constants/order-status'
import { formatDate, formatVND } from '@/lib/utils'
import { RefreshCw, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface RecentOrder {
  id: string
  orderNumber: string
  customerName: string
  total: number
  status: string
  createdAt: number
}

interface RecentOrdersProps {
  orders: RecentOrder[]
  loading: boolean
  onRefresh: () => void
}

export function RecentOrders({ orders, loading, onRefresh }: RecentOrdersProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <ShoppingCart className="h-5 w-5 text-neutral-700" />
          Đơn hàng gần đây
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm text-neutral-500">Chưa có đơn hàng nào</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status)
              return (
                <Link
                  key={order.id}
                  href="/admin/orders"
                  className="block px-6 py-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-neutral-900">{order.orderNumber}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            statusInfo.badgeClass === 'bg-success'
                              ? 'bg-green-100 text-green-700'
                              : statusInfo.badgeClass === 'bg-warning'
                              ? 'bg-yellow-100 text-yellow-700'
                              : statusInfo.badgeClass === 'bg-danger'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        {order.customerName} • {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-semibold text-neutral-900">{formatVND(order.total)}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </CardContent>
      {orders.length > 0 && (
        <CardFooter className="pt-4">
          <Link
            href="/admin/orders"
            className="w-full text-center text-sm text-neutral-600 hover:text-neutral-900 font-medium"
          >
            Xem tất cả đơn hàng →
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}

