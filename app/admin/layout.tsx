'use client'

import type React from "react"
import { useEffect } from "react"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    // Add AdminLTE body classes
    document.body.classList.add('layout-fixed', 'sidebar-expand-lg', 'sidebar-open', 'bg-body-tertiary')
    
    return () => {
      // Cleanup on unmount
      document.body.classList.remove('layout-fixed', 'sidebar-expand-lg', 'sidebar-open', 'bg-body-tertiary')
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}

