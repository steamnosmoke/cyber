import { Product } from "./ProductTypes";


export interface CartItem extends Product {
  count: number;
  subTotal: number;
  totalDiscount: number;
  total: number;
};
