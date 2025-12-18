import Products from "components/Products";
import { useAuthStore } from "store/authStore";
import useGetWishlist from "hooks/wishlist/useGetWishlist";

export default function Wishlist() {
  const userId = useAuthStore((state) => state.firebaseId);
  const { wishlist, status } = useGetWishlist(userId);
  return (
    <section className="wishlist mt-4 flex-grow ">
      <div className="container min-h-[calc(100vh-120px)]">
        <h1 className="text-3xl font-medium text-center mb-6">WishList</h1>
        <Products products={wishlist} status={status} />
      </div>
    </section>
  );
}
