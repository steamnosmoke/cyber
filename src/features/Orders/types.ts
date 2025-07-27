import { TCartItem } from "@/src/app/types/CartTypes";
import { TOrder } from "types/OrderTypes";

export type TNumber = {
  label: string;
  value: string;
};

export type TOrderProps = {
    order: TOrder;
}
export type TOrderCardProps = {
    product: TCartItem;
}