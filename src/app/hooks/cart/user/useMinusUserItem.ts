import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DB_URL from "constants/DB_URL";

import { TCartItem } from "types/CartTypes";

import minusItem from "utils/cart/minusItem";

async function minusUserItem(product: TCartItem, userId: string): Promise<TCartItem> {
  if (product.count > 1) {
    const updatedItem = minusItem(product);
    await axios.patch<Record<string, TCartItem>>(
      `${DB_URL}users/${userId}/cart/${product.id}.json`,
      updatedItem
    );
    return updatedItem;
  } else {
    await axios.delete<Record<string, TCartItem>>(
      `${DB_URL}users/${userId}/cart/${product.id}.json`
    );
    return { ...product, count: 0 };
  }
}

export default function useMinusUserItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: TCartItem)=>minusUserItem(product, userId),
    mutationKey: ["cart", userId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
}
