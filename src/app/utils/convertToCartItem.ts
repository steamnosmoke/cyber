import { Product } from "types/ProductTypes";
import { CartItem } from "types/CartTypes";

export default function convertToCartItem(
  product: Product,
): CartItem {
  const { color, memory } = product;
  const currenVariant = product.variants.find(
    (item) => item.color === color && item.memory === memory
  );
  const item: CartItem = {
    ...product,
    ...currenVariant,
    totalPrice: currenVariant.price - currenVariant.discount,
    count: 1,
    total: product.price - product.discount,
    price: currenVariant.price,
    discount: currenVariant.discount,
    subTotal: currenVariant.price,
    totalDiscount: currenVariant.discount,
  };
  return item;
}
