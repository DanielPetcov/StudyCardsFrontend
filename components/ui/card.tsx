import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  interactive = false,
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm"
  interactive?: boolean
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-interactive={interactive}
      className={cn(
        [
          "group/card flex flex-col overflow-hidden rounded-lg",
          "bg-surface-container-lowest text-on-surface",
          "soft-border elevation-sm",
          "py-4 text-sm",
          "transition-[background-color,transform,box-shadow,border-color] duration-200 ease-in-out",
          "has-data-[slot=card-footer]:pb-0",
          "has-[>img:first-child]:pt-0",
          "data-[size=sm]:py-3",
          "data-[size=sm]:has-data-[slot=card-footer]:pb-0",
          "data-[interactive=true]:hover:bg-surface-bright",
          "data-[interactive=true]:hover:elevation-md",
          "data-[interactive=true]:hover:-translate-y-px",
          "*:[img:first-child]:rounded-t-lg",
          "*:[img:last-child]:rounded-b-lg",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        [
          "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5",
          "px-4",
          "group-data-[size=sm]/card:px-3",
          "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
          "has-data-[slot=card-description]:grid-rows-[auto_auto]",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium text-on-surface group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        [
          "mt-4 flex items-center rounded-b-lg",
          "border-t border-border/70",
          "bg-surface-container-low px-4 py-4",
          "group-data-[size=sm]/card:mt-3 group-data-[size=sm]/card:px-3 group-data-[size=sm]/card:py-3",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
