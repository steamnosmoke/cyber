import { useMemo } from "react";
import OrderCard from "./OrderCard";

export default function Order({ order }) {
  const numbers = useMemo(() => [
    { label: "Subtotal", value: `$${order?.totalPriceWithoutDiscount}` },
    { label: "Discount", value: `$${order?.totalDiscount}` },
    { label: "Total", value: `$${order?.totalPriceWithDiscount + 79}` },
    { label: "Number of products", value: `${order?.value}` },
  ]);
  return (
    <section className="order w-full pt-10 px-0 pb-20 border-b-1 border-stone-300">
      <h3 className="title text-2xl leading-12 pb-5 pt-0 px-0">
        Order by {order?.date}
      </h3>
      <ul className="list max-w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-5 gap-y-5 justify-items-center">
        {order?.items.map((product, prodId) => (
          <OrderCard product={product} key={prodId} />
        ))}
      </ul>
      <div className="info mt-20 flex flex-col items-center">
        <h2 className="title text-2xl leading-12 pb-5 pt-0 px-0">
          Order Summary
        </h2>
        <ul className="numbers flex flex-col gap-4 items-start justify-center">
          {numbers.map((number, index) => (
            <li
              className="item flex items-center justify-start gap-15 w-full"
              key={index}
            >
              <p
                className="label text-[20px] font-medium leading-6 w-50"
                style={{ letterSpacing: "3%" }}
              >
                {number.label}
              </p>
              <p
                className="number text-[20px] font-medium leading-8"
                style={{ letterSpacing: "3%" }}
              >
                {number.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
