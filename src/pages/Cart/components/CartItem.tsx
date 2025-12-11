import { useState } from "react";
import { Link } from "react-router";

import { TProps } from "../types";
import useRemoveItem from "../hooks/useRemoveItem";
import ChangeCountButton from "buttons/components/ChangeCountButton";

export default function CartItem({ product }: TProps) {
  const [stock, setStock] = useState(product.stock);

  const removeItem = useRemoveItem();
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
          <ChangeCountButton
            product={product}
            stock={stock}
            setStock={setStock}
            color="white"
            isAnimating={true}
            setAnimating={() => {}}
            timerRef={{ current: null }}
          />

          <p className="price text-base leading-4 w-14 text-center">
            ${product.total}
          </p>
          <button
            className="remove text-base leading-4  cursor-pointer"
            onClick={() => removeItem(product)}
          >
            X
          </button>
        </section>
      </div>
    </section>
  );
}
