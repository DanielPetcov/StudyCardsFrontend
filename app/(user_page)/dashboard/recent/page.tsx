import PageTitle from "@/components/PageTitle"

import { deckRecenlty } from "@/constants/deck"
import RecentlyCard from "./components/RecentlyCard"

export default function RecentPage() {
  return (
    <>
      <PageTitle
        title="Recently Studied"
        description="Pick up exactly where you left off. Your cognitive momentum is
your greatest asset."
      />

      <div className="flex flex-wrap gap-5">
        {deckRecenlty.map((d, index) =>
          index === 0 ? (
            <RecentlyCard key={d.id} deck={d} isFirst={true} />
          ) : (
            <RecentlyCard key={d.id} deck={d} isFirst={false} />
          )
        )}
      </div>
    </>
  )
}
