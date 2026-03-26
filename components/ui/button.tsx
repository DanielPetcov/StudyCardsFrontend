import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "font-medium outline-none select-none",
    "rounded-sm",
    "transition-[background-color,color,box-shadow,transform,border-color,filter] duration-200 ease-in-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:not-aria-[haspopup]:translate-y-px",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-0",
    "aria-invalid:ring-2 aria-invalid:ring-destructive/20",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-cta-gradient text-primary-foreground",
          "elevation-sm",
          "hover:elevation-md hover:brightness-[1.03]",
          "focus-visible:ring-primary/35",
        ].join(" "),

        secondary: [
          "bg-secondary text-secondary-foreground",
          "soft-border",
          "hover:elevation-xs hover:bg-surface-container-low",
          "focus-visible:ring-primary/25",
        ].join(" "),

        outline: [
          "bg-surface-container-lowest text-on-surface",
          "soft-border",
          "hover:elevation-xs hover:bg-surface-container-low",
          "focus-visible:ring-primary/25",
        ].join(" "),

        ghost: [
          "bg-transparent text-primary",
          "hover:bg-surface-container-low hover:text-primary",
          "aria-expanded:bg-surface-container-low",
          "focus-visible:ring-primary/20",
        ].join(" "),

        destructive: [
          "bg-destructive text-white",
          "elevation-xs",
          "hover:elevation-sm hover:brightness-[1.03]",
          "focus-visible:ring-destructive/30",
        ].join(" "),

        link: [
          "bg-transparent p-0 text-primary underline-offset-4",
          "hover:underline",
          "focus-visible:ring-0",
        ].join(" "),
      },

      size: {
        default:
          "h-10 gap-2 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1.5 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-10",
        "icon-xs": "size-7 p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
