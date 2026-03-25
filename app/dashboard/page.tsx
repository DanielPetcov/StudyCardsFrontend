"use client"

import { Button } from "@/components/ui/button"
import { SignoutUser } from "@/actions/signout-user"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  const onSuccess = () => {
    router.push("/login")
  }

  return (
    <div>
      <Button onClick={() => SignoutUser(onSuccess)}>signout</Button>
    </div>
  )
}
