"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { MainNav } from "@/components/ui/main-nav"
import { MobileNav } from "@/components/ui/mobile-nav"
import { UserNav } from "@/components/ui/user-nav"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import Image from "next/image"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { t, direction } = useLanguage()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileNavOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t("toggleMenu")}</span>
            </Button>
            <Logo />
          </div>
          <div className="hidden md:flex">
            <MainNav />
          </div>
          <UserNav />
        </div>
      </header>
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      <div className="dashboard-header relative mb-6 py-12 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cattle-farmer.png"
            alt="Livestock farm"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10">
          <h2 className="text-4xl font-bold tracking-tight">{t(getPageTitle(pathname))}</h2>
          <p className="text-white/80">{t(getPageDescription(pathname))}</p>
        </div>
      </div>

      <main className="flex-1 p-4 farm-pattern">
        <div className="container">
          <div className={cn("space-y-6", direction === "rtl" ? "text-right" : "text-left")}>{children}</div>
        </div>
      </main>
      <footer className="border-t bg-background p-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>{t("footerText")} | EZ Farming | Owner: Muhammad Hanzala | Contact: 3227064186</p>
        </div>
      </footer>
    </div>
  )
}

function getPageTitle(pathname: string): string {
  if (pathname.includes("/dashboard/livestock")) return "livestockManagement"
  if (pathname.includes("/dashboard/health")) return "healthRecords"
  if (pathname.includes("/dashboard/breeding")) return "breedingManagement"
  if (pathname.includes("/dashboard/feeding")) return "feedingManagement"
  if (pathname.includes("/dashboard/finances")) return "financialManagement"
  if (pathname.includes("/dashboard/reports")) return "reportsAnalytics"
  if (pathname.includes("/dashboard/settings")) return "settings"
  if (pathname.includes("/dashboard/staff")) return "veterinaryStaff"
  if (pathname.includes("/dashboard/admin")) return "administration"
  return "dashboard"
}

function getPageDescription(pathname: string): string {
  if (pathname.includes("/dashboard/livestock")) return "livestockManagementDescription"
  if (pathname.includes("/dashboard/health")) return "healthRecordsDescription"
  if (pathname.includes("/dashboard/breeding")) return "breedingManagementDescription"
  if (pathname.includes("/dashboard/feeding")) return "feedingManagementDescription"
  if (pathname.includes("/dashboard/finances")) return "financialManagementDescription"
  if (pathname.includes("/dashboard/reports")) return "reportsAnalyticsDescription"
  if (pathname.includes("/dashboard/settings")) return "settingsDescription"
  if (pathname.includes("/dashboard/staff")) return "veterinaryStaffDescription"
  if (pathname.includes("/dashboard/admin")) return "administrationDescription"
  return "dashboardDescription"
}
