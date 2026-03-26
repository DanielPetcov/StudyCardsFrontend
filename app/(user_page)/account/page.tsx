import PageTitle from "@/components/PageTitle"
import ProfileCard from "./components/ProfileCard"
import PreferencesCard from "./components/PreferencesCard"
import SecurityCard from "./components/SecurityCard"
import ManageSubscriptionCard from "@/components/ManageSubscriptionCard"

export default function AccountPage() {
  return (
    <>
      <PageTitle
        title="Account Settings"
        description="Manage your intellectual workspace and preferences."
      />

      <ProfileCard className="mb-10" />
      <div className="mb-10 grid grid-cols-2 gap-10">
        <PreferencesCard />
        <SecurityCard />
      </div>

      <ManageSubscriptionCard />
    </>
  )
}
