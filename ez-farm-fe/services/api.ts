// This file will serve as a bridge between the frontend and your backend
// Replace the mock implementations with actual API calls when connecting to your backend

// Base API URL - change this to your actual backend URL when ready
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Helper function for making API requests
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // Add authorization header when you implement authentication
      // 'Authorization': `Bearer ${getToken()}`,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "An error occurred")
  }

  return response.json()
}

// Livestock API functions
export const livestockAPI = {
  // Get all livestock
  getAll: async () => {
    return fetchAPI("/livestock")
  },

  // Get livestock by ID
  getById: async (id: string) => {
    return fetchAPI(`/livestock/${id}`)
  },

  // Create new livestock
  create: async (data: any) => {
    return fetchAPI("/livestock", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // Update livestock
  update: async (id: string, data: any) => {
    return fetchAPI(`/livestock/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  // Delete livestock
  delete: async (id: string) => {
    return fetchAPI(`/livestock/${id}`, {
      method: "DELETE",
    })
  },
}

// Health records API functions
export const healthAPI = {
  // Get all health records
  getAll: async () => {
    return fetchAPI("/health")
  },

  // Get health records by livestock ID
  getByLivestockId: async (livestockId: string) => {
    return fetchAPI(`/health/livestock/${livestockId}`)
  },

  // Create new health record
  create: async (data: any) => {
    return fetchAPI("/health", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // Update health record
  update: async (id: string, data: any) => {
    return fetchAPI(`/health/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  // Delete health record
  delete: async (id: string) => {
    return fetchAPI(`/health/${id}`, {
      method: "DELETE",
    })
  },
}

// Breeding records API functions
export const breedingAPI = {
  // Get all breeding records
  getAll: async () => {
    return fetchAPI("/breeding")
  },

  // Create new breeding record
  create: async (data: any) => {
    return fetchAPI("/breeding", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

// Feeding records API functions
export const feedingAPI = {
  // Get all feeding records
  getAll: async () => {
    return fetchAPI("/feeding")
  },

  // Create new feeding record
  create: async (data: any) => {
    return fetchAPI("/feeding", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

// Financial records API functions
export const financialAPI = {
  // Get all financial records
  getAll: async () => {
    return fetchAPI("/financial")
  },

  // Create new financial record
  create: async (data: any) => {
    return fetchAPI("/financial", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

// Reports API functions
export const reportsAPI = {
  // Generate report
  generate: async (type: string, params: any) => {
    return fetchAPI("/reports/generate", {
      method: "POST",
      body: JSON.stringify({ type, ...params }),
    })
  },
}

// User and settings API functions
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    return fetchAPI("/user/profile")
  },

  // Update user profile
  updateProfile: async (data: any) => {
    return fetchAPI("/user/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  // Update password
  updatePassword: async (currentPassword: string, newPassword: string) => {
    return fetchAPI("/user/password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    })
  },

  // Update farm settings
  updateFarmSettings: async (data: any) => {
    return fetchAPI("/user/farm-settings", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  // Update notification settings
  updateNotificationSettings: async (data: any) => {
    return fetchAPI("/user/notification-settings", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },
}
