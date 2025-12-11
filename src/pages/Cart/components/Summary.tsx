import { useNavigate } from "react-router";

import { useAuthStore } from "store/authStore";
import useMakeOrder from "hooks/useMakeOrder";
import useGetCart from "hooks/cart/useGetCart";

import useClearCart from "../hooks/useClearCart";
import useUpdateStock from "../hooks/useUpdateStock";
import useGetNumbers from "../hooks/useGetNumbers";

import BlackButton from "buttons/components/BlackButton";
import BlackLineButton from "buttons/components/BlackLineButton";
import Remove from "assets/images/components/Remove";

export default function Summary() {
  const userId = useAuthStore((state) => state.firebaseId);
  const navigate = useNavigate();
  const { cart: products } = useGetCart(userId);

  const { mutate: makeOrder } = useMakeOrder(userId);
  const { mutate: clearCart } = useClearCart(userId);
  const { mutate: updateStock } = useUpdateStock();


  const onMakeOrder = () => {
    if (!products || products.length === 0) return;

    updateStock(products);
    clearCart();
    makeOrder(products);
    navigate("/profile");
  };

  const numbers = useGetNumbers();

  return (
    <section className="right border-1 border-stone-300 rounded-[10px] py-14 px-16 w-134 flex flex-col items-start justify-center gap-10 mt-4 sticky top-42">
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
      <div className="flex gap-6 items-center justify-between">
        <BlackButton
          children={"Checkout"}
          onClick={onMakeOrder}
          twclass={"!w-80"}
          disabled={!products || products.length === 0}
        />
        <BlackLineButton
          children={<Remove />}
          twclass="!w-16 !p-4 !flex !items-center !justify-center hover:!scale-120"
          onClick={() => clearCart()}
        />
      </div>
    </section>
  );
}
