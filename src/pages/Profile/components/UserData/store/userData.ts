import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useAuthStore } from "store/authStore";

import { TDataStore } from "../types";

const user = useAuthStore.getState().user;

const address = user.addresses
  ? Object.values(user.addresses).find((el) => el.isDefault === true)
  : undefined;

export const useChangeData = create<TDataStore>()(
  persist(
    (set) => ({
      email: user?.email,
      name: user?.name,
      phone: user?.phone,
      birthday: user?.birthday,
      addresses: [],
      defaultAddress: address,
      setEmail: (email) => set({ email }),
      setName: (name) => set({ name }),
      setPhone: (phone) => set({ phone }),
      setBirthday: (birthday) => set({ birthday }),
      setDefaultAddress: (defaultAddress) => set({ defaultAddress }),
      setAddresses: (address) =>
        set((state) => ({
          addresses: [...state.addresses, address],
        })),
    }),
    {
      name: "userData-storage",
      partialize: (state) => ({
        email: state.email,
        name: state.name,
        phone: state.phone,
        birthday: state.birthday,
        defaultAddress: state.defaultAddress,
        addresses: state.addresses,
      }),
    }
  )
);
