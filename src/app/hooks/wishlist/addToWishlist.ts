import { useAuthStore } from "store/authStore";
import toggleGuestWishItem from "hooks/wishlist/toggleGuestWishItem";
import { useToggleUserWishItem } from "hooks/wishlist/useToggleUserWishItem";
import { TProduct } from "types/ProductTypes";

export default function useAddToWishlist() {
  const userId = useAuthStore((state) => state.user.firebaseId);
  const { mutate } = useToggleUserWishItem(userId);

  return (item: TProduct) => {
    if (userId === "guest") {
      return toggleGuestWishItem(item);
    }
    mutate(item);
  };
}
