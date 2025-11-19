"use client"

import { useContactSettings } from "@/hooks/use-settings"
import { X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { HotlineIcon } from "./icons/hotline-icon"
import { MessengerIcon } from "./icons/messenger-icon"
import { ZaloIcon } from "./icons/zalo-icon"

export function QuickContact() {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin")) {
    return null
  }

  const [isExpanded, setIsExpanded] = useState(false)
  const { contactInfo, loading } = useContactSettings()

  const handleContact = (type: "zalo" | "hotline" | "messenger") => {
    switch (type) {
      case "zalo":
        if (contactInfo.zalo) {
          // Remove any non-numeric characters for Zalo ID
          const zaloId = contactInfo.zalo.replace(/\D/g, "")
          window.open(`https://zalo.me/${zaloId}`, "_blank")
        }
        break
      case "hotline":
        if (contactInfo.hotline) {
          // Remove any non-numeric characters except + for phone
          const phone = contactInfo.hotline.replace(/[^\d+]/g, "")
          window.location.href = `tel:${phone}`
        }
        break
      case "messenger":
        if (contactInfo.messenger) {
          window.open(contactInfo.messenger, "_blank")
        }
        break
    }
  }

  // Hide component if no contact info is available or still loading
  const hasContactInfo =
    contactInfo.zalo || contactInfo.hotline || contactInfo.messenger

  if (!hasContactInfo && !loading) {
    return null
  }

  // Show loading state or hide if no data
  if (loading && !hasContactInfo) {
    return null
  }

  return (
    <div className="fixed bottom-20 right-4 z-[49] lg:bottom-6 lg:right-6">
      {isExpanded ? (
        /* Expanded state: Icons + Close button in horizontal layout */
        <div className="flex flex-row items-center gap-3 animate-in fade-in">
          {/* Zalo button */}
          {contactInfo.zalo && (
            <button
              onClick={() => handleContact("zalo")}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group border border-gray-200"
              aria-label="Liên hệ Zalo"
              title="Zalo"
            >
              <ZaloIcon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110" />
            </button>
          )}

          {/* Hotline button */}
          {contactInfo.hotline && (
            <button
              onClick={() => handleContact("hotline")}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group border border-gray-200"
              aria-label="Gọi hotline"
              title="Hotline"
            >
              <HotlineIcon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110" />
            </button>
          )}

          {/* Messenger button */}
          {contactInfo.messenger && (
            <button
              onClick={() => handleContact("messenger")}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group border border-gray-200"
              aria-label="Liên hệ Messenger"
              title="Messenger"
            >
              <MessengerIcon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110" />
            </button>
          )}

          {/* Close button - smaller, amber brown color */}
          <button
            onClick={() => setIsExpanded(false)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group border border-gray-200"
            aria-label="Đóng liên hệ"
            title="Đóng"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700 transition-transform group-hover:rotate-90" />
          </button>
        </div>
      ) : (
        /* Collapsed state: Flat, elongated "Liên hệ" button - cream white background */
        <button
          onClick={() => setIsExpanded(true)}
          className="h-9 sm:h-10 px-6 sm:px-8 rounded-full bg-[#faf8f5] hover:bg-[#f5f3f0] text-amber-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group active:scale-95"
          aria-label="Mở liên hệ"
        >
          <span className="text-sm sm:text-base font-medium whitespace-nowrap text-amber-700">Liên hệ</span>
        </button>
      )}
    </div>
  )
}
