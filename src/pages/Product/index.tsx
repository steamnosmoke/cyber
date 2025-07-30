import { useEffect } from "react";

import { useProductsStore } from "store/productsStore";
import { useNavigationStore } from "store/navigationStroe";

import Header from "./components/Header";
import ProductParams from "./components/Params";
import Details from "./components/Details";
import Reviews from "./components/Reviews";

export default function Product() {
  const product = useProductsStore((state) => state.product);

  const setActivePage = useNavigationStore((state) => state.setActivePage);

  if (Object.values(product).length === 0) {
    return <>loading...</>;
  }

  useEffect(() => {
    setActivePage(1);
  }, []);

  return (
    <>
      <main className="main flex-grow">
        <div className="container">
          <Header name={product.name} />
          <ProductParams />
          <Details product={product} />
          <Reviews product={product} />
        </div>
      </main>
    </>
  );
}
