import { create } from "zustand";

import { ReviewStore } from "../types";

export const useReviewStore = create<ReviewStore>()((set) => ({
  comment: "",
  rating: 0,
  setComment: (comment) => set({ comment }),
  setRating: (rating) => set({rating})
}));
