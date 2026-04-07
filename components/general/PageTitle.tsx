import { cn } from "@/lib/utils"

export default function PageTitle({
  title,
  description,
  className,
}: {
  title: string
  description: string
  className?: string
}) {
  return (
    <div className={cn("mb-5", className)}>
      <h1 className="mb-2 text-4xl font-bold">{title}</h1>
      <h2 className="text text-muted-foreground lg:max-w-2/3">{description}</h2>
    </div>
  )
}
