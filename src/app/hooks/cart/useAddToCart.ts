import addToGuestCart from "hooks/cart/useAddToGuestCart";
import useAddToUserCart from "hooks/cart/useAddToUserCart";
import convertToCartItem from "utils/convertToCartItem";

import { TProduct } from "types/ProductTypes";

import { useAuthStore } from "store/authStore";

export default function useAddToCart() {
  const userId = useAuthStore.getState().user.firebaseId;
  const { mutate } = useAddToUserCart(userId);

  return (product: TProduct) => {
    const item = convertToCartItem(product, product.color, product.memory);
    if (userId === "guest") {
      return addToGuestCart(item);
    }
    mutate(item);
  };
}
