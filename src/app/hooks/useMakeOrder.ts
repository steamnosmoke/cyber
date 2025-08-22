import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";
import { TOrder } from "types/OrderTypes";
import { TVariant } from "../types/ProductTypes";

const makeDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};



async function makeOrder(cart: TCartItem[]) {
  const userId: string = useAuthStore.getState().user.firebaseId;
  const date = makeDate();
  const newOrder: TOrder = {
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

export default function useMakeOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: makeOrder,
    mutationKey: ["orders"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
