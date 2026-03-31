"use client"

import { useQuery } from "@tanstack/react-query"

import { BACKEND_URL } from "@/config"
import { UserResponseSchema } from "@/schemas"

export function useMe() {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      const res = await fetch(`${BACKEND_URL}/users/me`, {
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to fetch user info")

      const data = await res.json()

      return UserResponseSchema.parse(data)
    },
    staleTime: 30 * 1000,
  })
}
