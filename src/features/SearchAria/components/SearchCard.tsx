
import { useCallback } from "react";
import { Link } from "react-router";

import { useProductStore } from "store/productsStore";
import { TProduct } from "types/ProductTypes";

import { useSearchStore } from "../../Header/store/searchStore";

export default function SearchCard({ product }: { product: TProduct }) {
  const setProduct = useProductStore((state) => state.setProduct);
  const setAriaOpened = useSearchStore((state) => state.setAriaOpened);
  const onClickCard = useCallback(() => {
    setProduct(product);
    setAriaOpened(false);
    window.scrollTo(0, 0);
  }, [setProduct, product]);
  return (
    <li className="card w-80 h-35 rounded-xl transition-all duration-200 ease-in hover:translate-y-[-10px] hover:shadow-[0_6px_12px_-1px_rgb(223,223,223)]">
      <Link
        to={`/catalog/${product.category}/${product.name} ${product.color} ${
          product.memory
        }${Number(product.memory) === 1 ? "TB" : "GB"}`
          .split(" ")
          .join("_")}
        onClick={() => onClickCard()}
        className="flex gap-4 p-3"
      >
        <img src={product.images[0]} alt={product.name} className="w-25" />
        <div className="text">
          <p className="text-black">{product.name},</p>
          <p className="text-black">{product.color},</p>
          <p className="text-black">
            {product.memory}
            {Number(product.memory) === 1 ? "TB" : "GB"}
          </p>
        </div>
      </Link>
    </li>
  );
}
