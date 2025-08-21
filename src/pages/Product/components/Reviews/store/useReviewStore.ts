import { create } from "zustand";

import { TReviewStore } from "../types";

export const useReviewStore = create<TReviewStore>()((set) => ({
  comment: "",
  rating: 0,
  setComment: (comment) => set({ comment }),
  setRating: (rating) => set({rating})
}));
