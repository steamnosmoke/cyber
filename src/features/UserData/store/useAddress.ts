import { create } from "zustand";
import { TAddressStore } from "../types";

export const useAddAddress = create<TAddressStore>()((set) => ({
  city: "",
  country: "",
  zip: "",
  street: "",
  setCity: (city) => set({ city }),
  setCountry: (country) => set({ country }),
  setStreet: (street) => set({ street }),
  setZip: (zip) => set({ zip }),
}));
