import { TProduct } from "types/ProductTypes";

export default function getUserWishlist(): TProduct[] {
  const wishlistData: Record<string, TProduct> = JSON.parse(
    localStorage.getItem("guest-wishlist")
  );
  const wishlist: TProduct[] = wishlistData ? Object.values(wishlistData) : [];
  return wishlist;
}
