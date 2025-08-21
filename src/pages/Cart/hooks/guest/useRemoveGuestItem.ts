
import useGetGuestCart from "hooks/cart/useGetGuestCart";

import { TCartItem } from "types/CartTypes";



export default function useRemoveGuestItem(product: TCartItem): TCartItem {
  const cart = useGetGuestCart();
  // const product = useGetItem(product);
  const updatedCart = cart.filter((el) => el.objectId !== product.objectId);
  localStorage.setItem("guest-cart", JSON.stringify(updatedCart));
  return { ...product, count: 0 };
}
