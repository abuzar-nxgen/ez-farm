"use client"

import { useState } from 'react';
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LivestockTable } from "@/components/livestock/livestock-table"
import { LivestockForm } from "@/components/livestock/livestock-form"
import { Plus, Search } from "lucide-react"

export function LivestockInventory() {
  const { t } = useLanguage()
  const [isAddingLivestock, setIsAddingLivestock] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchLivestock")}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("filterByType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allTypes")}</SelectItem>
              <SelectItem value="cattle">{t("cattle")}</SelectItem>
              <SelectItem value="sheep">{t("sheep")}</SelectItem>
              <SelectItem value="goats">{t("goats")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsAddingLivestock(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("addLivestock")}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">{t("allLivestock")}</TabsTrigger>
          <TabsTrigger value="cattle">{t("cattle")}</TabsTrigger>
          <TabsTrigger value="sheep">{t("sheep")}</TabsTrigger>
          <TabsTrigger value="goats">{t("goats")}</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("livestockInventory")}</CardTitle>
              <CardDescription>{t("livestockInventoryDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <LivestockTable searchTerm={searchTerm} filterType={selectedType} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cattle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("cattleInventory")}</CardTitle>
              <CardDescription>{t("cattleInventoryDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <LivestockTable searchTerm={searchTerm} filterType="cattle" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sheep" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("sheepInventory")}</CardTitle>
              <CardDescription>{t("sheepInventoryDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <LivestockTable searchTerm={searchTerm} filterType="sheep" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("goatsInventory")}</CardTitle>
              <CardDescription>{t("goatsInventoryDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <LivestockTable searchTerm={searchTerm} filterType="goats" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isAddingLivestock && (
        <Card>
          <CardHeader>
            <CardTitle>{t("addNewLivestock")}</CardTitle>
            <CardDescription>{t("addNewLivestockDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <LivestockForm onCancel={() => setIsAddingLivestock(false)} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
