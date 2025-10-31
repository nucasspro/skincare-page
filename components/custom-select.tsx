"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check, Search, Loader2 } from "lucide-react"

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  icon?: any
  label: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  required?: boolean
  searchable?: boolean
  emptyMessage?: string
}

export function CustomSelect({
  icon: Icon,
  label,
  value,
  onChange,
  options,
  placeholder = "Chọn...",
  disabled = false,
  loading = false,
  required = false,
  searchable = true,
  emptyMessage = "Không có dữ liệu"
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const selectedOption = options.find(opt => opt.value === value)
  const isEmpty = !value || value === ""

  // Filter options based on search query
  const filteredOptions = options.filter(option => {
    if (!searchQuery) return true
    if (option.value === "") return false
    return option.label.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery("")
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
  }, [isOpen, searchable])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
    setSearchQuery("")
  }

  const toggleDropdown = () => {
    if (!disabled && !loading) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2.5 flex items-center gap-2">
        {Icon && (
          <Icon className={`w-4 h-4 transition-colors duration-200 ${
            disabled || loading ? "text-gray-300" : "text-gray-500"
          }`} />
        )}
        <span className="p-desc text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>

      {/* Select Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled || loading}
        className={`
          w-full px-4 py-3.5 
          flex items-center justify-between gap-3
          border rounded-xl
          text-left
          transition-all duration-200
          text-[15px]
          leading-relaxed
          ${
            disabled || loading
              ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
              : isEmpty
              ? "border-stone-200 bg-white text-gray-400 hover:border-stone-300 hover:shadow-sm focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20"
              : "border-stone-200 bg-white text-gray-900 hover:border-stone-300 hover:shadow-sm focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 shadow-sm"
          }
          ${isOpen ? "border-gray-900 ring-2 ring-gray-900/20 shadow-md" : ""}
        `}
      >
        <span className="truncate">
          {loading ? "Đang tải..." : selectedOption?.label || placeholder}
        </span>
        
        <div className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          {loading ? (
            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && !loading && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
          {/* Search Input */}
          {searchable && options.length > 5 && (
            <div className="p-3 border-b border-gray-100 bg-gray-50/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 bg-white"
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto overscroll-contain">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-400 text-sm">
                {searchQuery ? `Không tìm thấy "${searchQuery}"` : emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value
                const isPlaceholder = option.value === ""

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    disabled={isPlaceholder}
                    className={`
                      w-full px-4 py-3
                      flex items-center justify-between gap-3
                      text-left text-[15px]
                      transition-colors duration-150
                      ${isPlaceholder 
                        ? "text-gray-400 cursor-default bg-gray-50/50" 
                        : isSelected
                        ? "bg-gray-900 text-white font-medium"
                        : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                      }
                    `}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && !isPlaceholder && (
                      <Check className="w-4 h-4 flex-shrink-0" />
                    )}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

