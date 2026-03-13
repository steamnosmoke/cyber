import { CartItem } from "types/CartTypes";
import { Order } from "types/OrderTypes";

export interface Number {
  label: string;
  value: string;
};

export interface OrderProps {
  order: Order;
};

export interface OrderCardProps {
  product: CartItem;
};

export interface OrderItemsProps {
  items: CartItem[];
};
