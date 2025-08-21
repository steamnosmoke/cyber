import { TCartItem } from "types/CartTypes";

export default function useGetGuestCart(): TCartItem[] {
  const cartData: Record<string, TCartItem> = JSON.parse(
    localStorage.getItem("guest-cart")
  );
  const cart: TCartItem[] = cartData ? Object.values(cartData) : [];
  return cart;
};