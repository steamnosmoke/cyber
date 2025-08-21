import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";

import usePlusUserItem from "./user/usePlusUserItem";
import usePlusGuestItem from "./guest/usePlusGuestItem";

export default function usePlusItem() {
  const userId = useAuthStore.getState().user.firebaseId;
  const { mutate: plusUserItem } = usePlusUserItem();

  return (product: TCartItem) => {
    if (userId === "guest") {
      return usePlusGuestItem(product);
    }
    plusUserItem(product);
  };
}

