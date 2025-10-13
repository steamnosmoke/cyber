import { TProduct } from "types/ProductTypes";
import { useGuestStore } from "store/guestStore";

export default function useToggleGuestWishItem() {
  const wishlist = useGuestStore((state) => state.wishlist);
  const setWishlist = useGuestStore((state) => state.setWishlist);

  return (product: TProduct): TProduct => {
    const updatedWishlist = [...wishlist];

    const existingEntry = updatedWishlist.find(
      (value) => value.objectId === product.objectId
    );

    if (existingEntry) {
      updatedWishlist.splice(updatedWishlist.indexOf(existingEntry), 1);
    } else {
      updatedWishlist.push(product);
    }

    setWishlist(updatedWishlist);
    return { ...product, id: product.objectId };
  };
}
