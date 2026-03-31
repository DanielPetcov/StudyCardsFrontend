import { createAuthClient } from "better-auth/react"

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
          type: "string",
          required: true,
          defaultValue: "free",
          input: false,
        },
      },
    }),
  ],
})
