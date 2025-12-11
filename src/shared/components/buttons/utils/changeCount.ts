import { TCartItem } from "types/CartTypes";

export default function changeCount(
  setAnimating: (val: boolean) => void,
  func: (product: TCartItem) => void,
  product: TCartItem,
  timerRef: React.RefObject<ReturnType<typeof setTimeout> | null>
) {
  if (timerRef.current) clearTimeout(timerRef.current);
  setAnimating(true);

  func(product);

  timerRef.current = setTimeout(() => {
    setAnimating(false);
  }, 300);
}
