import { useMemo } from "react";
import { useNavigate } from "react-router";

import useMakeOrder from "hooks/useMakeOrder";
import useGetItems from "hooks/useGetItems";
import { TCartItem } from "types/CartTypes";

import useClearCart from "../hooks/useClearCart";
import useUpdateStock from "../hooks/useUpdateStock";
import getNumbers from "../config/numbers";
import { useCartStore } from "../store/cartStore";

import BlackButton from "buttons/components/BlackButton";

export default function Summary() {
  const navigate = useNavigate();
  const { items: products } = useGetItems<TCartItem>("cart");

  const { mutate: makeOrder } = useMakeOrder();
  const { mutate: clearCart } = useClearCart();
  const { mutate: updateStock } = useUpdateStock();

  const count = useCartStore((state) => state.count);

  const onMakeOrder = () => {
    updateStock(products);
    clearCart();
    makeOrder(products);
    navigate("/profile");
  };

  const numbers = useMemo(() => getNumbers(), [count]);

  return (
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
        onClick={onMakeOrder}
        twclass={"w-full"}
      />
    </section>
  );
}
