import { useCallback } from "react";
import { Link } from "react-router";

import { useProductsStore } from "store/productsStore";
import { usePage } from "hooks/usePage";
import { useAddToCart } from "hooks/useCart";
import { useToggleProduct } from "hooks/useWihlist";
import { TProduct } from "@/src/app/types/ProductTypes";

import Wishlist from "./components/Wishlist";
import WishlistAdded from "./components/WishlistAdded";
import BlackButton from "buttons/components/BlackButton";
import { TCartItem } from "@/src/app/types/CartTypes";

export default function Card({ product }: { product: TProduct }) {
  const setProduct = useProductsStore((state) => state.setProduct);
  const addToWishlist = useToggleProduct();
  const addToCart = useAddToCart();
  const { items: products } = usePage<TProduct>("wishlist");
  const isLiked = products?.some(
    (item) =>
      item.productId === product.productId &&
      item.objectId === product.objectId &&
      item.variantId === product.variantId
  );

  const onClickCard = useCallback(() => {
    setProduct(product);

    window.scrollTo(0, 0);
  }, [setProduct, product]);

  const onAddToCart = useCallback(
    (product: TProduct) => {
      const item: TCartItem = {
        ...product,
        count: 1,
        totalDiscount: product.discount,
        totalPrice: product.price - product.discount,
        total: product.price - product.discount,
        subTotal: product.price,
      };
      addToCart.mutate(item);
    },
    [addToCart, product]
  );

  return (
    <>
      <section className="card w-75 bg-white relative pt-18 px-7.5 pb-6 rounded-2xl shadow-[0_0_0_-5px_rgb(223,223,223)] flex flex-col items-center gap-5 transition-all duration-200 ease-in-out hover:translate-y-[-24px] hover:shadow-[0_20px_24px_-1px_rgb(223,223,223)]">
        <button
          className="add-to-wishlist cursor-pointer absolute top-4 right-4 z-100 group"
          onClick={() => addToWishlist.mutate(product)}
        >
          {isLiked ? <WishlistAdded /> : <Wishlist />}
        </button>
        <Link
          to={`/catalog/${product.category}/${product.name} ${product.color} ${
            product.memory
          }${Number(product.memory) === 1 ? "TB" : "GB"}`
            .split(" ")
            .join("_")}
          className="grid grid-cols-1 grid-rows-[auto_80px_20px] items-center gap-10 cursor-pointer relative"
        >
          <div className="w-full h-75" onClick={() => onClickCard()}>
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
          onClick={() => onAddToCart({ ...product })}
          children={"Add to cart"}
        />
      </section>
    </>
  );
}
