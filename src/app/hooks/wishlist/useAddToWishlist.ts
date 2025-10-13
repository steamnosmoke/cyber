import useToggleGuestWishItem from "hooks/wishlist/guest/useToggleGuestWishItem";
import { useToggleUserWishItem } from "./user/useToggleUserWishItem";
import { TProduct } from "types/ProductTypes";

export default function useAddToWishlist(userId: string) {
  const { mutate } = useToggleUserWishItem(userId);
  const toggleWish = useToggleGuestWishItem();
  return (item: TProduct) => {
    if (userId === "guest") {
      return toggleWish(item);
    }
    mutate(item);
  };
}
