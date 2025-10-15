import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";

import useRemoveUserItem from "./user/useRemoveUserItem";
import removeGuestItem from "./guest/useRemoveGuestItem";

export default function useRemoveItem() {
  const userId = useAuthStore(state=>state.firebaseId);
  const { mutate: removeUserItem } = useRemoveUserItem(userId);

  return (product: TCartItem) => {
    if (userId === "guest") {
      return removeGuestItem(product);
    }
    removeUserItem(product);
  };
}
