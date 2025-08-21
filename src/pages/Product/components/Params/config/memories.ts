import { TProduct } from "types/ProductTypes";

export default function memories(product: TProduct): string[] {
  return [...new Set(product.variants?.map((v) => v.memory))];
}
