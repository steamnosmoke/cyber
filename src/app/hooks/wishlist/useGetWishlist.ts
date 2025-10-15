import { useGuestStore } from "store/guestStore";
import { TProduct } from "types/ProductTypes";
import useGetUserWishlist from "./guest/useGetUserWishlist";

export default function useGetWishlist(userId: string): {
  wishlist: TProduct[];
  status: "success" | "error" | "pending";
} {
  const { data: userWishlist, status } = useGetUserWishlist(userId);
  const guestWishlist = useGuestStore((state) => state.wishlist);
  if (userId === "guest") {
    return { wishlist: guestWishlist, status: "success" };
  }
  return { wishlist: userWishlist, status };
}
