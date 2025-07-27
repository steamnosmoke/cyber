import { Link } from "react-router";

import { useProductsStore } from "store/productsStore";
import { TProduct } from "types/ProductTypes";
import { TOrderCardProps } from "../types";

export default function OrderCard({ product }: TOrderCardProps) {
  const setProduct = useProductsStore((state) => state.setProduct);
  const onClickCard = (product: TProduct) => {
    setProduct(product);
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to={`/catalog/${product.category}/${product.id}`}
      className="card bg-white relative py-7.5 px-6 rounded-2xl transition-all duration-200 ease-in-out shadow-[0_10px_10px_-2px_rgb(223,223,223)] flex flex-col items-center gap-5 w-75"
    >
      <section
        className="grid grid-cols-[auto] grid-rows-[auto_80px_20px] justify-center gap-10 cursor-pointer relative"
        key={product.id}
      >
        <div className="w-full h-75" onClick={() => onClickCard(product)}>
          <img className="w-55 h-9/10" src={product?.images[0]} alt="product" />
        </div>
        <h3 className="text-center text-[20px] leading-7">
          {product.name}, {product.color} <br />{" "}
          {product.memory === "1"
            ? `${product?.memory}TB`
            : `${product?.memory}GB`}
        </h3>
        <p className="price text-2xl font-semibold text-center">
          {product.count} x {product.totalPrice}$
        </p>
      </section>
    </Link>
  );
}
