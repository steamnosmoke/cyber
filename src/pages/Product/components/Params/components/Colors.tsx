import { useMemo } from "react";

import { useProductStore } from "store/productsStore";

import setItem from "utils/convertToCartItem";
import colorHexs from "../config/colorHexs";
import colors from "../config/colors";

export default function Colors() {
  const product = useProductStore((state) => state.product);

  const memoizedColors = useMemo(() => colors(product), [product]);
  const memoizedColorHexs = useMemo(() => colorHexs(product), [product]);
  return (
    <div className="select_color flex gap-6 items-center">
      <p className="color_label color-[#212121] text-base font-normal leading-6">
        Select color:
      </p>
      <ul className="color_list flex justify-between gap-3">
        {memoizedColors.map((col, colIndex) => (
          <li
            className={`color_item w-8 h-8 rounded-[50%] cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 ${
              product.color === col
                ? "color_active transition-all duration-200 ease-in-out outline-2 border-2 border-white"
                : ""
            }`}
            key={colIndex}
            style={{
              background: memoizedColorHexs[colIndex],
              outlineColor: memoizedColorHexs[colIndex],
            }}
            onClick={() => setItem(product, col, product.memory)}
          ></li>
        ))}
      </ul>
    </div>
  );
}
