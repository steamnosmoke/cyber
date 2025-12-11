import { useCartStore } from "../store/cartStore";
import { TNum } from "../types";

export default function useGetNumbers(): TNum[] {
  const subtotal = useCartStore((state) => state.subtotal);
  const discount = useCartStore((state) => state.discount);
  const total = useCartStore((state) => state.total);
  const count = useCartStore((state) => state.count);

  return [
    { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
    { label: "Estimated Tax", value: `$50.00` },
    { label: "Estimated shipping & Handling", value: `$29.00` },
    { label: "Discount", value: `$${discount.toFixed(2)}` },
    { label: "Total", value: `$${(total + 79).toFixed(2)}` },
    {
      label: "Number of products",
      value: `${count} unit${count !== 1 ? "s" : ""}`,
    },
  ];
}
