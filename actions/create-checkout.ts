import { authClient } from "@/lib/auth-client"

export async function CreateProSubscriptionCheckout() {
  const productSlug = "c6108bc5-c526-4841-ae45-522bedb2fa9d"

  await authClient.checkout({
    products: [productSlug],
  })
}
