import { deckDashboard } from "@/constants/deck"

import Deck from "@/components/deck/Deck"
import AddDeckInputBlock from "@/components/deck/AddDeckInputBlock"
import PageTitle from "@/components/PageTitle"

export default function DashboardPage() {
  return (
    <>
      <PageTitle
        title="My library"
        description="Access your AI-curated knowledge archive. Continue where you left off
          or upload new material to expand your decks."
      />

      <div className="flex flex-wrap gap-5">
        {deckDashboard.map((d) => (
          <Deck key={d.id} deck={d} />
        ))}
        <AddDeckInputBlock />
      </div>
    </>
  )
}
