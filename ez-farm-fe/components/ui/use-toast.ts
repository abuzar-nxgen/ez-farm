"use client"

// This is a simplified version of the toast hook
// You can expand it with a full toast implementation if needed

import { useState } from "react"

type ToastVariant = "default" | "destructive" | "success"

interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...props, id }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto-dismiss toast after duration
    if (props.duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
      }, props.duration || 5000)
    }

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
  }

  return { toast, dismiss, toasts }
}
