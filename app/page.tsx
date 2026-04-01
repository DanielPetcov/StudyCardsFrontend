"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import {
  Sparkles,
  Globe,
  Brain,
  BarChart3,
  Upload,
  Wand2,
  BookOpen,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  ArrowRight,
  GalleryHorizontalEnd,
  RotateCcw,
  Menu,
  Beaker,
  Code,
  Landmark,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Footer from "@/components/Footer"

// ─── Types ───────────────────────────────────────────────────────────────────

interface DemoCard {
  id: string
  order: number
  question: string
  options: string[]
  correctIndex: number
}

interface DemoAnswer {
  selectedIndex: number
  isCorrect: boolean
}

interface DemoDeck {
  id: string
  title: string
  description: string
  icon: "beaker" | "code" | "landmark"
  cardCount: number
}

// ─── Demo Data ───────────────────────────────────────────────────────────────

const DEMO_CARDS: DemoCard[] = [
  {
    id: "dc-1",
    order: 0,
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
    correctIndex: 1,
  },
  {
    id: "dc-2",
    order: 1,
    question: "Which organelle is responsible for protein synthesis?",
    options: ["Lysosome", "Smooth ER", "Ribosome", "Plasma Membrane"],
    correctIndex: 2,
  },
  {
    id: "dc-3",
    order: 2,
    question:
      "What structure surrounds the cell and controls what enters and exits?",
    options: ["Cell Wall", "Cytoplasm", "Nuclear Envelope", "Plasma Membrane"],
    correctIndex: 3,
  },
  {
    id: "dc-4",
    order: 3,
    question: "Which organelle contains the cell's genetic material?",
    options: ["Vacuole", "Nucleus", "Centrosome", "Peroxisome"],
    correctIndex: 1,
  },
  {
    id: "dc-5",
    order: 4,
    question:
      "What is the jelly-like substance that fills the interior of the cell?",
    options: ["Cytoplasm", "Nucleoplasm", "Stroma", "Matrix"],
    correctIndex: 0,
  },
]

const DEMO_DECKS: DemoDeck[] = [
  {
    id: "dd-1",
    title: "Biology 101 — Cell Structure",
    description:
      "Comprehensive flashcards covering cell organelles, membranes, and cellular functions.",
    icon: "beaker",
    cardCount: 24,
  },
  {
    id: "dd-2",
    title: "JavaScript Fundamentals",
    description:
      "Core concepts of JavaScript including closures, promises, and the event loop.",
    icon: "code",
    cardCount: 18,
  },
  {
    id: "dd-3",
    title: "World History — Renaissance",
    description:
      "Key events, figures, and cultural movements of the European Renaissance period.",
    icon: "landmark",
    cardCount: 15,
  },
]

const TESTIMONIALS_DATA = [
  {
    key: "t1",
    avatar: "https://i.pravatar.cc/100?img=47",
    initials: "MI",
  },
  {
    key: "t2",
    avatar: "https://i.pravatar.cc/100?img=12",
    initials: "AP",
  },
  {
    key: "t3",
    avatar: "https://i.pravatar.cc/100?img=26",
    initials: "ED",
  },
]

const DECK_ICONS = {
  beaker: Beaker,
  code: Code,
  landmark: Landmark,
}

// ─── Reusable: VideoPlaceholder ──────────────────────────────────────────────
// Replace this with <DemoVideo src="/demo.mp4" /> when ready

function VideoPlaceholder({ text }: { text: string }) {
  return (
    <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border bg-muted/50">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Play className="h-7 w-7 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  )
}

// ─── Reusable: DemoVideo ─────────────────────────────────────────────────────
// Use this when you have a real video:
// <DemoVideo src="/demo.mp4" poster="/demo-poster.jpg" />

export function DemoVideo({ src, poster }: { src: string; poster?: string }) {
  return (
    <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border bg-muted/50">
      <video
        src={src}
        poster={poster}
        controls
        className="h-full w-full object-cover"
        preload="metadata"
      />
    </div>
  )
}

// ─── Reusable: SectionHeading ────────────────────────────────────────────────

function SectionHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {subtitle}
      </p>
    </div>
  )
}

// ─── Reusable: DeckPreviewCard ───────────────────────────────────────────────

function DeckPreviewCard({
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

// ─── Interactive Demo ────────────────────────────────────────────────────────

function InteractiveDemo() {
  const t = useTranslations("LandingPage.demo")

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, DemoAnswer>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const currentCard = DEMO_CARDS[currentIndex]
  const totalCards = DEMO_CARDS.length
  const isFirst = currentIndex === 0
  const isLast = currentIndex === totalCards - 1
  const currentAnswer = answers[currentCard.id]
  const hasAnswered = !!currentAnswer
  const progressValue = ((currentIndex + 1) / totalCards) * 100

  const allAnswered = DEMO_CARDS.every((c) => answers[c.id])
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length

  const handleSelect = (index: number) => {
    if (hasAnswered) return
    setSelectedOption(index)
    setIsChecked(false)
  }

  const handleCheck = () => {
    if (selectedOption === null) return
    const isCorrect = selectedOption === currentCard.correctIndex
    setAnswers((prev) => ({
      ...prev,
      [currentCard.id]: { selectedIndex: selectedOption, isCorrect },
    }))
    setIsChecked(true)
  }

  const handleNext = () => {
    if (!isLast) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      const nextAnswer = answers[DEMO_CARDS[nextIndex].id]
      if (nextAnswer) {
        setSelectedOption(nextAnswer.selectedIndex)
        setIsChecked(true)
      } else {
        setSelectedOption(null)
        setIsChecked(false)
      }
    }
  }

  const handlePrevious = () => {
    if (!isFirst) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      const prevAnswer = answers[DEMO_CARDS[prevIndex].id]
      if (prevAnswer) {
        setSelectedOption(prevAnswer.selectedIndex)
        setIsChecked(true)
      } else {
        setSelectedOption(null)
        setIsChecked(false)
      }
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setAnswers({})
    setSelectedOption(null)
    setIsChecked(false)
    setShowSummary(false)
  }

  const goToCard = useCallback(
    (index: number) => {
      setCurrentIndex(index)
      const card = DEMO_CARDS[index]
      const answer = answers[card.id]
      if (answer) {
        setSelectedOption(answer.selectedIndex)
        setIsChecked(true)
      } else {
        setSelectedOption(null)
        setIsChecked(false)
      }
    },
    [answers]
  )

  // ── Summary view ──

  if (showSummary) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader className="text-center">
          <h3 className="text-2xl font-bold">{t("summaryTitle")}</h3>
          <p className="text-muted-foreground">{t("summarySubtitle")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {correctCount}/{totalCards}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t("score")}</p>
            </div>
          </div>

          <div className="space-y-3">
            {DEMO_CARDS.map((card, i) => {
              const answer = answers[card.id]
              return (
                <div
                  key={card.id}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-3 text-sm",
                    answer?.isCorrect
                      ? "border-emerald-200 bg-emerald-500/5 dark:border-emerald-900"
                      : "border-red-200 bg-red-500/5 dark:border-red-900"
                  )}
                >
                  <div className="mt-0.5">
                    {answer?.isCorrect ? (
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{card.question}</p>
                    <p className="mt-1 text-muted-foreground">
                      {card.options[card.correctIndex]}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleReset}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            {t("tryAgain")}
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link href="/register">
              {t("startStudying")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // ── Study view ──

  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 lg:grid-cols-[auto_1fr]">
      {/* Card navigation */}
      <ScrollArea className="w-full rounded-2xl border bg-background lg:h-80 lg:w-28">
        <div className="flex w-max gap-2 p-2 lg:w-full lg:flex-col">
          {DEMO_CARDS.map((card, index) => {
            const isActive = currentIndex === index
            const answer = answers[card.id]
            const isAnswered = !!answer
            const isCorrect = answer?.isCorrect === true
            const isWrong = answer?.isCorrect === false

            return (
              <Button
                key={card.id}
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => goToCard(index)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Go to card ${index + 1}`}
                className={cn(
                  "relative h-12 min-w-12 shrink-0 rounded-xl border text-sm font-semibold transition-all",
                  "lg:h-11 lg:w-full",
                  "border-border bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  isAnswered &&
                    isCorrect &&
                    "border-emerald-200 bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 dark:border-emerald-900 dark:text-emerald-400",
                  isAnswered &&
                    isWrong &&
                    "border-red-200 bg-red-500/15 text-red-700 hover:bg-red-500/20 dark:border-red-900 dark:text-red-400",
                  isActive &&
                    "border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
                )}
              >
                {index + 1}
              </Button>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" className="lg:hidden" />
        <ScrollBar orientation="vertical" className="hidden lg:flex" />
      </ScrollArea>

      {/* Card content */}
      <div>
        <Progress value={progressValue} className="mb-4" />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">
                {currentIndex + 1} {t("cardOf")} {totalCards}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {t("deckTitle")}
              </span>
            </div>
            <h3 className="pt-4 text-xl leading-snug font-semibold">
              {currentCard.question}
            </h3>
          </CardHeader>

          <CardContent className="space-y-2">
            {currentCard.options.map((option, index) => {
              const isSelected = selectedOption === index
              const showResult = hasAnswered || isChecked
              const isCorrectOption = index === currentCard.correctIndex
              const wasChosen = currentAnswer?.selectedIndex === index

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={hasAnswered}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm font-medium transition-all",
                    !showResult &&
                      !isSelected &&
                      "hover:border-primary/50 hover:bg-muted/50",
                    !showResult && isSelected && "border-primary bg-primary/5",
                    showResult &&
                      isCorrectOption &&
                      "border-emerald-300 bg-emerald-500/10 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400",
                    showResult &&
                      wasChosen &&
                      !isCorrectOption &&
                      "border-red-300 bg-red-500/10 text-red-700 dark:border-red-800 dark:text-red-400",
                    showResult && !isCorrectOption && !wasChosen && "opacity-50"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold",
                      !showResult && isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border",
                      showResult &&
                        isCorrectOption &&
                        "border-emerald-500 bg-emerald-500 text-white",
                      showResult &&
                        wasChosen &&
                        !isCorrectOption &&
                        "border-red-500 bg-red-500 text-white"
                    )}
                  >
                    {showResult && isCorrectOption ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : showResult && wasChosen && !isCorrectOption ? (
                      <X className="h-3.5 w-3.5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span>{option}</span>
                </button>
              )
            })}
          </CardContent>

          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={isFirst}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {t("previous")}
            </Button>

            <div className="flex gap-2">
              {!hasAnswered && (
                <Button
                  size="sm"
                  onClick={handleCheck}
                  disabled={selectedOption === null}
                >
                  {t("checkAnswer")}
                </Button>
              )}

              {hasAnswered && !isLast && (
                <Button size="sm" onClick={handleNext}>
                  {t("next")}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}

              {hasAnswered && isLast && allAnswered && (
                <Button size="sm" onClick={() => setShowSummary(true)}>
                  {t("viewSummary")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}

              {hasAnswered && isLast && !allAnswered && (
                <Button size="sm" variant="outline" onClick={() => goToCard(0)}>
                  {t("checkAnswer")}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────

function LandingHeader() {
  const t = useTranslations("LandingPage.header")

  const navLinks = [
    { label: t("features"), href: "#features" },
    { label: t("howItWorks"), href: "#how-it-works" },
    { label: t("demo"), href: "#demo" },
    { label: t("pricing"), href: "#pricing" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold">
          StudyCards
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button asChild size="sm">
            <Link href="/register">{t("startNow")}</Link>
          </Button>
        </div>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="text-2xl font-bold">StudyCards</SheetTitle>
            <nav className="mt-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-4">
                <Link href="/register">{t("startNow")}</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

// ─── Sections ────────────────────────────────────────────────────────────────

function HeroSection() {
  const t = useTranslations("LandingPage.hero")

  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-6 gap-1.5 px-3 py-1.5 text-xs font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {t("badge")}
          </Badge>

          <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/register">
                {t("cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto"
            >
              <a href="#how-it-works">{t("secondaryCta")}</a>
            </Button>
          </div>
        </div>

        <div className="mt-16">
          {/* Replace with <DemoVideo src="/demo.mp4" /> when ready */}
          <VideoPlaceholder text={t("videoPlaceholder")} />
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const t = useTranslations("LandingPage.features")

  const features = [
    {
      key: "aiGeneration",
      icon: Sparkles,
    },
    {
      key: "multiLanguage",
      icon: Globe,
    },
    {
      key: "smartSessions",
      icon: Brain,
    },
    {
      key: "progressTracking",
      icon: BarChart3,
    },
  ] as const

  return (
    <section id="features" className="scroll-mt-20 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <Card
              key={f.key}
              className="border-0 bg-background shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{t(`${f.key}.title`)}</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {t(`${f.key}.description`)}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const t = useTranslations("LandingPage.howItWorks")

  const steps = [
    { key: "step1", icon: Upload },
    { key: "step2", icon: Wand2 },
    { key: "step3", icon: BookOpen },
  ] as const

  return (
    <section id="how-it-works" className="scroll-mt-20 border-t">
      <div className="container mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.key} className="relative text-center">
              {/* Connector line */}
              {i < 2 && (
                <div className="absolute top-8 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] bg-border md:block" />
              )}

              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <step.icon className="h-7 w-7" />
              </div>

              <Badge variant="secondary" className="mb-3">
                {t(`${step.key}.label`)}
              </Badge>

              <h3 className="mt-2 text-lg font-semibold">
                {t(`${step.key}.title`)}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {t(`${step.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoSection() {
  const t = useTranslations("LandingPage.demo")

  return (
    <section id="demo" className="scroll-mt-20 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-16">
          <InteractiveDemo />
        </div>
      </div>
    </section>
  )
}

function DecksShowcaseSection() {
  const t = useTranslations("LandingPage.decks")

  return (
    <section className="border-t">
      <div className="container mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_DECKS.map((deck) => (
            <DeckPreviewCard
              key={deck.id}
              deck={deck}
              cardsLabel={t("cards")}
              statusLabel={t("status.ready")}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const t = useTranslations("LandingPage.testimonials")

  return (
    <section className="border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <Card
              key={testimonial.key}
              className="border-0 bg-background shadow-sm"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={t(`${testimonial.key}.name`)}
                    />
                    <AvatarFallback className="text-xs">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">
                      {t(`${testimonial.key}.name`)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t(`${testimonial.key}.role`)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t(`${testimonial.key}.quote`)}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const t = useTranslations("LandingPage.pricing")

  const freeFeatures = ["f1", "f2", "f3", "f4", "f5"] as const
  const proFeatures = ["f1", "f2", "f3", "f4", "f5", "f6"] as const

  return (
    <section id="pricing" className="scroll-mt-20 border-t">
      <div className="container mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Free Plan */}
          <Card className="flex flex-col gap-0">
            <CardHeader>
              <h3 className="text-xl font-semibold">{t("free.name")}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{t("free.price")}</span>
                <span className="text-muted-foreground">
                  {t("free.period")}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("free.description")}
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {t(`free.features.${f}`)}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/register">{t("free.cta")}</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="relative flex flex-col gap-0 border-primary shadow-lg">
            <div className="absolute -top-3 right-4">
              <Badge className="px-3 py-1">{t("pro.badge")}</Badge>
            </div>
            <CardHeader>
              <h3 className="text-xl font-semibold">{t("pro.name")}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{t("pro.price")}</span>
                <span className="text-muted-foreground">{t("pro.period")}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("pro.description")}
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {t(`pro.features.${f}`)}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/register">{t("pro.cta")}</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

function FinalCtaSection() {
  const t = useTranslations("LandingPage.finalCta")

  return (
    <section className="border-t">
      <div className="container mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="relative mt-4 text-lg text-primary-foreground/80">
            {t("subtitle")}
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="relative mt-8"
            asChild
          >
            <Link href="/register">
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <DemoSection />
        <DecksShowcaseSection />
        <TestimonialsSection />
        <PricingSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}
