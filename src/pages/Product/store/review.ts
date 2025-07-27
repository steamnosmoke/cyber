import { create } from "zustand";

import { TReviewStore } from "../types";

export const useReviewStore = create<TReviewStore>()((set) => ({
  comment: "",
  setComment: (comment) => set({ comment }),
}));
