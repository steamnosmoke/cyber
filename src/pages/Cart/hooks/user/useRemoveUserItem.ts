import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DB_URL from "constants/DB_URL";

import { CartItem } from "types/CartTypes";



async function removeUserItem(product: CartItem, userId: string): Promise<CartItem> {
  await axios.delete<Record<string, CartItem>>(
    `${DB_URL}users/${userId}/cart/${product.id}.json`
  );
  return
}

export default function useRemoveUserItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: CartItem)=>removeUserItem(product,userId),
    mutationKey: ["cart", userId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
}
