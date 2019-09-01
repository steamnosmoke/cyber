import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";

import useMinusGuestItem from "./useMinusGuestItem";
import useMinusUserItem from "./useMinusUserItem";

export default function useMinusItem() {
  const userId = useAuthStore.getState().user.firebaseId;
  const { mutate: minusUserItem } = useMinusUserItem();

  return (product: TCartItem) => {
    if (userId === "guest") {
      return useMinusGuestItem(product);
    }
    minusUserItem(product);
  };
}
