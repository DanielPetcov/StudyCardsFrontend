export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-auto border-t p-3 text-center text-xs text-muted-foreground">
      <p>@{currentYear} StudyCards. All academic rights reserved.</p>
      <p>Made by Petcov Daniel</p>
    </div>
  )
}
