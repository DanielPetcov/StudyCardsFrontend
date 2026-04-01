import PageTitle from "@/components/PageTitle"

import { getTranslations } from "next-intl/server"

export default async function RecentPage() {
  const t = await getTranslations("RecentlyPage")

  return (
    <>
      <PageTitle title={t("title")} description={t("description")} />

      <div className="flex flex-wrap gap-5">
        {/* {deckRecenlty.map((d, index) =>
          index === 0 ? (
            <RecentlyCard key={d.id} deck={d} isFirst={true} />
          ) : (
            <RecentlyCard key={d.id} deck={d} isFirst={false} />
          )
        )} */}
      </div>
    </>
  )
}
