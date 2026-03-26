"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        [
          "group/input-group relative flex min-h-10 w-full min-w-0 items-center rounded-sm",
          "bg-surface-container-lowest text-on-surface",
          "soft-border elevation-xs",
          "transition-[background-color,box-shadow,border-color] duration-200 ease-in-out",
          "hover:elevation-sm hover:bg-surface-container-low",
          "focus-within:bg-surface-container-low",
          "focus-within:ghost-border focus-within:elevation-sm",
          "has-disabled:opacity-70",
          "has-disabled:bg-surface-container-low",
          "has-disabled:shadow-none",
          "has-[[data-slot][aria-invalid=true]]:border-destructive/30",
          "has-[[data-slot][aria-invalid=true]]:shadow-none",
          "in-data-[slot=combobox-content]:focus-within:shadow-none",
          "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col",
          "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col",
          "has-[>textarea]:h-auto",
          "has-[>[data-align=block-end]]:[&>input]:pt-3",
          "has-[>[data-align=block-start]]:[&>input]:pb-3",
          "has-[>[data-align=inline-end]]:[&>[data-slot=input-group-control]]:pr-1.5",
          "has-[>[data-align=inline-start]]:[&>[data-slot=input-group-control]]:pl-1.5",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  [
    "flex h-auto cursor-text items-center justify-center gap-2",
    "py-1.5 text-sm font-medium text-muted-foreground select-none",
    "group-data-[disabled=true]/input-group:opacity-50",
    "[&>kbd]:rounded-[calc(var(--radius)-6px)]",
    "[&>kbd]:bg-surface-container-low [&>kbd]:px-1.5 [&>kbd]:py-0.5",
    "[&>svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      align: {
        "inline-start": "order-first px-1",
        "inline-end": "order-last px-1",
        "block-start":
          "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-3",
        "block-end":
          "order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return
        e.currentTarget.parentElement
          ?.querySelector<HTMLElement>("input, textarea")
          ?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-6px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-6px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        [
          "flex-1 rounded-none border-0 bg-transparent shadow-none",
          "hover:bg-transparent hover:shadow-none",
          "focus-visible:bg-transparent focus-visible:shadow-none focus-visible:ring-0",
          "disabled:bg-transparent aria-invalid:shadow-none",
          "dark:bg-transparent dark:disabled:bg-transparent",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        [
          "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none",
          "hover:bg-transparent hover:shadow-none",
          "focus-visible:bg-transparent focus-visible:shadow-none focus-visible:ring-0",
          "disabled:bg-transparent aria-invalid:shadow-none",
          "dark:bg-transparent dark:disabled:bg-transparent",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
