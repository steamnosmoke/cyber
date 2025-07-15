import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      subtotal: 0,
      discount: 0,
      total: 0,
      count: 0,
      activeItem: null,
      setActiveItem: (activeItem) => set(() => ({ activeItem })),
      calcNumbers: (cart) => {
        const subtotal = cart.reduce((sum, item) => sum + item.subTotal, 0);
        const discount = cart.reduce((sum, item) => sum + item.discount, 0);
        const total = cart.reduce((sum, item) => sum + item.total, 0);
        const count = cart.reduce((sum, item) => sum + item.count, 0);

        set((state) => {
          if (
            state.subtotal === subtotal &&
            state.discount === discount &&
            state.total === total &&
            state.count === count
          ) {
            return {};
          }
          return { subtotal, discount, total, count };
        });
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
