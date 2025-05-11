"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText } from "lucide-react"
import axios from "axios"

type Report = {
  id: number
  title: string
  description: string
  downloadUrl: string
}

export function ReportsAnalytics() {
  const { t } = useLanguage()
  const [reportType, setReportType] = useState("all")
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  // Fetch reports on load or when reportType changes
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/api/reports`, {
          params: { type: reportType === "all" ? undefined : reportType },
        })
        setReports(response.data)
      } catch (error) {
        console.error("Failed to fetch reports", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [reportType])

  // Generate report
  const handleGenerateReport = async () => {
    setGenerating(true)
    try {
      await axios.post(`/api/reports/generate`, { type: reportType })
      // Re-fetch reports after generation
      const response = await axios.get(`/api/reports`, {
        params: { type: reportType === "all" ? undefined : reportType },
      })
      setReports(response.data)
    } catch (error) {
      console.error("Report generation failed", error)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder={t("selectReportType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allReports")}</SelectItem>
            <SelectItem value="livestock">{t("livestockReports")}</SelectItem>
            <SelectItem value="health">{t("healthReports")}</SelectItem>
            <SelectItem value="financial">{t("financialReports")}</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleGenerateReport} disabled={generating}>
          <FileText className="mr-2 h-4 w-4" />
          {generating ? t("generating") : t("generateReport")}
        </Button>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">{t("reports")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
          <TabsTrigger value="exports">{t("exports")}</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("availableReports")}</CardTitle>
              <CardDescription>{t("availableReportsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">{t("loading")}</p>
              ) : reports.length === 0 ? (
                <p className="text-muted-foreground">{t("noReportsFound")}</p>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                      <a href={report.downloadUrl} download>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          {t("download")}
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("analyticsAndInsights")}</CardTitle>
              <CardDescription>{t("analyticsAndInsightsDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">{t("analyticsPlaceholder")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("dataExports")}</CardTitle>
              <CardDescription>{t("dataExportsDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">{t("exportsPlaceholder")}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
