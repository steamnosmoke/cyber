import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TProductStore } from "types/ProductStoreTypes";

export const useProductsStore = create<TProductStore>()(
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
