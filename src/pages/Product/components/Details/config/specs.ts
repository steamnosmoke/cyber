import { useProductStore } from "store/productsStore";

export default function useSpecs() {
  const product = useProductStore((state) => state.product);

  return product?.specs ? new Map(Object.entries(product.specs)) : new Map();
}
