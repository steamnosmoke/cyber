import { TCartItem } from "types/CartTypes";

export type TNum = {
  label: string;
  value: string;
};

export type TProps = {
  product: TCartItem;
};

export type TCartStore = {
  subtotal: number;
  discount: number;
  total: number;
  count: number;
  calcNumbers: (cart: TCartItem[]) => void;
};