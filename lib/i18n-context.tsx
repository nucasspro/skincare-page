"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import viMessages from "@/i18n/messages/vi"
import enMessages from "@/i18n/messages/en"

type Locale = "vi" | "en"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof viMessages
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const messagesMap = {
  vi: viMessages,
  en: enMessages,
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("vi")

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale)
    }
  }

  useEffect(() => {
    // Load saved locale from localStorage
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("locale") as Locale
      if (savedLocale && (savedLocale === "vi" || savedLocale === "en")) {
        setLocaleState(savedLocale)
      }
    }
  }, [])

  const t = messagesMap[locale]

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}
