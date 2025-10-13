import { TCartItem } from "types/CartTypes";

export default function updateItem(product: TCartItem): TCartItem {
  const updatedCount = product.count + 1;
  const updatedTotal = product.total + product.totalPrice;
  const updatedDiscount = updatedCount * product.discount;
  const updatedSubTotal = updatedCount * product.price;
  const updatedItem = {
    ...product,
    count: updatedCount,
    total: updatedTotal,
    totalDiscount: updatedDiscount,
    subTotal: updatedSubTotal,
  };
  return updatedItem;
}
