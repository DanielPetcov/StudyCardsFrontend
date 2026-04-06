import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export default function SkeletonPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-15 w-2/3 rounded-md" />
        <Skeleton className="h-8 w-1/3 rounded-md" />
      </div>
      <div className="flex flex-wrap gap-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="w-sm">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-4 w-1/2 rounded-full" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full rounded-md" />
            </CardContent>
            <CardFooter />
          </Card>
        ))}
      </div>
    </div>
  )
}
