import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DB_URL from "constants/DB_URL";

import { TCartItem } from "types/CartTypes";
import updateItem from "utils/cart/updateItem";


async function plusUserItem(
  product: TCartItem,
  userId: string
): Promise<TCartItem> {
  const updatedItem = updateItem(product);
  await axios.patch<TCartItem>(
    `${DB_URL}users/${userId}/cart/${updatedItem.id}.json`,
    updatedItem
  );
  return updatedItem;
}

export default function usePlusUserItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: TCartItem) => plusUserItem(product, userId),
    mutationKey: ["cart", userId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
}
