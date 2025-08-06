import { useSearchStore } from "../store/searchStore";

import SearchIcon from "./SearchIcon";
import ClearIcon from "./ClearIcon";

export default function Search() {
  const inputValue = useSearchStore((state) => state.value);
  const Searching = useSearchStore((state) => state.Searching);
  const ClearValue = useSearchStore((state) => state.ClearValue);

  return (
    <>
      <div className="search-wrapper relative w-100 h-14 rounded-2xl group">
        <SearchIcon />
        <input
          className={`searh-input hover-target w-80 bg-stone-100 p-4 pl-12 rounded-2xl absolute transition-all placeholder:transition-colors border-1 border-transparent duration-150 focus:w-100 focus:border-stone-500 hover:w-100 hover:border-stone-500 hover:placeholder:text-stone-700 focus:placeholder:text-stone-700 ${inputValue ? "w-100" : ""}`}
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => Searching(e.target.value)}
        />
        <button
          className={`search-clear-button w-6 h-6 absolute top-4 right-4 cursor-pointer opacity-70 hover:opacity-100 transition-all duration-150 ${
            !inputValue && "hidden"
          }`}
          onClick={() => ClearValue()}
        >
          <ClearIcon />
        </button>
      </div>
    </>
  );
}
