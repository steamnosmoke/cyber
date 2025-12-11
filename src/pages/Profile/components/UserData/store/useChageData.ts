import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TDataStore } from "../types";

export const useChangeData = create<TDataStore>()(
  persist(
    (set) => ({
      user: {
        email: "",
        name: "",
        phone: "",
        birthday: "",
        addresses: [],
      },

      defaultAddress: undefined,

      setUser: (user) =>
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
          defaultAddress: undefined,
        }),

      setEmail: (email) => set((state) => ({ user: { ...state.user, email } })),
      setName: (name) => set((state) => ({ user: { ...state.user, name } })),
      setPhone: (phone) => set((state) => ({ user: { ...state.user, phone } })),
      setBirthday: (birthday) =>
        set((state) => ({ user: { ...state.user, birthday } })),
      setDefaultAddress: (defaultAddress) => set({ defaultAddress }),
      setAddresses: (address) =>
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
          defaultAddress: undefined,
        })),
    }),
    {
      name: "userData-storage",
      partialize: (state) => ({
        user: state.user,
        defaultAddress: state.defaultAddress,
      }),
    }
  )
);
