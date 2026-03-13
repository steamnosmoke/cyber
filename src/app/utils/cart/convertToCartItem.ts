import { Product } from "types/ProductTypes";
import { CartItem } from "types/CartTypes";

import { useProductStore } from "store/productsStore";

export default function convertToCartItem(
  product: Product,
  color: string,
  memory: string
): CartItem {

  const seProduct = useProductStore.getState().seProduct;
  const currenVariant = product.variants.find(
    (item) => item.color === color && item.memory === memory
  );
  const variantId = `${product.variants.indexOf(currenVariant)}`;
  const objectId = `${Number(product.id) - 1}x${variantId}`;
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
    objectId,
    variantId
  };
  seProduct(item);
  return item;
}
