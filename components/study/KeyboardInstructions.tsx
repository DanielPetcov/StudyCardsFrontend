import { cn } from "@/lib/utils"

export function KeyboardInstructions({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground",
        className
      )}
    >
      <span>Navigation:</span>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <kbd className="rounded-md border bg-background px-2 py-1 text-xs font-medium shadow-sm">
            A
          </kbd>
          <span>/</span>
          <kbd className="rounded-md border bg-background px-2 py-1 text-xs font-medium shadow-sm">
            ←
          </kbd>
        </div>

        <span>Previous</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <kbd className="rounded-md border bg-background px-2 py-1 text-xs font-medium shadow-sm">
            D
          </kbd>
          <span>/</span>
          <kbd className="rounded-md border bg-background px-2 py-1 text-xs font-medium shadow-sm">
            →
          </kbd>
        </div>

        <span>Next</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <kbd className="rounded-md border bg-background px-2 py-1 text-xs font-medium shadow-sm">
            Enter
          </kbd>
          <span>/</span>
          <kbd className="rounded-md border bg-background px-2 py-1 text-xs font-medium shadow-sm">
            Space
          </kbd>
        </div>

        <span>Submit</span>
      </div>
    </div>
  )
}
