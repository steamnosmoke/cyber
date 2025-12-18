import { useState } from "react";
import { Link } from "react-router";

import { TProps } from "../types";
import useRemoveItem from "../hooks/useRemoveItem";
import ChangeCountButton from "buttons/components/ChangeCountButton";

export default function CartItem({ product }: TProps) {
  const [stock, setStock] = useState(product.stock);

  const removeItem = useRemoveItem();
  return (
    <section className="cartItem w-full min-h-35 h-full py-4 px-12  border-2 border-stone-200 rounded-3xl ">
      <div className="flex justify-between items-center">
        <Link to={`/catalog/${product.category}/${product.productId}`}>
          <section className="flex justify-between items-center">
            <img src={product.images[0]} alt="" className="w-20 mr-4" />
            <h3 className="text-lg leading-7">
              {product.name} {product.color},<br />
              {Number(product.memory) === 1 ? `1TB` : `${product.memory}GB`}
            </h3>
          </section>
        </Link>
        <section className="flex justify-between items-center gap-6 pt-2">
          <ChangeCountButton
            product={product}
            stock={stock}
            setStock={setStock}
            color="white"
            isAnimating={true}
            setAnimating={() => {}}
            timerRef={{ current: null }}
          />

          <p className="price font-medium leading-4 w-14 text-center">
            ${product.total}
          </p>
          <button
            className="remove text-2xl font-light leading-4 cursor-pointer hover:text-gray-500 transition-colors rotate-45"
            onClick={() => removeItem(product)}
          >
            +
          </button>
        </section>
      </div>
    </section>
  );
}
