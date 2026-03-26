import { LucideIcon } from "lucide-react"

export default function SettingsCardTitle({
  title,
  Icon,
}: {
  title: string
  Icon: LucideIcon
}) {
  return (
    <div className="flex items-center gap-1">
      <Icon size={20} />
      <p className="text-xl font-semibold">{title}</p>
    </div>
  )
}
