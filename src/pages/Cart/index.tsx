import { useEffect } from "react";

import useGetItems from "hooks/useGetItems";
import { TCartItem } from "types/CartTypes";
import { useCartStore } from "./store/cartStore";

import CartItem from "./components/CartItem";
import EmptyCart from "./components/EmptyCart";
import Summary from "./components/Summary";

export default function Cart() {
  const { items: products, status } = useGetItems<TCartItem>("cart");
  const calcNumbers = useCartStore((state) => state.calcNumbers);
  const count = useCartStore((state) => state.count);

  useEffect(() => {
    calcNumbers(products);
  }, [calcNumbers, products]);

  return (
    <section className="cart py-4 px-0 flex-grow">
      <div className="container">
        <h1 className="mb-4 text-[32px] text-center font-medium">
          Shopping Cart
        </h1>
        {status === "success" ? (
          count ? (
            <div className="flex justify-center gap-25 items-start">
              <>
                <section className="left flex flex-col items-start justify-center gap-10">
                  <ul className="list flex flex-col items-start justify-center gap-10">
                    {products.map((el) => (
                      <CartItem product={el} key={el.objectId} />
                    ))}
                  </ul>
                </section>
                <Summary />
              </>
            </div>
          ) : (
            <EmptyCart />
          )
        ) : status === "pending" ? (
          <h2 className="text-4xl text-center font-semibold mt-[10%]">
            Loading...
          </h2>
        ) : (
          <h2 className="text-4xl text-center font-semibold mt-[10%]">
            Error. Repeat later
          </h2>
        )}
      </div>
    </section>
  );
}
