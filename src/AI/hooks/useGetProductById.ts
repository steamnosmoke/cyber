
import useGetProducts from "hooks/useGetProducts";

export function useGetProductById(objectId: string) {
  const {products} = useGetProducts("")
  const product = products.find((p) => p.objectId === objectId);
  return { product };
}
