import { useFilters } from "../hooks/useFilter";
import { useFilterStore } from "../store/filter";

import BlackButton from "buttons/components/BlackButton";
import Filter from "./Filter";
import { useProductStore } from "store/productsStore";
import { useEffect, useState } from "react";

export default function CatalogAside() {
  const category = useProductStore((state) => state.category);
  const [isOpened, setIsOpened] = useState(false);
  const isFilterOpened = useFilterStore((state) => state.isFilterOpened);
  const setConfirmedFilters = useFilterStore(
    (state) => state.setConfirmedFilters
  );
  const clearFilters = useFilterStore((state) => state.clearFilters);

  const { filters, status } = useFilters(category);

useEffect(() => {
  if (isFilterOpened) {
    setIsOpened(true);
    return;
  }

  const timer = setTimeout(() => {
    setIsOpened(false);
  }, 500);

  return () => clearTimeout(timer);
}, [isFilterOpened]);


  if (status === "success")
    return (
      <div
        className={`transition-all duration-500 ease-in h-100% ${
          isOpened ? "aside_open" : "aside_close"
        }`}
      >
        <section
          className={`aside sticky top-61 flex flex-col items-center gap-5`}
        >
          <ul
            className={`filters-list relative flex flex-col w-full h-[55vh] overflow-y-auto ${
              isFilterOpened ? "aside_open" : "aside_close"
            }`}
          >
            {filters.map((el, i) => (
              <Filter filter={el} key={i} />
            ))}
          </ul>
          <div
            className={`buttons flex items-center gap-4 justify-center ${
              isFilterOpened ? "aside_open" : "aside_close"
            }`}
          >
            <BlackButton
              twclass={`${isFilterOpened ? "aside_open" : "aside_close"}`}
              children={"Confirm"}
              onClick={setConfirmedFilters}
            />
            <BlackButton
              twclass={`${isFilterOpened ? "aside_open" : "aside_close"}`}
              children={"Clear"}
              onClick={clearFilters}
            />
          </div>
        </section>
      </div>
    );
}
