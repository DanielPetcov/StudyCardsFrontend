"use client"

import AddDeckInputBlock from "@/components/deck/AddDeckInputBlock"
import PageTitle from "@/components/PageTitle"

import Deck from "@/components/deck/Deck"
import { useDecks } from "@/hooks/useDecks"

export default function DashboardPage() {
  const { data, isLoading, isError } = useDecks()

  if (isLoading) {
    return <div>is loading</div>
  }

  if (isError) {
    return <div>there is an error</div>
  }

  return (
    <>
      <PageTitle
        title="My library"
        description="Access your AI-curated knowledge archive. Continue where you left off
          or upload new material to expand your decks."
      />

      <div className="flex flex-wrap gap-5">
        {data ? (
          data.map((d) => <Deck key={d.id} deck={d} />)
        ) : (
          <div>currently there are no decks</div>
        )}
        <AddDeckInputBlock />
      </div>
    </>
  )
}
