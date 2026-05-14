import { Product } from "types/ProductTypes";

export default function getParams(product: Product) {
  const category = product.category;
  return category === "Phones"
    ? `${product.memory}${Number(product.memory) === 1 || Number(product.memory) === 2 ? "TB" : "GB"}`
    : category === "Computers"
      ? `${product.storage}/${product.ram}`
      : category === "Smartwatches"
        ? `${product.size}`
        : category === "Gaming Consoles" && `${product.storage}`;
}
