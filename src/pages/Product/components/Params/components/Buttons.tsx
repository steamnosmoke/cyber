import useGetItems from "hooks/useGetItems";
import useAddToCart from "hooks/cart/useAddToCart";
import useAddToWishlist from "hooks/wishlist/addToWishlist";

import { useProductStore } from "store/productsStore";

import { TProduct } from "types/ProductTypes";
import { TCartItem } from "types/CartTypes";


import BlackLineButton from "buttons/components/BlackLineButton";
export default function Buttons() {
  const { items: wishlist } = useGetItems<TProduct>("wishlist");
  const { items: cart } = useGetItems<TCartItem>("cart");
  const product = useProductStore((state) => state.product);
  const cartItem = cart.find((el) => el.objectId === product.objectId);
  const currentCount = cartItem?.count ?? 0;
  const isOutOfStock = currentCount >= product.stock || product.stock === 0;
  const addToWishlist = useAddToWishlist();
  const addToCart = useAddToCart();
  return (
    <div className="buttons flex items-center justify-between w-full ">
      <BlackLineButton
        onClick={() => addToWishlist(product)}
        children={
          wishlist.some((el) => el.objectId === product.objectId)
            ? "Remove from Wishlist"
            : "Add to Wishlist"
        }
        twclass={"py-4 !px-6 !min-w-61"}
      />
      <BlackLineButton
        onClick={() => addToCart(product)}
        children={isOutOfStock ? "Out of stock" : "Add to Cart"}
        twclass={
          isOutOfStock
            ? "!cursor-not-allowed !text-stone-500 !border-stone-500 hover:!bg-transparent hover:!text-stone-500 hover:!scale-100"
            : "!py-4 !px-18"
        }
        disabled={isOutOfStock}
      />
    </div>
  );
}
