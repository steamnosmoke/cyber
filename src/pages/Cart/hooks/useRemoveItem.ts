
import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";

import useRemoveUserItem from "./user/useRemoveUserItem";
import useRemoveGuestItem from "./guest/useRemoveGuestItem";

export default function useRemoveItem() {
  const userId = useAuthStore.getState().user.firebaseId;
  const { mutate: removeUserItem } = useRemoveUserItem();

  return (product: TCartItem) => {
    if (userId === "guest") {
      return useRemoveGuestItem(product);
    }
    removeUserItem(product);
  };
}
