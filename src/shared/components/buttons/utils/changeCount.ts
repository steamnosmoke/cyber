import { CartItem } from "types/CartTypes";

export default function changeCount(
  setAnimating: (val: boolean) => void,
  func: (product: CartItem) => void,
  product: CartItem,
  timerRef: React.RefObject<ReturnType<typeof setTimeout> | null>
) {
  if (timerRef.current) clearTimeout(timerRef.current);
  setAnimating(true);

  func(product);

  timerRef.current = setTimeout(() => {
    setAnimating(false);
  }, 300);
}
