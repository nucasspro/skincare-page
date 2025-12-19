import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "CELLIC - Bright Matte Sunscreen",
    description: "Kem chống nắng thế hệ mới với công nghệ hiện đại, phù hợp cho làn da Việt",
}

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
