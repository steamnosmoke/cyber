import { Order } from "types/OrderTypes";
import { Number } from "../types";

export default function geNumbers(order: Order): Number[] {
  const numbers: Number[] = [
    { label: "Сумма", value: `$${order?.totalPriceWithoutDiscount}` },
    { label: "Скидка", value: `$${order?.totalDiscount}` },
    { label: "Итоговая сумма", value: `$${order?.totalPriceWithDiscount + 79}` },
    { label: "Количество товаров", value: `${order?.value}` },
  ];

  return numbers;
}
