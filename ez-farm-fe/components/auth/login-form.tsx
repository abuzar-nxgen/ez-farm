"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Logo } from "@/components/ui/logo"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { t, direction } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError(t("invalidCredentials"))
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Form Side */}
      <div className="flex w-full flex-col justify-between p-8 md:w-1/2">
        <div className="flex justify-between">
          <Logo />
          <LanguageSwitcher />
        </div>

        <div className="mx-auto w-full max-w-md py-12">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-white">{t("welcome")}</h1>
              <p className="text-gray-300">{t("loginDescription")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{error}</div>}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">
                    {t("password")}
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    {t("forgotPassword")}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-300">
                  {t("rememberMe")}
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("loggingIn") : t("login")}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-300">
              {t("noAccount")}{" "}
              <Link href="/signup" className="text-primary hover:underline">
                {t("signUp")}
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-300">
          <p>
            © {new Date().getFullYear()} EZ Farming. {t("allRightsReserved")}
          </p>
        </div>
      </div>

      {/* Image Side */}
      <div className="relative hidden w-1/2 md:block">
        <Image src="/images/cattle-farmer.png" alt="Farmer with cattle" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  )
}
