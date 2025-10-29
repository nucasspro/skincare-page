import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from 'geist/font/sans'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { ParallaxProviderWrapper } from "@/components/parallax-provider-wrapper"
import { I18nProvider } from "@/lib/i18n-context"
import { PromotionBanner } from "@/components/promotion-banner"
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
          <PromotionBanner />
          <I18nProvider>{children}</I18nProvider>
          {/* <Analytics /> */}
        </ParallaxProviderWrapper>
      </body>
    </html>
  )
}
