import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TGusetStore } from "../types/GuestTypes";

export const useGuestStore = create<TGusetStore>()(
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
