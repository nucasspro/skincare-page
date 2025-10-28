"use client"

import { X } from "lucide-react"
import { useState } from "react"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-stone-800 text-white py-2.5 px-4 text-center text-sm">
      <p className="font-light tracking-wide">
        Free shipping on orders over <span className="font-medium">$50</span> • Use code{" "}
        <span className="font-medium">GLOW20</span> for 20% off
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
        aria-label="Close announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
