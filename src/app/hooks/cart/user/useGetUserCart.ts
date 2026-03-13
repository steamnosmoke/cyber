import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { CartItem } from "types/CartTypes";

export async function geUserCart(userId: string): Promise<CartItem[]> {
  const { data } = await axios.get<Record<string, CartItem>>(
    `${DB_URL}/users/${userId}/cart.json`
  );
  const cartData: CartItem[] = data
    ? Object.entries(data).map((el) => {
        const [key, value] = el;
        return { ...value, id: key };
      })
    : [];
  return cartData;
}

export default function useGeUserCart(userId: string) {

  return useQuery<CartItem[]>({
    queryFn: () => geUserCart(userId),
    queryKey: ["cart", userId],
    enabled: !!userId && userId !== "guest",
  });
}
