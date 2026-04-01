import { cn } from "@/lib/utils"

import { DemoDeck } from "@/types"
import { DECK_ICONS } from "@/data"

import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { GalleryHorizontalEnd } from "lucide-react"

export default function DeckPreviewCard({
  deck,
  cardsLabel,
  statusLabel,
}: {
  deck: DemoDeck
  cardsLabel: string
  statusLabel: string
}) {
  const Icon = DECK_ICONS[deck.icon]

  return (
    <Card className="flex h-65 w-full cursor-default gap-0 shadow-sm transition-shadow hover:shadow-xl">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-md bg-primary/10 p-3 text-primary">
            <Icon className="size-5" />
          </div>
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-2.5 py-1",
              "text-[11px] font-semibold tracking-[0.08em] uppercase",
              "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
            )}
          >
            <div className="h-2 w-2 animate-[ping_2s_ease-in-out_infinite] rounded-full bg-emerald-500" />
            <span>{statusLabel}</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-xl font-semibold tracking-[-0.02em]">
            {deck.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
            {deck.description}
          </p>
        </div>
      </CardHeader>
      <CardFooter className="mt-auto">
        <div className="flex w-full items-center gap-1.5 text-muted-foreground">
          <GalleryHorizontalEnd className="size-4" />
          <span className="text-xs font-medium">
            {deck.cardCount} {cardsLabel}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
