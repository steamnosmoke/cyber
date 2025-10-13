import { TCartItem } from "./CartTypes";
import { TProduct } from "./ProductTypes";

export type TGusetStore = {
  cart: TCartItem[];
  wishlist: TProduct[];
  setCart: (cart: TCartItem[]) => void;
  setWishlist: (wishlist: TProduct[]) => void;
};
