"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search } from "lucide-react"

export function BreedingManagement() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchBreedingRecords")}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("addBreedingRecord")}
        </Button>
      </div>

      <Tabs defaultValue="breeding" className="space-y-4">
        <TabsList>
          <TabsTrigger value="breeding">{t("breedingRecords")}</TabsTrigger>
          <TabsTrigger value="genealogy">{t("genealogy")}</TabsTrigger>
          <TabsTrigger value="planning">{t("breedingPlanning")}</TabsTrigger>
        </TabsList>

        <TabsContent value="breeding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("breedingRecords")}</CardTitle>
              <CardDescription>{t("breedingRecordsDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">{t("breedingRecordsPlaceholder")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genealogy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("genealogy")}</CardTitle>
              <CardDescription>{t("genealogyDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">{t("genealogyPlaceholder")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("breedingPlanning")}</CardTitle>
              <CardDescription>{t("breedingPlanningDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">{t("breedingPlanningPlaceholder")}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
