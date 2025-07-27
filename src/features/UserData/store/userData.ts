import { create } from "zustand";

import { TDataStore } from "../types";
import user from "constants/user";

const address = user.addresses ? JSON.stringify(
  user.addresses.find((el) => el.isDefault === true)
) : "";

export const useChangeData = create<TDataStore>()((set) => ({
  email: user.email,
  name: user.name,
  phone: user.phone,
  birthday: user.birthday,
  addresses: user.addresses,
  defaultAddress: address,
  setEmail: (email) => set({ email }),
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setBirthday: (birthday) => set({ birthday }),
  setDefaultAddress: (defaultAddress) => set({ defaultAddress }),
  setAddresses: (state) => set({}),
}));
