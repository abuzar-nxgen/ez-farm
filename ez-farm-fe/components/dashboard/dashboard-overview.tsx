"use client"

import { useLanguage } from "@/components/language-provider"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { HealthAlerts } from "@/components/dashboard/health-alerts"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks"
import { LivestockOverview } from "@/components/dashboard/livestock-overview"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, User2, Phone } from "lucide-react"

export function DashboardOverview() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-primary p-6 text-white">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold">EZ Farming</h2>
            <p className="max-w-md">{t("farmWelcomeMessage")}</p>
          </div>
        </div>
        <CardContent className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("totalLand")}</p>
              <p className="text-xl font-bold">150 {t("acres")}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <User2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("owner")}</p>
              <p className="text-xl font-bold">Muhammad Hanzala</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("contact")}</p>
              <p className="text-xl font-bold">3227064186</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <StatsCards />
      <LivestockOverview />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <HealthAlerts />
        <UpcomingTasks />
      </div>

      <RecentActivities />
    </div>
  )
}
