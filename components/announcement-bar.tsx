"use client"

import { X } from "lucide-react"
import { useState } from "react"
import { useI18n } from "@/lib/i18n-context"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const { t } = useI18n()

  if (!isVisible) return null

  return (
    <div className="relative bg-stone-800 text-white py-2.5 px-4 text-center text-sm">
      <p className="font-light tracking-wide">{t.announcement.freeShipping}</p>
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
