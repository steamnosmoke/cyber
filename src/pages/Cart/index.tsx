import { useEffect, useMemo } from "react";

import useGetItems from "hooks/useGetItems";
import useMakeOrder from "hooks/useMakeOrder";
import { TCartItem } from "types/CartTypes";
import { useCartStore } from "./store/cartStore";
import { TNum } from "./types";

import BlackButton from "buttons/components/BlackButton";
import CartItem from "./components/CartItem";
import EmptyCart from "./components/EmptyCart";

export default function Cart() {
  const { items: products, status } = useGetItems <TCartItem>("cart");
  const calcNumbers = useCartStore((state) => state.calcNumbers);
  const subtotal = useCartStore((state) => state.subtotal);
  const discount = useCartStore((state) => state.discount);
  const total = useCartStore((state) => state.total);
  const count = useCartStore((state) => state.count);

  const {mutate: makeOrder} = useMakeOrder();

  const numbers = useMemo<TNum[]>(
    () => [
      { label: "Subtotal", value: `$${subtotal}` },
      { label: "Estimated Tax", value: `$50` },
      { label: "Estimated shipping & Handling", value: `$29` },
      { label: "Discount", value: `$${discount}` },
      { label: "Total", value: `$${total + 79}` },
      { label: "Number of products", value: `${count} units` },
    ],
    [subtotal, discount, total, count]
  );

  useEffect(() => {
    calcNumbers(products);
  }, [calcNumbers, products, numbers]);

  return (
    <section className="cart py-4 px-0 flex-grow">
      <div className="container">
        <h1 className="mb-4 text-[32px] text-center font-medium">Shopping Cart</h1>
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
                <section className="right border-1 border-stone-300 rounded-[10px] py-14 px-16 w-134 flex flex-col items-start justify-center gap-10 sticky top-40">
                  <h2 className="text-[20px] font-bold">Order Summary</h2>
                  <ul className="numbers flex flex-col gap-4 items-start justify-center w-full">
                    {numbers.map((number, index) => (
                      <li
                        key={index}
                        className="item flex items-start justify-between w-full"
                      >
                        <p
                          className="font-medium leading-6"
                          style={{ letterSpacing: "3%" }}
                        >
                          {number.label}
                        </p>
                        <p
                          className="number text-base font-medium leading-8"
                          style={{ letterSpacing: "3%" }}
                        >
                          {number.value}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <BlackButton
                    children={"Checkout"}
                    onClick={() => makeOrder(products)}
                    twclass={"w-full"}
                  />
                </section>
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
