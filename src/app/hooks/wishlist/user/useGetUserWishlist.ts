import { Product } from "types/ProductTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";


export async function geUserWishlist(userId: string): Promise<Product[]> {
  const { data } = await axios.get<Record<string, Product>>(
    `${DB_URL}/users/${userId}/wishlist.json`
  );
  const wishlist: Product[] = data
    ? Object.entries(data).map((el) => {
        const [key, value] = el;
        return { ...value, id: key };
      })
    : [];
  return wishlist;
}

export default function useGeUserCart(userId: string) {

  return useQuery<Product[]>({
    queryFn: () => geUserWishlist(userId),
    queryKey: ["wishlist", userId],
    enabled: !!userId && userId !== "guest",
  });
}
