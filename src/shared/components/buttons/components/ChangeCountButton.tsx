import useMinusItem from "hooks/cart/useMinusItem";
import usePlusItem from "hooks/cart/usePlusItem";
import { TCountProps } from "../types";
import changeCount from "../utils/changeCount";

export default function ChangeCountButton({
  product,
  setStock,
  stock,
  color,
  isAnimatingAdd,
  isAnimatingRemove,
  setAnimatingAdd,
  setAnimatingRemove,
  timerRef,
}: TCountProps) {
  const plusItem = usePlusItem();
  const minusItem = useMinusItem();

  const onMinus = () => {
    if (product.count === 1 && color==="black") {
      changeCount(
        setAnimatingRemove,
        setAnimatingAdd,
        minusItem,
        product,
        timerRef
      );
    }
    setStock(false);
    if (product.count === 0) {
      setStock(true);
    } else {
      minusItem(product);
    }
  };

  const onPlus = () => {
    plusItem(product);
    setStock(false);
    if (product.count === product.stock) {
      setStock(true);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${
        color === "black"
          ? "w-53 h-16 py-3.5 px-14 rounded-xl border-1 border-stone-200 shadow-[inset_0_-3px_10px_-2px_rgb(223,223,223)]"
          : "w-30 h-9"
      } `}
    >
      <div
        className={`absolute top-[50%] left-[50%] translate-[-50%] flex gap-2 items-center transition-all duration-100 ease-in-out ${
          isAnimatingAdd && !isAnimatingRemove ? "!top-[100px]" : "top-[50%]"
        }`}
      >
        <button className="text-3xl cursor-pointer" onClick={onMinus}>
          -
        </button>
        <span className="py-2 px-4 text-center text-base leading-4 rounded-[4px] border-1 border-stone-300 w-14">
          {product.count}
        </span>
        <button
          className={`text-2xl ${
            stock
              ? "text-stone-300 cursor-default"
              : "text-black cursor-pointer"
          }`}
          onClick={onPlus}
          disabled={stock}
        >
          +
        </button>
      </div>
    </div>
  );
}
