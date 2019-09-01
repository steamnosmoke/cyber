import { useCartStore } from "../store/cartStore";
import { TNum } from "../types";

export default function getNumbers(): TNum[] {
  const subtotal = useCartStore.getState().subtotal;
  const discount = useCartStore.getState().discount;
  const total = useCartStore.getState().total;
  const count = useCartStore.getState().count;
  return [
    { label: "Subtotal", value: `$${subtotal}` },
    { label: "Estimated Tax", value: `$50` },
    { label: "Estimated shipping & Handling", value: `$29` },
    { label: "Discount", value: `$${discount}` },
    { label: "Total", value: `$${total + 79}` },
    { label: "Number of products", value: `${count} units` },
  ];
}
