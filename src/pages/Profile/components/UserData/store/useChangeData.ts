import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DataStore } from "../types";

export const useChangeData = create<DataStore>()(
  persist(
    (set) => ({
      user: {
        email: "",
        name: "",
        phone: "",
        birthday: "",
      },

      defaultAddress: null,

      setUser: (user) =>
        set({
          user: {
            email: user?.email,
            name: user?.name,
            phone: user?.phone,
            birthday: user?.birthday,
          },
        }),

      clearData: () =>
        set({
          user: {},
          defaultAddress: null,
        }),

      setEmail: (email) => set((state) => ({ user: { ...state.user, email } })),
      setName: (name) => set((state) => ({ user: { ...state.user, name } })),
      setPhone: (phone) => set((state) => ({ user: { ...state.user, phone } })),
      setBirthday: (birthday) =>
        set((state) => ({ user: { ...state.user, birthday } })),
      setDefaultAddress: (defaultAddress) => set({ defaultAddress }),}),
    {
      name: "userData-storage",
      partialize: (state) => ({
        user: state.user,
        defaultAddress: state.defaultAddress,
      }),
    }
  )
);
