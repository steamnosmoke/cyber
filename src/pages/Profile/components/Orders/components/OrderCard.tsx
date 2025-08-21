import { Link } from "react-router";

import { useProductStore } from "store/productsStore";
import { TProduct } from "types/ProductTypes";
import { TOrderCardProps } from "../types";

export default function OrderCard({ product }: TOrderCardProps) {
  const setProduct = useProductStore((state) => state.setProduct);
  const onClickCard = (product: TProduct) => {
    setProduct(product);
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to={`/catalog/${product.category}/${product.id}`}
      className="card bg-white relative py-3 px-3 rounded-2xl transition-all duration-200 ease-in-out shadow-[0_10px_10px_-2px_rgb(223,223,223)] flex flex-col items-center gap-5 w-40 h-fit"
    >
      <section
        className="grid grid-cols-[auto] grid-rows-[auto_80px_20px] justify-center gap-2 cursor-pointer relative"
        key={product.id}
      >
        <div className="w-8/10 mx-auto" onClick={() => onClickCard(product)}>
          <img
            className=" mx-auto"
            src={product?.images[0]}
            alt={product.name}
          />
        </div>
        <h3 className="text-center text-base leading-7">
          {product.name}, <br /> {product.color}, <br />
          {Number(product.memory) === 1
            ? `${product?.memory}TB`
            : `${product?.memory}GB`}
        </h3>
        <p className="price text-base font-semibold text-center">
          {product.count} x ${product.totalPrice}
        </p>
      </section>
    </Link>
  );
}
