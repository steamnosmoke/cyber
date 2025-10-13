import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";

import usePlusUserItem from "./user/usePlusUserItem";
import usePlusGuestItem from "hooks/cart/guest/usePlusGuestItem";

export default function usePlusItem() {
  const userId = useAuthStore((state) => state.firebaseId);
  const { mutate: plusUserItem } = usePlusUserItem(userId);
  const plusGuestItem = usePlusGuestItem();
  return (product: TCartItem) => {
    if (userId === "guest") {
      return plusGuestItem(product);
    }
    plusUserItem(product);
  };
}
