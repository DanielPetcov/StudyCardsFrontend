import { cn } from "@/lib/utils"

import {
  Archive,
  BookOpen,
  Brain,
  Clock,
  GalleryHorizontalEnd,
  Star,
} from "lucide-react"

import { Card, CardHeader, CardFooter, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import { DeckStarred } from "@/types"

const iconMap = {
  "book-open": BookOpen,
  brain: Brain,
  clock: Clock,
  star: Star,
  archive: Archive,
} as const

export default function StaredCard({ deck }: { deck: DeckStarred }) {
  // const Icon = iconMap[deck.icon]
  const progressValue = parseFloat(
    ((deck.cardsStudied / deck.cardCount) * 100).toPrecision(2)
  )

  return (
    <Card
      className={cn("flex min-h-60 w-sm gap-5 shadow-sm transition-shadow")}
    >
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
        <CardAction>
          <Button
            asChild
            variant={"ghost"}
            size={"icon"}
            className="cursor-pointer hover:bg-transparent"
          >
            <Star
              className={cn(
                deck.starred &&
                  "fill-yellow-500 text-yellow-500 hover:text-yellow-600"
              )}
            />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-1 text-muted-foreground">
          <GalleryHorizontalEnd className="size-4" />
          <div className="text-xs">{deck.cardCount} Cards</div>
        </div>
        <div className="flex items-center gap-1">
          <Progress value={progressValue} className="w-25" />
          <div className="text-muted-foreground">{progressValue}%</div>
        </div>
      </CardFooter>
    </Card>
  )
}
