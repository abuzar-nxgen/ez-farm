"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { translations } from "@/lib/translations"

type Language = "en" | "ur"
type Direction = "ltr" | "rtl"

interface LanguageContextType {
  language: Language
  direction: Direction
  t: (key: string, params?: Record<string, string | number>) => string
  changeLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [direction, setDirection] = useState<Direction>("ltr")

  // Function to translate text based on current language
  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || key

    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{{${paramKey}}}`, String(paramValue))
      })
    }

    return text
  }

  // Function to change language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)

    // Set direction based on language
    if (lang === "ur") {
      setDirection("rtl")
      document.documentElement.dir = "rtl"
    } else {
      setDirection("ltr")
      document.documentElement.dir = "ltr"
    }
  }

  // Initialize language from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ur")) {
      changeLanguage(savedLanguage)
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, direction, t, changeLanguage }}>
      <div dir={direction} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
