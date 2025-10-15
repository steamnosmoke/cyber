import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DB_URL from "constants/DB_URL";

import { TCartItem } from "types/CartTypes";

async function clearCart(userId: string) {
  await axios.delete<TCartItem[]>(`${DB_URL}/users/${userId}/cart.json`);
}

export default function useClearCart(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => clearCart(userId),
    mutationKey: ["cart", userId],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
}
