import { TProduct } from "types/ProductTypes";

export default function getParams(product: TProduct) {
  const category = product.category;
  return category === "Phones"
    ? `${product.memory}${Number(product.memory) === 1 ? "TB" : "GB"}`
    : category === "Computers"
    ? `${product.storage}/${product.ram}`
    : category === "Smartwatches" ? `${product.size}` :
    category === "Gaming Consoles" && `${product.storage}`;
}
