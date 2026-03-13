import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import DB_URL from "constants/DB_URL";

import { Product } from "types/ProductTypes";

export async function geUserWishlist(userId: string): Promise<Product[]> {
  const url = `${DB_URL}/users/${userId}/wishlist.json`;
  const { data } = await axios.get<Record<string, Product> | null>(url);

  if (!data) return []; 

  const wishlist = Object.entries(data).map(([id, item]) => ({
    ...item,
    id,
  }));

  return wishlist;
}

export default function useGeUserWishlist(userId: string) {
  return useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => geUserWishlist(userId),
    enabled: !!userId && userId !== "guest",
  });
}
