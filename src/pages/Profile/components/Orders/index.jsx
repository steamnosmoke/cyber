import Order from "./Order";
import { usePage } from "hooks/usePage";
import MyLoader from "components/Products/Loader";

export default function Orders() {
  const { products, status } = usePage("orders");

  return (
    <section className="orders flex flex-col items-start justify-center border-t-1 border-t-stone-300 pt-5">
      <h2 className="text-[32px] leading-12">Orders List</h2>
      {(() => {
        switch (status) {
          case "success":
            return products.length > 0 ? (
              products.map((order) => <Order key={order.id} order={order} />)
            ) : (
              <h1 className="text-[48px] leading-12">No Products Found</h1>
            );

          case "pending":
            return Array.from({ length: 4 }).map((_, i) => (
              <MyLoader key={i} />
            ));

          case "error":
          default:
            return (
              <h2 className="text-[48px] leading-12">Something Went Wrong</h2>
            );
        }
      })()}
    </section>
  );
}
