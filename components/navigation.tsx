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
  const [isSticky, setIsSticky] = useState(false)
  const [passedBanner, setPassedBanner] = useState(false) // true khi scroll qua 30px
  const menuLinkClass = "relative font-air text-base md:text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-gray-900 after:transition-all after:duration-300"

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

  // Sticky on scroll: make header fixed below promo banner (30px)
  useEffect(() => {
    if (!isHydrated) return
    const onScroll = () => {
      const y = window.scrollY
      setIsSticky(y > 10)
      setPassedBanner(y >= 30)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHydrated])

  return (
    <header
      className={`${isSticky ? "fixed" : "absolute"} ${passedBanner ? "top-0" : "top-[30px]"} left-0 right-0 z-50 transition-all duration-300 ${isSticky ? "bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm" : "bg-transparent hover:bg-white border-b border-transparent hover:border-gray-100"}`}
    >
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center gap-4">
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
            className="flex items-center min-w-0"
          >
            <Image
              src="/logo/logo-black.svg"
              alt="CELLIC"
              width={320}
              height={80}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Right of Logo */}
          <div className="hidden md:flex items-center gap-8 flex-none ml-[50px]">
            <div className="flex items-center gap-8">
              <Link href="/about" className={menuLinkClass}>
                Giới thiệu
              </Link>

              {/* Products Link */}
              <Link
                href="/products"
                className={menuLinkClass}
              >
                {t.nav.products}
              </Link>

              <Link
                href="/brand-story"
                className={menuLinkClass}
              >
                {t.nav.brandStory}
              </Link>

              <Link
                href="/contact"
                className={menuLinkClass}
              >
                Liên hệ
              </Link>
            </div>
          </div>

          {/* Desktop Icons - Far Right */}
          <div className="hidden md:flex items-center gap-4 ml-auto pl-6 border-l border-gray-200">
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

          {/* Mobile Icons - Right */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
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
              href="/about"
              className="relative font-air block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-gray-900 after:transition-all after:duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Giới thiệu
            </Link>

            {/* Products Link */}
            <Link
              href="/products"
              className="relative font-air block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-gray-900 after:transition-all after:duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.products}
            </Link>

            <Link
              href="/brand-story"
              className="relative font-air block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-gray-900 after:transition-all after:duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.brandStory}
            </Link>

            <Link
              href="/contact"
              className="relative font-air block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-gray-900 after:transition-all after:duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
