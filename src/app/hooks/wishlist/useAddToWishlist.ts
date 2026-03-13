import useToggleGuestWishItem from "hooks/wishlist/guest/useToggleGuestWishItem";
import { useToggleUserWishItem } from "./user/useToggleUserWishItem";
import { Product } from "types/ProductTypes";

export default function useAddToWishlist(userId: string) {
  const { mutate } = useToggleUserWishItem(userId);
  const toggleWish = useToggleGuestWishItem();
  return (item: Product) => {
    if (userId === "guest") {
      return toggleWish(item);
    }
    mutate(item);
  };
}
