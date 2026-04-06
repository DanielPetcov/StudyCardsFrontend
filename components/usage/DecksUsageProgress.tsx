"use client"

import { Gauge } from "lucide-react"
import { Progress } from "@/components/ui/progress"

import { MAXIMUM_FREE_UPLOADS } from "@/constants"
import { useMe } from "@/hooks/useMe"
import { useTranslations } from "next-intl"

import { GalleryHorizontalEnd } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

export default function DecksUsageProgress() {
  const { data, isLoading, isError, error } = useMe()
  const t = useTranslations("Sidebar")

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-5 w-full rounded-full bg-primary/20" />
        <Skeleton className="h-5 w-2/3 rounded-full bg-primary/20" />
      </div>
    )
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>There is no data</div>
  }

  const planType = data.plan
  const activeDecks = data.activeDecks
  const uploadsUsed = data.uploadsUsed
  const uploadsConsummed = (uploadsUsed / MAXIMUM_FREE_UPLOADS) * 100

  if (planType === "free") {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-1 pl-2 text-xs text-accent-foreground">
          <Gauge size={20} />
          <p>
            {"Total uploads"}: {uploadsConsummed}%
          </p>
        </div>
        <Progress value={uploadsConsummed} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 pl-2 text-xs text-accent-foreground">
        <Gauge size={20} />
        <p>
          {"Total uploads"}: {uploadsUsed}
        </p>
      </div>
      <div className="flex items-center gap-1 pl-2 text-xs text-accent-foreground">
        <GalleryHorizontalEnd size={20} />
        <p>
          {"Active decks"}: {activeDecks}
        </p>
      </div>
    </div>
  )
}
