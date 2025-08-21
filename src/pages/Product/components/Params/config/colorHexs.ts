import { TProduct } from "types/ProductTypes";

export default function colorHexs(product: TProduct): string[] {
  return [...new Set(product.variants?.map((v) => v.colorHex))];
}
