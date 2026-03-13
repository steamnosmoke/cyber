import { Order } from "types/OrderTypes";
import { Number } from "../types";

export default function geNumbers(order: Order): Number[] {
  const numbers: Number[] = [
    { label: "Subtotal", value: `$${order?.totalPriceWithoutDiscount}` },
    { label: "Discount", value: `$${order?.totalDiscount}` },
    { label: "Total", value: `$${order?.totalPriceWithDiscount + 79}` },
    { label: "Number of products", value: `${order?.value}` },
  ];

  return numbers;
}
