import { useEffect, useRef, useState } from "react";

import { useFilterStore } from "../store/filter";
import { TSortingParams } from "types/CategoryTypes";
import sortOptions from "../config/sortOptions";

export default function Sorting() {
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const param = useFilterStore((state) => state.sortingParams.param);
  const mod = useFilterStore((state) => state.sortingParams.mod);
  const setSortingParams = useFilterStore((state) => state.setSortingParams);

  const handleSetParams = ({ param, mod }: TSortingParams) =>
    setSortingParams({ param, mod });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpened(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sorting cursor-pointer" ref={ref} onClick={() => setOpened(!opened)}>
      <h3 className="title text-lg">
        <span className="text-stone-500 text-base">Sort by</span> {param}{" "}
        {mod === "desc" ? "↓" : "↑"}
      </h3>
      <ul
        className={`list opacity-0 z-[-1] absolute bg-white min-w-30 rounded-md py-3 px-8 flex flex-col items-center justify-center shadow-[0_7px_20px_-5px_rgb(130,130,130)] transition-all duration-300 ease ${
          opened ? "opacity-100 z-1 mt-[10px]" : "opacity-0 mt-[-20px]"
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
