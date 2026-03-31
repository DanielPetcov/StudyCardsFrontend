import { Progress } from "../ui/progress"

interface StudyProgressBarProps {
  currentIndex: number
  cardsLength: number
  className?: string
}

export default function StudyProgressBar({
  className,
  currentIndex,
  cardsLength,
}: StudyProgressBarProps) {
  const progressValue = parseInt(
    (((currentIndex + 1) / cardsLength) * 100).toPrecision(2)
  )
  return <Progress value={progressValue} className={className} />
}
