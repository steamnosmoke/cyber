import { useGuestStore } from "store/guestStore";
import { Product } from "types/ProductTypes";
import useGeUserWishlist from "./guest/useGeUserWishlist";

export default function useGetWishlist(userId: string): {
  wishlist: Product[];
  status: "success" | "error" | "pending";
} {
  const { data: userWishlist, status } = useGeUserWishlist(userId);
  const guestWishlist = useGuestStore((state) => state.wishlist);
  if (userId === "guest") {
    return { wishlist: guestWishlist, status: "success" };
  }
  return { wishlist: userWishlist, status };
}
