import { Link } from "react-router";
import getLink from "../utils/getLink";
import getParams from "../config/params";
import { TCategoryprops } from "../types";

export default function CardByCategory({
  product,
  onClickCard,
}: TCategoryprops) {
  const link = getLink(product);
  const param = getParams(product);

  return (
    <Link
      to={link}
      onClick={() => onClickCard()}
      className="grid grid-cols-1 grid-rows-[auto_80px_20px] items-center gap-10 cursor-pointer relative"
    >
      <div className="w-full h-75">
        <img
          className="w-55 h-[90%] mx-auto"
          src={product.images[0]}
          alt={product.name}
        />
      </div>
      <h3 className="text-center text-xl">
        {product.name}, {product.color} <br /> {param}
      </h3>
      <p className="text-2xl font-semibold text-center">
        {product.discount ? product.price - product.discount : product.price}$
      </p>
    </Link>
  );
}
