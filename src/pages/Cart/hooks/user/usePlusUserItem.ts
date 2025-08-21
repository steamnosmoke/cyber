import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DB_URL from "constants/DB_URL";

import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";

import plusItem from "../../utils/plusItem";

async function plusUserItem(product: TCartItem): Promise<TCartItem> {
  const userId = useAuthStore.getState().user.firebaseId;
  const updatedItem = plusItem(product);
  await axios.patch<TCartItem>(
    `${DB_URL}users/${userId}/cart/${updatedItem.id}.json`,
    updatedItem
  );
  return updatedItem;
}

export default function usePlusUserItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: plusUserItem,
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
