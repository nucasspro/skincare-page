'use client'

export function DashboardHeader() {
  const getCurrentGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Chào buổi sáng'
    if (hour < 18) return 'Chào buổi chiều'
    return 'Chào buổi tối'
  }

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-neutral-900">
        {getCurrentGreeting()} 👋
      </h1>
      <p className="text-sm text-neutral-600 mt-1">
        Quản lý cửa hàng mỹ phẩm của bạn
      </p>
    </div>
  )
}

