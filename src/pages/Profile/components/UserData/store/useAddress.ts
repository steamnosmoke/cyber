import { create } from "zustand";
import { AddressStore } from "../types";

export const useAddress = create<AddressStore>()((set) => ({
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
