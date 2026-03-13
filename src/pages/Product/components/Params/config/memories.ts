import { Product } from "types/ProductTypes";

export default function memories(product: Product): string[] {
  return [...new Set(product.variants?.map((v) => v.memory))];
}
