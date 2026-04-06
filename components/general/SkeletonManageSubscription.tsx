import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export default function SkeletonManageSubscription() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-30" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20 w-full" />
      </CardContent>
    </Card>
  )
}
