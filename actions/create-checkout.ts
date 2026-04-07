import { authClient } from "@/lib/auth-client"

export async function CreateProSubscriptionCheckout() {
  const productSlug = process.env.NEXT_PUBLIC_POLAR_PRO_SUBSCRIPTION_ID

  await authClient.checkout({
    products: [productSlug],
  })
}
