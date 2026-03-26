import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        [
          "flex h-10 w-full min-w-0 rounded-sm",
          "bg-surface-container-lowest text-on-surface",
          "soft-border",
          "px-3 py-2 text-sm",
          "elevation-xs outline-none",
          "transition-[background-color,box-shadow,color,border-color] duration-200 ease-in-out",
          "placeholder:text-muted-foreground",
          "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-on-surface",
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

export { Input }
