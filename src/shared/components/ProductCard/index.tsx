import { useCallback } from "react";
import { Link } from "react-router";

import { useProductStore } from "store/productsStore";
import useGetItems from "hooks/useGetItems";
import useAddToWishlist from "hooks/wishlist/addToWishlist";
import { TProduct } from "types/ProductTypes";

import Wishlist from "./images/components/Wishlist";
import WishlistAdded from "./images/components/WishlistAdded";
import Button from "./components/Button";
import CardByCategory from "./components/CardByCategory";

export default function Card({ product }: { product: TProduct }) {
  const setProduct = useProductStore((state) => state.setProduct);

  const { items: products } = useGetItems<TProduct>("wishlist");
  const isLiked = products?.some((item) => item.objectId === product.objectId);
  const addToWishlist = useAddToWishlist();

  const onClickCard = useCallback(() => {
    setProduct(product);

    window.scrollTo(0, 0);
  }, [setProduct, product]);

  return (
    <>
      <section className="card w-75 bg-white relative pt-18 px-7.5 pb-6 rounded-2xl shadow-[0_0_0_-5px_rgb(223,223,223)] flex flex-col items-center gap-5 transition-all duration-200 ease-in-out hover:translate-y-[-24px] hover:shadow-[0_20px_24px_-1px_rgb(223,223,223)]">
        <button
          className="add-to-wishlist cursor-pointer absolute top-4 right-4 z-100 group"
          onClick={() => addToWishlist(product)}
        >
          {isLiked ? <WishlistAdded /> : <Wishlist />}
        </button>
        <CardByCategory product={product} onClickCard={onClickCard} />
        <Button product={product} />
      </section>
    </>
  );
}
