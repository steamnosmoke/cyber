import { TOrderItemsProps} from "../types";

import OrderCard from "./OrderCard";

export default function OrderItems({ items }: TOrderItemsProps) {
  return (
    <ul className="list flex gap-4 justify-start items-center">
      {items.length <= 4 ? (
        items.map((product, index) => (
          <OrderCard product={product} key={index} />
        ))
      ) : (
        <>
          {items.slice(0, 4).map((product, index) => (
            <OrderCard product={product} key={index} />
          ))}
          <div className="w-40 flex items-center justify-center h-68 rounded-2xl bg-stone-100 text-2xl font-medium pr-2 shadow-[inset_0_10px_20px_-2px_rgb(223,223,223)]">
            +{items.length - 4}
          </div>
        </>
      )}
    </ul>
  );
}
