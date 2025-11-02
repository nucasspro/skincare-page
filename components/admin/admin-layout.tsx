'use client'

import { cn } from '@/lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  FolderTree,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  ShoppingCart,
  Users,
  X
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Sản phẩm', href: '/admin/products', icon: Package },
  { name: 'Danh mục', href: '/admin/categories', icon: FolderTree },
  { name: 'Người dùng', href: '/admin/users', icon: Users },
  { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Đăng xuất thành công')
        router.push('/admin/login')
        router.refresh()
      } else {
        toast.error('Đăng xuất thất bại')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Có lỗi xảy ra khi đăng xuất')
    }
  }

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed')
    if (saved !== null) {
      setSidebarCollapsed(JSON.parse(saved))
    }
  }, [])

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('admin-sidebar-collapsed', JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const sidebarWidth = sidebarCollapsed ? 'w-16' : 'w-56'
  const contentPadding = sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-56'

  return (
    <div className="min-h-screen bg-[var(--admin-cool-gray)]/10" data-admin>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 bg-white border-r border-[var(--admin-neutral-gray)]/50 shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          sidebarWidth
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--admin-neutral-gray)]/30 bg-gradient-to-r from-[var(--admin-lavender)]/20 to-white">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[var(--admin-beige)]">
                  <LayoutDashboard className="h-4 w-4 text-neutral-700" />
                </div>
                <h1 className="text-base font-bold text-neutral-900 tracking-tight">Admin</h1>
              </div>
            )}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleSidebar}
                className="hidden lg:flex text-[var(--admin-cool-gray)] hover:text-neutral-900 p-2 rounded-md hover:bg-[var(--admin-hover-bg)] transition-all cursor-pointer"
                title={sidebarCollapsed ? 'Mở rộng' : 'Thu nhỏ'}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-[var(--admin-cool-gray)] hover:text-neutral-900 p-2 rounded-md hover:bg-[var(--admin-hover-bg)] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer',
                    isActive
                      ? 'text-neutral-900 bg-[var(--admin-beige)]'
                      : 'text-neutral-700 hover:text-neutral-900 hover:bg-[var(--admin-hover-bg)]',
                    sidebarCollapsed && 'justify-center'
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  {/* Icon container */}
                  <div
                    className={cn(
                      'p-1.5 rounded-md transition-colors',
                      isActive
                        ? 'bg-white/40'
                        : 'bg-[var(--admin-cool-gray)]/10 group-hover:bg-[var(--admin-cool-gray)]/20'
                    )}
                  >
                    <item.icon className={cn(
                      'h-4 w-4 shrink-0 transition-colors',
                      isActive
                        ? 'text-neutral-900'
                        : 'text-neutral-600 group-hover:text-neutral-900'
                    )} />
                  </div>

                  {!sidebarCollapsed && (
                    <span className="truncate">
                      {item.name}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className={contentPadding}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[var(--admin-neutral-gray)]/50 shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[var(--admin-cool-gray)] hover:text-neutral-900 p-2 rounded-md hover:bg-[var(--admin-hover-bg)] transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="group flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:text-neutral-900 hover:bg-[var(--admin-hover-bg)] rounded-lg border border-[var(--admin-neutral-gray)]/30 hover:border-[var(--admin-taupe)]/50 transition-all cursor-pointer"
              >
                <LogOut className="h-4 w-4 group-hover:rotate-[-15deg] transition-transform" />
                <span className="font-medium">Đăng xuất</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
