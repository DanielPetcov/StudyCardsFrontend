"use client"

import AddDeckInputBlock from "@/components/deck/AddDeckInputBlock"
import PageTitle from "@/components/PageTitle"

import Deck from "@/components/deck/Deck"
import { useDecks } from "@/hooks/useDecks"
import { useTranslations } from "next-intl"

export default function DashboardPage() {
  const t = useTranslations()
  const dashboardTranslation = useTranslations("DashboardPage")
  const { data, isLoading, isError } = useDecks()

  if (isLoading) {
    return <div>{t("loading")}</div>
  }

  if (isError) {
    return <div>{t("error")}</div>
  }

  return (
    <>
      <PageTitle
        title={dashboardTranslation("title")}
        description={dashboardTranslation("description")}
      />

      <div className="flex flex-wrap gap-5">
        {data ? (
          data.map((d) => <Deck key={d.id} deck={d} />)
        ) : (
          <div>{dashboardTranslation("noDecks")}</div>
        )}
        <AddDeckInputBlock />
      </div>
    </>
  )
}
