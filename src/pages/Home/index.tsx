import { useEffect } from "react";

import { useProducts } from "hooks/useProducts";
import { useProductsStore } from "store/productsStore";
import { useNavigationStore } from "store/navigationStroe";

import MainBanner from "features/MainBanner";
import Tablets from "features/Tablets";
import Categories from "features/Categories";
import Products from "components/Products";

export default function Home() {
  const category = useProductsStore((state) => state.category);

  const setActivePage = useNavigationStore((state) => state.setActivePage);

  const { products } = useProducts(category);
  const { status } = useProducts(category);

  useEffect(() => {
    setActivePage(0);
  }, []);

  return (
    <>
      <main className="main flex-grow">
        <MainBanner />
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
