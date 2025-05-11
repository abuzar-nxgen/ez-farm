"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { livestockAPI } from "@/services/api"
import { useApiSubmit } from "@/hooks/use-api-data"

interface LivestockFormProps {
  onCancel: () => void
  onSuccess?: () => void
}

export function LivestockFormWithApi({ onCancel, onSuccess }: LivestockFormProps) {
  const { t, direction } = useLanguage()
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    type: "",
    breed: "",
    gender: "",
    weight: "",
    status: "",
    notes: "",
  })

  const { submit, isSubmitting } = useApiSubmit(livestockAPI.create)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.type || !formData.breed || !formData.gender || !date || !formData.weight || !formData.status) {
      toast({
        title: t("validationError"),
        description: t("allFieldsRequired"),
        variant: "destructive",
      })
      return
    }

    try {
      await submit({
        ...formData,
        birthDate: date?.toISOString().split("T")[0],
        weight: Number.parseFloat(formData.weight),
      })

      toast({
        title: t("success"),
        description: t("livestockAddedSuccessfully"),
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("failedToAddLivestock"),
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">{t("type")}</Label>
          <Select onValueChange={(value) => handleChange("type", value)}>
            <SelectTrigger id="type">
              <SelectValue placeholder={t("selectType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cattle">{t("cattle")}</SelectItem>
              <SelectItem value="sheep">{t("sheep")}</SelectItem>
              <SelectItem value="goats">{t("goats")}</SelectItem>
              <SelectItem value="horses">{t("horses")}</SelectItem>
              <SelectItem value="camels">{t("camels")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="breed">{t("breed")}</Label>
          <Input
            id="breed"
            placeholder={t("enterBreed")}
            className={direction === "rtl" ? "text-right" : "text-left"}
            value={formData.breed}
            onChange={(e) => handleChange("breed", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">{t("gender")}</Label>
          <Select onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger id="gender">
              <SelectValue placeholder={t("selectGender")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{t("male")}</SelectItem>
              <SelectItem value="female">{t("female")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate">{t("birthDate")}</Label>
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
          <Label htmlFor="weight">{t("weight")}</Label>
          <div className="flex">
            <Input
              id="weight"
              type="number"
              placeholder={t("enterWeight")}
              className={cn("rounded-r-none", direction === "rtl" ? "text-right" : "text-left")}
              value={formData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
            <div className="flex items-center justify-center rounded-r-md border border-l-0 bg-muted px-3 text-sm text-muted-foreground">
              {t("kg")}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">{t("status")}</Label>
          <Select onValueChange={(value) => handleChange("status", value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder={t("selectStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="healthy">{t("healthy")}</SelectItem>
              <SelectItem value="sick">{t("sick")}</SelectItem>
              <SelectItem value="pregnant">{t("pregnant")}</SelectItem>
              <SelectItem value="lactating">{t("lactating")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">{t("notes")}</Label>
        <Input
          id="notes"
          placeholder={t("enterNotes")}
          className={direction === "rtl" ? "text-right" : "text-left"}
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel} type="button">
          {t("cancel")}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("saving") : t("saveLivestock")}
        </Button>
      </div>
    </form>
  )
}
