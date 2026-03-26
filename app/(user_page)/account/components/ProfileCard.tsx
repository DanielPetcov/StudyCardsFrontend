import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Mail } from "lucide-react"

export default function ProfileCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center gap-5">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="rounded-md"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div>
            <p className="text-xl font-bold">Stefan cel mare</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Mail size={15} />
            <p>email@gmail.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
