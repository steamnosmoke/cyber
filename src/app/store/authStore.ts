import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TAuthStore } from "types/AuthTypes";

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set) => ({
      user: null,
      email: "",
      password: "",
      confirm: "",
      error: "",

      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setConfirm: (confirm) => set({ confirm }),
      logOut: () =>
        set({
          user: null,
        }),
      setUser: (user) => set({ user }),
      setError: (error) => set({ error }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
