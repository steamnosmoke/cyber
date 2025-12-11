
import { ReactNode, Dispatch, SetStateAction } from "react";
import { TCartItem } from "types/CartTypes";

export default interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  twclass?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  textclass?: string;
}

export type TAddToCartProps = {
  product: TCartItem;
  setStock: Dispatch<SetStateAction<number>>;
  stock: number;
  color: "black" | "white";
  isAnimating?: boolean;
  setAnimating?: (val: boolean) => void;
  timerRef: React.RefObject<ReturnType<typeof setTimeout> | null>;
  className?: string;
};
