import { TCartItem } from "types/CartTypes";
import updateItem from "utils/cart/updateItem";
import { useGuestStore } from "store/guestStore";

export default function useAddToGuestCart() {
  const cart = useGuestStore((state) => state.cart);
  const setCart = useGuestStore((state) => state.setCart);

  return (product: TCartItem): TCartItem => {
    const updatedCart = [...cart];
    const existingEntry = updatedCart.find(
      (item) => item.objectId === product.objectId
    );

    if (existingEntry) {
      const updatedItem = updateItem(existingEntry);
      const existingKey = updatedCart.indexOf(existingEntry);
      updatedCart[existingKey] = updatedItem;
      setCart(updatedCart);
      return updatedItem;
    } else {
      updatedCart.push(product);
      setCart(updatedCart);
      return {
        ...product,
        id: product.objectId,
      };
    }
  };
}
