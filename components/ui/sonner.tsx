"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--surface-container-lowest)",
          "--normal-text": "var(--on-surface)",
          "--normal-border":
            "color-mix(in oklab, var(--on-surface) 8%, transparent)",
          "--success-bg": "var(--surface-container-lowest)",
          "--success-text": "var(--on-surface)",
          "--info-bg": "var(--surface-container-lowest)",
          "--info-text": "var(--on-surface)",
          "--warning-bg": "var(--surface-container-lowest)",
          "--warning-text": "var(--on-surface)",
          "--error-bg": "var(--surface-container-lowest)",
          "--error-text": "var(--on-surface)",
          "--border-radius": "var(--radius-xl)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: [
            "group toast",
            "rounded-xl soft-border elevation-md",
            "bg-surface-container-lowest text-on-surface",
            "backdrop-blur-sm",
          ].join(" "),
          title: "text-sm font-medium text-on-surface",
          description: "text-sm text-muted-foreground",
          actionButton:
            "bg-cta-gradient text-primary-foreground hover:brightness-[1.03] rounded-sm elevation-xs",
          cancelButton:
            "bg-surface-container-lowest text-on-surface soft-border hover:bg-surface-container-low rounded-sm",
          success: "[&_[data-icon]]:text-primary",
          info: "[&_[data-icon]]:text-primary-fixed",
          warning: "[&_[data-icon]]:text-tertiary",
          error: "[&_[data-icon]]:text-destructive",
          loading: "[&_[data-icon]]:text-primary",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
