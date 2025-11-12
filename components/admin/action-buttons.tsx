'use client'

import { Button } from '@/components/ui/button'
import { Edit, Eye, Trash2 } from 'lucide-react'

interface ActionButtonsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  disabled?: {
    view?: boolean
    edit?: boolean
    delete?: boolean
  }
  className?: string
}

export function ActionButtons({
  onView,
  onEdit,
  onDelete,
  disabled = {},
  className = ''
}: ActionButtonsProps) {
  const isEditDisabled = !onEdit || disabled.edit
  const isDeleteDisabled = !onDelete || disabled.delete
  const isViewDisabled = !onView || disabled.view

  return (
    <div className={`flex gap-2 justify-start ${className}`} onClick={(e) => e.stopPropagation()}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onView}
        disabled={isViewDisabled}
        className="rounded-md h-9 w-9 bg-[var(--admin-cool-gray)]/20 hover:bg-[var(--admin-cool-gray)]/40 border border-[var(--admin-cool-gray)]/30 hover:border-[var(--admin-cool-gray)]/50 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--admin-cool-gray)]/20"
        title={isViewDisabled ? 'Không có quyền xem' : 'Xem chi tiết'}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit || (() => {})}
        disabled={isEditDisabled}
        className="rounded-md h-9 w-9 bg-[var(--admin-beige)]/20 hover:bg-[var(--admin-beige)]/40 border border-[var(--admin-beige)]/30 hover:border-[var(--admin-beige)]/50 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--admin-beige)]/20"
        title={isEditDisabled ? 'Không có quyền sửa' : 'Sửa'}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete || (() => {})}
        disabled={isDeleteDisabled}
        className="rounded-md h-9 w-9 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-50"
        title={isDeleteDisabled ? 'Không có quyền xóa' : 'Xóa'}
      >
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  )
}
