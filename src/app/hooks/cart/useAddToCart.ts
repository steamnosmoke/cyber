import useAddToUserCart from "./user/useAddToUserCart";
import useAddToGuestCart from "hooks/cart/guest/useAddToGuestCart";
import convertToCartItem from "utils/cart/convertToCartItem";

import { TProduct } from "types/ProductTypes";

export default function useAddToCart(userId: string) {
  const { mutate } = useAddToUserCart(userId);
  const addToGuestCart = useAddToGuestCart();
  return (product: TProduct) => {
    const item = convertToCartItem(product, product.color, product.memory);
    if (userId === "guest") {
      addToGuestCart(item);
    }
    mutate(item);
  };
}
