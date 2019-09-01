import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DB_URL from "constants/DB_URL";

import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";

import minusItem from "../../utils/minusItem";

async function minusUserItem(product: TCartItem): Promise<TCartItem> {
  const userId = useAuthStore.getState().user.firebaseId;
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

export default function useMinusUserItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: minusUserItem,
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
