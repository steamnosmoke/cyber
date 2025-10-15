import { useEffect } from "react";

import { useNavigationStore } from "store/navigationStroe";

import Header from "./components/Header";
import ProductParams from "./components/Params";
import Details from "./components/Details";
import Reviews from "./components/Reviews";

export default function Product() {

  const setActivePage = useNavigationStore((state) => state.setActivePage);

  useEffect(() => {
    setActivePage(1);
  }, [setActivePage]);

  return (
    <>
      <main className="main flex-grow">
        <div className="container">
          <Header />
          <ProductParams />
          <Details />
          <Reviews />
        </div>
      </main>
    </>
  );
}
