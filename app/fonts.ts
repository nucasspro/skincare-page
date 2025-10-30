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


