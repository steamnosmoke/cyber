import { usePage } from "hooks/usePage";

import Order from "./components/Order";
import { TOrder } from "types/OrderTypes";

export default function Orders() {
  const { items: orders, status } = usePage<TOrder>("orders");
  return (
    <>
      <h2 className="text-[32px] font-semibold leading-12 text-center pt-8">Order List</h2>
      <section className="orders flex flex-col flex-wrap items-start justify-between pt-5 gap-8">
        {(() => {
          switch (status) {
            case "success":
              return orders.length > 0 ? (
                orders.map((order) => <Order key={order.id} order={order} />)
              ) : (
                <h1 className="text-[48px] leading-12">No Products Found</h1>
              );

            case "pending":
              return (
                <h2 className="text-4xl text-center font-semibold mt-[10%] w-full">
                  Loading...
                </h2>
              );

            case "error":
            default:
              return (
                <h2 className="text-[48px] leading-12">Something Went Wrong</h2>
              );
          }
        })()}
      </section>
    </>
  );
}
