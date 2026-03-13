import { useGuestStore } from "store/guestStore";
import { CartItem } from "types/CartTypes";

export default function useRemoveGuestItem(product: CartItem): CartItem {
  const cart = useGuestStore((state) => state.cart);
  const setCart = useGuestStore((state) => state.setCart);
  const updatedCart = cart.filter((el) => el.objectId !== product.objectId);
  setCart(updatedCart);
  return { ...product, count: 0 };
}
