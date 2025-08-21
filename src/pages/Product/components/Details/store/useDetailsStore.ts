import { create } from "zustand";
import { TStore } from "../types";

export const useDetailsStore = create<TStore>((set) => ({
  isDetailsOpened: false,
  setDetailsOpened: (value) =>
    set(() => ({
      isDetailsOpened: value,
    })),
}));
