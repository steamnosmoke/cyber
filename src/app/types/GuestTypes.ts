import { CartItem } from "./CartTypes";
import { Product } from "./ProductTypes";

export interface GuestStore {
  cart: CartItem[];
  wishlist: Product[];
  setCart: (cart: CartItem[]) => void;
  setWishlist: (wishlist: Product[]) => void;
};
