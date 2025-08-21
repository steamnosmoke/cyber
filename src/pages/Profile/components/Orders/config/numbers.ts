import { TOrder } from "types/OrderTypes";
import { TNumber } from "../types";

export default function getNumbers(order: TOrder): TNumber[] {
  const numbers: TNumber[] = [
    { label: "Subtotal", value: `$${order?.totalPriceWithoutDiscount}` },
    { label: "Discount", value: `$${order?.totalDiscount}` },
    { label: "Total", value: `$${order?.totalPriceWithDiscount + 79}` },
    { label: "Number of products", value: `${order?.value}` },
  ];

  return numbers;
}
