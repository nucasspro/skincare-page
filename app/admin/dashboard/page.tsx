'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { Card } from '@/components/ui/card'
import { getStatusInfo } from '@/lib/constants/order-status'
import { formatDate, formatVND } from '@/lib/utils'
import { DollarSign, FolderTree, MessageSquare, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Stats {
  totalProducts: number
  totalCategories: number
  totalUsers: number
  totalOrders: number
  totalReviews: number
  monthlyRevenue: number
  growth: string
}

interface RecentOrder {
  id: string
  orderNumber: string
  customerName: string
  total: number
  status: string
  createdAt: number
}

interface BestSellingProduct {
  id: string
  name: string
  quantity: number
  revenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalReviews: 0,
    monthlyRevenue: 0,
    growth: '+0%',
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [bestSellingProducts, setBestSellingProducts] = useState<BestSellingProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, categoriesRes, usersRes, ordersRes, reviewsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/admin/categories'),
          fetch('/api/admin/users'),
          fetch('/api/admin/orders'),
          fetch('/api/admin/reviews'),
        ])

        // Check if response is JSON before parsing
        const parseJson = async (res: Response) => {
          const contentType = res.headers.get('content-type')
          if (!contentType?.includes('application/json')) {
            const text = await res.text()
            console.error('Non-JSON response:', text.substring(0, 200))
            throw new Error(`Expected JSON but got ${contentType}`)
          }
          return res.json()
        }

        const products = await parseJson(productsRes)
        const categories = await parseJson(categoriesRes)
        const users = await parseJson(usersRes)
        const orders = await parseJson(ordersRes)
        const reviews = await parseJson(reviewsRes)

        const totalProducts = products.data?.length || 0
        const totalCategories = categories.data?.length || 0
        const totalUsers = users.data?.length || 0
        const totalOrders = orders.data?.length || 0
        const totalReviews = reviews.data?.length || 0

        // Calculate monthly revenue
        const now = Math.floor(Date.now() / 1000)
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime() / 1000
        const startOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).getTime() / 1000
        const endOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getTime() / 1000

        const monthlyOrders = (orders.data || []).filter((order: any) => {
          return order.createdAt >= startOfMonth && order.status !== 'cancelled'
        })
        const monthlyRevenue = monthlyOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)

        // Calculate last month revenue for growth
        const lastMonthOrders = (orders.data || []).filter((order: any) => {
          return order.createdAt >= startOfLastMonth && order.createdAt <= endOfLastMonth && order.status !== 'cancelled'
        })
        const lastMonthRevenue = lastMonthOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)

        // Calculate growth percentage
        let growth = '0'
        if (lastMonthRevenue > 0) {
          const growthPercent = ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
          growth = growthPercent >= 0 ? `+${growthPercent.toFixed(1)}` : growthPercent.toFixed(1)
        } else if (monthlyRevenue > 0) {
          growth = '+100'
        }

        // Get recent orders (last 5)
        const recent = (orders.data || [])
          .sort((a: any, b: any) => b.createdAt - a.createdAt)
          .slice(0, 5)
          .map((order: any) => ({
            id: order.id,
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            total: order.total,
            status: order.status,
            createdAt: order.createdAt,
          }))

        // Calculate best selling products
        const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {}
        ;(orders.data || []).forEach((order: any) => {
          if (order.status !== 'cancelled') {
            const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items
            items.forEach((item: any) => {
              if (!productSales[item.id]) {
                productSales[item.id] = {
                  name: item.name,
                  quantity: 0,
                  revenue: 0,
                }
              }
              productSales[item.id].quantity += item.quantity
              productSales[item.id].revenue += item.price * item.quantity
            })
          }
        })

        const bestSelling = Object.entries(productSales)
          .map(([id, data]) => ({
            id,
            name: data.name,
            quantity: data.quantity,
            revenue: data.revenue,
          }))
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 5)

        setStats({
          totalProducts,
          totalCategories,
          totalUsers,
          totalOrders,
          totalReviews,
          monthlyRevenue,
          growth: `${growth}%`,
        })
        setRecentOrders(recent)
        setBestSellingProducts(bestSelling)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      name: 'Tổng sản phẩm',
      value: stats.totalProducts.toString(),
      icon: Package,
      href: '/admin/products',
    },
    {
      name: 'Danh mục',
      value: stats.totalCategories.toString(),
      icon: FolderTree,
      href: '/admin/categories',
    },
    {
      name: 'Người dùng',
      value: stats.totalUsers.toString(),
      icon: Users,
      href: '/admin/users',
    },
    {
      name: 'Đơn hàng',
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      href: '/admin/orders',
    },
    {
      name: 'Reviews',
      value: stats.totalReviews.toString(),
      icon: MessageSquare,
      href: '/admin/reviews',
    },
    {
      name: 'Doanh thu tháng',
      value: formatVND(stats.monthlyRevenue),
      icon: DollarSign,
    },
    {
      name: 'Tăng trưởng',
      value: stats.growth,
      icon: TrendingUp,
    },
  ]

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
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500">Tổng quan hệ thống</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {statCards.map((stat) => {
            const StatCard = (
              <Card className="p-5 hover:shadow-sm transition-shadow border-neutral-200 cursor-pointer bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{stat.name}</p>
                    <p className="mt-2 text-2xl font-semibold text-neutral-900">{stat.value}</p>
                  </div>
                  <div className="p-2 rounded ">
                    <stat.icon className="h-4 w-4 text-neutral-600" />
                  </div>
                </div>
              </Card>
            )

            if (stat.href) {
              return (
                <Link key={stat.name} href={stat.href}>
                  {StatCard}
                </Link>
              )
            }

            return <div key={stat.name}>{StatCard}</div>
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5 border-neutral-200 bg-white">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Đơn hàng gần đây</h2>
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 text-xs">
                  Chưa có đơn hàng nào
                </div>
              ) : (
                recentOrders.map((order) => {
                  const statusInfo = getStatusInfo(order.status)

                  return (
                    <Link
                      key={order.id}
                      href="/admin/orders"
                      className="block p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900 truncate">
                            {order.orderNumber}
                          </p>
                          <p className="text-xs text-neutral-500 mt-1">
                            {order.customerName} • {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-sm font-semibold text-neutral-900">
                            {formatVND(order.total)}
                          </p>
                          <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })
              )}
            </div>
          </Card>

          <Card className="p-5 border-neutral-200 bg-white">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Sản phẩm bán chạy</h2>
            <div className="space-y-3">
              {bestSellingProducts.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 text-xs">
                  Chưa có dữ liệu bán hàng
                </div>
              ) : (
                bestSellingProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href="/admin/products"
                    className="block p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0 w-6 h-6 rounded bg-neutral-100 flex items-center justify-center text-xs font-semibold text-neutral-600">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-neutral-500 mt-1">
                            {product.quantity} sản phẩm đã bán
                          </p>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-sm font-semibold text-neutral-900">
                          {formatVND(product.revenue)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
