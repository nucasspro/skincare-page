'use client'

import { Card } from '@/components/ui/card'
import { DollarSign, FolderTree, MessageSquare, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { formatVND } from '@/lib/utils/currency-utils'

interface Stats {
  totalProducts: number
  totalCategories: number
  totalUsers: number
  totalOrders: number
  totalReviews: number
  monthlyRevenue: number
  growth: string
}

interface StatsCardsProps {
  stats: Stats
}

const statConfig = [
  {
    name: 'Tổng sản phẩm',
    key: 'totalProducts' as keyof Stats,
    icon: Package,
    href: '/admin/products',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Danh mục',
    key: 'totalCategories' as keyof Stats,
    icon: FolderTree,
    href: '/admin/categories',
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Người dùng',
    key: 'totalUsers' as keyof Stats,
    icon: Users,
    href: '/admin/users',
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Đơn hàng',
    key: 'totalOrders' as keyof Stats,
    icon: ShoppingCart,
    href: '/admin/orders',
    color: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Reviews',
    key: 'totalReviews' as keyof Stats,
    icon: MessageSquare,
    href: '/admin/reviews',
    color: 'from-pink-500 to-pink-600',
  },
  {
    name: 'Doanh thu tháng',
    key: 'monthlyRevenue' as keyof Stats,
    icon: DollarSign,
    color: 'from-emerald-500 to-emerald-600',
    isRevenue: true,
  },
  {
    name: 'Tăng trưởng',
    key: 'growth' as keyof Stats,
    icon: TrendingUp,
    color: 'from-indigo-500 to-indigo-600',
    isGrowth: true,
  },
]

export function StatsCards({ stats }: StatsCardsProps) {
  const getValue = (config: typeof statConfig[0]) => {
    const value = stats[config.key]
    if (config.isRevenue && typeof value === 'number') {
      return formatVND(value)
    }
    return value?.toString() || '0'
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statConfig.map((config) => {
        const Icon = config.icon
        const value = getValue(config)

        const cardContent = (
          <Card className={`${config.href ? 'hover:shadow-lg cursor-pointer' : ''} transition-shadow border-0 shadow-md`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${config.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                {config.isGrowth && (
                  <span className={`text-sm font-medium ${stats.growth?.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.growth}
                  </span>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900 mb-1">{value}</p>
                <p className="text-sm text-neutral-600">{config.name}</p>
              </div>
            </div>
          </Card>
        )

        return config.href ? (
          <Link key={config.name} href={config.href}>
            {cardContent}
          </Link>
        ) : (
          <div key={config.name}>
            {cardContent}
          </div>
        )
      })}
    </div>
  )
}
