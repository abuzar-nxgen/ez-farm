"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function Logo() {
  const { t } = useLanguage()

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
        <span className="flex h-full w-full items-center justify-center text-white">EZ</span>
      </div>
      <h1 className="text-xl font-bold text-primary">EZ Farming</h1>
    </Link>
  )
}
