import { useGuestStore } from "store/guestStore";
import { TCartItem } from "../../types/CartTypes";
import useGetUserCart from "./user/useGetUserCart";

export default function useGetCart(userId: string): {
  cart: TCartItem[];
  status: "success" | "error" | "pending";
} {
  const { data: userCart, status } = useGetUserCart(userId);
  const guestCart = useGuestStore((state) => state.cart);
  if (userId === "guest") {
    return { cart: guestCart, status: "success" };
  }
  return { cart: userCart, status };
}
