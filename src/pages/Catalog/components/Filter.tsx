import { useState } from "react";

import { TfilterItem } from "types/CategoryTypes";
import { TFilterProps } from "../types";
import { useFilterStore } from "../store/filter";

import arrow from "../images/arrow.svg";

export default function Filter({ filter }: TFilterProps) {
  const [isOpened, setOpened] = useState(true);

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const onClickFilter = ({ title, value }: TfilterItem) => {
    setFilters({ title, value });
  };

  return (
    <li className="item mb-2">
      <div
        className="filter flex items-center justify-between pt-3 pr-6 cursor-pointer"
        onClick={() => setOpened(!isOpened)}
      >
        <h2 className="title text-lg">{filter?.title}</h2>
        <img
          className={`transition-all duration-200 ease-in-out ${
            isOpened ? "rotate-x-180" : ""
          }`}
          src={arrow}
          alt="arrow"
        />
      </div>
      <ul
        className={`list px-0 flex flex-col items-start justify-center gap-1 shadow-[0_5px_10px_-7px_#a5a5a59a] transition-all duration-200 ease overflow-y-hidden ${
          isOpened ? "max-h-100 py-5" : "max-h-0 py-0 text-nowrap"
        }`}
      >
        {Object.values(filter.values).map((el, elIndex) => (
          <li
            className="filter-item flex items-center justify-start w-full p-2 rounded-xl cursor-pointer transition-all duration-100 ease-in-out hover:bg-stone-100 group"
            key={elIndex}
            onClick={() =>
              onClickFilter({
                title: filter.title,
                value: el,
              })
            }
          >
            <div
              className={`checkbox w-6 h-6 m-0 p-0 border border-stone-300 rounded-md  mr-2 bg-center bg-cover bg-no-repeat  ${
                filters.find(
                  (item) =>
                    item.title === filter.title && item.values.includes(el)
                )
                  ? "bg-[image:url('/images/checkbox.svg')]"
                  : "bg-white group-hover:bg-[image:url('/images/checkbox.svg')] group-hover:opacity-35"
              }`}
            ></div>
            <p className="text-base text-center font-semibold text-nowrap">
              {JSON.stringify(el)}
            </p>
          </li>
        ))}
      </ul>
    </li>
  );
}
