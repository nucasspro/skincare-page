'use client'

import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200">
      <div className="text-sm text-neutral-600">
        Hiển thị {startIndex + 1}-{endIndex} trong tổng {totalItems}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="h-8 px-3 text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          Trước
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Show first page, last page, current page, and pages around current
            const isFirstOrLast = page === 1 || page === totalPages
            const isAroundCurrent = page >= currentPage - 1 && page <= currentPage + 1
            const isEllipsis = page === currentPage - 2 || page === currentPage + 2

            if (isFirstOrLast || isAroundCurrent) {
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className={`h-8 w-8 p-0 text-sm cursor-pointer ${
                    currentPage === page
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                      : ''
                  }`}
                >
                  {page}
                </Button>
              )
            } else if (isEllipsis) {
              return (
                <span key={page} className="text-neutral-400 px-1">
                  ...
                </span>
              )
            }
            return null
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="h-8 px-3 text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sau
        </Button>
      </div>
    </div>
  )
}
