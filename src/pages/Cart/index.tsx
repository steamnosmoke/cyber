import { useEffect } from "react";

import { useAuthStore } from "store/authStore";
import useGetCart from "hooks/cart/useGetCart";

import { useCartStore } from "./store/cartStore";

import CartItem from "./components/CartItem";
import EmptyCart from "./components/EmptyCart";
import Summary from "./components/Summary";
import Loader from "./components/Loader";

export default function Cart() {
  const userId = useAuthStore((state) => state.firebaseId);
  const { cart: products, status } = useGetCart(userId);

  const calcNumbers = useCartStore((state) => state.calcNumbers);
  const count = useCartStore((state) => state.count);

  useEffect(() => {
    calcNumbers(products || []);
  }, [products]);

  return (
    <section className="cart py-4 px-0 flex-grow">
      <div className="container min-h-[calc(100vh-180px)]">
        <h1 className="mb-4 text-[32px] text-center font-medium">
          Shopping Cart
        </h1>
        {status === "success" ? (
          count ? (
            <div className="flex justify-center gap-25 items-start">
              <section className="left flex flex-col items-start justify-center gap-10">
                <ul className="list flex flex-col items-start justify-center gap-10">
                  {products.map((el) => (
                    <CartItem product={el} key={el.objectId} />
                  ))}
                </ul>
              </section>
                <Summary />
            </div>
          ) : (
            <EmptyCart />
          )
        ) : status === "error" ? (
          <h2 className="text-4xl text-center font-semibold mt-[10%]">
            Error. Repeat later
          </h2>
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}
