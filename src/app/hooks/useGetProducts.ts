import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";
import { TProduct } from "types/ProductTypes";

async function getProducts(category: string): Promise<TProduct[]> {
  const url = `${DB_URL}products.json${
    category ? `?orderBy="category"&equalTo="${category}"` : ""
  }`;

  const { data } = await axios.get<Record<string, TProduct>>(url);
  const products: TProduct[] = [];

  Object.entries(data || {}).forEach(([prodId, product]) => {
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

  return products;
}

export default function useGetProducts(category: string) {
  const { data, status, error } = useQuery<TProduct[]>({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
    placeholderData: (prev) => prev,
  });

  return {
    products: data || [],
    status,
    error,
  };
}
