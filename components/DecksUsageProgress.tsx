import { Gauge } from "lucide-react"
import { Progress } from "@/components/ui/progress"
export default function DecksUsageProgress() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 pl-2 text-xs text-accent-foreground">
        <Gauge size={20} />
        <p>Usage: 80%</p>
      </div>
      <Progress value={80} />
    </div>
  )
}
