import { createAuthClient } from "better-auth/react"
import { polarClient } from "@polar-sh/better-auth/client"
import { inferAdditionalFields } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        language: {
          type: "string",
          required: true,
          defaultValue: "ro",
        },
        plan: {
          type: ["free", "pro"],
          required: true,
          defaultValue: "free",
          input: false,
        },
      },
    }),
    polarClient(),
  ],
})
