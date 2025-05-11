"use client"

import { useLanguage } from "@/components/language-provider"
import { MilkIcon as Cow } from "lucide-react"

export function FarmHeader() {
  const { t } = useLanguage()

  return (
    <div className="flex items-center gap-2 font-semibold">
      <Cow className="h-6 w-6 text-green-600" />
      <div className="flex flex-col">
        <span className="text-lg">{t("appName")}</span>
        <span className="text-xs text-muted-foreground">Muhammad Hanzala | 3227064186</span>
      </div>
    </div>
  )
}
