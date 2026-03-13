import useGeProducts from "hooks/useGeProducts";
import { useProductStore } from "store/productsStore";

import Products from "components/Products";

export default function ProductsSection() {
  const category = useProductStore((state) => state.category);
  const { products, status } = useGeProducts(category);
  return (
    <section className="products">
      <div className="container">
        <Products products={products} status={status} />
      </div>
    </section>
  );
}
