"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Facebook, Youtube } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { t } = useI18n()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <footer className="bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-stone-700">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-light mb-3 text-balance">{t.footer.newsletter.title}</h3>
            <p className="text-stone-400 mb-6 text-pretty">{t.footer.newsletter.description}</p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t.footer.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-500 focus:border-stone-500"
              />
              <Button type="submit" className="bg-stone-100 text-stone-900 hover:bg-stone-200 whitespace-nowrap">
                {isSubscribed ? "Subscribed!" : t.footer.newsletter.button}
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h4 className="text-lg font-medium mb-4">{t.footer.about.title}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/brand-story" className="text-stone-400 hover:text-stone-100 transition-colors">
                  {t.brandStory.title}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-400 hover:text-stone-100 transition-colors">
                  {t.footer.about.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-400 hover:text-stone-100 transition-colors">
                  {t.footer.about.contact}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-stone-400 hover:text-stone-100 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h4 className="text-lg font-medium mb-4">{t.footer.customerService.title}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-stone-400 hover:text-stone-100 transition-colors">
                  {t.footer.customerService.faqs}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-stone-400 hover:text-stone-100 transition-colors">
                  {t.footer.about.shippingReturns}
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-stone-400 hover:text-stone-100 transition-colors">
                  {t.footer.customerService.trackOrder}
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-stone-400 hover:text-stone-100 transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div>
            <h4 className="text-lg font-medium mb-4">{t.footer.shop.title}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products/cleansers" className="text-stone-400 hover:text-stone-100 transition-colors">
                  {t.footer.shop.cleansers}
                </Link>
              </li>
              <li>
                <Link href="/products/serums" className="text-stone-400 hover:text-stone-100 transition-colors">
                  {t.footer.shop.serums}
                </Link>
              </li>
              <li>
                <Link href="/products/moisturizers" className="text-stone-400 hover:text-stone-100 transition-colors">
                  {t.footer.shop.moisturizers}
                </Link>
              </li>
              <li>
                <Link href="/products/sunscreen" className="text-stone-400 hover:text-stone-100 transition-colors">
                  {t.footer.shop.suncare}
                </Link>
              </li>
              <li>
                <Link href="/products/masks" className="text-stone-400 hover:text-stone-100 transition-colors">
                  {t.footer.shop.masks}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-lg font-medium mb-4">{t.footer.connect.title}</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-stone-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-stone-100 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-stone-100 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-stone-100 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-sm text-stone-400 mb-3">{t.footer.payment.title}</p>
              <div className="flex gap-2 flex-wrap">
                <div className="bg-stone-800 px-3 py-2 rounded text-xs font-medium">VISA</div>
                <div className="bg-stone-800 px-3 py-2 rounded text-xs font-medium">MC</div>
                <div className="bg-stone-800 px-3 py-2 rounded text-xs font-medium">AMEX</div>
                <div className="bg-stone-800 px-3 py-2 rounded text-xs font-medium">PayPal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-400 text-sm">{t.footer.copyright}</p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-stone-400 hover:text-stone-100 transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="text-stone-400 hover:text-stone-100 transition-colors">
              {t.footer.terms}
            </Link>
            <Link href="/accessibility" className="text-stone-400 hover:text-stone-100 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
