import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";
import { Product } from "types/ProductTypes";

async function geProducts(category: string): Promise<Product[]> {
  const url = `${DB_URL}products.json${
    category ? `?orderBy="category"&equalTo="${category}"` : ""
  }`;

  const { data } = await axios.get<Record<string, Product>>(url);
  const products: Product[] = [];

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

export default function useGeProducts(category: string) {
  const { data, status, error } = useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => geProducts(category),
    placeholderData: (prev) => prev,
  });

  return {
    products: data || [],
    status,
    error,
  };
}
