import { Link } from "react-router";

import { useFilterStore } from "../store/filter";
import { THeaderProps } from "../types";
import { useNavigationStore } from "store/navigationStroe";

import Sorting from "./Sorting";
import arrow from "../images/arrow.svg";

export default function CatalogHeader({ count, category }: THeaderProps) {
  const isFilterOpened = useFilterStore((state) => state.isFilterOpened);
  const setFilterOpened = useFilterStore((state) => state.setFilterOpened);
  const setActivePage = useNavigationStore((state) => state.setActivePage);
  return (
    <header className="catalog-header py-5 sticky top-22 bg-white z-1000 mb-10 shadow-[0_7px_20px_-5px_rgb(223,223,223)]">
      <div className="container">
        <div className="paths pb-5 flex gap-3">
          <Link
            to={"/"}
            className="transition-all duration-200 hover:font-semibold w-14"
            onClick={() => setActivePage(0)}
          >
            Home
          </Link>
          <p className="cursor-default">{`>`}</p>
          <Link
            to={"/catalog"}
            className="transition-all duration-200 hover:font-semibold  w-14"
          >
            Catalog
          </Link>
          <p className="cursor-default">{`>`}</p>
          <Link
            to={`/catalog/${category}`}
            className="transition-all duration-200 hover:font-semibold  w-14"
          >
            {category}
          </Link>
        </div>
        {category === "Phones" && (
          <div className="bottom flex justify-between">
            <div
              className="filter flex gap-2 items-center"
              onClick={() => setFilterOpened()}
            >
              <h2 className="title text-2xl cursor-pointer">Filters</h2>
              <img
                className={`transition-all duration-200 ease-in-out ${
                  isFilterOpened ? "rotate-x-180" : ""
                }`}
                src={arrow}
                alt="arrow"
              />
            </div>
            <div className="params flex gap-5 items-center">
              <span className="count text-lg font-medium text-center">
                <span className="descr text-stone-500 text-base font-medium">
                  Selected Products:{" "}
                </span>
                {count}
              </span>
              <Sorting />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
