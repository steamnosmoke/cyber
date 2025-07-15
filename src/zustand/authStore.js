import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      email: "",
      password: "",
      confirm: "",
      error: null,
      setEmail: (email) => set(() => ({ email })),
      setPassword: (password) => set(() => ({ password })),
      setConfirm: (confirm) => set(() => ({ confirm })),
      logOut: () =>
        set(() => ({
          user: null,
          email: "",
          password: "",
        })),
      setUser: (user) => set(() => ({ user })),
      setError: (error) => set(() => ({ error })),
    }),
    { name: "user-storage", partialize: (state) => ({ user: state.user }) }
  )
);
