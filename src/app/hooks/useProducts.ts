import { useQuery} from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";
import { TProduct} from "@/src/app/types/ProductTypes";

export function useProducts(category: string) {
  const { data, status } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const response = await axios.get<Record<string, TProduct>>(
        `${DB_URL}products.json${
          category ? `?orderBy="category"&equalTo="${category}"` : ""
        }`
      );
      return response.data;
    },
    select: (data) => {
      const productsData = Object.values(data || {});
      const products: TProduct[] = [];

      if (category === "Phones" || category === "") {
        productsData.forEach((product, prodId) => {
          product.variants?.forEach((variant, varId) => {
            products.push({
              ...product,
              ...variant,
              productId: prodId,
              objectId: `${prodId}x${varId}`,
              variantId: String(varId),
              stock: variant.stock,
              totalPrice: variant.price - variant.discount,
            });
          });
        });
      }

      return products;
    },
    placeholderData: (previousData) => previousData,
  });

  return { products: data || [], status };
}


