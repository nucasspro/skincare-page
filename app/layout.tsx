import { ParallaxProviderWrapper } from "@/components/parallax-provider-wrapper"
import { PromotionBanner } from "@/components/promotion-banner"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CartProvider } from "@/lib/cart-context"
import { I18nProvider } from "@/lib/i18n-context"
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import type React from "react"
import "./globals.css"

const geistSans = GeistSans
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
  preload: true
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ParallaxProviderWrapper>
          <CartProvider>
            <PromotionBanner />
            <I18nProvider>{children}</I18nProvider>
            <ScrollToTop />
            {/* <Analytics /> */}
          </CartProvider>
        </ParallaxProviderWrapper>
      </body>
    </html>
  )
}
