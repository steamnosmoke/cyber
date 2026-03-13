import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { geUserCart } from "hooks/cart/user/useGeUserCart";
import { CartItem } from "types/CartTypes";

import updateItem from "utils/cart/updateItem";

async function addToUserCart(
  product: CartItem,
  userId: string
): Promise<CartItem> {
  const data = await geUserCart(userId);
  const existingEntry = data.find(
    (item) =>
      item.productId === product.productId &&
      (item.variantId || null) === (product.variantId || null)
  );
  if (existingEntry) {
    const updatedItem = updateItem(existingEntry);
    await axios.patch<Record<string, CartItem>>(
      `${DB_URL}/users/${userId}/cart/${existingEntry.id}.json`,
      updatedItem
    );
    return updatedItem;
  } else {
    const postRes = await axios.post<{ name: string }>(
      `${DB_URL}/users/${userId}/cart.json`,
      product
    );

    return {
      id: postRes.data.name,
      ...product,
    };
  }
}

export default function useAddToUserCart(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: CartItem) => addToUserCart(product, userId),
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
