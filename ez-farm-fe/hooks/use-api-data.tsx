"use client"

import { useState, useEffect } from "react"

// Generic hook for fetching data from API
export function useApiData<T>(fetchFunction: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchFunction()
        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  return { data, isLoading, error, refetch: () => setIsLoading(true) }
}

// Hook for submitting data to API
export function useApiSubmit<T, R>(submitFunction: (data: T) => Promise<R>) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [result, setResult] = useState<R | null>(null)

  const submit = async (data: T) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await submitFunction(data)
      setResult(response)
      return response
    } catch (err) {
      const error = err instanceof Error ? err : new Error("An unknown error occurred")
      setError(error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submit, isSubmitting, error, result }
}
