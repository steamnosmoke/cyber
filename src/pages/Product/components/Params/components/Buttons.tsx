import useGetWishlist from "hooks/wishlist/useGetWishlist";
import useAddToWishlist from "hooks/wishlist/useAddToWishlist";

import { useProductStore } from "store/productsStore";
import { useAuthStore } from "store/authStore";

import WishlistAdded from "images/components/WishlistAdded";
import Wishlist from "images/components/Wishlist";
import AddToCartButton from "buttons/components/AddToCartButton";

export default function Buttons() {
  const userId = useAuthStore((state) => state.firebaseId);
  const { wishlist } = useGetWishlist(userId);
  const product = useProductStore((state) => state.product);
  const addToWishlist = useAddToWishlist(userId);

  const isLiked = wishlist?.some((item) => item.objectId === product.objectId);

  return (
    <div className="buttons flex items-center justify-around w-full gap-20 mb-4">
      <AddToCartButton
        product={product}
        className="!w-[452px]"
      />
      <button
        className="add-to-wishlist cursor-pointer group"
        onClick={() => addToWishlist(product)}
      >
        {isLiked ? (
          <WishlistAdded cl=" w-[62px] h-[62px] bg-red-50 border-1 border-red-200 p-4 rounded-2xl transition-all duration-200 group-hover:scale-95" />
        ) : (
          <Wishlist cl=" w-[62px] h-[62px] border-1 border-black p-4 rounded-2xl transition-all duration-200  group-hover:scale-95 group-hover:border-red-200" />
        )}
      </button>
    </div>
  );
}
