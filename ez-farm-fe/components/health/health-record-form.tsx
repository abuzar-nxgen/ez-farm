"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import axios from "axios"
import { toast } from "sonner"

interface HealthRecordFormProps {
  onCancel: () => void
  onSuccess?: () => void
}

export function HealthRecordForm({ onCancel, onSuccess }: HealthRecordFormProps) {
  const { t, direction } = useLanguage()

  const [date, setDate] = useState<Date>()
  const [livestockId, setLivestockId] = useState("")
  const [type, setType] = useState("")
  const [performedBy, setPerformedBy] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!livestockId || !type || !date || !performedBy || !description || !status) {
      toast.error(t("fillAllFields"))
      return
    }

    setLoading(true)
    try {
      await axios.post("/api/ezcore/haf/", {
        livestock_id: livestockId,
        type,
        date: date.toISOString().split("T")[0],
        performed_by: performedBy,
        description,
        status,
      })
      toast.success(t("recordSaved"))
      if (onSuccess) onSuccess()
      onCancel()
    } catch (error) {
      toast.error(t("errorSavingRecord"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="livestockId">{t("livestockId")}</Label>
          <Select onValueChange={setLivestockId}>
            <SelectTrigger id="livestockId">
              <SelectValue placeholder={t("selectLivestock")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LV001">LV001 - {t("cattle")}</SelectItem>
              <SelectItem value="LV003">LV002 - {t("sheep")}</SelectItem>
              <SelectItem value="LV005">LV003 - {t("goats")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">{t("type")}</Label>
          <Select onValueChange={setType}>
            <SelectTrigger id="type">
              <SelectValue placeholder={t("selectType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vaccination">{t("vaccination")}</SelectItem>
              <SelectItem value="treatment">{t("treatment")}</SelectItem>
              <SelectItem value="checkup">{t("checkup")}</SelectItem>
              <SelectItem value="surgery">{t("surgery")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">{t("date")}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : t("selectDate")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="performedBy">{t("performedBy")}</Label>
          <Select onValueChange={setPerformedBy}>
            <SelectTrigger id="performedBy">
              <SelectValue placeholder={t("selectPerformedBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dr. Huzaifa">Dr. Huzaifa (UVAS Lahore)</SelectItem>
              <SelectItem value="Dr. Hassan">Dr. Hassan (UVAS Lahore)</SelectItem>
              <SelectItem value="Dr. Rauf">Dr. Rauf (UVAS Lahore)</SelectItem>
              <SelectItem value="EZ Farms Staff">EZ Farms Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">{t("description")}</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("enterDescription")}
            className={direction === "rtl" ? "text-right" : "text-left"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">{t("status")}</Label>
          <Select onValueChange={setStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder={t("selectStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">{t("scheduled")}</SelectItem>
              <SelectItem value="inProgress">{t("inProgress")}</SelectItem>
              <SelectItem value="completed">{t("completed")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          {t("cancel")}
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? t("saving") + "..." : t("saveRecord")}
        </Button>
      </div>
    </form>
  )
}
