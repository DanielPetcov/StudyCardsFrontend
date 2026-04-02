import PageTitle from "@/components/PageTitle"

import ArchivedDeck from "./components/ArchivedDeck"
import { getTranslations } from "next-intl/server"

export default async function ArchivedPage() {
  const t = await getTranslations("RecentlyPage")

  return (
    <>
      <PageTitle title={t("title")} description={t("description")} />

      <div className="flex flex-wrap gap-5">
        {/* {deckArchived.map((d) => (
          <ArchivedDeck key={d.id} deck={d} />
        ))} */}
      </div>
    </>
  )
}
