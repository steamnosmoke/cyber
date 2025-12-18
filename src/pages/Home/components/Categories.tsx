import { useMemo } from "react";

import { useProductStore } from "store/productsStore";

import { TCategory } from "../types";
import categories from "../config/categories";

export default function Categories() {
  const category = useProductStore((state) => state.category);
  const setCategory = useProductStore((state) => state.setCategory);

  const memoizedCategories = useMemo<TCategory[]>(() => categories, [category]);

  return (
    <>
      <section className="categories py-8 bg-stone-100 my-12">
        <div className="container">
          <div className="categories-inner">
            <h3 className="categories-title text-2xl mb-6">
              Browse By Category
            </h3>
            <ul className="categories-list flex items-center justify-between">
              {memoizedCategories.map((item) => (
                <li
                  key={item.category}
                  className={`text-[14px] ${
                    category === item.category
                      ? "active-item group w-28 h-26 py-3 cursor-pointer rounded-2xl flex flex-col items-center gap-2 scale-100 bg-[#353535] text-stone-100 hover:scale-100"
                      : "categories-item group w-28 h-26 py-3 cursor-pointer rounded-2xl flex flex-col items-center gap-2 bg-[rgb(237_237_237)] text-center transition-all duration-200 ease-in-out hover:scale-110 hover:bg-[#353535] hover:text-stone-100"
                  }`}
                  onClick={() => setCategory(item.category)}
                >
                  {item.img}
                  <p>{item.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
