import { Link } from "react-router";

import { useMinusItem, usePlusItem, useRemoveFromCart } from "../hooks/useCart";
import { TProps } from "../types";

export default function CartItem({ product }: TProps) {
  const plusItem = usePlusItem();
  const minusItem = useMinusItem();
  const removeItem = useRemoveFromCart();
  return (
    <section className="cartItem w-134 h-35 pt-4 px-2 pb-8 border-b-1 border-b-stone-400">
      <div className="flex justify-between items-center">
        <Link to={`/catalog/${product.category}/${product.productId}`}>
          <section className="flex justify-between items-center">
            <img src={product.images[0]} alt="" className="w-22.5 mr-4" />
            <h3 className="text-[20px] leading-7">
              {product.name},<br />
              {product.color},<br />
              {Number(product.memory) === 1 ? `1TB` : `${product.memory}GB`}
            </h3>
          </section>
        </Link>
        <section className="flex justify-between items-center gap-6">
          <div className="flex gap-2 items-center">
            <button
              className="text-2xl cursor-pointer"
              onClick={() => minusItem.mutate(product)}
            >
              -
            </button>
            <span className="py-2 px-4 text-center text-base leading-4 rounded-[4px] border-1 border-stone-300 w-14">
              {product.count}
            </span>
            <button
              className="text-2xl  cursor-pointer"
              onClick={() => plusItem.mutate(product)}
            >
              +
            </button>
          </div>
          <p className="price text-base leading-4 w-14 text-center">
            ${product.total}
          </p>
          <button
            className="remove text-base leading-4  cursor-pointer"
            onClick={() => removeItem.mutate(product)}
          >
            X
          </button>
        </section>
      </div>
    </section>
  );
}
