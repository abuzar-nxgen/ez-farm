import { LivestockInventory } from "@/components/livestock/livestock-inventory"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

export default function LivestockPage() {
  return (
    <DashboardLayout>
      <LivestockInventory />
    </DashboardLayout>
  )
}
