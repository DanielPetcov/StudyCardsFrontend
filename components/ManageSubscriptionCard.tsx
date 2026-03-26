import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck } from "lucide-react"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"

export default function ManageSubscriptionCard() {
  return (
    <Card className="pt-0">
      <CardHeader className="bg-linear-90 from-blue-800 to-blue-600 p-5">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-accent">
            <BadgeCheck />
            <p className="text-2xl">Pro Plan</p>
          </div>
          <Button size="lg" className="bg-accent text-accent-foreground">
            Manage Subscription
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-5 space-y-2">
          <div className="font-semibold uppercase">Usage this month</div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1 font-semibold">
              <div className="text-2xl font-bold">3</div>
              <div>/</div>
              <div>10 PDFs processed</div>
            </div>
            <div className="text-xs">30% Capacity</div>
          </div>
          <Progress value={30} className="h-2" />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <ComparationCard
            title="Cloud storage"
            currentValue="4.2 GB"
            comparedValue="50GB"
          />
          <ComparationCard
            title="AI summaries"
            currentValue="12"
            comparedValue="Unlimited"
          />
          <ComparationCard
            title="Shared Decks"
            currentValue="8"
            comparedValue="Active"
            slash={false}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function ComparationCard({
  title,
  currentValue,
  comparedValue,
  slash,
}: {
  title: string
  currentValue: string
  comparedValue: string
  slash?: boolean
}) {
  return (
    <div className="rounded-md bg-muted-foreground/10 p-4">
      <p className="mb-2 text-sm font-semibold uppercase">{title}</p>
      <div className="flex items-baseline gap-1 text-xs">
        <div className="text-base font-bold">{currentValue}</div>
        {slash === false ? null : <div>/</div>}
        <div>{comparedValue}</div>
      </div>
    </div>
  )
}
