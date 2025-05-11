"use client"

import { useEffect, useState } from "react"
import { API_BASE_URL } from '@/lib/api'
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

interface LivestockTableProps {
  searchTerm: string
  filterType: string
}

interface Animal {
  id: number
  breed: {
    name: string
    animal_type: {
      name: string
    }
  }
  gender: string
  birth_date: string
  weight: number
  status: string
}

export function LivestockTable({ searchTerm, filterType }: LivestockTableProps) {
  const { t } = useLanguage()
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/ezanimal/`)
        const data = await res.json()

        if (Array.isArray(data)) {
          setAnimals(data)
        } else if (data.results && Array.isArray(data.results)) {
          setAnimals(data.results)
        } else {
          console.error("Unexpected API response:", data)
          setAnimals([])
        }
      } catch (error) {
        console.error("Failed to fetch animals:", error)
        setAnimals([])
      } finally {
        setLoading(false)
      }
    }

    fetchAnimals()
  }, [])

  const filteredData = animals.filter((animal) => {
    const matchesSearch = Object.values(animal).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchTerm.toLowerCase())
        : typeof value === "object"
        ? JSON.stringify(value).toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
    const matchesType =
      filterType === "all" || animal.breed?.animal_type?.name.toLowerCase() === filterType.toLowerCase()

    return matchesSearch && matchesType
  })

  if (loading) return <p className="p-4">{t("loading")}...</p>
  if (filteredData.length === 0) return <p className="p-4">{t("noDataFound")}</p>

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                ID
                <Button variant="ghost" size="sm" className="ml-1 h-8 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </TableHead>
            <TableHead>{t("type")}</TableHead>
            <TableHead>{t("breed")}</TableHead>
            <TableHead>{t("gender")}</TableHead>
            <TableHead>{t("birthDate")}</TableHead>
            <TableHead>{t("weight")}</TableHead>
            <TableHead>{t("status")}</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((animal) => (
            <TableRow key={animal.id}>
              <TableCell><Checkbox /></TableCell>
              <TableCell className="font-medium">{animal.id}</TableCell>
              <TableCell>{t(animal.breed?.animal_type?.name || "N/A")}</TableCell>
              <TableCell>{t(animal.breed?.name || "N/A")}</TableCell>
              <TableCell>{t(animal.gender)}</TableCell>
              <TableCell>{animal.birth_date}</TableCell>
              <TableCell>{animal.weight} {t("kg")}</TableCell>
              <TableCell>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    animal.status === "healthy"
                      ? "bg-green-100 text-green-800"
                      : animal.status === "treatment"
                      ? "bg-red-100 text-red-800"
                      : animal.status === "pregnant" || animal.status === "lactating"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {t(animal.status)}
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
                    <DropdownMenuItem>{t("addHealthRecord")}</DropdownMenuItem>
                    <DropdownMenuItem>{t("trackWeight")}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">{t("deleteRecord")}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
