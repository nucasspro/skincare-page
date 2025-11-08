"use client"

export interface NavigationFilterBarProps {
  categories: Record<string, string>
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

/**
 * Display order for categories (by slug)
 * This ensures consistent ordering regardless of object key order
 */
const CATEGORY_DISPLAY_ORDER = [
  'all',                    // Tất cả (always first)
  'da-mun-nhay-cam',        // Da mụn nhạy cảm
  'da-dau',                 // Da dầu
  'da-kho',                 // Da khô
  'ngan-ngua-lao-hoa',      // Ngăn ngừa lão hoá
]

export function NavigationFilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
}: NavigationFilterBarProps) {
  // Sort categories according to display order
  const sortedCategories = Object.entries(categories).sort(([keyA], [keyB]) => {
    const indexA = CATEGORY_DISPLAY_ORDER.indexOf(keyA)
    const indexB = CATEGORY_DISPLAY_ORDER.indexOf(keyB)

    // If both are in the order list, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }
    // If only A is in the list, A comes first
    if (indexA !== -1) return -1
    // If only B is in the list, B comes first
    if (indexB !== -1) return 1
    // If neither is in the list, maintain original order
    return 0
  })

  return (
    <div className="relative bg-transparent py-4 sm:py-5 md:py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide flex-wrap">
          {sortedCategories.map(([key, label]) => (
            <button
              key={key}
              onClick={() => onCategoryChange(key)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${
                selectedCategory === key
                  ? "bg-stone-900 text-white shadow-md"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
