import { useCallback, useState } from "react";

import { TFilterProps } from "../types";
import { useFilterStore } from "../store/filter";

import arrow from "../images/arrow.svg";
import { TfilterItem } from "types/CategoryTypes";

export default function Filter({ filter }: TFilterProps) {
  const [isOpened, setOpened] = useState(true);

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const onClickFilter = useCallback(
    ({ title, value }: TfilterItem) => {
      setFilters({ title, value });
    },
    [setFilters]
  );

  return (
    <>
      <li className="item text-xl mb-2">
        <div
          className="filter flex items-center justify-between pt-3 px-6 cursor-pointer"
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
        {isOpened && (
          <ul className="list p-5 flex flex-col items-start justify-center gap-1 shadow-[0_5px_10px_-7px_#a5a5a59a]">
            {Object.values(filter.values).map((el, elIndex) => (
              <li
                className="filter-item flex items-center justify-start w-full p-2 rounded-xl cursor-pointer transition-all duration-100 ease-in-out hover:bg-stone-100"
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
                      : "bg-white "
                  }`}
                ></div>
                <p className="text-base text-center font-semibold">
                  {JSON.stringify(el)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </li>
    </>
  );
}
