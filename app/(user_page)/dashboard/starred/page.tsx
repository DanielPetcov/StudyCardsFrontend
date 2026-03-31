import PageTitle from "@/components/PageTitle"

import StaredCard from "./components/StaredCard"
import { getTranslations } from "next-intl/server"

export default async function StarredPage() {
  const t = await getTranslations("StarredPage")

  return (
    <>
      <PageTitle title={t("title")} description={t("description")} />

      <div className="flex flex-wrap gap-5">
        {/* {deckStarred.map((d) => (
          <StaredCard key={d.id} deck={d} />
        ))} */}
      </div>
    </>
  )
}
