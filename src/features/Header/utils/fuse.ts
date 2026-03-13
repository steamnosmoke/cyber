import Fuse from "fuse.js";

import { Product } from "types/ProductTypes";

export default function search(products: Product[]) {
  const options = {
    keys: ["category", "name", "brand", "color", "memory", "price"],
    includeScore: true,
    threshold: 0.4,
  };
  return new Fuse(products, options);
}
