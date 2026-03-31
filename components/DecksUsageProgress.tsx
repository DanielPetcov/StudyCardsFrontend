"use client"

import { Gauge } from "lucide-react"
import { Progress } from "@/components/ui/progress"

import { MAX_FREE_UPLOADS } from "@/constants"
import { useMe } from "@/hooks/useMe"

export default function DecksUsageProgress() {
  const { data, isLoading, isError, error } = useMe()

  if (isLoading) {
    return <div>loading</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>There is no data</div>
  }

  const uploadsUsed = data.uploadsUsed
  const usage = (uploadsUsed / MAX_FREE_UPLOADS) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 pl-2 text-xs text-accent-foreground">
        <Gauge size={20} />
        <p>Usage: {usage}%</p>
      </div>
      <Progress value={usage} />
    </div>
  )
}
