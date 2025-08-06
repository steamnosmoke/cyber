import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { useAuthStore } from "store/authStore";
import { TCartItem } from "types/CartTypes";

const getUserCart = async (): Promise<TCartItem[]> => {
  const userId: string = useAuthStore.getState().user.firebaseId;
  const { data } = await axios.get<Record<string, TCartItem>>(
    `${DB_URL}/users/${userId}/cart.json`
  );
  const cartData: TCartItem[] = data
    ? Object.entries(data).map((el) => {
        const [key, value] = el;
        return { ...value, id: Number(key) };
      })
    : [];
  return cartData;
};

const getGuestCart = (): TCartItem[] => {
  const cartData: Record<string,TCartItem> = JSON.parse(localStorage.getItem("guest-cart"));
  const cart: TCartItem[] = cartData ? Object.values(cartData) : []
  return cart;
};

async function addToUserCart(product: TCartItem): Promise<TCartItem> {
  const userId = useAuthStore.getState().user.firebaseId;
  const data = await getUserCart();
  const existingEntry = data.find(
    (item) =>
      item.productId === product.productId &&
      (item.variantId || null) === (product.variantId || null)
  );
  if (existingEntry) {
    const updatedCount = Number(existingEntry.count) + 1;
    const updatedTotal =
      Number(existingEntry.total) + Number(existingEntry.totalPrice);
    const updatedDiscount = updatedCount * Number(existingEntry.discount);
    const updatedSubTotal = updatedCount * Number(existingEntry.price);
    const updatedItem = {
      ...existingEntry,
      count: updatedCount,
      total: updatedTotal,
      totalDiscount: updatedDiscount,
      subTotal: updatedSubTotal,
    };
    await axios.patch<Record<string, TCartItem>>(
      `${DB_URL}/users/${userId}/cart/${existingEntry.id}.json`,
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
      id: Number(postRes.data.name),
    };
  }
}

async function addToGuestCart(product: TCartItem): Promise<TCartItem> {
  const cartData = getGuestCart();
  const existingEntry = cartData.find(
    (item) =>
      item.productId === product.productId &&
      (item.variantId || null) === (product.variantId || null)
  );
  if (existingEntry) {
    const updatedCount = Number(existingEntry.count) + 1;
    const updatedTotal =
      Number(existingEntry.total) + Number(existingEntry.totalPrice);
    const updatedDiscount = updatedCount * Number(existingEntry.discount);
    const updatedSubTotal = updatedCount * Number(existingEntry.price);
    const updatedItem = {
      ...existingEntry,
      count: updatedCount,
      total: updatedTotal,
      totalDiscount: updatedDiscount,
      subTotal: updatedSubTotal,
    };

    const existingKey = cartData.indexOf(existingEntry);
    cartData[existingKey] = updatedItem;
    localStorage.setItem("guest-cart", JSON.stringify(cartData));
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
    cartData.push(newItem);
    localStorage.setItem("guest-cart", JSON.stringify(cartData));
    return {
      ...newItem,
      id: cartData.length - 1,
    };
  }
}

const addToCart = async (product: TCartItem) => {
  const userId = useAuthStore.getState().user.firebaseId;
  if (userId === "guest") {
    return addToGuestCart(product);
  }
  return addToUserCart(product);
};

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
