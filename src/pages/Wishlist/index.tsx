import { TProduct } from "types/ProductTypes";
import Products from "components/Products";
import useGetItems from "hooks/useGetItems";

export default function Wishlist() {
  const { items: products, status } = useGetItems <TProduct>("wishlist");
  return (
    <section className="wishlist mt-4 flex-grow">
      <div className="container">
        <h1 className="text-4xl font-medium">WishList</h1>
        <Products products={products} status={status} />
      </div>
    </section>
  );
}
