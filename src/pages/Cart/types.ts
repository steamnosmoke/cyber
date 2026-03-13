import { CartItem } from "types/CartTypes";

export interface Num {
  label: string;
  value: string;
};

export interface Props {
  product: CartItem;
};

export interface CartStorev {
  subtotal: number;
  discount: number;
  total: number;
  count: number;
  calcNumbers: (cart: CartItem[]) => void;
};