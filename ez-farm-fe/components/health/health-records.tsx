"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealthRecordsTable } from "@/components/health/health-records-table"
import { HealthRecordForm } from "@/components/health/health-record-form"
import { CalendarIcon, Plus, Search } from "lucide-react"
import { format } from "date-fns"

export function HealthRecords() {
  const { t } = useLanguage()
  const [isAddingRecord, setIsAddingRecord] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [tableKey, setTableKey] = useState(Date.now())

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchHealthRecords")}
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
              <SelectItem value="vaccination">{t("vaccination")}</SelectItem>
              <SelectItem value="treatment">{t("treatment")}</SelectItem>
              <SelectItem value="checkup">{t("checkup")}</SelectItem>
              <SelectItem value="surgery">{t("surgery")}</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : t("pickDate")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={() => setIsAddingRecord(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("addHealthRecord")}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">{t("allRecords")}</TabsTrigger>
          <TabsTrigger value="vaccination">{t("vaccinations")}</TabsTrigger>
          <TabsTrigger value="treatment">{t("treatments")}</TabsTrigger>
          <TabsTrigger value="checkup">{t("checkups")}</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("healthRecords")}</CardTitle>
              <CardDescription>{t("healthRecordsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthRecordsTable key={tableKey} searchTerm={searchTerm} filterType={selectedType} filterDate={date} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccination" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("vaccinationRecords")}</CardTitle>
              <CardDescription>{t("vaccinationRecordsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthRecordsTable key={tableKey} searchTerm={searchTerm} filterType="vaccination" filterDate={date} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("treatmentRecords")}</CardTitle>
              <CardDescription>{t("treatmentRecordsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthRecordsTable key={tableKey} searchTerm={searchTerm} filterType="treatment" filterDate={date} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checkup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("checkupRecords")}</CardTitle>
              <CardDescription>{t("checkupRecordsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthRecordsTable key={tableKey} searchTerm={searchTerm} filterType="checkup" filterDate={date} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isAddingRecord && (
        <Card>
          <CardHeader>
            <CardTitle>{t("addNewHealthRecord")}</CardTitle>
            <CardDescription>{t("addNewHealthRecordDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <HealthRecordForm
              onCancel={() => setIsAddingRecord(false)}
              onSuccess={() => {
                setIsAddingRecord(false)
                setTableKey(Date.now())
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
