import localFont from "next/font/local"

export const Air = localFont({
  src: [
    { path: "../public/font/aeonikextendedprovf.ttf", weight: "400", style: "normal" },
    { path: "../public/font/aeonikextendedprovf-italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-air",
  display: "swap",
})

export const Fragment = localFont({
  src: [{ path: "../public/font/PPFragment-GlareVariable.ttf", style: "normal" }],
  variable: "--font-fragment",
  display: "swap",
})

export const Kodchasan = localFont({
  src: [
    { path: "../public/font/fontnew/Kodchasan-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../public/font/fontnew/Kodchasan-Light.ttf", weight: "300", style: "normal" },
  ],
  variable: "--font-kodchasan",
  display: "swap",
})

export const HeroVideoFont = localFont({
  src: [{ path: "../public/font/fontnew/aeonikextendedprovf.ttf", weight: "400", style: "normal" }],
  variable: "--font-hero-video",
  display: "swap",
})

export const QuicksandFont = localFont({
  src: [{ path: "../public/font/fontnew/Quicksand-VariableFont_wght.ttf", style: "normal" }],
  variable: "--font-quicksand",
  display: "swap",
})


