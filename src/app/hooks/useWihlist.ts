import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";
import user from "constants/user";

import { TProduct } from "@/src/app/types/ProductTypes";

const getWishlist = async (userId: string) => {
  const url = `${DB_URL}/users/${userId}/wishlist.json`;
  const response = await axios.get<Record<string, TProduct> | null>(url);
  return Object.entries(response.data || {});
};

async function toggleProduct(product: TProduct) {
  const userId = user.firebaseId;
  if (!userId) throw new Error("User is not authenticated");

  const wishlistData = await getWishlist(userId);

  const existingEntry = wishlistData.find(
    ([_, value]) =>
      value.productId === product.productId &&
      value.variantId === product.variantId
  );

  if (existingEntry) {
    const [key] = existingEntry;
    await axios.delete(`${DB_URL}/users/${userId}/wishlist/${key}.json`);
    return { ...product, id: key };
  } else {
    const postRes = await axios.post<{ name: string }>(
      `${DB_URL}/users/${userId}/wishlist.json`,
      product
    );
    return { ...product, id: postRes.data.name };
  }
}

export function useToggleProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["wishlist"],
    mutationFn: toggleProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error) => {
      console.error("Error updating wishlist:", error);
    },
  });
}
