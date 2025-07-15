import { create } from "zustand";

export const useSearchStore = create((set) => ({
  value: "",
  Searching: (value) => set(() => ({ value: value })),
  ClearValue: () => set(() => ({ value: "" })),
}));

