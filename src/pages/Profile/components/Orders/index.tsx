import { useAuthStore } from "store/authStore";

import Order from "./components/Order";
import useGetOrders from "./hooks/useGetOrders";

export default function Orders() {
  const userId = useAuthStore((state) => state.firebaseId);
  const { data: items, status } = useGetOrders(userId);
  const orders = items ? items.slice().reverse() : [];
  return (
    <>
      <h2 className="text-3xl font-medium leading-12 text-center pt-8">
        Order List
      </h2>
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
