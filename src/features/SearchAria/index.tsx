import { useState } from "react";

import { useSearchStore } from "features/Header/store/searchStore";

import SearchCard from "./components/SearchCard";

export default function SearchAria() {
  const products = useSearchStore((state) => state.result);
  const setAriaOpened = useSearchStore((state) => state.setAriaOpened);
  const ariaOpened = useSearchStore((state) => state.ariaOpened);

  const [closing, setClosing] = useState(false);

  const onClose = () => {
    setClosing(true);
    setTimeout(() => {
      setAriaOpened(false);
    }, 300);
  };
  return (
    <>
      <section
        className={`z-10000 search-wrapper fixed left-[50%] transform-[translateX(-50%)] max-w-400 w-full max-h-150 h-full p-10 bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in ${
          ariaOpened && "aria-open top-23"
        } ${closing && "aria-close "}
        `}
      >
        {products.length > 0 ? (
          <ul className="grid grid-cols-4 gap-3 search-list max-h-130 overflow-y-auto">
            {products.map((el) => (
              <SearchCard product={el} key={el.objectId} />
            ))}
          </ul>
        ) : (
          <h1 className="text-black text-3xl font-semibold text-center mt-56">
            No products found
          </h1>
        )}
      </section>
      <div
        className="z-100 overlay fixed inset-0 w-full h-full"
        onClick={onClose}
      ></div>
    </>
  );
}
