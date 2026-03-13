import { create } from "zustand";

import { Product } from "types/ProductTypes";

import { SearchStore } from "../types";

export const useSearchStore = create<SearchStore>((set) => ({
  value: "",
  result: [],
  ariaOpened: false,
  setAriaOpened: (value: boolean) => set(() => ({ ariaOpened: value })),
  setResult: (products: Product[]) => set(() => ({ result: products })),
  Searching: (value: string) => set(() => ({ value: value })),
  ClearValue: () => set(() => ({ value: "" })),
}));
