import getGuestWishlist from "./getGuestWishlist";
import { TProduct } from "types/ProductTypes";

export default function toggleGuestWishItem(product: TProduct): TProduct {
  const wishlistData = getGuestWishlist();

  const existingEntry = wishlistData.find(
    (value) =>
      value.productId === product.productId &&
      value.variantId === product.variantId
  );

  if (existingEntry) {
    wishlistData.splice(Number(existingEntry.id), 1);
  } else {
    wishlistData.push(product);
  }
  localStorage.setItem("guest-wishlist", JSON.stringify(wishlistData));
  return { ...product, id: String(wishlistData.length - 1) };
}
