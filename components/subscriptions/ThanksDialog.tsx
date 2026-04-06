import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check, CheckCircle } from "lucide-react"

export function ThanksDialog() {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <CheckCircle className="size-4" />
            Thanks for upgrading your plan
          </DialogTitle>
          <DialogDescription>
            That means a lot for the developer of this project.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Continue learning</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
