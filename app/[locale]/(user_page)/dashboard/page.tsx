"use client"

import AddDeckInputBlock from "@/components/deck/AddDeckInputBlock"
import PageTitle from "@/components/general/PageTitle"

import Deck from "@/components/deck/Deck"
import { useDecks } from "@/hooks/useDecks"
import { useTranslations } from "next-intl"
import { useParams, useSearchParams } from "next/navigation"
import { ThanksDialog } from "@/components/subscriptions/ThanksDialog"

import SkeletonPage from "@/components/general/SkeletonPage"

export default function DashboardPage() {
  const t = useTranslations()
  const dashboardTranslation = useTranslations("DashboardPage")
  const { data, isLoading, isError } = useDecks()

  const params = useSearchParams()
  const paymentSuccess = params.get("payment")

  if (isLoading) {
    return <SkeletonPage />
  }

  if (isError) {
    return <div>{t("error")}</div>
  }

  return (
    <>
      {paymentSuccess && <ThanksDialog />}

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
