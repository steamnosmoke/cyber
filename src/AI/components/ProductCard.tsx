import { Link } from "react-router";
import { useGeProductById } from "../hooks/useGeProductById";
import getParams from "components/ProductCard/config/params";
import getLink from "components/ProductCard/utils/getLink";
import { useCallback } from "react";
import { useProductStore } from "store/productsStore";

interface Props {
  objectId: string;
}

export default function ProductCard({ objectId }: Props) {
  const { product } = useGeProductById(objectId);
  const seProduct = useProductStore((state) => state.seProduct);

  const onClickCard = useCallback(() => {
    seProduct(product);

    window.scrollTo(0, 0);
  }, [seProduct, product]);

  if (!product) {
    return null;
  }

  const link = getLink(product);
  const param = getParams(product);

  return (
    <Link
      to={link}
      onClick={() => onClickCard()}
      className="grid grid-cols-1 grid-rows-[auto_80px_20px] items-center gap-2 cursor-pointer relative py-4"
    >
      <div className=" ">
        <img
          className="w-30 h-[90%] mx-auto"
          src={product.images[0]}
          alt={product.name}
        />
      </div>
      <h3 className="text-center text-[18px] leading-7">
        {product.name} <br />
        {product.color}, {param}
      </h3>
      <p className="text-[18px] text-center">
        from{" "}
        <span className=" font-semibold">
          {product.discount ? product.price - product.discount : product.price}$
        </span>
      </p>
    </Link>
  );
}
