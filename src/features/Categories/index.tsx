import { useMemo } from "react";

import { useProductsStore } from "store/productsStore";
import { TCategory } from "./types";

import All from "./components/All";
import Phones from "./components/Phones";
import Watches from "./components/Watches";
import Accessories from "./components/Accessories";
import Headphones from "./components/Headphones";
import Computers from "./components/Computers";
import Gaming from "./components/Gaming";

export default function Categories() {
  const category = useProductsStore((state) => state.category);
  const setCategory = useProductsStore(
    (state) => state.setCategory
  );
  
  const categories = useMemo<TCategory[]>(() => {
    return [
      {
        label: "All",
        category: "",
        img: <All />,
      },
      { label: "Phones", category: "Phones", img: <Phones /> },
      { label: "Smartwatches", category: "Smartwatches", img: <Watches /> },
      { label: "Accessories", category: "Accessories", img: <Accessories /> },
      { label: "Headphones", category: "Headphones", img: <Headphones /> },
      { label: "Computers", category: "Computers", img: <Computers /> },
      {
        label: "Gaming",
        category: "Gaming Consoles",
        img: <Gaming />,
      },
    ];
  }, [category]);

  return (
    <>
      <section className="categories py-20 bg-stone-100 my-20">
        <div className="container">
          <div className="categories-inner">
            <h3 className="categories-title text-2xl mb-8">
              Browse By Category
            </h3>
            <ul className="categories-list flex items-center justify-between">
              {categories.map((item) => (
                <li
                  key={item.category}
                  className={` ${
                    category === item.category
                      ? "active-item group w-35 h-32 py-6 cursor-pointer rounded-2xl flex flex-col items-center gap-2 scale-100 bg-[#353535] text-stone-100 hover:scale-100"
                      : "categories-item group w-35 h-32 py-6 cursor-pointer rounded-2xl flex flex-col items-center gap-2 bg-[rgb(237_237_237)] text-center transition-all duration-200 ease-in-out hover:scale-110 hover:bg-[#353535] hover:text-stone-100"
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
