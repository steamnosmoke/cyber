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
        addresses: [],
      },

      defaulAddress: undefined,

      seUser: (user) =>
        set({
          user: {
            email: user?.email,
            name: user?.name,
            phone: user?.phone,
            birthday: user?.birthday,
            addresses: user?.addresses,
          },
        }),

      clearData: () =>
        set({
          user: {},
          defaulAddress: undefined,
        }),

      setEmail: (email) => set((state) => ({ user: { ...state.user, email } })),
      setName: (name) => set((state) => ({ user: { ...state.user, name } })),
      setPhone: (phone) => set((state) => ({ user: { ...state.user, phone } })),
      setBirthday: (birthday) =>
        set((state) => ({ user: { ...state.user, birthday } })),
      setDefaulAddress: (defaulAddress) => set({ defaulAddress }),
      seAddresses: (address) =>
        set((state) => ({
          user: {
            ...state.user,
            addresses: [...state.user.addresses, address],
          },
        })),
      removeAddress: (address) =>
        set((state) => ({
          user: {
            ...state.user,
            addresses: state.user.addresses.filter(
              (el) => el.id === address.id
            ),
          },
          defaulAddress: undefined,
        })),
    }),
    {
      name: "userData-storage",
      partialize: (state) => ({
        user: state.user,
        defaulAddress: state.defaulAddress,
      }),
    }
  )
);
