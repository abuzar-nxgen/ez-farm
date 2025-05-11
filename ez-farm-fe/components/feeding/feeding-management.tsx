"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Trash2 } from "lucide-react"
import { API_BASE_URL } from "@/lib/api"
import axios from "axios"

interface FeedRecord {
  id: number
  feed_type: string
  quantity: number
  date: string
  notes: string
}

export function FeedingManagement() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [inventory, setInventory] = useState<FeedRecord[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch feed inventory data
  const fetchInventory = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_BASE_URL}/feed/inventory/`)
      setInventory(res.data)
    } catch (error) {
      console.error("Failed to fetch feed inventory", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/feed/inventory/${id}/`)
      setInventory((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Failed to delete feed record", error)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  const filteredInventory = inventory.filter((item) =>
    item.feed_type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchFeedRecords")}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("addFeedRecord")}
        </Button>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">{t("feedInventory")}</TabsTrigger>
          <TabsTrigger value="consumption">{t("feedConsumption")}</TabsTrigger>
          <TabsTrigger value="planning">{t("feedPlanning")}</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("feedInventory")}</CardTitle>
              <CardDescription>{t("feedInventoryDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {loading ? (
                <p>{t("loading")}</p>
              ) : filteredInventory.length === 0 ? (
                <p className="text-muted-foreground">{t("feedInventoryPlaceholder")}</p>
              ) : (
                <ul className="space-y-2">
                  {filteredInventory.map((item) => (
                    <li key={item.id} className="flex items-center justify-between border p-2 rounded">
                      <div>
                        <p className="font-medium">
                          {item.feed_type} - {item.quantity} kg
                        </p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                        <p className="text-sm">{item.notes}</p>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consumption" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("feedConsumption")}</CardTitle>
              <CardDescription>{t("feedConsumptionDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">{t("feedConsumptionPlaceholder")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("feedPlanning")}</CardTitle>
              <CardDescription>{t("feedPlanningDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">{t("feedPlanningPlaceholder")}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
