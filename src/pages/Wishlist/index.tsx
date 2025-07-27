import { TProduct } from "@/src/app/types/ProductTypes";
import Products from "components/Products";
import { usePage } from "hooks/usePage";

export default function Wishlist() {
  const { items: products, status } = usePage<TProduct>("wishlist");
  return (
    <section className="wishlist mt-4 flex-grow">
      <div className="container">
        <h1 className="text-4xl font-medium">WishList</h1>
        <Products products={products} status={status} />
      </div>
    </section>
  );
}
