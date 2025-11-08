"use client"

import { ParallaxProvider } from 'react-scroll-parallax'

export function ParallaxProviderWrapper({ children }: { children: React.ReactNode }) {
    return <ParallaxProvider>{children}</ParallaxProvider>
}

