"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useContactInfo } from "@/hooks/use-contact-info"
import { useI18n } from "@/lib/i18n-context"
import { getProductTitleFont, getProductDescriptionFont } from "@/lib/utils/font-utils"
import { Building2, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { t } = useI18n()
  const { contactInfo, loading: contactLoading } = useContactInfo()

  // Get contact information from cached/local storage
  const phone = contactInfo.phone
  const emailContact = contactInfo.email
  const address = contactInfo.address

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
    <footer className="bg-stone-900 text-stone-100 pb-20 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-stone-700">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className={getProductTitleFont("text-2xl mb-3 text-balance uppercase")}>{t.footer.newsletter.title}</h3>
            <p className={getProductDescriptionFont("text-stone-400 mb-6 text-pretty")}>{t.footer.newsletter.description}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12 items-start">
          {/* Column 1: Logo - Description - Contact Info */}
          <div className="flex flex-col lg:col-span-4">
            {/* Logo - White logo without border */}
            <Link href="/" className="inline-block mb-4 pl-4 md:pl-0 ml-[31px] md:ml-0">
              <Image
                src="/logo/logo-white.svg"
                alt="CELLIC"
                width={200}
                height={60}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>
            {/* Description */}
            <p className={getProductDescriptionFont("text-stone-400 text-sm mb-6 leading-relaxed")}>
              Cellic đồng hành cùng làn da Việt bằng công nghệ y sinh học chuẩn quốc tế, mang lại giải pháp chăm sóc khoa học, an toàn và bền vững cho từng khách hàng.
            </p>
            {/* Contact Information */}
            <div className="space-y-3.5">
              {/* Distributor Info */}
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                <p className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>Phân phối bởi Công ty TNHH CELLIC</p>
              </div>

              {/* Contact Details */}
              {phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}
                  >
                    {phone}
                  </a>
                </div>
              )}
              {emailContact && (
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                  <a
                    href={`mailto:${emailContact}`}
                    className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}
                  >
                    {emailContact}
                  </a>
                </div>
              )}
              {address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                  <p className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors break-words leading-relaxed")}>{address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Customer Service */}
          <div className="flex flex-col lg:col-span-3">
            <h4 className={getProductTitleFont("text-lg mb-4 uppercase")}>Dịch vụ khách hàng</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
                  Q&A
                </Link>
              </li>
              <li>
                <Link href="/guide" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link href="/shipping" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
                  Chính sách mua hàng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/track-order" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
                  Checking đơn hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div className="flex flex-col lg:col-span-3">
            <h4 className={getProductTitleFont("text-lg mb-4 uppercase")}>Danh mục sản phẩm</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products/sunscreen" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
                  Kem chống nắng
                </Link>
              </li>
              <li>
                <Link href="/products/moisturizers" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
                  Dưỡng Da
                </Link>
              </li>
              <li>
                <Link href="/products/cleansers" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
                  Rửa mặt
                </Link>
              </li>
              <li>
                <Link href="/products/serums" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
                  Serum
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="flex flex-col lg:col-span-2">
            <h4 className={getProductTitleFont("text-lg mb-4 uppercase")}>{t.footer.connect.title}</h4>
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
              <p className={getProductDescriptionFont("text-sm text-stone-400 mb-3")}>{t.footer.payment.title}</p>
              <div className="flex gap-2 flex-wrap">
                <div className={getProductDescriptionFont("bg-stone-800 px-3 py-2 rounded text-xs font-medium uppercase")}>VISA</div>
                <div className={getProductDescriptionFont("bg-stone-800 px-3 py-2 rounded text-xs font-medium uppercase")}>MC</div>
                <div className={getProductDescriptionFont("bg-stone-800 px-3 py-2 rounded text-xs font-medium uppercase")}>AMEX</div>
                <div className={getProductDescriptionFont("bg-stone-800 px-3 py-2 rounded text-xs font-medium uppercase")}>PayPal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={getProductDescriptionFont("text-stone-400 text-sm")}>{t.footer.copyright}</p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
              {t.footer.terms}
            </Link>
            <Link href="/accessibility" className={getProductDescriptionFont("text-stone-400 hover:text-stone-100 transition-colors")}>
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
