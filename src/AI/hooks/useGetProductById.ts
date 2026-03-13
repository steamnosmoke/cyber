
import useGeProducts from "hooks/useGeProducts";

export function useGeProductById(objectId: string) {
  const {products} = useGeProducts("")
  const product = products.find((p) => p.objectId === objectId);
  return { product };
}
