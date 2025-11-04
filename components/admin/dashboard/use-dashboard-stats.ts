import { useState, useEffect } from 'react'
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

export function useDashboardStats() {
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

  return {
    stats,
    recentOrders,
    bestSellingProducts,
    loading,
    refresh: () => fetchStats(true),
  }
}

