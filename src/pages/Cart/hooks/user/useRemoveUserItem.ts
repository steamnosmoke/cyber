import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DB_URL from "constants/DB_URL";

import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";



async function removeUserItem(product: TCartItem): Promise<TCartItem> {
  const userId = useAuthStore.getState().user.firebaseId;

  await axios.delete<Record<string, TCartItem>>(
    `${DB_URL}users/${userId}/cart/${product.id}.json`
  );
  return { ...product, count: 0 };
}

export default function useRemoveUserItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeUserItem,
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
