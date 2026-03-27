import PageTitle from "@/components/PageTitle"

import { deckStarred } from "@/constants/deck"
import StaredCard from "./components/StaredCard"

export default function StarredPage() {
  return (
    <>
      <PageTitle
        title="Favorites"
        description="Access your most important study materials."
      />

      <div className="flex flex-wrap gap-5">
        {deckStarred.map((d) => (
          <StaredCard key={d.id} deck={d} />
        ))}
      </div>
    </>
  )
}
