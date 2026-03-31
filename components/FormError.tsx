import { cn } from "@/lib/utils"

export default function FormError({
  message,
  className,
}: {
  message: string
  className?: string
}) {
  return <div className={cn("text-xs text-red-500", className)}>{message}</div>
}
