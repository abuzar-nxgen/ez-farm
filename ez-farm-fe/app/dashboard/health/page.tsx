import { HealthRecords } from "@/components/health/health-records"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

export default function HealthPage() {
  return (
    <DashboardLayout>
      <HealthRecords />
    </DashboardLayout>
  )
}
