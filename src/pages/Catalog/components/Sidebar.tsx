import { useFilters } from "../hooks/useFilter";
import { useFilterStore } from "../store/filter";
import { TSidebarProps } from "../types";

import BlackButton from "buttons/components/BlackButton";
import Filter from "./Filter";

export default function CatalogAside({ category }: TSidebarProps) {
  const isFilterOpened = useFilterStore((state) => state.isFilterOpened);
  const setConfirmedFilters = useFilterStore(
    (state) => state.setConfirmedFilters
  );
  const clearFilters = useFilterStore((state) => state.clearFilters);

  const { filters, status } = useFilters(category);

  if (status === "success")
    return (
      <>
        <section
          className={`aside absolute top-62 left-[-480px] opacity-0 invisible transition-all duration-300 ease flex flex-col items-center gap-5 ${
            isFilterOpened &&
            "left-0 opacity-100 sticky visible transition-all duration-300 ease"
          }`}
        >
          <ul className="filters-list relative felx flex-col w-full h-[55vh] overflow-y-auto ">
            {filters.map((el, i) => (
              <Filter filter={el} key={i} />
            ))}
          </ul>
          <div className="buttons flex items-center gap-4 justify-center">
            <BlackButton
              twclass="text-base py-3 px-7 mx-auto"
              children={"Confirm"}
              onClick={setConfirmedFilters}
            />
            <BlackButton
              twclass="text-base py-3 px-7 mx-auto"
              children={"Clear"}
              onClick={clearFilters}
            />
          </div>
        </section>
      </>
    );
}
