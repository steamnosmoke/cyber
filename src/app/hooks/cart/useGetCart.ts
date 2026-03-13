import { useGuestStore } from "store/guestStore";
import { CartItem } from "../../types/CartTypes";
import useGeUserCart from "./user/useGeUserCart";

export default function useGetCart(userId: string): {
  cart: CartItem[];
  status: "success" | "error" | "pending";
} {
  const { data: userCart, status } = useGeUserCart(userId);
  const guestCart = useGuestStore((state) => state.cart);
  if (userId === "guest") {
    return { cart: guestCart, status: "success" };
  }
  return { cart: userCart, status };
}
