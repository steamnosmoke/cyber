import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { TOrder } from "types/OrderTypes";
import DB_URL from "constants/DB_URL";

async function getOrders(userId: string): Promise<TOrder[]> {
  const { data } = await axios.get<Record<string, TOrder>>(
    `${DB_URL}users/${userId}/orders.json`
  );
  const orders: TOrder[] = [];
  Object.entries(data || {}).forEach(([orderId, order]) =>
    orders.push({ ...order, id: orderId })
  );
  return orders;
}

export default function useGetOrders(userId: string) {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrders(userId),
  });
}
