import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        [
          "flex field-sizing-content min-h-24 w-full rounded-sm",
          "bg-surface-container-lowest text-on-surface",
          "soft-border elevation-xs",
          "px-3 py-2 text-sm",
          "resize-y outline-none",
          "transition-[background-color,box-shadow,color,border-color] duration-200 ease-in-out",
          "placeholder:text-muted-foreground",
          "hover:elevation-sm hover:bg-surface-container-low",
          "focus-visible:bg-surface-container-low",
          "focus-visible:ghost-border focus-visible:elevation-sm focus-visible:ring-0",
          "aria-invalid:border-destructive/30 aria-invalid:shadow-none",
          "disabled:pointer-events-none disabled:cursor-not-allowed",
          "disabled:bg-surface-container-low disabled:text-muted-foreground disabled:opacity-70 disabled:shadow-none",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
