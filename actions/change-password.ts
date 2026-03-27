import { authClient } from "@/lib/auth-client"

export async function ChangePassword(
  currentPassword: string,
  newPassword: string
): Promise<string | undefined> {
  const { error } = await authClient.changePassword({
    newPassword,
    currentPassword,
    revokeOtherSessions: true,
  })

  return error?.message
}
