"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search } from "lucide-react"
import axios from "axios"

interface FinancialRecord {
  id: number
  description: string
  amount: number
  date: string
}

interface ProfitabilityData {
  total_income: number
  total_expenses: number
  net_profit: number
}

export function FinancialManagement() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [expenses, setExpenses] = useState<FinancialRecord[]>([])
  const [income, setIncome] = useState<FinancialRecord[]>([])
  const [profitability, setProfitability] = useState<ProfitabilityData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchFinancialData()
  }, [])

  const fetchFinancialData = async () => {
    setLoading(true)
    try {
      const [expensesRes, incomeRes, profitabilityRes] = await Promise.all([
        axios.get("/api/expenses/"),
        axios.get("/api/income/"),
        axios.get("/api/profitability/")
      ])
      setExpenses(expensesRes.data)
      setIncome(incomeRes.data)
      setProfitability(profitabilityRes.data)
    } catch (error) {
      console.error("Error fetching financial data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredExpenses = expenses.filter(record =>
    record.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredIncome = income.filter(record =>
    record.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchFinancialRecords")}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("addFinancialRecord")}
        </Button>
      </div>

      <Tabs defaultValue="expenses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="expenses">{t("expenses")}</TabsTrigger>
          <TabsTrigger value="income">{t("income")}</TabsTrigger>
          <TabsTrigger value="profitability">{t("profitability")}</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("expenses")}</CardTitle>
              <CardDescription>{t("expensesDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {loading ? (
                <p>{t("loading")}</p>
              ) : filteredExpenses.length === 0 ? (
                <p className="text-muted-foreground">{t("noExpensesFound")}</p>
              ) : (
                <ul className="space-y-2">
                  {filteredExpenses.map((expense) => (
                    <li key={expense.id} className="flex justify-between border p-2 rounded">
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-sm text-muted-foreground">{expense.date}</p>
                      </div>
                      <p className="font-medium text-red-600">-{expense.amount} PKR</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("income")}</CardTitle>
              <CardDescription>{t("incomeDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {loading ? (
                <p>{t("loading")}</p>
              ) : filteredIncome.length === 0 ? (
                <p className="text-muted-foreground">{t("noIncomeFound")}</p>
              ) : (
                <ul className="space-y-2">
                  {filteredIncome.map((incomeItem) => (
                    <li key={incomeItem.id} className="flex justify-between border p-2 rounded">
                      <div>
                        <p className="font-medium">{incomeItem.description}</p>
                        <p className="text-sm text-muted-foreground">{incomeItem.date}</p>
                      </div>
                      <p className="font-medium text-green-600">+{incomeItem.amount} PKR</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profitability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("profitability")}</CardTitle>
              <CardDescription>{t("profitabilityDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {loading || !profitability ? (
                <p>{t("loading")}</p>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("totalIncome")}</span>
                    <span className="text-green-600">{profitability.total_income} PKR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("totalExpenses")}</span>
                    <span className="text-red-600">{profitability.total_expenses} PKR</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>{t("netProfit")}</span>
                    <span className="text-blue-600">{profitability.net_profit} PKR</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
