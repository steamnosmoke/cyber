import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";
import { TProduct } from "types/ProductTypes";
import { TChatProduct } from "../types/chatTypes";

async function getProducts(): Promise<TChatProduct[]> {
  const url = `${DB_URL}products.json`;

  const { data } = await axios.get<Record<string, TProduct>>(url);
  const products: TChatProduct[] = [];

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

export default function useGetProducts() {
  const { data, status, error } = useQuery<TChatProduct[]>({
    queryKey: ["chatProducts"],
    queryFn: () => getProducts(),
    placeholderData: (prev) => prev,
  });

  return {
    products: data || [],
    status,
    error,
  };
}
