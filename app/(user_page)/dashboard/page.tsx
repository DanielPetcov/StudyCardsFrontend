import { deckDashboard } from "@/constants/deck"

import Deck from "@/components/deck/Deck"
import AddDeckInputBlock from "@/components/deck/AddDeckInputBlock"

export default function DashboardPage() {
  return (
    <>
      <div className="mb-5">
        <h1 className="mb-2 text-4xl font-bold">My library</h1>
        <h2 className="text max-w-2/3 text-muted-foreground">
          Access your AI-curated knowledge archive. Continue where you left off
          or upload new material to expand your decks.
        </h2>
      </div>

      <div className="flex flex-wrap gap-5">
        {deckDashboard.map((d) => (
          <Deck key={d.id} deck={d} />
        ))}
        <AddDeckInputBlock />
      </div>
    </>
  )
}
