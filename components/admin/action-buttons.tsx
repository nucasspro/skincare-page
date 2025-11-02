'use client'

import { Button } from '@/components/ui/button'
import { Edit, Eye, Trash2 } from 'lucide-react'

interface ActionButtonsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}

export function ActionButtons({ onView, onEdit, onDelete, className = '' }: ActionButtonsProps) {
  return (
    <div className={`flex gap-2 justify-start ${className}`} onClick={(e) => e.stopPropagation()}>
      {onView && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onView}
          className="rounded-md h-9 w-9 cursor-pointer bg-[var(--admin-cool-gray)]/20 hover:bg-[var(--admin-cool-gray)]/40 border border-[var(--admin-cool-gray)]/30 hover:border-[var(--admin-cool-gray)]/50 transition-all shadow-sm hover:shadow-md"
          title="Xem chi tiết"
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}
      {onEdit && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="rounded-md h-9 w-9 cursor-pointer bg-[var(--admin-beige)]/20 hover:bg-[var(--admin-beige)]/40 border border-[var(--admin-beige)]/30 hover:border-[var(--admin-beige)]/50 transition-all shadow-sm hover:shadow-md"
          title="Sửa"
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="rounded-md h-9 w-9 cursor-pointer bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 transition-all shadow-sm hover:shadow-md"
          title="Xóa"
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      )}
    </div>
  )
}
