import { create } from "zustand"

interface RegisterSessionStore {
  loading: boolean
  setLoading: (value: boolean) => void
}

export const useRegisterSessionStore = create<RegisterSessionStore>()(
  (set) => ({
    loading: false,
    setLoading: (value: boolean) => set(() => ({ loading: value })),
  })
)
