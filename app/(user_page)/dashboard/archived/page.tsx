import PageTitle from "@/components/PageTitle"

import { deckArchived } from "@/constants/deck"
import ArchivedDeck from "./components/ArchivedDeck"

export default function ArchivedPage() {
  return (
    <>
      <PageTitle
        title="Archived Decks"
        description="Review and restore past study materials. These decks are currently
hidden from your primary dashboard but preserved for reference."
      />

      <div className="flex flex-wrap gap-5">
        {deckArchived.map((d) => (
          <ArchivedDeck key={d.id} deck={d} />
        ))}
      </div>
    </>
  )
}
