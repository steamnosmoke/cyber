import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GuestStore } from "../types/GuestTypes";

export const useGuestStore = create<GuestStore>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      setCart: (cart) => set({ cart }),
      setWishlist: (wishlist) => set({ wishlist }),
    }),
    {
      name: "guest-storage",
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
    }
  )
);
