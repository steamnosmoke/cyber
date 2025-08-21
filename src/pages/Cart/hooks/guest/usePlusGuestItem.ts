import useGetGuestCart from "hooks/cart/useGetGuestCart";
import { TCartItem } from "types/CartTypes";



import plusItem from "../../utils/plusItem";

export default function usePlusGuestItem(product: TCartItem): TCartItem {
  // const cartItem = useGetItem(product);
  const updatedItem = plusItem(product);
  const cart = useGetGuestCart();
  const existingKey = cart.findIndex(
    (item) => item.objectId === updatedItem.objectId
  );
  if (existingKey >= 0) {
    cart[existingKey] = updatedItem;
  }

  localStorage.setItem("guest-cart", JSON.stringify(cart));
  return updatedItem;
}
