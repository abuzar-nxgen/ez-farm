import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}
