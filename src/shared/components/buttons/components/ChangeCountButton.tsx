import useMinusItem from "hooks/cart/useMinusItem";
import usePlusItem from "hooks/cart/usePlusItem";

import { TAddToCartProps } from "../types";

export default function ChangeCountButton({
  product,
  setStock,
  stock,
  color,
  setAnimating,
  className,
}: TAddToCartProps) {
  const plusItem = usePlusItem();
  const minusItem = useMinusItem();

  const onMinus = () => {
    minusItem(product);

    if (product.count === 1 && color === "black" && setAnimating) {
      setAnimating(true);
    }

    setStock((prev) => prev + 1);
  };

  const onPlus = () => {
    if (stock <= 0) return;

    plusItem(product);
    setStock((prev) => Math.max(0, prev - 1));
  };

  const blackButtonStyle = `relative w-53 h-16 py-4 ${className} border border-black rounded-xl bg-white transition-all duration-200 ease-in-out hover:scale-110 overflow-hidden`;

  return (
    <div className={color === "black" ? blackButtonStyle : "w-32 h-9"}>
      <div
        className={`flex items-center justify-between h-full ${
          color === "black" ? "gap-2" : "gap-1"
        }`}
      >
        <button
          className={`${
            color === "black" ? "text-2xl px-3 py-1" : "text-lg px-2"
          } cursor-pointer select-none text-black hover:text-gray-700 transition-colors`}
          onClick={onMinus}
        >
          −
        </button>

        <span
          className={`${
            color === "black" ? "px-4 text-base font-medium" : "px-2 text-sm"
          } py-1 text-center leading-4 min-w-[40px] select-none text-black`}
        >
          {product.count}
        </span>

        <button
          className={`${
            color === "black" ? "text-2xl px-3 py-1" : "text-lg px-2"
          } select-none transition-colors ${
            stock <= 0
              ? "text-stone-300 cursor-default"
              : "text-black cursor-pointer hover:text-gray-700"
          }`}
          onClick={onPlus}
          disabled={stock <= 0}
        >
          +
        </button>
      </div>
    </div>
  );
}
