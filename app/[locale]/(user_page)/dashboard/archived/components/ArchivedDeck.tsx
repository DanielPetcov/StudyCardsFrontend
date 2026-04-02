interface ArchivedDeckProps {
  deck: DeckArchived
}

import {
  Archive,
  BookOpen,
  Brain,
  Clock,
  GalleryHorizontalEnd,
  History,
  Star,
} from "lucide-react"

import { Card, CardHeader, CardFooter, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { DeckArchived } from "@/types"

const iconMap = {
  "book-open": BookOpen,
  brain: Brain,
  clock: Clock,
  star: Star,
  archive: Archive,
} as const

export default function ArchivedDeck({ deck }: ArchivedDeckProps) {
  return (
    <Card className="flex min-h-60 w-sm gap-5 shadow-sm transition-shadow">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className={"rounded-md bg-primary-foreground p-3 text-primary"}>
            {/* <Icon className="size-5" /> */}
          </div>

          {/* maybe add badge */}
        </div>
        <div className="space-y-2">
          <h3
            className={"line-clamp-2 text-xl font-semibold tracking-[-0.02em]"}
          >
            {deck.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
            {deck.description}
          </p>
        </div>
        <CardAction>{/* <Badge>Accessed {archivedTime}</Badge> */}</CardAction>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-1 text-muted-foreground">
          <GalleryHorizontalEnd className="size-4" />
          <p className="text-xs">{deck.cardCount} cards</p>
        </div>
        <Button
          asChild
          variant={"ghost"}
          className="cursor-pointer hover:bg-transparent"
        >
          <div className="flex items-center gap-1">
            <History className="size-4" />
            <p className="font-semibold">Restore</p>
          </div>
        </Button>
      </CardFooter>
    </Card>
  )
}
