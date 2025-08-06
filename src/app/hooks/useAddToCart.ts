import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";

const getCart = async () => {
  const userId: string = useAuthStore.getState().user.firebaseId;
  const res = await axios.get<Record<string, TCartItem>>(
    `${DB_URL}/users/${userId}/cart.json`
  );
  const data = res.data;
  return { data: data ? Object.entries(data) : [], userId };
};

async function addToCart(product: TCartItem) {
  const { data, userId } = await getCart();
  const existingEntry = data.find(
    ([_, value]) =>
      value.productId === product.productId &&
      (value.variantId || null) === (product.variantId || null)
  );
  if (existingEntry) {
    const [key, value] = existingEntry;
    const updatedCount = Number(value.count) + 1;
    const updatedTotal = Number(value.total) + Number(value.totalPrice);
    const updatedDiscount = updatedCount * Number(value.discount);
    const updatedSubTotal = updatedCount * Number(value.price);
    const updatedItem = {
      ...value,
      count: updatedCount,
      total: updatedTotal,
      totalDiscount: updatedDiscount,
      subTotal: updatedSubTotal,
    };
    await axios.patch<Record<string, TCartItem>>(
      `${DB_URL}/users/${userId}/cart/${key}.json`,
      updatedItem
    );
    return updatedItem;
  } else {
    const total = Number(product.totalPrice);
    const totalDiscount = Number(product.discount);
    const subTotal = Number(product.price);
    const newItem = {
      ...product,
      count: 1,
      total,
      totalDiscount,
      subTotal,
    };
    const postRes = await axios.post<Record<string, TCartItem>>(
      `${DB_URL}/users/${userId}/cart.json`,
      newItem
    );

    return {
      ...newItem,
      id: postRes.data.name,
    };
  }
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
