import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DB_URL from "constants/DB_URL";

import { CartItem } from "types/CartTypes";
import updateItem from "utils/cart/updateItem";


async function plusUserItem(
  product: CartItem,
  userId: string
): Promise<CartItem> {
  const updatedItem = updateItem(product);
  await axios.patch<CartItem>(
    `${DB_URL}users/${userId}/cart/${updatedItem.id}.json`,
    updatedItem
  );
  return updatedItem;
}

export default function usePlusUserItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: CartItem) => plusUserItem(product, userId),
    mutationKey: ["cart", userId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
}
