import { useMemo } from "react";

import { useProductStore } from "store/productsStore";

import setItem from "utils/cart/convertToCartItem";

import colorHexs from "../config/colorHexs";
import colors from "../config/colors";

export default function Colors() {
  const product = useProductStore((state) => state.product);

  const memoizedColors = useMemo(() => colors(product), [product]);
  const memoizedColorHexs = useMemo(() => colorHexs(product), [product]);

  const onChangeColor = (col: string, memory: string) => {
    setItem(product, col, memory);
    
  };
  return (
    <div className="select_color flex gap-6 items-center">
      <p className="color_label color-[#212121] text-base font-normal leading-6">
        Select color:
      </p>
      <ul className="color_list flex justify-between gap-4">
        {memoizedColors.map((col, colIndex) => (
          <li
            key={colIndex}
            onClick={() => onChangeColor(col, product.memory)}
            style={
              {
                backgroundColor: memoizedColorHexs[colIndex],
                "--ring-color": memoizedColorHexs[colIndex],
              } as React.CSSProperties
            }
            className={`
    w-7 h-7 rounded-full cursor-pointer
    transition-all duration-200 ease-in-out
    ring-2 ring-offset-3

    border border-black/10
    shadow-[inset_0_1px_2px_rgba(0,0,0,0.7),_0_1px_2px_rgba(0,0,0,0.12)]

    ${
      product.color === col
        ? " ring-stone-700 scale-110"
        : "ring-white hover:ring-stone-400 "
    }
  `}
          ></li>
        ))}
      </ul>
    </div>
  );
}
