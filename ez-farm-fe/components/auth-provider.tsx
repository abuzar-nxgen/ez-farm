"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Enhanced user type with role
export type UserRole = "admin" | "manager" | "staff" | "viewer"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, role?: UserRole) => Promise<void>
  logout: () => void
  requestPasswordReset: (email: string) => Promise<void>
  resetPassword: (token: string, newPassword: string) => Promise<void>
  hasPermission: (requiredRole: UserRole) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const mockUsers = [
  {
    id: "user-1",
    name: "Muhammad Hanzala",
    email: "admin@ezfarming.com",
    password: "admin123",
    role: "admin" as UserRole,
  },
  {
    id: "user-2",
    name: "Farm Manager",
    email: "manager@ezfarming.com",
    password: "manager123",
    role: "manager" as UserRole,
  },
  {
    id: "user-3",
    name: "Staff Member",
    email: "staff@ezfarming.com",
    password: "staff123",
    role: "staff" as UserRole,
  },
  {
    id: "user-4",
    name: "Viewer User",
    email: "viewer@ezfarming.com",
    password: "viewer123",
    role: "viewer" as UserRole,
  },
]

// Role hierarchy for permission checking
const roleHierarchy: Record<UserRole, number> = {
  admin: 4,
  manager: 3,
  staff: 2,
  viewer: 1,
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Mock login function with role-based access
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user exists in mock database
    const foundUser = mockUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
    )

    if (!foundUser) {
      setIsLoading(false)
      throw new Error("Invalid email or password")
    }

    const userData = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    }

    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    setIsLoading(false)
    router.push("/dashboard")
  }

  // Mock signup function with role assignment
  const signup = async (name: string, email: string, password: string, role: UserRole = "viewer") => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, any signup works
    const mockUser = {
      id: "user-" + Date.now(),
      name,
      email,
      role,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)
    router.push("/dashboard")
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  // Mock request password reset function
  const requestPasswordReset = async (email: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, we'll just simulate a successful request
    console.log(`Password reset requested for: ${email}`)

    setIsLoading(false)
  }

  // Mock reset password function
  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, we'll just simulate a successful password reset
    console.log(`Password reset with token: ${token}`)

    setIsLoading(false)
  }

  // Function to check if user has permission based on role hierarchy
  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        requestPasswordReset,
        resetPassword,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
