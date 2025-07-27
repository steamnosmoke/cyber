import { create } from "zustand";
import { TSearchStore } from "../types";

export const useSearchStore = create<TSearchStore>((set) => ({
  value: "",
  Searching: (value: string) => set(() => ({ value: value })),
  ClearValue: () => set(() => ({ value: "" })),
}));
