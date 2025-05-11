"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type UserRole } from "@/components/auth-provider"

interface RoleGuardProps {
  children: React.ReactNode
  requiredRole: UserRole
  fallbackPath?: string
}

export function RoleGuard({ children, requiredRole, fallbackPath = "/dashboard" }: RoleGuardProps) {
  const { user, hasPermission, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Wait until authentication state is known
    if (!isLoading) {
      // If no user is logged in, redirect to login
      if (!user) {
        router.push("/login")
        return
      }

      // If user doesn't have required role, redirect to fallback path
      if (!hasPermission(requiredRole)) {
        router.push(fallbackPath)
      }
    }
  }, [user, hasPermission, requiredRole, router, isLoading, fallbackPath])

  // Show nothing while checking permissions
  if (isLoading || !user || !hasPermission(requiredRole)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // If user has required role, render children
  return <>{children}</>
}
