"use client"

export interface NavigationFilterBarProps {
  categories: Record<string, string>
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function NavigationFilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
}: NavigationFilterBarProps) {
  return (
    <div className="relative bg-transparent py-4 sm:py-5 md:py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide flex-wrap">
          {/* All Categories Badge */}
          <button
            onClick={() => onCategoryChange("all")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${
              selectedCategory === "all"
                ? "bg-stone-900 text-white shadow-md"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Tất cả
          </button>

          {/* Category Badges */}
          {Object.entries(categories)
            .filter(([key]) => key !== "all")
            .map(([key, label]) => (
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
