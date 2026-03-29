"use client"

import type { Deck as DeckType } from "@/types"

import { useRouter } from "next/navigation"
import { GalleryHorizontalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"

import { iconMap } from "@/constants/icon-map"

export default function Deck({ deck }: { deck: DeckType }) {
  const router = useRouter()

  const isReady = deck.status === "ready"
  const Icon = iconMap[deck.icon]

  const visitDeck = () => {
    if (!isReady) return
    router.push(`/decks/${deck.id}`)
  }

  const statusStyles =
    deck.status === "ready"
      ? {
          dot: "bg-emerald-500 animate-[ping_2s_ease-in-out_infinite]",
          badge: "bg-e merald-500/10 text-emerald-700 dark:text-emerald-400",
        }
      : deck.status === "processing"
        ? {
            dot: "bg-muted-foreground animate-pulse",
            badge: "bg-surface-container text-muted-foreground",
          }
        : {
            dot: "bg-muted-foreground",
            badge: "bg-surface-container text-muted-foreground",
          }

  return (
    <Card
      onClick={visitDeck}
      className={cn(
        "flex h-60 w-sm gap-0 transition-shadow",
        isReady
          ? "cursor-pointer shadow-sm hover:shadow-xl"
          : ["cursor-default", "opacity-80", "saturate-50", "shadow-none"]
      )}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "rounded-md p-3",
              isReady
                ? "bg-primary-foreground text-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="size-5" />
          </div>

          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-2.5 py-1",
              "text-[11px] font-semibold tracking-[0.08em] uppercase",

              statusStyles.badge
            )}
          >
            <div className={cn("h-2 w-2 rounded-full", statusStyles.dot)} />
            <span>{deck.status}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3
            className={cn(
              "line-clamp-2 text-xl font-semibold tracking-[-0.02em]",
              isReady ? "" : "text-muted-foreground"
            )}
          >
            {deck.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
            {deck.description}
          </p>
        </div>
      </CardHeader>

      <CardFooter className="mt-auto">
        <div className="flex w-full items-center justify-between gap-3 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <GalleryHorizontalEnd className="size-4" />
            <span className="text-xs font-medium">{deck.cardCount} cards</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
