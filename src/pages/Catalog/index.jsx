import { useEffect } from "react";

import CatalogAside from "./components/CatalogAside";
import Products from "../../components/Products";
import CatalogHeader from "./components/CatalogHeader";

import { useProductsStore } from "../../zustand/productsStore";

import { useProducts } from "../../hooks/useProducts";

export default function Catalog() {
  const category = useProductsStore((state) => state.category);
  const confirmedFilters = useProductsStore((state) => state.confirmedFilters);
  const filteredProducts = useProductsStore((state) => state.filteredProducts);
  const param = useProductsStore((state) => state.sortingParams.param);
  const mod = useProductsStore((state) => state.sortingParams.mod);
  const sortProducts = useProductsStore((state) => state.sortProducts);
  const setFilteredProducts = useProductsStore(
    (state) => state.setFilteredProducts
  );

  const { products, status } = useProducts(category);

  useEffect(() => {
    setFilteredProducts(products);
  }, [confirmedFilters, status, mod, param, setFilteredProducts, sortProducts]);

  return (
    <>
      <main className="main flex-grow">
        <>
          <CatalogHeader />
          <section className="catalog">
            <div className="container relative flex">
              {category === "Phones" ? (
                <>
                  <CatalogAside />
                  <div className="catalog-inner flex flex-row items-start justify-center gap-3 max-w-405 relative">
                    <Products products={filteredProducts} status={status} />
                  </div>
                </>
              ) : (
                <h1 className="empty text-5xl text-center w-full">
                  No products
                </h1>
              )}
            </div>
          </section>
        </>
      </main>
    </>
  );
}
