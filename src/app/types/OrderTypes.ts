import { Address } from "./AuthTypes";
import { CartItem } from "./CartTypes";

export interface Order {
  date: string;
  items: CartItem[];
  status: string;
  totalDiscount: number;
  totalPriceWithDiscount: number;
  totalPriceWithoutDiscount: number;
  value: number;
  id?: string;
  address?: Address;
};