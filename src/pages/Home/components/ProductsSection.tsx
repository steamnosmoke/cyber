import useGetProducts from "hooks/useGetProducts";
import { useProductStore } from "store/productsStore";

import Products from "components/Products";

export default function ProductsSection() {
  const category = useProductStore((state) => state.category);
  const { products, status } = useGetProducts(category);
  return (
    <section className="products">
      <div className="container">
        <Products products={products} status={status} />
      </div>
    </section>
  );
}
