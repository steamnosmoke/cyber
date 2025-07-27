import { useEffect } from "react";

import { useProductsStore } from "store/productsStore";
import { useNavigationStore } from "store/navigationStroe";
import { useProducts } from "hooks/useProducts";
import { useFilterStore } from "./store/filter";

import Products from "components/Products";
import CatalogAside from "./components/Sidebar";
import CatalogHeader from "./components/Header";

export default function Catalog() {
  const category = useProductsStore((state) => state.category);

  const setActivePage = useNavigationStore((state) => state.setActivePage);

  const filteredProducts = useFilterStore((state) => state.filteredProducts);
  const confirmedFilters = useFilterStore((state) => state.confirmedFilters);
  const param = useFilterStore((state) => state.sortingParams.param);
  const mod = useFilterStore((state) => state.sortingParams.mod);

  const setFilteredProducts = useFilterStore(
    (state) => state.setFilteredProducts
  );

  const { products, status } = useProducts(category);

  useEffect(() => {
    setFilteredProducts(products);
  }, [confirmedFilters, status, mod, param, setFilteredProducts, category]);

  useEffect(() => {
    setActivePage(1);
  }, []);

  return (
    <main className="main flex-grow">
      <CatalogHeader count={filteredProducts.length} category={category} />
      <section className="catalog">
        <div className="container relative flex">
          {category === "Phones" ? (
            <>
              <CatalogAside category={category} />
              <div className="catalog-inner flex flex-row items-start justify-center gap-3 max-w-405 relative">
                <Products products={filteredProducts} status={status} />
              </div>
            </>
          ) : (
            <h1 className="empty text-5xl text-center w-full">No products</h1>
          )}
        </div>
      </section>
    </main>
  );
}
