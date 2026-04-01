"use client"

import { DeckRecent } from "@/types"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { formatDistanceToNow } from "date-fns"

interface RecentlyCardProps {
  deck: DeckRecent
  isFirst: boolean
}

import {
  Archive,
  BookOpen,
  Brain,
  Clock,
  GalleryHorizontalEnd,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const iconMap = {
  "book-open": BookOpen,
  brain: Brain,
  clock: Clock,
  star: Star,
  archive: Archive,
} as const

export default function RecentlyCard({ deck, isFirst }: RecentlyCardProps) {
  // const Icon = iconMap[deck.icon]
  const notCompletedDeck = deck.cardCount !== deck.cardsStudied // this checks if the user didn't complete the deck.

  // const lastTime = formatDistanceToNow(deck.lastTimeAccessed, {
  //   addSuffix: true,
  // })

  return (
    <Card
      className={cn(
        "flex min-h-60 w-sm gap-5 shadow-sm transition-shadow",
        isFirst && "max-w-130 basis-2/3"
      )}
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
      </CardHeader>
      {/* {isFirst ? (
        <FirstFooterVariant deck={deck} lastTime={lastTime} />
      ) : notCompletedDeck ? (
        <ContinueDeckFooterVariant deck={deck} lastTime={lastTime} />
      ) : (
        <DefaultFooterVariant deck={deck} lastTime={lastTime} />
      )} */}
    </Card>
  )
}

interface FooterProps {
  deck: DeckRecent
  lastTime: string
}

function DefaultFooterVariant({ deck, lastTime }: FooterProps) {
  return (
    <CardFooter className="mt-auto flex items-center justify-between">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <div className="first-letter:uppercase">{lastTime}</div>
        <div>•</div>
        <div>{deck.cardCount} cards</div>
      </div>
      <Button variant={"ghost"} size={"sm"} asChild>
        <Link href={"#"}>Review</Link>
      </Button>
    </CardFooter>
  )
}

function FirstFooterVariant({ deck, lastTime }: FooterProps) {
  return (
    <CardFooter className="mt-auto flex items-center justify-between">
      <div className="flex gap-3 text-xs">
        <div>
          <p className="uppercase">Last studied</p>
          <p className="font-semibold first-letter:uppercase">{lastTime}</p>
        </div>
        <Separator orientation="vertical" />
        <div>
          <p className="uppercase">Cards</p>
          <p className="font-semibold">{deck.cardCount} total</p>
        </div>
      </div>
      <Button size={"sm"} asChild>
        <Link href={"#"}>Review</Link>
      </Button>
    </CardFooter>
  )
}

function ContinueDeckFooterVariant({ deck, lastTime }: FooterProps) {
  const progressValue = (deck.cardsStudied / deck.cardCount) * 100

  return (
    <CardFooter className="mt-auto flex flex-col gap-2">
      <Progress value={progressValue} />
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <div className="first-letter:uppercase">{lastTime}</div>
          <div>•</div>
          <div>{deck.cardCount} cards</div>
        </div>
        <Button variant={"ghost"} size={"sm"} asChild>
          <Link href={"#"}>Review</Link>
        </Button>
      </div>
    </CardFooter>
  )
}
