import { useEffect, useRef, useState } from "react";

import useGetItems from "hooks/useGetItems";
import useAddToCart from "hooks/cart/useAddToCart";
import { TCartItem } from "types/CartTypes";

import changeCount from "buttons/utils/changeCount";

import BlackButton from "buttons/components/BlackButton";
import ChangeCountButtton from "buttons/components/ChangeCountButton";

export default function Button({ product }) {
  const { items: cart } = useGetItems<TCartItem>("cart");
  const cartItem = cart?.find((el) => el.objectId === product.objectId);
  const currentCount = cartItem?.count ?? 0;
  const isOutOfStock = product.stock === 0;

  const addToCart = useAddToCart();

  const [isAnimatingAdd, setAnimatingAdd] = useState(false);
  const [isAnimatingRemove, setAnimatingRemove] = useState(false);
  const [stock, setStock] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (currentCount === 0) {
    return (
      <BlackButton
        onClick={() =>
          changeCount(
            setAnimatingAdd,
            setAnimatingRemove,
            addToCart,
            product,
            timerRef
          )
        }
        children={isOutOfStock ? "Out of stock" : "Add to Cart"}
        twclass={`
          ${
            isOutOfStock
              ? "!cursor-not-allowed !text-stone-500 !bg-stone-100 !border-stone-300 hover:!bg-stone-100 hover:!text-stone-500 hover:!scale-100"
              : ""
          } ${isAnimatingRemove && "bg-white"}`}
        textclass={`${
          isAnimatingRemove && "!top-[-100px]"
        } ${isAnimatingAdd && isAnimatingRemove && "!top-[100px]"}`}
        disabled={isOutOfStock}
      />
    );
  }

  return (
    <ChangeCountButtton
      product={{ ...cartItem, count: currentCount }}
      stock={stock}
      setStock={setStock}
      color={"black"}
      isAnimatingAdd={isAnimatingAdd}
      isAnimatingRemove={isAnimatingRemove}
      setAnimatingAdd={setAnimatingAdd}
      setAnimatingRemove={setAnimatingRemove}
      timerRef={timerRef}
    />
  );
}
