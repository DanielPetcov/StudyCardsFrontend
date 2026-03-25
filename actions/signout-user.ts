import { authClient } from "@/lib/auth-client"

export async function SignoutUser(onSuccessFunction: () => void) {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: onSuccessFunction,
    },
  })
}
