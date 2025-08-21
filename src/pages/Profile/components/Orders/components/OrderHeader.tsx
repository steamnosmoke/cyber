import { TOrderProps } from "../types";

export default function OrderHeader({ order }: TOrderProps) {
  return (
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
  );
}
