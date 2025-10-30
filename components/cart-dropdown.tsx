"use client"

import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/currency-util"
import { ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function CartDropdown() {
  const { items, removeItem, getTotalItems, getTotalPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative group/cart">
      {/* Cart Icon Button */}
      <button
        className="h-9 w-9 relative text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-medium">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Dropdown Tooltip */}
      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-stone-200 opacity-0 invisible group-hover/cart:opacity-100 group-hover/cart:visible transition-all duration-200 z-50 pointer-events-none group-hover/cart:pointer-events-auto">
        {/* Tooltip Arrow */}
        <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-r border-stone-200 rotate-45" />

        <div className="p-6 border-b border-stone-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Giỏ hàng của bạn
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {getTotalItems()} sản phẩm
          </p>
        </div>

        {/* Items List */}
        {items.length > 0 ? (
          <>
            <div className="max-h-96 overflow-y-auto">
              <div className="p-4 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-3 border-b border-stone-100 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">
                        {item.tagline}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {formatCurrency(item.price)} × {item.quantity}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-1"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer - Total and CTA */}
            <div className="p-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Tổng cộng:
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(getTotalPrice())}
                </span>
              </div>

              <Link
                href="/cart"
                className="block w-full py-2.5 bg-stone-900 text-white text-sm font-medium text-center rounded-lg hover:bg-stone-800 transition-colors"
              >
                Xem giỏ hàng
              </Link>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <ShoppingCart className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">Giỏ hàng trống</p>
            <Link
              href="/products"
              className="inline-block mt-4 text-sm font-medium text-stone-900 hover:text-stone-700 transition-colors"
            >
              Tiếp tục mua sắm →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
