// components/study/StudyCard.tsx
"use client"

import { useState } from "react"
import { Card as CardType } from "@/types/card"
import { useStudySession } from "@/stores/study-session.store"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface StudyCardProps {
  card: CardType
  totalCards: number
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
}

const options = [
  "Consumers anticipate future tax increases to pay off the debt, increasing their savings and neutralizing the stimulus effect.",
  "Deficit spending leads to a direct increase in interest rates, which crowds out private investment completely.",
  "The increase in government spending shifts the IS curve to the right, causing a permanent increase in equilibrium output.",
]

export default function StudyCard({
  card,
  totalCards,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}: StudyCardProps) {
  const [showAnswer, setShowAnswer] = useState(false)
  const answerCard = useStudySession((state) => state.answerCard)

  const handleAnswer = (correct: boolean) => {
    answerCard(card.deckId, card.id, correct)
    setShowAnswer(false)
    onNext()
  }

  return (
    <Card className="card min-h-100 shadow-md">
      <CardHeader className="p-5">
        <p className="text-3xl font-semibold">{card.question}</p>
      </CardHeader>
      <CardContent className="p-5 pb-0">
        <RadioGroup className="space-y-4">
          {options.map((option, index) => (
            <FieldLabel htmlFor={`option-${index}`} key={index} className="p-2">
              <Field orientation={"horizontal"}>
                <FieldContent>
                  <FieldTitle>{option}</FieldTitle>
                </FieldContent>

                <RadioGroupItem value={option} id={`option-${index}`} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>

        <Separator className="my-15" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 text-muted-foreground">
            <Button
              asChild
              variant={"ghost"}
              size={"icon-sm"}
              className="cursor-pointer hover:bg-transparent"
              onClick={onPrevious}
            >
              <ChevronLeft />
            </Button>
            <div className="text-xs uppercase">
              card {card.order + 1} of {totalCards}
            </div>
            <Button
              asChild
              variant={"ghost"}
              size={"icon-sm"}
              className="cursor-pointer hover:bg-transparent"
              onClick={onNext}
            >
              <ChevronRight />
            </Button>
          </div>
          <Button size={"lg"}>Check Answer</Button>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        Correct answer will be here ...
      </CardFooter>
    </Card>
  )
}
