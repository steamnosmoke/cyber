import { useCallback } from "react";

import { useProductStore } from "store/productsStore";
import { useAuthStore } from "store/authStore";
import useAddToWishlist from "hooks/wishlist/useAddToWishlist";
import useGetWishlist from "hooks/wishlist/useGetWishlist";
import { Product } from "types/ProductTypes";

import Wishlist from "../../assets/images/components/Wishlist";
import WishlistAdded from "../../assets/images/components/WishlistAdded";
import AddToCarButton from "../buttons/components/AddToCarButton";
import CardByCategory from "./components/CardByCategory";

export default function Card({ product }: { product: Product }) {
  const seProduct = useProductStore((state) => state.seProduct);
  const userId = useAuthStore((state) => state.firebaseId);
  const { wishlist: products } = useGetWishlist(userId);
  const isLiked = products?.some((item) => item.objectId === product.objectId);
  const addToWishlist = useAddToWishlist(userId);

  const onClickCard = useCallback(() => {
    seProduct(product);

    window.scrollTo(0, 0);
  }, [seProduct, product]);

  return (
    <>
      <section className="card w-50 bg-red relative pt-12 px-4 pb-4 rounded-2xl shadow-[0_0_0_-5px_rgb(223,223,223)] flex flex-col items-center gap-3 transition-all duration-200 ease-in-out hover:translate-y-[-20px] hover:shadow-[0_16px_20px_-1px_rgb(223,223,223)]">
        <button
          className="add-to-wishlist cursor-pointer absolute top-4 right-4 z-50 group"
          onClick={() => addToWishlist(product)}
        >
          {isLiked ? <WishlistAdded /> : <Wishlist />}
        </button>
        <CardByCategory product={product} onClickCard={onClickCard} />
        <AddToCarButton product={product} className="px-4 mx-auto" />
      </section>
    </>
  );
}
