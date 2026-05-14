import { useMemo } from "react";

import { useProductStore } from "store/productsStore";

import { Category } from "../types";
import categories from "../config/categories";

export default function Categories() {
  const category = useProductStore ((state) => state.category);
  const setCategory = useProductStore ((state) => state.setCategory);

  const memoizedCategories = useMemo<Category[]>(() => categories, [category]);

  return (
    <>
      <section className="categories py-8 bg-stone-100 my-12">
        <div className="container">
          <div className="categories-inner">
            <h3 className="categories-title text-2xl mb-6 font-semibold">
              Выбор категории
            </h3>
            <ul className="categories-list flex items-center justify-between">
              {memoizedCategories.map((item) => (
                <li
                  key={item.category}
                  className={`text-[14px] font-semibold group w-28 h-26 py-3 cursor-pointer rounded-2xl flex flex-col items-center gap-2 transition-all duration-200 ease-in-out ${
                    category === item.category
                      ? "active-item  scale-100 bg-[#353535] text-stone-100 hover:scale-100"
                      : "categories-item bg-[rgb(237_237_237)] text-center hover:scale-110 hover:bg-[#353535] hover:text-stone-100"
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
