"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

interface HealthRecordsTableProps {
  searchTerm: string
  filterType: string
  filterDate?: Date
}

interface HealthRecord {
  id: string
  livestockId: string
  type: string
  date: string
  description: string
  performedBy: string
  status: string
}

export function HealthRecordsTable({
  searchTerm,
  filterType,
  filterDate,
}: HealthRecordsTableProps) {
  const { t } = useLanguage()
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchHealthRecords()
  }, [])

  const fetchHealthRecords = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/ezcore/haf/")
      setHealthRecords(response.data)
    } catch (error) {
      console.error("Error fetching health records:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredData = healthRecords.filter((record) => {
    const matchesSearch = Object.values(record).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesType = filterType === "all" || record.type === filterType
    const matchesDate =
      !filterDate ||
      record.date === filterDate.toISOString().split("T")[0]
    return matchesSearch && matchesType && matchesDate
  })

  return (
    <div className="rounded-md border">
      {loading ? (
        <div className="p-4 text-center text-muted-foreground">{t("loading")}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center">
                  ID
                  <Button variant="ghost" size="sm" className="ml-1 h-8 p-0">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>{t("livestockId")}</TableHead>
              <TableHead>{t("type")}</TableHead>
              <TableHead>{t("date")}</TableHead>
              <TableHead>{t("description")}</TableHead>
              <TableHead>{t("performedBy")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  {t("noRecordsFound")}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record.livestockId}</TableCell>
                  <TableCell>{t(record.type)}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{t(record.description)}</TableCell>
                  <TableCell>{record.performedBy}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        record.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : record.status === "inProgress"
                          ? "bg-amber-100 text-amber-800"
                          : record.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {t(record.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                        <DropdownMenuItem>{t("viewDetails")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("editRecord")}</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>{t("markAsCompleted")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("addFollowUp")}</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          {t("deleteRecord")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
