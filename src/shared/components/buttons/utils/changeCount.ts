import { TCartItem } from "types/CartTypes";

export default function changeCount(
  setAnimatingOn: (val: boolean) => void,
  setAnimatingOff: (val: boolean) => void,
  func: (product: TCartItem) => void,
  product: TCartItem,
  timerRef: React.RefObject<any>
) {
  if (timerRef.current) clearTimeout(timerRef.current);
  func(product);
  setAnimatingOn(true);
  setAnimatingOff(false);

  timerRef.current = setTimeout(() => {
    setAnimatingOn(false);
    setAnimatingOff(true);
  }, 350);
}
