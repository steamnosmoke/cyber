import { Product } from "types/ProductTypes";
import getParams from "../config/params";

export default function getLink(product: Product) {
  const param = getParams(product);
  return `/catalog/${product.category}/${product.name} ${product.color} ${param}`
    .split(" ")
    .join("_");
}
