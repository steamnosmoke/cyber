import { TCartItem } from "types/CartTypes";

export default function minusItem(product: TCartItem): TCartItem {
  const updatedCount = product.count - 1;
  const total = updatedCount * product.totalPrice;
  const totalDiscount = updatedCount * product.discount;
  const subTotal = updatedCount * product.price;
  const updatedItem = {
    ...product,
    count: updatedCount,
    totalDiscount,
    total,
    subTotal,
  };
  return updatedItem;
}
