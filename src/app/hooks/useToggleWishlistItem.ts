import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { TProduct } from "types/ProductTypes";
import { useAuthStore } from "store/authStore";

const fetchUserWishlist = async (
  userId: string
): Promise<[string, TProduct][]> => {
  const url = `${DB_URL}/users/${userId}/wishlist.json`;
  const { data } = await axios.get<Record<string, TProduct>>(url);
  return Object.entries(data || {});
};

const fetchGuestWishlist = (): TProduct[] => {
  const data: TProduct[] = JSON.parse(localStorage.getItem("guest-wishlist"));
  data.map((el) => {});
  return data;
};

const toggleUserItem = async (product: TProduct): Promise<TProduct> => {
  const userId = useAuthStore.getState().user.firebaseId;
  const wishlistData = await fetchUserWishlist(userId);

  const existingEntry = wishlistData.find(
    ([_, value]) =>
      value.productId === product.productId &&
      value.variantId === product.variantId
  );

  if (existingEntry) {
    const [key] = existingEntry;
    await axios.delete(`${DB_URL}/users/${userId}/wishlist/${key}.json`);
    return { ...product, id: Number(key) };
  } else {
    const res = await axios.post<{ name: string }>(
      `${DB_URL}/users/${userId}/wishlist.json`,
      product
    );
    return { ...product, id: Number(res.data.name) };
  }
};

const toggleGuestItem = async (product: TProduct): Promise<TProduct> => {
  const wishlistData = fetchGuestWishlist();

  const existingEntry = wishlistData.find(
    (value) =>
      value.productId === product.productId &&
      value.variantId === product.variantId
  );

  if (existingEntry) {
    wishlistData.splice(existingEntry.id, 1);
  } else {
    wishlistData.push(product);
  }
  localStorage.setItem("guest-wishlist", JSON.stringify(wishlistData));
  return { ...product, id: wishlistData.length-1 };
};

const toggleWishlistItem = (product: TProduct) => {
  const userId = useAuthStore.getState().user.firebaseId;
  if (userId === "guest") {
    return toggleGuestItem(product);
  }
  return toggleUserItem(product);
};

export function useToggleWishlistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["wishlist"],
    mutationFn: (product: TProduct) => toggleWishlistItem(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    }
  });
}
