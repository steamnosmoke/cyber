
import { useEffect, useRef, useState } from "react";
import useAddToCart from "hooks/cart/useAddToCart";
import changeCount from "buttons/utils/changeCount";
import BlackButton from "buttons/components/BlackButton";
import ChangeCountButtton from "buttons/components/ChangeCountButton";
import useGetCart from "hooks/cart/useGetCart";
import { useAuthStore } from "store/authStore";

export default function Button({ product }) {
  const userId = useAuthStore((state) => state.firebaseId);
  const { cart } = useGetCart(userId);
  const cartItem = cart?.find((el) => el.objectId === product.objectId);
  const currentCount = cartItem?.count ?? 0;
  const isOutOfStock = product.stock === 0;

  const addToCart = useAddToCart(userId);

  const [isAnimating, setAnimating] = useState(false);
  const [localStock, setLocalStock] = useState<number>(product.stock);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (currentCount > 0) {
    return (
      <ChangeCountButtton
        product={{ ...cartItem, count: currentCount }}
        stock={localStock}
        setStock={setLocalStock}
        color={"black"}
        isAnimating={true}
        setAnimating={setAnimating}
        timerRef={timerRef}
        className={"!px-4"}
      />
    );
  }

  return (
    <BlackButton
      onClick={() => changeCount(setAnimating, addToCart, product, timerRef)}
      twclass={`
        ${
          isOutOfStock
            ? "!cursor-not-allowed !text-stone-500 !bg-stone-100 !border-stone-300 hover:!bg-stone-100 hover:!text-stone-500 hover:!scale-100"
            : ""
        } ${isAnimating && "bg-white"}
      `}
      textclass={`
        ${isAnimating ? "!top-[-100px]" : ""}
      `}
      disabled={isOutOfStock}
    >
      {isOutOfStock ? "Out of stock" : "Add to Cart"}
    </BlackButton>
  );
}
