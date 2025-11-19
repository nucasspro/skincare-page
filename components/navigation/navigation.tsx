"use client"

import { CartDropdown } from "@/components/cart/cart-dropdown"
import { SearchModal } from "@/components/search/search-modal"
import { useCart } from "@/lib/cart-context"
import { useI18n } from "@/lib/i18n-context"
import { getNavigationFont } from "@/lib/utils/font-utils"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface NavigationProps {
  isTransparent?: boolean
  isHomePage?: boolean
  disableSticky?: boolean
}

export function Navigation({ isTransparent = true, isHomePage = false, disableSticky = false }: NavigationProps) {
  const { t } = useI18n()
  const { getTotalItems } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [passedBanner, setPassedBanner] = useState(false) // true khi scroll qua 30px
  const [isHeaderHovered, setIsHeaderHovered] = useState(false) // track hover state

  const menuBaseClass =
    "relative text-base md:text-lg font-semibold tracking-wide uppercase transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-gray-900 after:transition-all after:duration-300"

  const menuLinkClass = getNavigationFont(
    `${menuBaseClass} ${
      isSticky
        ? "text-gray-800 hover:text-black"
        : isTransparent
          ? "text-white hover:text-black group-hover:text-black"
          : "text-gray-800 hover:text-black"
    }`
  )

  // Determine logo based on isHomePage, sticky state, and hover state
  const logoSrc = isHomePage && !isSticky && !isHeaderHovered ? "/logo/logo-white.svg" : "/logo/logo-black.svg"

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

    if (disableSticky) {
      // If disableSticky, always keep it fixed with white background at top-[30px] (below promotion banner)
      setIsSticky(true)
      setPassedBanner(false) // false để giữ top-[30px], đặt navigation ngay dưới banner
      return
    }

    const onScroll = () => {
      const y = window.scrollY
      setIsSticky(y > 10)
      setPassedBanner(y >= 30)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHydrated, disableSticky])

  return (
    <>
      <header
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        className={`${isSticky ? "fixed" : "absolute"} ${passedBanner ? "top-0" : "top-[30px]"} left-0 right-0 z-50 transition-all duration-300 ${isSticky ? "bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm" : isTransparent ? "bg-transparent hover:bg-white border-b border-transparent hover:border-gray-100" : "bg-white border-b border-gray-100"} group ${!isSticky && isTransparent ? "is-transparent" : ""}`}
      >
        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center gap-4">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 -ml-2 transition-colors ${
                isSticky || !isTransparent
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200 group-hover:text-black"
              }`}
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
                src={logoSrc}
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
            <div className={`hidden md:flex items-center gap-4 ml-auto pl-6 border-l ${isSticky ? "border-gray-200 text-gray-700" : isTransparent ? "border-white/30 text-white group-hover:text-black group-hover:border-gray-200" : "border-gray-200 text-gray-700"}`}>
              {/* <LanguageSwitcher /> */}

              <SearchModal />

              <CartDropdown />
            </div>

            {/* Mobile Icons - Right */}
            <div className="flex md:hidden items-center gap-2 ml-auto">
              {/* <LanguageSwitcher /> */}

              <SearchModal />

              <CartDropdown />
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className="py-4 space-y-4 border-t border-gray-200">
              {/* Products Link */}
              <Link
                href="/products"
                className={getNavigationFont(
                  "relative block py-2 text-base font-semibold uppercase tracking-wide text-gray-700 hover:text-gray-900 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-gray-900 after:transition-all after:duration-300"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.products}
              </Link>

              <Link
                href="/brand-story"
                className={getNavigationFont(
                  "relative block py-2 text-base font-semibold uppercase tracking-wide text-gray-700 hover:text-gray-900 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-gray-900 after:transition-all after:duration-300"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.brandStory}
              </Link>

              <Link
                href="/contact"
                className={getNavigationFont(
                  "relative block py-2 text-base font-semibold uppercase tracking-wide text-gray-700 hover:text-gray-900 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-gray-900 after:transition-all after:duration-300"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Liên hệ
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <style jsx>{`
        /* Khi header trong suốt: force màu trắng cho mọi nút bên phải */
        .is-transparent :global([data-slot="button"]) {
          color: #ffffff;
        }
        .is-transparent :global([data-slot="button"] svg) {
          stroke: #ffffff;
        }
        .is-transparent :global([data-slot="dropdown-menu-trigger"]) {
          color: #ffffff;
        }
        .is-transparent :global([data-slot="dropdown-menu-trigger"] svg) {
          stroke: #ffffff;
        }
        /* Hover toàn header: chuyển text/icon đen */
        .group:hover :global([data-slot="button"]) {
          color: #000000;
        }
        .group:hover :global([data-slot="button"] svg) {
          stroke: #000000;
        }
        .group:hover :global([data-slot="dropdown-menu-trigger"]) {
          color: #000000;
        }
        .group:hover :global([data-slot="dropdown-menu-trigger"] svg) {
          stroke: #000000;
        }
      `}</style>
    </>
  )
}

export default Navigation
