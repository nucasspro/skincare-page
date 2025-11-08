"use client"

import { usePathname } from "next/navigation"
import { PromotionBanner } from "./promotion-banner"

export function PromotionBannerWrapper() {
  const pathname = usePathname()
  
  // Ẩn banner trong admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return <PromotionBanner />
}

