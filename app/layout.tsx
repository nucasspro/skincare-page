import { ParallaxProviderWrapper } from "@/components/parallax-provider-wrapper"
import { PromotionBanner } from "@/components/promotion-banner"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CartProvider } from "@/lib/cart-context"
import { I18nProvider } from "@/lib/i18n-context"
import { GeistSans } from 'geist/font/sans'
import { Air, Fragment } from './fonts'
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
  title: "Cellic đề cao khoa học tử tế và sự chăm sóc phù hợp cho làn da Việt.",
  description: "Khám phá thành quả 16 năm nghiên cứu y sinh bài bản của Cellic, sản phẩm \"do người Việt, cho làn da Việt\" với công nghệ hiện đại và đảm bảo an toàn, hiệu quả.",
  keywords: "Cellic, kem chống nắng, chăm sóc da, sản phẩm Việt Nam, skincare, SPF, da Việt",
  authors: [{ name: "Cellic" }],
  openGraph: {
    title: "Cellic đề cao khoa học tử tế và sự chăm sóc phù hợp cho làn da Việt.",
    description: "Khám phá thành quả 16 năm nghiên cứu y sinh bài bản của Cellic, sản phẩm \"do người Việt, cho làn da Việt\" với công nghệ hiện đại và đảm bảo an toàn, hiệu quả.",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cellic đề cao khoa học tử tế và sự chăm sóc phù hợp cho làn da Việt.",
    description: "Khám phá thành quả 16 năm nghiên cứu y sinh bài bản của Cellic, sản phẩm \"do người Việt, cho làn da Việt\" với công nghệ hiện đại và đảm bảo an toàn, hiệu quả.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} ${Air.variable} ${Fragment.variable} antialiased`} suppressHydrationWarning>
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
