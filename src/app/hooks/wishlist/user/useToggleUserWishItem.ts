import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import {geUserWishlist} from "../guest/useGeUserWishlist";
import { Product } from "types/ProductTypes";

const toggleUserItem = async (
  product: Product,
  userId: string
): Promise<Product> => {
  const wishlistData = await geUserWishlist(userId);

  const existingEntry = wishlistData.find(
    (value) => value.objectId === product.objectId
  );

  if (existingEntry) {
    await axios.delete(
      `${DB_URL}users/${userId}/wishlist/${existingEntry.id}.json`
    );
    return existingEntry;
  } else {
    const res = await axios.post<{ name: string }>(
      `${DB_URL}users/${userId}/wishlist.json`,
      product
    );
    return { ...product, id: res.data.name };
  }
};

export function useToggleUserWishItem(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["wishlist", userId],
    mutationFn: (product: Product) => toggleUserItem(product, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", userId] });
    },
  });
}
