import { useAuthStore } from "store/authStore";

import Order from "./components/Order";
import useGetOrders from "./hooks/useGetOrders";
import BlackButton from "buttons/components/BlackButton";
import { useNavigate } from "react-router";

export default function Orders() {
  const userId = useAuthStore((state) => state.firebaseId);
  const { data: items, status } = useGetOrders(userId);
  const orders = items ? items.slice().reverse() : [];
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-2xl font-medium leading-12 text-center pt-8">
        Order List
      </h2>
      <section className="orders flex flex-col flex-wrap items-start justify-between pt-5 gap-8">
        {(() => {
          switch (status) {
            case "success":
              return orders.length > 0 ? (
                orders.map((order) => <Order key={order.id} order={order} />)
              ) : (
                <div className="flex flex-col items-center justify-center gap-8 w-full">
                  <h3 className="text-3xl text-center">
                    No Orders Found
                  </h3>
                  <BlackButton children={"+ Make Order"} onClick={()=>navigate("/")}/>
                </div>
              );

            case "pending":
              return (
                <h3 className="text-3xl text-center w-full">Loading...</h3>
              );

            case "error":
            default:
              return (
                <h3 className="text-3xl text-center w-full">
                  Something Went Wrong
                </h3>
              );
          }
        })()}
      </section>
    </>
  );
}
