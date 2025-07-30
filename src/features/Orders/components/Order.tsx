import { useMemo } from "react";

import { TNumber, TOrderProps } from "../types";

import OrderCard from "./OrderCard";

export default function Order({ order }: TOrderProps) {
  const numbers = useMemo<TNumber[]>(
    () => [
      { label: "Subtotal", value: `$${order?.totalPriceWithoutDiscount}` },
      { label: "Discount", value: `$${order?.totalDiscount}` },
      { label: "Total", value: `$${order?.totalPriceWithDiscount + 79}` },
      { label: "Number of products", value: `${order?.value}` },
    ],
    []
  );

  return (
    <section className="order w-full pt-4 pb-8 flex flex-col gap-4 items-start justify-between rounded-2xl border-1 border-stone-200 bg-stone-100">
      <div className="header pb-2 border-b-1 border-stone-300 w-full flex justify-between">
        <h3 className="relative pl-1 mx-8 flex gap-3 items-center justify-start text-xl group cursor-pointer *:transition-all *:duration-200 ">
          <span className="relative z-10 group-hover:text-stone-600">
            Order "{order.id.slice(order.id.length - 4, order.id.length)}"
          </span>

          <span className="text-stone-600">by {order?.date}</span>

          <span className="absolute bg-stone-500 bottom-1 left-0 h-[2px] w-0  group-hover:w-70"></span>

          <span
            className={`status py-1 px-2 rounded-[6px] text-[14px] ${
              order.status === "delivered"
                ? "bg-green-200 text-green-800"
                : order.status === "assembling"
                ? "bg-blue-100 text-blue-900"
                : "bg-red-200 text-red-800"
            }`}
          >
            {order.status}
          </span>
        </h3>
      </div>

      <div className="flex gap-4 items-center justify-between w-full  px-8">
        <ul className="list flex gap-4 justify-start items-center">
          {order.items.length <= 4 ? (
            order.items.map((product) => (
              <OrderCard product={product} key={product.id} />
            ))
          ) : (
            <>
              {order.items.slice(0, 4).map((product) => (
                <OrderCard product={product} key={product.id} />
              ))}
              <div className="w-40 flex items-center justify-center h-68 rounded-2xl bg-stone-50 text-2xl font-medium pr-2 shadow-[0_10px_10px_-2px_rgb(223,223,223)]">
                +{order.items.length - 4}
              </div>
            </>
          )}
        </ul>
        <div className="info  flex flex-col items-center ">
          <h2 className="title text-xl leading-12 pb-3 pt-0 px-0">
            Order Summary
          </h2>
          <ul className="numbers flex flex-col gap-3 items-start justify-center">
            {numbers.map((number, index) => (
              <li
                className="item flex items-center justify-start gap-15 w-full"
                key={index}
              >
                <p className="label text-base font-medium leading-6 w-50">
                  {number.label}
                </p>
                <p className="number text-base font-medium leading-8">
                  {number.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
