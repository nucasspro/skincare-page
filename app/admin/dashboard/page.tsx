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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Danh mục',
      value: stats.totalCategories.toString(),
      icon: FolderTree,
      href: '/admin/categories',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Người dùng',
      value: stats.totalUsers.toString(),
      icon: Users,
      href: '/admin/users',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Đơn hàng',
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      name: 'Doanh thu tháng',
      value: `$${stats.monthlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      name: 'Tăng trưởng',
      value: stats.growth,
      icon: TrendingUp,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
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
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Tổng quan hệ thống quản lý</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat) => {
            const StatCard = (
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng gần đây</h2>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500 text-sm">
                Dữ liệu đơn hàng sẽ hiển thị ở đây
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sản phẩm bán chạy</h2>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500 text-sm">
                Dữ liệu sản phẩm bán chạy sẽ hiển thị ở đây
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
