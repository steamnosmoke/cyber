import CartItem from "./CartItem";
import { usePage } from "hooks/usePage";
import { useCartStore } from "stores/cartStore";
import { useEffect, useMemo } from "react";
import { useMakeOrder } from "hooks/useCart";
import EmptyCart from "./EmptyCart";
import BlackButton from "buttons/BlackButton";

export default function Cart() {
  const { products, status } = usePage("cart");
  const calcNumbers = useCartStore((state) => state.calcNumbers);
  const subtotal = useCartStore((state) => state.subtotal);
  const discount = useCartStore((state) => state.discount);
  const total = useCartStore((state) => state.total);
  const count = useCartStore((state) => state.count);
  const makeOrder = useMakeOrder();

  const numbers = useMemo(
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
  }, [calcNumbers, products]);

  return (
    <section className="cart py-10 px-0 flex-grow">
      <div className="container">
        {products.length > 0 && <h1 className="mb-5">Shopping Cart</h1>}
        {products.length > 0 ? (
          <div className="flex justify-between items-start">
            {status === "success" ? (
              <>
                <section className="left flex flex-col items-start justify-center gap-10">
                  <ul className="list flex flex-col items-start justify-center gap-10">
                    {products.map((el) => (
                      <CartItem product={el} key={el.objectId} />
                    ))}
                  </ul>
                </section>
                <section className="right border-1 border-stone-300 rounded-[10px] py-14 px-16 w-134 flex flex-col items-start justify-center gap-10 sticky top-25">
                  <h2 className="text-[20px] font-bold">Order Summary</h2>
                  <ul className="numbers flex flex-col gap-4 items-start justify-center w-full">
                    {numbers.map((number, index) => (
                      <li className="item flex items-start justify-between w-full">
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
                    onClick={() => makeOrder.mutate(products)}
                    twclass={"w-full"}
                  />
                </section>
              </>
            ) : status === "pending" ? (
              <h1 className="my-75 mx-auto text-center">Loading Cart...</h1>
            ) : (
              <h1 className="my-75 mx-auto text-center">Error loading Cart</h1>
            )}
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </section>
  );
}
