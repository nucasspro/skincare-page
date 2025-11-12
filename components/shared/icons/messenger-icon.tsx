"use client"

import { useId } from "react"

export function MessengerIcon({ className = "w-6 h-6" }: { className?: string }) {
  // Generate unique ID for gradient to avoid conflicts
  // Clean useId to make it valid for SVG (remove colons and other special chars)
  const id = useId().replace(/:/g, "").replace(/[^a-zA-Z0-9]/g, "")
  const gradientId = `messenger-gradient-${id}`

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0C8.73239 0 0 8.25363 0 19.4007C0 25.2317 2.39034 30.27 6.28169 33.7509C6.60765 34.0447 6.80483 34.4511 6.82093 34.8898L6.92958 38.4472C6.9658 39.582 8.13682 40.3184 9.17505 39.8637L13.1429 38.1132C13.4809 37.9643 13.8551 37.9361 14.2093 38.0327C16.0322 38.5357 17.9759 38.8013 20 38.8013C31.2676 38.8013 40 30.5477 40 19.4007C40 8.25363 31.2676 0 20 0Z"
        fill={`url(#${gradientId})`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99199 25.0748L13.8672 15.7547C14.8008 14.2738 16.8049 13.9036 18.2053 14.9539L22.8773 18.459C23.3079 18.7809 23.8954 18.7769 24.322 18.455L30.6318 13.6662C31.4729 13.0263 32.5755 14.0364 32.0081 14.9298L26.1369 24.2458C25.2033 25.7267 23.1992 26.0969 21.7988 25.0466L17.1268 21.5415C16.6962 21.2196 16.1087 21.2236 15.6821 21.5455L9.36825 26.3384C8.5272 26.9782 7.42459 25.9681 7.99199 25.0748Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="20"
          y1="0"
          x2="20"
          y2="40.0005"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00B2FF" />
          <stop offset="1" stopColor="#006AFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}
