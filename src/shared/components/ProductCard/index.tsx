import { useCallback} from "react";
import { Link } from "react-router";

import { useProductStore } from "store/productsStore";
import useGetItems from "hooks/useGetItems";
import useAddToCart from "hooks/cart/useAddToCart";
import useAddToWishlist from "hooks/wishlist/addToWishlist";
import { TProduct } from "types/ProductTypes";
import { TCartItem } from "types/CartTypes";

import Wishlist from "./images/components/Wishlist";
import WishlistAdded from "./images/components/WishlistAdded";
import BlackButton from "buttons/components/BlackButton";

export default function Card({ product }: { product: TProduct }) {
  const setProduct = useProductStore((state) => state.setProduct);
  const addToCart = useAddToCart();

  const { items: products } = useGetItems<TProduct>("wishlist");
  const isLiked = products?.some((item) => item.objectId === product.objectId);
  const addToWishlist = useAddToWishlist();

  const onClickCard = useCallback(() => {
    setProduct(product);

    window.scrollTo(0, 0);
  }, [setProduct, product]);

  const { items: cart } = useGetItems<TCartItem>("cart");
  const cartItem = cart?.find((el) => el.objectId === product.objectId);
  const currentCount = cartItem?.count ?? 0;
  const isOutOfStock = product.stock <= currentCount;

  return (
    <>
      <section className="card w-75 bg-white relative pt-18 px-7.5 pb-6 rounded-2xl shadow-[0_0_0_-5px_rgb(223,223,223)] flex flex-col items-center gap-5 transition-all duration-200 ease-in-out hover:translate-y-[-24px] hover:shadow-[0_20px_24px_-1px_rgb(223,223,223)]">
        <button
          className="add-to-wishlist cursor-pointer absolute top-4 right-4 z-100 group"
          onClick={() => addToWishlist(product)}
        >
          {isLiked ? <WishlistAdded /> : <Wishlist />}
        </button>
        <Link
          to={`/catalog/${product.category}/${product.name} ${product.color} ${
            product.memory
          }${Number(product.memory) === 1 ? "TB" : "GB"}`
            .split(" ")
            .join("_")}
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
            {product.name}, {product.color} <br />{" "}
            {Number(product.memory) === 1
              ? `${product.memory}TB`
              : `${product.memory}GB`}
          </h3>
          <p className="text-2xl font-semibold text-center">
            {product.price - product.discount}$
          </p>
        </Link>
        <BlackButton
          onClick={() => addToCart(product)}
          children={isOutOfStock ? "Out of stock" : "Add to Cart"}
          twclass={
            isOutOfStock
              ? "!cursor-not-allowed !text-stone-500 !bg-stone-100 !border-stone-300 hover:!bg-stone-100 hover:!text-stone-500 hover:!scale-100"
              : ""
          }
          disabled={isOutOfStock}
        />
      </section>
    </>
  );
}
