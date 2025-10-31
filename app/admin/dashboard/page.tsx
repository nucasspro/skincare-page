'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { Card } from '@/components/ui/card'
import { DollarSign, FolderTree, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Stats {
  totalProducts: number
  totalCategories: number
  totalUsers: number
  totalOrders: number
  monthlyRevenue: number
  growth: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalOrders: 0,
    monthlyRevenue: 0,
    growth: '+0%',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, categoriesRes, usersRes, ordersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/admin/categories'),
          fetch('/api/admin/users'),
          fetch('/api/admin/orders'),
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

        const totalProducts = products.data?.length || 0
        const totalCategories = categories.data?.length || 0
        const totalUsers = users.data?.length || 0
        const totalOrders = orders.data?.length || 0

        // Calculate monthly revenue
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const monthlyOrders = (orders.data || []).filter((order: any) => {
          const orderDate = new Date(order.createdAt * 1000)
          return orderDate >= startOfMonth && order.status !== 'cancelled'
        })
        const monthlyRevenue = monthlyOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)

        setStats({
          totalProducts,
          totalCategories,
          totalUsers,
          totalOrders,
          monthlyRevenue,
          growth: '+12.5%', // Placeholder
        })
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
      name: 'Doanh thu tháng',
      value: `$${stats.monthlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((stat) => {
            const StatCard = (
              <Card className="p-5 hover:shadow-sm transition-shadow border-neutral-200 cursor-pointer bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{stat.name}</p>
                    <p className="mt-2 text-2xl font-semibold text-neutral-900">{stat.value}</p>
                  </div>
                  <div className="p-2 rounded bg-neutral-100">
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
            <div className="space-y-4">
              <div className="text-center py-12 text-neutral-400 text-xs">
                Dữ liệu đơn hàng sẽ hiển thị ở đây
              </div>
            </div>
          </Card>

          <Card className="p-5 border-neutral-200 bg-white">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Sản phẩm bán chạy</h2>
            <div className="space-y-4">
              <div className="text-center py-12 text-neutral-400 text-xs">
                Dữ liệu sản phẩm bán chạy sẽ hiển thị ở đây
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
