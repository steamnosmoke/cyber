import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TProductStore } from "types/ProductTypes";

export const useProductStore = create<TProductStore>()(
  persist(
    (set) => ({
      category: "Phones",
      product: null,
      filteredProducts: [],

      setProduct: (product) => set({ product }),

      setCategory: (category) =>
        set({
          category: category.charAt(0).toUpperCase() + category.slice(1),
        }),
    }),
    {
      name: "product-storage",
      partialize: (state) => ({
        product: state.product,
        category: state.category,
      }),
    }
  )
);
