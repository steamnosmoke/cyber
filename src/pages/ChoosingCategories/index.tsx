import { Link } from "react-router";
import { useEffect, useMemo } from "react";

import { useProductsStore } from "store/productsStore";
import { useNavigationStore } from "store/navigationStroe";
import { TCategory } from "./types";

export default function ChoosingCategories() {
  const setCategory = useProductsStore((state) => state.setCategory);

  const setActivePage = useNavigationStore((state) => state.setActivePage);

  const categories = useMemo<TCategory[]>(() => {
    return [
      {
        label: "Phones",
        class: "row-span-2 col-span-1  h-[100%]",
        img_class:
          "h-[90%] bg-[url('./images/categories/black-iphone.png')] hover:bg-[url('./images/categories/white-iphone.png')]",
        category: "Phones",
      },
      {
        label: "Gaming",
        class: "row-span-1 col-span-2",
        img_class:
          "bg-[url('./images/categories/black-console.png')] hover:bg-[url('./images/categories/white-console.png')]",
        category: "Gaming Consoles",
      },
      {
        label: "Smart Watches",
        class: "row-span-1 col-span-1",
        img_class:
          "bg-[url('./images/categories/black-watch.png')] hover:bg-[url('./images/categories/white-watch.png')]",
        category: "Smartwatches",
      },
      {
        label: "Accessories",
        class: "row-span-1 col-span-1",
        img_class:
          "bg-[url('./images/categories/black-acc.png')] hover:bg-[url('./images/categories/white-acc.png')]",
        category: "Accessories",
      },
      {
        label: "Computers",
        class: "row-span-1 col-span-2",
        img_class:
          "bg-[url('./images/categories/black-computer.png')] hover:bg-[url('./images/categories/white-computer.png')]",
        category: "Computers",
      },
      {
        label: "Headphones",
        class: "row-span-1 col-span-1",
        img_class:
          "bg-[url('./images/categories/airpods-max-black.png')] hover:bg-[url('./images/categories/airpods-max-white.png')]",
        category: "Headphones",
      },
    ];
  }, []);

  useEffect(() => {
    setActivePage(1);
  }, []);

  return (
    <>
      <section className="categories py-4 bg-stone-50 flex-grow">
        <div className="container">
          <ul className="list grid gap-5 grid-cols-3 grid-rows-2">
            {categories.map((item, index) => (
              <li
                key={index}
                className={`item h-60 rounded-2xl flex flex-col items-center justify-end gap-2 relative overflow-hidden text-black transition-all duration-300 ease-in-out hover:scale-103 active:scale-103 ${item.class}`}
              >
                <Link
                  to={`/catalog/${item.category}`}
                  onClick={() => setCategory(item.category)}
                  className="item-inner group w-full h-full bg-[#ededed] transition-all duration-200 ease-in-out hover:bg-[rgb(53_53_53)] hover:text-stone-50"
                >
                  <div
                    className={`img block absolute content-none top-2 w-full left-0 h-[80%] bg-center bg-contain bg-no-repeat py-3 transition-all duration-300 ease ${item.img_class}`}
                  ></div>
                  <p className="label absolute bottom-2 z-1 p-0 text-2xl font-semibold block w-full text-center rounded-b-2xl rounded-bl-2xl group-hover:text-stone-50 capitalize">
                    {item.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
