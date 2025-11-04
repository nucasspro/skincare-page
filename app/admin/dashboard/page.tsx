'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { DashboardHeader } from '@/components/admin/dashboard/dashboard-header'
import { StatsCards } from '@/components/admin/dashboard/stats-cards'
import { RecentOrders } from '@/components/admin/dashboard/recent-orders'
import { BestSellingProducts } from '@/components/admin/dashboard/best-selling-products'
import { useDashboardStats } from '@/components/admin/dashboard/use-dashboard-stats'

export default function AdminDashboard() {
  const { stats, recentOrders, bestSellingProducts, loading, refresh } = useDashboardStats()

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
            <div className="text-sm text-neutral-600">Đang tải dữ liệu...</div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <DashboardHeader />
      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={recentOrders} loading={loading} onRefresh={refresh} />
        <BestSellingProducts products={bestSellingProducts} />
      </div>
    </AdminLayout>
  )
}
