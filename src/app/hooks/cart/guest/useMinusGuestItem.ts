import { TCartItem } from "types/CartTypes";
import minusItem from "utils/cart/minusItem";
import { useGuestStore } from "store/guestStore";

export default function useMinusGuestItem() {
  const cart = useGuestStore((state) => state.cart);
  const setCart = useGuestStore((state) => state.setCart);

  return (product: TCartItem): TCartItem => {
    const updatedCart = [...cart];

    const updatedItem = minusItem(product);

    const existingKey = updatedCart.findIndex(
      (item) => item.objectId === updatedItem.objectId
    );
    if (existingKey === -1) return product;

    if (updatedItem.count === 0) {
      const filteredCart = updatedCart.filter(
        (el) => el.objectId !== product.objectId
      );
      setCart(filteredCart);
      return updatedItem;
    }
    
    updatedCart[existingKey] = updatedItem;
    setCart(updatedCart);

    return updatedItem;
  };
}
