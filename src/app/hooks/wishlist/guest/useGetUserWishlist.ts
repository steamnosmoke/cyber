import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import DB_URL from "constants/DB_URL";

import { TProduct } from "types/ProductTypes";

export async function getUserWishlist(userId: string): Promise<TProduct[]> {
  const url = `${DB_URL}/users/${userId}/wishlist.json`;
  const { data } = await axios.get<Record<string, TProduct> | null>(url);

  if (!data) return []; 

  const wishlist = Object.entries(data).map(([id, item]) => ({
    ...item,
    id,
  }));

  return wishlist;
}

export default function useGetUserWishlist(userId: string) {
  return useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => getUserWishlist(userId),
    enabled: !!userId && userId !== "guest",
  });
}
