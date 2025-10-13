import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { TCartItem } from "types/CartTypes";

export async function getUserCart(userId: string): Promise<TCartItem[]> {
  const { data } = await axios.get<Record<string, TCartItem>>(
    `${DB_URL}/users/${userId}/cart.json`
  );
  const cartData: TCartItem[] = data
    ? Object.entries(data).map((el) => {
        const [key, value] = el;
        return { ...value, id: key };
      })
    : [];
  return cartData;
}

export default function useGetUserCart(userId: string) {

  return useQuery<TCartItem[]>({
    queryFn: () => getUserCart(userId),
    queryKey: ["cart", userId],
    enabled: !!userId && userId !== "guest",
  });
}
