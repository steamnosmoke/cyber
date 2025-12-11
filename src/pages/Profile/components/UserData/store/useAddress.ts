import { create } from "zustand";
import { TAddressStore } from "../types";

export const useAddress = create<TAddressStore>()((set) => ({
  city: "",
  country: "",
  zip: "",
  street: "",
  isNewAddressOpened: false,
  isAddressesOpened: false,
  setIsNewAddressOpened: (isNewAddressOpened) => set({ isNewAddressOpened }),
  setIsAddressesOpened: (isAddressesOpened) => set({ isAddressesOpened }),
  setCity: (city) => set({ city }),
  setCountry: (country) => set({ country }),
  setStreet: (street) => set({ street }),
  setZip: (zip) => set({ zip }),
  clearAll: () => set({ city: "", country: "", street: "", zip: "" }),
}));
