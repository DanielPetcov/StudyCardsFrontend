"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Mail } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function ProfileCard({ className }: { className?: string }) {
  const { data, isPending } = authClient.useSession()
  const user = data?.user

  const fallbackName =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? ""

  if (isPending) {
    return (
      <Card className={cn("", className)}>
        <CardContent className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-62.5" />
            <Skeleton className="h-4 w-50" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="flex items-center gap-5">
        <Avatar className="h-24 w-24">
          {user?.image && <AvatarImage src={user.image} alt={user.name} />}
          <AvatarFallback>{fallbackName}</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-xl font-bold">{user?.name}</p>

          <div className="flex items-center gap-1 text-muted-foreground">
            <Mail size={15} />
            <p>{user?.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
