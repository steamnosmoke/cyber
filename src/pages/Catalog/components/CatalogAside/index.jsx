import Filter from "./Filter";
import { useFilters } from "hooks/useProducts";
import { useProductsStore } from "stores/productsStore";
import BlackButton from "components/buttons/BlackButton";

export default function CatalogAside() {
  const category = useProductsStore((state) => state.category);
  const isFilterOpened = useProductsStore((state) => state.isFilterOpened);
  const setConfirmedFilters = useProductsStore(
    (state) => state.setConfirmedFilters
  );
  const clearFilters = useProductsStore((state) => state.clearFilters);

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
              className="text-base py-3 px-7 mx-auto"
              children={"Confirm"}
              onClick={setConfirmedFilters}
            />
            <BlackButton
              className="text-base py-3 px-7 mx-auto"
              children={"Clear"}
              onClick={clearFilters}
            />
          </div>
        </section>
      </>
    );
}
