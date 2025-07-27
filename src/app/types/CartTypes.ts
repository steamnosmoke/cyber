import { TProduct } from "./ProductTypes";


export type TCartItem = TProduct & {
  count: number;
  subTotal: number;
  totalDiscount: number;
  total: number;
};
