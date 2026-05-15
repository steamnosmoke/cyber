import { useCartStore } from "../store/cartStore";
import { Num } from "../types";

export default function useGetNumbers(): Num[] {
  const subtotal = useCartStore((state) => state.subtotal);
  const discount = useCartStore((state) => state.discount);
  const total = useCartStore((state) => state.total);
  const count = useCartStore((state) => state.count);

  return [
    { label: "Сумма", value: `$${subtotal.toFixed(2)}` },
    { label: "Сервисный сбор", value: `$10.00` },
    { label: "Доставка", value: `$19.00` },
    { label: "Скидка", value: `$${discount.toFixed(2)}` },
    { label: "Итоговая сумма", value: `$${(total + 29).toFixed(2)}` },
    {
      label: "Количество товаров",
      value: `${count}`,
    },
  ];
}
