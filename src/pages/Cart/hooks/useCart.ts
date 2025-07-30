import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { TCartItem } from "types/CartTypes";
import DB_URL from "constants/DB_URL";
import user from "constants/user";

const getCart = async () => {
  const userId: string = user?.firebaseId;
  const res = await axios.get<Record<string, TCartItem>>(
    `${DB_URL}/users/${userId}/cart.json`
  );
  const data = res.data;
  return { data: data ? Object.entries(data) : [], userId };
};

const getItem = async (product: TCartItem) => {
  const { data, userId } = await getCart();
  const existingEntry = data.find(
    ([_, value]) => value.objectId === product.objectId
  );
  const [key, value] = existingEntry;
  const url = `${DB_URL}/users/${userId}/cart/${key}.json`;
  return { value, url };
};

async function removeFromCart(product: TCartItem) {
  const { value, url } = await getItem(product);
  await axios.delete<Record<string, TCartItem>>(url);
  return { ...value, count: 0 };
}

async function plusItem(product: TCartItem) {
  const { value, url } = await getItem(product);
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
  await axios.patch<Record<string, TCartItem>>(url, updatedItem);
  return updatedItem;
}

async function minusItem(product: TCartItem) {
  const { value, url } = await getItem(product);
  if (Number(value.count) > 1) {
    const updatedCount = Number(value.count) - 1;
    const total = updatedCount * Number(value.totalPrice);
    const discount = updatedCount * Number(value.discount);
    const subTotal = updatedCount * Number(value.price);
    const updatedItem = {
      ...value,
      count: updatedCount,
      total,
      discount,
      subTotal,
    };
    await axios.patch<Record<string, TCartItem>>(url, updatedItem);
    return updatedItem;
  } else {
    await axios.delete<Record<string, TCartItem>>(url);
    return { ...product, count: 0 };
  }
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromCart,
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
export function usePlusItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: plusItem,
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
export function useMinusItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: minusItem,
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
