import { useEffect } from "react";

import { useProductStore } from "store/productsStore";
import { useNavigationStore } from "store/navigationStroe";
import useGetProducts from "hooks/useGetProducts";
import { useFilterStore } from "./store/filter";

import Products from "components/Products";
import CatalogAside from "./components/Sidebar";
import CatalogHeader from "./components/Header";

export default function Catalog() {
  const category = useProductStore((state) => state.category);

  const setActivePage = useNavigationStore((state) => state.setActivePage);

  const filteredProducts = useFilterStore((state) => state.filteredProducts);
  const confirmedFilters = useFilterStore((state) => state.confirmedFilters);
  const param = useFilterStore((state) => state.sortingParams.param);
  const mod = useFilterStore((state) => state.sortingParams.mod);

  const setFilteredProducts = useFilterStore(
    (state) => state.setFilteredProducts
  );

  const { products, status } = useGetProducts(category);

  useEffect(() => {
    setFilteredProducts(products);
  }, [confirmedFilters, status, mod, param, setFilteredProducts, category]);

  useEffect(() => {
    setActivePage(1);
  }, []);

  return (
    <main className="main flex-grow">
      <CatalogHeader />
      <section className="catalog">
        {products ? (
          <>
            <div className="container relative flex min-h-[72vh] transition-all duration-500 ease-in-out ">
              <CatalogAside />
              <div className="catalog-inner w-full max-w-[10000px] transition-[width] duration-500 ease-in-out ml-5">
                <Products products={filteredProducts} status={status} />
              </div>
            </div>
          </>
        ) : (
          <h1 className="empty text-5xl text-center w-full">No products</h1>
        )}
      </section>
    </main>
  );
}
