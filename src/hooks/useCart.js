import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../zustand/authStore";

const DB_URL =
  "https://e-store-4ca3a-default-rtdb.europe-west1.firebasedatabase.app";

const userId = useAuthStore.getState()?.user?.firebaseId || null;

const getCart = async () => {
  const res = await axios.get(`${DB_URL}/users/${userId}/cart.json`);
  const data = res.data;
  return data ? Object.entries(data) : [];
};

const getItem = async (product) => {
  const cartData = await getCart();
  const existingEntry = cartData.find(
    ([_, value]) => value.objectId === product.objectId
  );
  const [key, value] = existingEntry;
  const url = `${DB_URL}/users/${userId}/cart/${key}.json`;
  return { value, url };
};

async function addToCart(product) {
  const cartData = await getCart();
  const existingEntry = cartData.find(
    ([_, value]) => value.objectId === product.objectId
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
    await axios.patch(
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
    const postRes = await axios.post(
      `${DB_URL}/users/${userId}/cart.json`,
      newItem
    );

    return {
      ...newItem,
      id: postRes.data.name,
    };
  }
}

async function removeFromCart(product) {
  const { _, url } = await getItem(product);
  await axios.delete(url, product);
  return { ...product, count: 0 };
}

async function plusItem(product) {
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
  await axios.patch(url, updatedItem);
  return updatedItem;
}

async function minusItem(product) {
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
    await axios.patch(url, updatedItem);
    return updatedItem;
  } else {
    await axios.delete(url, product);
    return { ...product, count: 0 };
  }
}

async function makeOrder(cart) {
  const url = `${DB_URL}/users/${userId}/orders.json`;
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const date = `${year}-${month}-${day}`;
  const newOrder = {
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
  await axios.post(url, newOrder);
  return newOrder;
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
