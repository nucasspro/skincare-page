import { useEffect, useState } from 'react'

interface UsePaginationProps<T> {
  items: T[]
  itemsPerPage?: number
  dependencies?: any[] // Dependencies to reset pagination
}

export function usePagination<T>({
  items,
  itemsPerPage = 10,
  dependencies = [],
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = items.slice(startIndex, endIndex)

  // Reset to page 1 when dependencies change (e.g., search, filter)
  useEffect(() => {
    setCurrentPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return {
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,
    startIndex,
    endIndex,
  }
}

