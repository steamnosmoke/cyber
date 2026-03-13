import { Product } from "types/ProductTypes";

export default function colorHexs(product: Product): string[] {
  return [...new Set(product.variants?.map((v) => v.colorHex))];
}
