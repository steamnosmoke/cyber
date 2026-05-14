import { Link } from "react-router";

import { useProductStore } from "store/productsStore";

import { useFilterStore } from "../store/filter";
import { useNavigationStore } from "store/navigationStroe";

import Sorting from "./Sorting";
import arrow from "../images/arrow.svg";

export default function CatalogHeader() {
  const categoryEn = useProductStore((state) => state.category);
  const isFilterOpened = useFilterStore((state) => state.isFilterOpened);
  const seFilterOpened = useFilterStore((state) => state.seFilterOpened);

  const filteredProducts = useFilterStore((state) => state.filteredProducts);

  const setActivePage = useNavigationStore((state) => state.setActivePage);

  const category =
    categoryEn === "Phones"
      ? "Смартфоны"
      : categoryEn === "SmartWatches"
        ? "Смартчасы"
        : categoryEn === "Accesories"
          ? "Аксессуары"
          : categoryEn === "Headphones"
            ? "Наушники"
            : categoryEn === "Computers"
              ? "Компьютеры"
              : "Игры";
  return (
    <header className="catalog-header py-2 sticky top-18 bg-white z-1000 mb-8 shadow-[0_7px_20px_-5px_rgb(223,223,223)]">
      <div className="container">
        <div className="paths pb-3 flex gap-3">
          <Link
            to={"/"}
            className="transition-all duration-200 hover:font-semibold w-14"
            onClick={() => setActivePage(0)}
          >
            Главная
          </Link>
          <p className="cursor-default">{`>`}</p>
          <Link
            to={"/catalog"}
            className="transition-all duration-200 hover:font-semibold w-14"
          >
            Каталог
          </Link>
          <p className="cursor-default">{`>`}</p>
          <Link
            to={`/catalog/${category}`}
            className="transition-all duration-200 hover:font-semibold  w-14"
          >
            {category}
          </Link>
        </div>

        <div className="bottom flex justify-between">
          <div
            className="filter flex gap-2 items-center cursor-pointer"
            onClick={() => seFilterOpened()}
          >
            <h2 className="title text-xl">Фильтры</h2>
            <img
              className={`transition-all duration-200 ease-in-out rotate-90 ${
                isFilterOpened ? "rotate-x-180" : ""
              }`}
              src={arrow}
              alt="arrow"
            />
          </div>
          <div className="params flex gap-5 items-center">
            <span className="count text-lg font-medium text-center">
              <span className="descr text-stone-500 text-base font-medium">
                Подходящих товаров:{" "}
              </span>
              {filteredProducts.length}
            </span>
            <Sorting />
          </div>
        </div>
      </div>
    </header>
  );
}
