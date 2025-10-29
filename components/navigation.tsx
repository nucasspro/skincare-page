"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n-context"
import { useCart } from "@/lib/cart-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SearchModal } from "@/components/search-modal"

export function Navigation() {
  const { t } = useI18n()
  const { getTotalItems } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Mark as hydrated
    setIsHydrated(true)
  }, [])

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    if (!isHydrated) return

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isHydrated])

  return (
    <header
      className={`relative bg-white transition-all duration-300`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile Menu Button - Left */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo - Left on Desktop, Center on Mobile */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0 flex items-center"
          >
            <Image
              src="/logo/logo-black.png"
              alt="CELLIC"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Center/Right */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-8">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                {t.nav.home}
              </Link>

              {/* Products Link */}
              <Link
                href="/products"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t.nav.products}
              </Link>

              <Link
                href="/brand-story"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t.nav.brandStory}
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 ml-8 pl-8 border-l border-gray-200">
              <LanguageSwitcher />

              <SearchModal />

              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-gray-700 hover:text-gray-900 hover:bg-gray-100 relative"
                  aria-label={t.nav.cart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </Link>

            </div>
          </div>

          {/* Mobile Icons - Right */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />

            <SearchModal />

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-700 hover:text-gray-900 relative"
                aria-label={t.nav.cart}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="py-4 space-y-4 border-t border-gray-200">
            <Link
              href="/"
              className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.home}
            </Link>

            {/* Products Link */}
            <Link
              href="/products"
              className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.products}
            </Link>


          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
