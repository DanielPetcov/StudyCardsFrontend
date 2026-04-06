import PageTitle from "@/components/general/PageTitle"
import ProfileCard from "./components/ProfileCard"
import PreferencesCard from "./components/PreferencesCard"
import SecurityCard from "./components/SecurityCard"
import ManageSubscriptionCard from "@/components/subscriptions/ManageSubscriptionCard"
import { getTranslations } from "next-intl/server"

export default async function AccountPage() {
  const t = await getTranslations("Account")

  return (
    <>
      <PageTitle title={t("title")} description={t("description")} />

      <div className="mx-auto max-w-5xl">
        <ProfileCard className="mb-10" />
        <div className="mb-10 grid grid-cols-2 gap-10">
          <PreferencesCard />
          <SecurityCard />
        </div>
      </div>

      <ManageSubscriptionCard />
    </>
  )
}
