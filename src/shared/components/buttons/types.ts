import { TCartItem } from "types/CartTypes";

type TProps = {
  children: string;
  onClick?: () => void;
  twclass?: string;
  textclass?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
};

export default TProps;

export type TCountProps = {
  product: TCartItem;
  stock: boolean;
  setStock: (val: boolean) => void;
  color?: string;
  isAnimatingAdd?: boolean;
  isAnimatingRemove?: boolean;
  setAnimatingAdd?: (isAnimatingAdd: boolean) => void;
  setAnimatingRemove?: (isAnimatingRemove: boolean) => void;
  timerRef?: React.RefObject<any>;
};
