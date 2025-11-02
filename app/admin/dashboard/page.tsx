'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getAdminPaletteColor } from '@/lib/constants/admin-palette'
import { getStatusInfo } from '@/lib/constants/order-status'
import { formatDate, formatVND } from '@/lib/utils'
import { DollarSign, FolderTree, MessageSquare, Package, RefreshCw, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

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

  const fetchStats = async (showToast = false) => {
    try {
      setLoading(true)
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
        if (showToast) {
          toast.success('Đã làm mới dữ liệu')
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        if (showToast) {
          toast.error('Không thể tải dữ liệu')
        }
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
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
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-neutral-200 border-t-neutral-900"></div>
            <div className="text-sm text-neutral-500">Đang tải dữ liệu...</div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  const getCurrentGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Chào buổi sáng'
    if (hour < 18) return 'Chào buổi chiều'
    return 'Chào buổi tối'
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
              {getCurrentGreeting()} 👋
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              {new Date().toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <Button
            onClick={() => fetchStats(true)}
            size="sm"
            variant="outline"
            disabled={loading}
            className="rounded-lg cursor-pointer h-10 px-4 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 disabled:opacity-50 transition-all shadow-sm hover:shadow"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => {
            const isRevenue = stat.name === 'Doanh thu tháng'
            const isGrowth = stat.name === 'Tăng trưởng'

            const getCardBg = () => {
              const color = getAdminPaletteColor(index)
              return `bg-[${color}]/10`
            }

            const StatCard = (
              <Card className="group relative overflow-hidden border border-neutral-200/50 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5">
                <div className={`absolute inset-0 ${getCardBg()} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="p-3 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundColor: getAdminPaletteColor(index) }}
                    >
                      <stat.icon className="h-5 w-5 text-neutral-700" />
                    </div>
                    {isGrowth && (
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        stats.growth.startsWith('+')
                          ? 'bg-[var(--admin-lavender)]/50 text-neutral-700'
                          : 'bg-[var(--admin-taupe)]/50 text-neutral-700'
                      }`}>
                        <TrendingUp className={`h-3 w-3 ${
                          stats.growth.startsWith('+') ? '' : 'rotate-180'
                        }`} />
                        {stats.growth}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {stat.name}
                    </p>
                    <p className={`text-2xl font-bold text-neutral-900 group-hover:text-neutral-950 transition-colors ${
                      isRevenue ? 'text-[#D7CEC9] mix-blend-mode-multiply' : ''
                    }`}>
                      {stat.value}
                    </p>
                  </div>
                </div>
              </Card>
            )

            if (stat.href) {
              return (
                <Link key={stat.name} href={stat.href} className="block">
                  {StatCard}
                </Link>
              )
            }

            return <div key={stat.name}>{StatCard}</div>
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="border border-neutral-200/50 shadow-sm bg-white overflow-hidden">
            <div className="bg-[var(--admin-cool-gray)] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/60 rounded-lg backdrop-blur-sm">
                  <ShoppingCart className="h-5 w-5 text-neutral-700" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-neutral-900">Đơn hàng gần đây</h2>
                  <p className="text-xs text-neutral-600 mt-0.5">5 đơn hàng mới nhất</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {recentOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                    <p className="text-sm text-neutral-400">Chưa có đơn hàng nào</p>
                  </div>
                ) : (
                  recentOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status)

                    return (
                      <Link
                        key={order.id}
                        href="/admin/orders"
                        className="group block p-4 rounded-xl border border-[var(--admin-neutral-gray)]/50 hover:border-[var(--admin-taupe)] bg-white hover:bg-[var(--admin-hover-bg)] transition-all duration-200 hover:shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--admin-beige)] flex items-center justify-center group-hover:bg-[var(--admin-beige)]/80 transition-colors">
                              <ShoppingCart className="h-4 w-4 text-neutral-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-neutral-900 truncate group-hover:text-neutral-950">
                                {order.orderNumber}
                              </p>
                              <p className="text-xs text-neutral-500 mt-1 flex items-center gap-2">
                                <span>{order.customerName}</span>
                                <span>•</span>
                                <span>{formatDate(order.createdAt)}</span>
                              </p>
                            </div>
                          </div>
                          <div className="ml-4 text-right flex-shrink-0">
                            <p className="text-sm font-bold text-neutral-900 mb-1.5">
                              {formatVND(order.total)}
                            </p>
                            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                )}
              </div>
              {recentOrders.length > 0 && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <Link
                    href="/admin/orders"
                    className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1"
                  >
                    Xem tất cả đơn hàng
                    <span className="text-neutral-400">→</span>
                  </Link>
                </div>
              )}
            </div>
          </Card>

          {/* Best Selling Products */}
          <Card className="border border-neutral-200/50 shadow-sm bg-white overflow-hidden">
            <div className="bg-[var(--admin-lavender)] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/60 rounded-lg backdrop-blur-sm">
                  <Package className="h-5 w-5 text-neutral-700" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-neutral-900">Sản phẩm bán chạy</h2>
                  <p className="text-xs text-neutral-600 mt-0.5">Top 5 sản phẩm</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {bestSellingProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                    <p className="text-sm text-neutral-400">Chưa có dữ liệu bán hàng</p>
                  </div>
                ) : (
                  bestSellingProducts.map((product, index) => {
                    const medalColors = [
                      'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white',
                      'bg-gradient-to-br from-neutral-300 to-neutral-400 text-white',
                      'bg-gradient-to-br from-amber-600 to-amber-700 text-white',
                      'bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-600',
                      'bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-600',
                    ]

                    return (
                      <Link
                        key={product.id}
                        href="/admin/products"
                        className="group block p-4 rounded-xl border border-[var(--admin-neutral-gray)]/50 hover:border-[var(--admin-taupe)] bg-white hover:bg-[var(--admin-hover-bg)] transition-all duration-200 hover:shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm ${
                              index === 0 ? 'bg-[var(--admin-lavender)] text-neutral-700'
                              : index === 1 ? 'bg-[var(--admin-cool-gray)] text-neutral-700'
                              : index === 2 ? 'bg-[var(--admin-beige)] text-neutral-700'
                              : 'bg-[var(--admin-taupe)] text-neutral-600'
                            }`}>
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-neutral-900 truncate group-hover:text-neutral-950">
                                {product.name}
                              </p>
                              <p className="text-xs text-neutral-500 mt-1 flex items-center gap-2">
                                <span>{product.quantity}</span>
                                <span>sản phẩm đã bán</span>
                              </p>
                            </div>
                          </div>
                          <div className="ml-4 text-right flex-shrink-0">
                            <p className="text-sm font-bold text-neutral-900">
                              {formatVND(product.revenue)}
                            </p>
                            <p className="text-xs text-neutral-500 mt-0.5">doanh thu</p>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                )}
              </div>
              {bestSellingProducts.length > 0 && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <Link
                    href="/admin/products"
                    className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1"
                  >
                    Xem tất cả sản phẩm
                    <span className="text-neutral-400">→</span>
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
