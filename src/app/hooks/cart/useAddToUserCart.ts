import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { getUserCart } from "hooks/cart/useGetUserCart";
import { TCartItem } from "types/CartTypes";

import updateItem from "utils/updateItem";

async function addToUserCart(
  product: TCartItem,
  userId: string
): Promise<TCartItem> {
  const data = await getUserCart(userId);
  console.log(data);
  const existingEntry = data.find(
    (item) =>
      item.productId === product.productId &&
      (item.variantId || null) === (product.variantId || null)
  );
  if (existingEntry) {
    const updatedItem = updateItem(existingEntry);
    await axios.patch<Record<string, TCartItem>>(
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
    mutationFn: (product: TCartItem) => addToUserCart(product, userId),
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
