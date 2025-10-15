import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TCartStore } from "../types";

export const useCartStore = create<TCartStore>()(
  persist(
    (set, get) => ({
      subtotal: 0,
      discount: 0,
      total: 0,
      count: 0,
      calcNumbers: (cart = []) => {
        if (!Array.isArray(cart)) return;

        const subtotal = cart.reduce((sum, item) => sum + item.subTotal, 0);
        const discount = cart.reduce(
          (sum, item) => sum + item.totalDiscount,
          0
        );
        const total = cart.reduce((sum, item) => sum + item.total, 0);
        const count = cart.reduce((sum, item) => sum + item.count, 0);

        const state = get();
        if (
          state.subtotal === subtotal &&
          state.discount === discount &&
          state.total === total &&
          state.count === count
        ) {
          return;
        }

        set({ subtotal, discount, total, count });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        subtotal: state.subtotal,
        discount: state.discount,
        total: state.total,
        count: state.count,
      }),
    }
  )
);
