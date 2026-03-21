
import { useMemo } from "react";

import { useSearchStore } from "../store/searchStore";
import useGetProducts from "hooks/useGetProducts";
import search from "../utils/fuse";

import SearchIcon from "../images/components/SearchIcon";
import ClearIcon from "../images/components/ClearIcon";

export default function Search() {
  const inputValue = useSearchStore((state) => state.value);
  const Searching = useSearchStore((state) => state.Searching);
  const ClearValue = useSearchStore((state) => state.ClearValue);
  const setResult = useSearchStore((state) => state.setResult);
  const setAriaOpened = useSearchStore((state) => state.setAriaOpened);

  const { products } = useGetProducts("");

  const fuse = useMemo(() => search(products), [products]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    Searching(value);

    if (value === "") {
      setResult(products);
    } else {
      const searchResults = fuse.search(value);
      setResult(searchResults.map((result) => result.item));
    }
  };

  const onSearch = () => {
    setAriaOpened(true);
    if (inputValue === "") setResult(products);
  };

  const onClear = () => {
    ClearValue();
  };

  return (
    <>
      <div className="search-wrapper relative w-100 h-11 rounded-2xl group">
        <SearchIcon />
        <input
          className={`searh-input outline-0 hover-target w-80 bg-stone-100 p-3 pl-10 rounded-2xl absolute transition-all border-1 border-transparent duration-150
          placeholder:transition-colors  
          focus:w-100 focus:border-stone-500 focus:placeholder:text-stone-700 ${
            inputValue ? "w-100" : ""
          }
          hover:w-100 hover:border-stone-500 hover:placeholder:text-stone-700`}
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => handleSearch(e)}
          onClick={() => onSearch()}
        />
        <button
          className={`search-clear-button w-5 h-5 absolute top-3.5 right-4 cursor-pointer opacity-70 hover:opacity-100 transition-all duration-150 ${
            !inputValue && "hidden"
          }`}
          onClick={() => onClear()}
        >
          <ClearIcon />
        </button>
      </div>
    </>
  );
}
