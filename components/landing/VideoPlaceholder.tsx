import { Play } from "lucide-react"

export default function VideoPlaceholder({ text }: { text: string }) {
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
