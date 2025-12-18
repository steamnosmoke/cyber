
import { useEffect, useRef, useState } from "react";

import { useAuthStore } from "store/authStore";
import useGetCart from "hooks/cart/useGetCart";
import useAddToCart from "hooks/cart/useAddToCart";
import { TProduct } from "types/ProductTypes";
import convertToCartItem from "utils/convertToCartItem";

import changeCount from "buttons/utils/changeCount";
import BlackButton from "buttons/components/BlackButton";
import ChangeCountButton from "buttons/components/ChangeCountButton";

export default function AddToCartButton({
  product,
  className,
}: {
  product: TProduct;
  className?: string;
}) {
  const userId = useAuthStore((state) => state.firebaseId);
  const { cart } = useGetCart(userId);
  const cartItem = cart?.find((el) => el.objectId === product.objectId);

  const currentItem = cartItem ? cartItem : convertToCartItem(product);
  const currentCount = cartItem?.count ?? 0;
  const isOutOfStock = product.stock === 0;

  const addToCart = useAddToCart(userId);
  const [isAnimating, setAnimating] = useState(false);
  const [localStock, setLocalStock] = useState<number>(product.stock);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timeout = timerRef.current;
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const shouldShowCounter = currentCount > 0;

  const handleAddToCart = () => {
    if (isOutOfStock || localStock <= 0) return;

    changeCount(setAnimating, addToCart, currentItem, timerRef);
    setLocalStock((prev) => Math.max(0, prev - 1));
  };

  const handleRemoveLastItem = () => {
    setAnimating(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="relative w-full h-12">
      <div
        className={`absolute w-full transition-all duration-300 ease-in-out ${
          shouldShowCounter
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <BlackButton
          onClick={handleAddToCart}
          twclass={`w-full !p-0 ${
            isOutOfStock
              ? "!cursor-not-allowed !text-stone-500 !bg-stone-100 !border-stone-300 hover:!bg-stone-100 hover:!text-stone-500 hover:!scale-100"
              : ""
          }`}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Out of stock" : "Add to Cart"}
        </BlackButton>
      </div>

      <div
        className={`absolute w-full transition-all duration-300 ease-in-out ${
          shouldShowCounter
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ChangeCountButton
          product={{ ...currentItem, count: currentCount }}
          stock={localStock}
          setStock={setLocalStock}
          color="black"
          isAnimating={isAnimating}
          setAnimating={handleRemoveLastItem}
          timerRef={timerRef}
          className={className}
        />
      </div>
    </div>
  );
}
