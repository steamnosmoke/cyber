import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DB_URL from "constants/DB_URL";

import { TCartItem } from "types/CartTypes";



async function removeUserItem(product: TCartItem, userId: string): Promise<TCartItem> {
  await axios.delete<Record<string, TCartItem>>(
    `${DB_URL}users/${userId}/cart/${product.id}.json`
  );
  return
}

export default function useRemoveUserItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: TCartItem)=>removeUserItem(product,userId),
    mutationKey: ["cart", userId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
}
