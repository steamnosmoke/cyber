import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { CartItem } from "types/CartTypes";
import { Order } from "types/OrderTypes";
import makeDate from "../utils/makeDate";



async function makeOrder(cart: CartItem[], userId: string) {
  const date = makeDate();
  const newOrder: Order = {
    items: cart,
    totalPriceWithDiscount: 0,
    totalPriceWithoutDiscount: 0,
    totalDiscount: 0,
    value: 0,
    date,
    status: "assembling",
  };

  cart.forEach((el) => {
    newOrder.totalPriceWithDiscount += el.total;
    newOrder.totalPriceWithoutDiscount += el.subTotal;
    newOrder.totalDiscount += el.totalDiscount;
    newOrder.value += el.count;
  });

  const { data } = await axios.post<{ name: string }>(
    `${DB_URL}/users/${userId}/orders.json`,
    newOrder
  );

  return { ...newOrder, id: data.name };
}

export default function useMakeOrder(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cart: CartItem[]) => makeOrder(cart, userId),
    mutationKey: ["orders", userId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", userId] });
    },
  });
}
