"use client"

import { useLanguage } from "@/components/language-provider"
import { Calendar, MilkIcon as Cow, FileCheck, Stethoscope, Truck, User } from "lucide-react"

export function RecentActivities() {
  const { t } = useLanguage()

  const activities = [
    {
      id: 1,
      type: "health",
      description: "vaccinationCompleted",
      timestamp: "Today, 10:30 AM",
      icon: Stethoscope,
    },
    {
      id: 2,
      type: "movement",
      description: "movedSheep",
      timestamp: "Today, 9:15 AM",
      icon: Truck,
    },
    {
      id: 3,
      type: "birth",
      description: "newCalfBorn",
      timestamp: "Yesterday, 11:45 PM",
      icon: Cow,
    },
    {
      id: 4,
      type: "inspection",
      description: "completedInspection",
      timestamp: "Yesterday, 2:30 PM",
      icon: FileCheck,
    },
    {
      id: 5,
      type: "staff",
      description: "scheduledHealthChecks",
      timestamp: "Yesterday, 10:00 AM",
      icon: User,
    },
    {
      id: 6,
      type: "schedule",
      description: "feedDeliveryScheduled",
      timestamp: "Yesterday, 9:30 AM",
      icon: Calendar,
    },
  ]

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex">
          <div className="relative mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <activity.icon className="h-6 w-6" />
            <span className="absolute right-0 top-0 flex h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{t(activity.description)}</p>
            <p className="text-xs text-muted-foreground">{t(activity.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
