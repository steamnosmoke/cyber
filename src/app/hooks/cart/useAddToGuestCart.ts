import getGuestCart from "hooks/cart/useGetGuestCart";

import { TCartItem } from "types/CartTypes";

import updateItem from "utils/updateItem";

export default function useAddToGuestCart(product: TCartItem): TCartItem {
  const cartData = getGuestCart();
  const existingEntry = cartData.find(
    (item) => item.objectId === product.objectId
  );
  if (existingEntry) {
    const updatedItem = updateItem(existingEntry);

    const existingKey = cartData.indexOf(existingEntry);
    cartData[existingKey] = updatedItem;
    localStorage.setItem("guest-cart", JSON.stringify(cartData));
    return updatedItem;
  } else {
    cartData.push(product);
    localStorage.setItem("guest-cart", JSON.stringify(cartData));
    return {
      id: String(cartData.length - 1),
      ...product,
    };
  }
}
