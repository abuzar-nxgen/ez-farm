"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { href: "/dashboard", label: "dashboard" },
    { href: "/dashboard/livestock", label: "livestockManagement" },
    { href: "/dashboard/health", label: "healthRecords" },
    { href: "/dashboard/breeding", label: "breedingManagement" },
    { href: "/dashboard/feeding", label: "feedingManagement" },
    { href: "/dashboard/finances", label: "financialManagement" },
    { href: "/dashboard/staff", label: "veterinaryStaff" },
    { href: "/dashboard/reports", label: "reportsAnalytics" },
    { href: "/dashboard/settings", label: "settings" },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          {t(item.label)}
        </Link>
      ))}
    </nav>
  )
}
