import { useState, useCallback, useMemo } from "react";

import { TOption} from "../types";
import { useFilterStore } from "../store/filter";
import { TSortingParams } from "types/CategoryTypes";

export default function Sorting() {
  const [opened, setOpened] = useState(false);

  const param = useFilterStore((state) => state.sortingParams.param);
  const mod = useFilterStore((state) => state.sortingParams.mod);
  const setSortingParams = useFilterStore((state) => state.setSortingParams);

  const handleSetParams = useCallback(
    ({ param, mod }: TSortingParams) => setSortingParams({ param, mod }),
    [setSortingParams]
  );

  const sortOptions: TOption[] = useMemo(
    () => [
      { label: "rating ↓", param: "rating", mod: "desc" },
      { label: "rating ↑", param: "rating", mod: "asc" },
      { label: "price ↓", param: "price", mod: "desc" },
      { label: "price ↑", param: "price", mod: "asc" },
    ],
    [param, mod]
  );

  return (
    <div className="sorting cursor-pointer" onClick={() => setOpened(!opened)}>
      <h3 className="title text-lg">
        <span className="text-stone-500 text-base">Sort by</span> {param}{" "}
        {mod === "desc" ? "↓" : "↑"}
      </h3>
      <ul
        className={`list opacity-0 z-[-1] mt-[-10px] absolute bg-white w-30 border border-stone-400 rounded-md py-3 flex flex-col items-center justify-center transition-all duration-200 ease ${
          opened ? "opacity-100 z-1 mt-[10px]" : ""
        }`}
      >
        {sortOptions.map(({ label, param, mod }) => (
          <li
            key={label}
            className="item w-full p-1 text-center transition-all duration-200 ease hover:bg-stone-100"
            onClick={() => handleSetParams({ param, mod })}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
