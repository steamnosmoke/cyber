import { useEffect } from "react";

import { useNavigationStore } from "store/navigationStroe";

import Banner from "./components/Banner";
import Tablets from "./components/Tablets";
import Categories from "./components/Categories";
import ProductsSection from "./components/ProductsSection";

export default function Home() {
  const setActivePage = useNavigationStore((state) => state.setActivePage);

  useEffect(() => {
    setActivePage(0);
  }, []);

  return (
    <>
      <main className="main flex-grow">
        <Banner />
        <Tablets />
        <Categories />
        <ProductsSection />
      </main>
    </>
  );
}
