import { useEffect } from "react";

import { useProductStore } from "store/productsStore";
import { useNavigationStore } from "store/navigationStroe";

import Header from "./components/Header";
import ProductParams from "./components/Params";
import Details from "./components/Details";
import Reviews from "./components/Reviews";

export default function Product() {
  const product = useProductStore((state) => state.product);

  const setActivePage = useNavigationStore((state) => state.setActivePage);

  if (!product) {
    return <>loading...</>;
  }

  useEffect(() => {
    setActivePage(1);
  }, []);

  return (
    <>
      <main className="main flex-grow">
        <div className="container">
          <Header/>
          <ProductParams />
          <Details/>
          <Reviews/>
        </div>
      </main>
    </>
  );
}
