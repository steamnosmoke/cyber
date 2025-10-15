import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TCartItem } from "types/CartTypes";
import { TVariant } from "types/ProductTypes";
import DB_URL from "constants/DB_URL";

async function updateStock(cart: TCartItem[]) {
  await Promise.all(
    cart.map(async (item) => {
      const { data: product } = await axios.get<TVariant>(
        `${DB_URL}products/${item.productId}/variants/${item.variantId}.json`
      );
      await axios.patch<TVariant>(
        `${DB_URL}products/${item.productId}/variants/${item.variantId}.json`,
        { ...product, stock: product.stock - item.count }
      );
    })
  );
}

export default function useUpdateStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cart: TCartItem[]) => updateStock(cart),
    mutationKey: ["products"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
