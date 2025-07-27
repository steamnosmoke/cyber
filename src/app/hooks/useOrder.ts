import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";
import user from "constants/user";

import { TCartItem } from "types/CartTypes";
import { TOrder } from "types/OrderTypes";

async function makeOrder(cart: TCartItem[]) {
  const userId: string = user?.firebaseId;
  const url = `${DB_URL}/users/${userId}/orders.json`;
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const date = `${year}-${month}-${day}`;
  const newOrder: TOrder = {
    items: { ...cart },
    totalPriceWithDiscount: 79,
    totalPriceWithoutDiscount: 0,
    totalDiscount: 0,
    value: 0,
    date,
    status: "assembling",
  };
  cart.map((el) => {
    newOrder.totalPriceWithDiscount += el.total;
    newOrder.totalPriceWithoutDiscount += el.subTotal;
    newOrder.totalDiscount += el.totalDiscount;
    newOrder.value += el.count;
  });
  await axios.post<Record<string, TOrder>>(url, newOrder);
  return newOrder;
}

export function useMakeOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: makeOrder,
    mutationKey: ["orders"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
