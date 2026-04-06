import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export default function SkeletonAccountCard() {
  return (
    <Card>
      <CardHeader className="mb-2">
        <CardTitle>
          <Skeleton className="h-6 w-1/3 rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-auto space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-full" />
        </div>
        <Skeleton className="h-6 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}
