import { create } from "zustand";

import { TProduct } from "types/ProductTypes";

import { TSearchStore } from "../types";

export const useSearchStore = create<TSearchStore>((set) => ({
  value: "",
  result: [],
  ariaOpened: false,
  setAriaOpened: (value: boolean) => set(() => ({ ariaOpened: value })),
  setResult: (products: TProduct[]) => set(() => ({ result: products })),
  Searching: (value: string) => set(() => ({ value: value })),
  ClearValue: () => set(() => ({ value: "" })),
}));
