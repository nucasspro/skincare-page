"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search, ShoppingCart, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useI18n } from "@/lib/i18n-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Navigation() {
  const { t } = useI18n()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
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
            <span className="text-2xl font-light tracking-wider text-gray-900">LUMIÈRE</span>
          </Link>

          {/* Desktop Navigation - Center/Right */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-8">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                {t.nav.home}
              </Link>

              {/* Products Dropdown */}
              <DropdownMenu open={isProductsOpen} onOpenChange={setIsProductsOpen}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors outline-none">
                  {t.nav.products}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white/95 backdrop-blur-md border-gray-200">
                  <DropdownMenuItem asChild>
                    <Link href="/products/category" className="cursor-pointer text-gray-700 hover:text-gray-900">
                      {t.nav.byCategory}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/needs" className="cursor-pointer text-gray-700 hover:text-gray-900">
                      {t.nav.byNeeds}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/brand-story"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t.nav.brandStory}
              </Link>

              <Link href="/media" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                {t.nav.media}
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 ml-8 pl-8 border-l border-gray-200">
              <LanguageSwitcher />

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                aria-label={t.nav.search}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-700 hover:text-gray-900 hover:bg-gray-100 relative"
                aria-label={t.nav.cart}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">
                  0
                </span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                aria-label={t.nav.account}
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Icons - Right */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gray-700 hover:text-gray-900"
              aria-label={t.nav.search}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gray-700 hover:text-gray-900 relative"
              aria-label={t.nav.cart}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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

            {/* Mobile Products Submenu */}
            <div>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center justify-between w-full py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t.nav.products}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isProductsOpen ? "max-h-32 mt-2" : "max-h-0"
                }`}
              >
                <Link
                  href="/products/category"
                  className="block py-2 pl-4 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.byCategory}
                </Link>
                <Link
                  href="/products/needs"
                  className="block py-2 pl-4 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.byNeeds}
                </Link>
              </div>
            </div>

            <Link
              href="/brand-story"
              className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.brandStory}
            </Link>

            <Link
              href="/media"
              className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.media}
            </Link>

            <Link
              href="/account"
              className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors border-t border-gray-200 pt-4 mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.myAccount}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
