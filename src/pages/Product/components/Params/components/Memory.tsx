import { useMemo } from "react";
import { useNavigate } from "react-router";

import { useProductStore } from "store/productsStore";

import setItem from "utils/cart/convertToCartItem";
import getLink from "utils/getLink";

import memories from "../config/memories";

export default function Memory() {
  const product = useProductStore((state) => state.product);

  const memoizedMemories = useMemo(() => memories(product), [product]);

  const navigate = useNavigate();

  const onChangeMemory = (mem: string) => {
    const item = setItem(product, product.color, mem);

    navigate(getLink(item), {
      replace: true,
    });
  };

  return (
    <ul className="memory_list flex items-center justify-start gap-4 w-full">
      {memoizedMemories.map((mem, memIndex) => (
        <li
          className={`memory_item min-w-24 py-3 px-4 text-[14px] leading-4 text-center  border-1  rounded-[8px] transition-all duration-200 cursor-pointer hover:border-black hover:text-black ${
            product.memory === mem
              ? "memory_active border-black text-black"
              : "border-gray-400 text-gray-400"
          }`}
          key={memIndex}
          onClick={() => onChangeMemory(mem)}
        >
          {mem}
          {Number(mem) > 2 ? "GB" : "TB"}
        </li>
      ))}
    </ul>
  );
}
