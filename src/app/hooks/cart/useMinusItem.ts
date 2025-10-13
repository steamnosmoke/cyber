import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";

import useMinusGuestItem from "hooks/cart/guest/useMinusGuestItem";
import useMinusUserItem from "./user/useMinusUserItem";

export default function useMinusItem() {
  const userId = useAuthStore((state) => state.firebaseId);
  const { mutate: minusUserItem } = useMinusUserItem(userId);
  const minusGuestItem = useMinusGuestItem()
  return (product: TCartItem) => {
    if (userId === "guest") {
      return minusGuestItem(product);
    }
    minusUserItem(product);
  };
}
