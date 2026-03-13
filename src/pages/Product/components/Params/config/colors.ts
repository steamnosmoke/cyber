import { Product } from "types/ProductTypes";

export default function colors(product: Product): string[] {
  return [...new Set(product.variants?.map((v) => v.color))];
}
