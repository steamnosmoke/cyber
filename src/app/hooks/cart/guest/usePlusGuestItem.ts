import { TCartItem } from "types/CartTypes";
import updateItem from "utils/cart/updateItem";
import { useGuestStore } from "store/guestStore";

export default function usePlusGuestItem() {
  const cart = useGuestStore((state) => state.cart);
  const setCart = useGuestStore((state) => state.setCart);

  return (product: TCartItem): TCartItem => {
    const updatedCart = [...cart];
    const updatedItem = updateItem(product);
    const existingKey = updatedCart.findIndex(
      (item) => item.objectId === updatedItem.objectId
    );
    updatedCart[existingKey] = updatedItem;
    setCart(updatedCart);
    return updatedItem;
  };
}
