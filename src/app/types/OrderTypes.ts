import { TAddress } from "./AuthTypes";
import { TCartItem } from "./CartTypes";

export type TOrder = {
  date: string;
  items: TCartItem[];
  status: string;
  totalDiscount: number;
  totalPriceWithDiscount: number;
  totalPriceWithoutDiscount: number;
  value: number;
  id: string;
  address?: TAddress;
};