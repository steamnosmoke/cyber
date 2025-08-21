import { TOrderProps } from "../types";

import OrderHeader from "./OrderHeader";
import OrderInfo from "./OrderInfo";
import OrderItems from "./OrderItems";

export default function Order({ order }: TOrderProps) {
  return (
    <section className="order w-full pt-4 pb-8 flex flex-col gap-4 items-start justify-between rounded-2xl border-1 border-stone-200 bg-stone-100">
      <OrderHeader order={order} />

      <div className="flex gap-4 items-center justify-between w-full  px-8">
        <OrderItems items={order.items} />

        <OrderInfo order={order} />
      </div>
    </section>
  );
}
