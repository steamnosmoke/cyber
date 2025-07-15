import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../zustand/authStore";

const DB_URL =
  "https://e-store-4ca3a-default-rtdb.europe-west1.firebasedatabase.app";

const userId = useAuthStore.getState()?.user?.firebaseId;

const getWishlist = async () => {
  const url = `${DB_URL}/users/${userId}/wishlist.json`;
  const response = await axios.get(url);
  return Object.entries(response.data) || [];
};

async function toggleProduct(product) {
  const wishlistData = await getWishlist(userId);
  const existingEntry = wishlistData.find(
    ([_, value]) =>
      value.productId === product.productId &&
      (value.variantId || null) === (product.variantId || null)
  );
  if (existingEntry) {
    const [key] = existingEntry;
    await axios.delete(`${DB_URL}/users/${userId}/wishlist/${key}.json`);
    return { ...product, id: key };
  } else {
    const postRes = await axios.post(
      `${DB_URL}/users/${userId}/wishlist.json`,
      product
    );
    return {
      ...product,
      id: postRes.data.name,
    };
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
  });
}
