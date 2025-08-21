import { TProduct } from "types/ProductTypes";

export default function colors(product: TProduct): string[] {
  return [...new Set(product.variants?.map((v) => v.color))];
}
