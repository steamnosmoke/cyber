import useGetGuestCart from "hooks/cart/useGetGuestCart";
import { TCartItem } from "types/CartTypes";



import minusItem from "../../utils/minusItem";

export default function useMinusGuestItem(product: TCartItem): TCartItem {
  // const product = useGetItem(product);
  const updatedItem = minusItem(product);
  const cart = useGetGuestCart();
  const updatedCart = cart.filter((el) => el.objectId !== product.objectId);
  localStorage.setItem("guest-cart", JSON.stringify(updatedCart));
  return updatedItem;
}
