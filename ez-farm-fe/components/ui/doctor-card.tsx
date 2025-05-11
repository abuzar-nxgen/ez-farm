"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Stethoscope } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface DoctorCardProps {
  name: string
  specialty: string
  education: string
  experience: string
}

export function DoctorCard({ name, specialty, education, experience }: DoctorCardProps) {
  const { t } = useLanguage()

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{specialty}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{education}</span>
          </div>
          <p className="text-sm text-muted-foreground">{experience}</p>
        </div>
      </CardContent>
    </Card>
  )
}
