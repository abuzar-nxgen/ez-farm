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
import { Logo } from "@/components/ui/logo"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { forgotPassword } = useAuth()
  const router = useRouter()
  const { t, direction } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await forgotPassword(email)
      setIsSubmitted(true)
    } catch (err) {
      setError(t("forgotPasswordError"))
    } finally {
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
              <h1 className="text-3xl font-bold text-white">{t("forgotPassword")}</h1>
              <p className="text-gray-300">{t("forgotPasswordDescription")}</p>
            </div>

            {isSubmitted ? (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">{t("resetLinkSent")}</p>
                  </div>
                </div>
              </div>
            ) : (
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

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t("sending") : t("sendResetLink")}
                </Button>
              </form>
            )}

            <div className="text-center text-sm text-gray-300">
              <Link href="/login" className="text-primary hover:underline">
                {t("backToLogin")}
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
