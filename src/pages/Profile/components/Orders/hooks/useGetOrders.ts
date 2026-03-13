import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Order } from "types/OrderTypes";
import DB_URL from "constants/DB_URL";

async function geOrders(userId: string): Promise<Order[]> {
  const { data } = await axios.get<Record<string, Order>>(
    `${DB_URL}users/${userId}/orders.json`
  );
  const orders: Order[] = [];
  Object.entries(data || {}).forEach(([orderId, order]) =>
    orders.push({ ...order, id: orderId })
  );
  return orders;
}

export default function useGeOrders(userId: string) {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => geOrders(userId),
  });
}
