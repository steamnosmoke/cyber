import Categories from "components/Categories";
import MainBanner from "components/MainBanner";
import Products from "components/Products";
import Tablets from "components/Tablets";

import { useProducts } from "hooks/useProducts";
import { useProductsStore } from "stores/productsStore";

export default function Home() {
  const category = useProductsStore((state) => state.category);
  const { products } = useProducts(category);
  const { status } = useProducts(category);
  return (
    <>
      <main className="main flex-grow">
        <MainBanner product={products[0]} />
        <Tablets />
        <Categories />
        <section className="products">
          <div className="container">
            <Products products={products} status={status} />
          </div>
        </section>
      </main>
    </>
  );
}
