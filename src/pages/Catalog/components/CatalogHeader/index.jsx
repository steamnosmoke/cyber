import { Link } from "react-router";
import arrow from "../../images/arrow.svg";
import { useProductsStore } from "stores/productsStore";
import Sorting from "../Sorting";

export default function CatalogHeader() {
  const category = useProductsStore((state) => state.category);
  const setFilterOpened = useProductsStore((state) => state.setFilterOpened);
  const isFilterOpened = useProductsStore((state) => state.isFilterOpened);
  const filteredProducts = useProductsStore((state) => state.filteredProducts);
  return (
    <header className="catalog-header py-5 sticky top-22 bg-white z-1000 mb-10 shadow-[0_7px_20px_-5px_rgb(223,223,223)]">
      <div className='container'>
        <div className="paths pb-5 flex gap-3">
          <Link to={"/"}>Home</Link>
          <p>{`>`}</p>
          <Link to={"/catalog"}>Catalog</Link>
          <p>{`>`}</p>
          <Link to={`/catalog/${category}`}>{category}</Link>
        </div>
        {category === "Phones" && (
          <div className="bottom flex justify-between">
            <div className="filter flex gap-2 items-center" onClick={() => setFilterOpened()}>
              <h2 className="title text-2xl cursor-pointer">Filters</h2>
              <img
                className={`transition-all duration-200 ease-in-out ${isFilterOpened ? "rotate-x-180" : ""}`}
                src={arrow}
                alt='arrow'
              />
            </div>
            <div className="params flex gap-5 items-center">
              <span className="count text-lg font-medium text-center">
                <span className="descr text-stone-500 text-base font-medium">Selected Products: </span>
                {filteredProducts.length}
              </span>
              <Sorting/>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
