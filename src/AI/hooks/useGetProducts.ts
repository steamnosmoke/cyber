import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";
import { Product } from "types/ProductTypes";
import { ChatProduct } from "../types/chatTypes";

async function geProducts(): Promise<ChatProduct[]> {
  const url = `${DB_URL}products.json`;

  const { data } = await axios.get<Record<string, Product>>(url);
  const products: ChatProduct[] = [];

  Object.entries(data || {}).forEach(([prodId, product]) => {
    products.push({
      objectId: `${Number(prodId)}x0`,
      name: product.name,
      category: product.category,
      price: product.variants[0].price,
      brand: product.brand,
    });
  });
  return products;
}

export default function useGeProducts() {
  const { data, status, error } = useQuery<ChatProduct[]>({
    queryKey: ["chaProducts"],
    queryFn: () => geProducts(),
    placeholderData: (prev) => prev,
  });

  return {
    products: data || [],
    status,
    error,
  };
}
