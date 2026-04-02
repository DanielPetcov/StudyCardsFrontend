import { Link } from "@/i18n/navigation"
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
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import Footer from "@/components/Footer"
import { LandingHeader } from "@/components/landing/LandingHeader"
import SectionHeading from "@/components/landing/SectionHeading"
import VideoPlaceholder from "@/components/landing/VideoPlaceholder"
import InteractiveDemo from "@/components/landing/InteractivDemo"
import { DEMO_DECKS, TESTIMONIALS_DATA } from "@/data"
import DeckPreviewCard from "@/components/landing/DeckPreviewCard"

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
            <CardFooter className="mt-3">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/register">{t("free.cta")}</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="relative flex flex-col gap-0 overflow-visible border-primary shadow-lg">
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
            <CardFooter className="mt-3">
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
