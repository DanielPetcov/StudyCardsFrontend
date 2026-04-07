"use client"

import { Link } from "@/i18n/navigation"

import { CheckCircle2, CircleDashed, Target, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { useStudySession } from "@/stores/study-session.store"
import { Button } from "../ui/button"

import { useTranslations } from "next-intl"

interface SummaryBlockProps {
  deckId: string
  totalCards: number
  className?: string
}

export default function SummaryBlock({
  deckId,
  totalCards,
  className,
}: SummaryBlockProps) {
  const t = useTranslations("DeckPage.summaryPage")

  const getProgress = useStudySession((state) => state.getProgress)
  const startAgain = useStudySession((state) => state.resetSession)
  const progress = getProgress(deckId, totalCards)

  const handleStartAgain = () => {
    startAgain(deckId)
  }

  const completionValue =
    totalCards > 0 ? (progress.answered / totalCards) * 100 : 0

  const accuracyValue =
    progress.answered > 0 ? (progress.correct / progress.answered) * 100 : 0

  return (
    <section
      className={cn(
        "mx-auto w-full max-w-5xl rounded-3xl border bg-background p-4 shadow-sm sm:p-5",
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {t("title")}
          </p>
          <h2 className="text-xl font-semibold tracking-tight">
            {progress.isComplete ? t("subTitle") : t("keepGoing")}
          </h2>
        </div>

        <div className="rounded-2xl border bg-muted px-3 py-2 text-right">
          <p className="text-xs text-muted-foreground">{t("completion")}</p>
          <p className="text-lg font-semibold">
            {Math.round(completionValue)}%
          </p>
        </div>
      </div>

      {/* <div className="mb-5 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Answered cards</span>
          <span className="font-medium">
            {progress.answered} / {totalCards}
          </span>
        </div>

        <Progress value={completionValue} className="h-2.5" />
      </div> */}

      <div className="grid grid-cols-2 gap-3">
        <SummaryStatCard
          label={t("correct")}
          value={progress.correct}
          icon={CheckCircle2}
          tone="success"
        />
        <SummaryStatCard
          label={t("wrong")}
          value={progress.incorrect}
          icon={XCircle}
          tone="danger"
        />
        <SummaryStatCard
          label={t("remaining")}
          value={progress.remaining}
          icon={CircleDashed}
          tone="neutral"
        />
        <SummaryStatCard
          label={t("accuracy")}
          value={`${Math.round(accuracyValue)}%`}
          icon={Target}
          tone="accent"
        />
        <div className="col-span-2 grid grid-cols-2 gap-3">
          <Button className="grow" variant={"secondary"} asChild>
            <Link href="/dashboard">{t("buttons.gotoDashboard")}</Link>
          </Button>
          <Button className="grow" onClick={handleStartAgain}>
            {t("buttons.startAgain")}
          </Button>
        </div>
      </div>
    </section>
  )
}

interface SummaryStatCardProps {
  label: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  tone: "success" | "danger" | "neutral" | "accent"
}

function SummaryStatCard({
  label,
  value,
  icon: Icon,
  tone,
}: SummaryStatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3 shadow-xs",
        tone === "success" &&
          "border-emerald-200 bg-emerald-500/10 dark:border-emerald-900",
        tone === "danger" && "border-red-200 bg-red-500/10 dark:border-red-900",
        tone === "neutral" && "bg-muted/50",
        tone === "accent" &&
          "border-primary/20 bg-primary/10 dark:border-primary/30"
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon
          className={cn(
            "h-4 w-4",
            tone === "success" && "text-emerald-600 dark:text-emerald-400",
            tone === "danger" && "text-red-600 dark:text-red-400",
            tone === "neutral" && "text-muted-foreground",
            tone === "accent" && "text-primary"
          )}
        />
      </div>

      <p className="text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  )
}
