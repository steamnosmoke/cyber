import { TCartItem } from "types/CartTypes";
import DB_URL from "constants/DB_URL";
import axios from "axios";
import { useAuthStore } from "store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function clearCart() {
  const userId = useAuthStore.getState().user.firebaseId;
  await axios.delete<TCartItem[]>(`${DB_URL}/users/${userId}/cart.json`);
}

export default function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearCart,
    mutationKey: ["cart"],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
