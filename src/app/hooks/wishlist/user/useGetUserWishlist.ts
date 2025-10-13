import { TProduct } from "types/ProductTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";


export async function getUserWishlist(userId: string): Promise<TProduct[]> {
  const { data } = await axios.get<Record<string, TProduct>>(
    `${DB_URL}/users/${userId}/wishlist.json`
  );
  const wishlist: TProduct[] = data
    ? Object.entries(data).map((el) => {
        const [key, value] = el;
        return { ...value, id: key };
      })
    : [];
  return wishlist;
}

export default function useGetUserCart(userId: string) {

  return useQuery<TProduct[]>({
    queryFn: () => getUserWishlist(userId),
    queryKey: ["wishlist", userId],
    enabled: !!userId && userId !== "guest",
  });
}
