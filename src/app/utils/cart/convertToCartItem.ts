import { TProduct } from "types/ProductTypes";
import { TCartItem } from "types/CartTypes";

import { useProductStore } from "store/productsStore";

export default function convertToCartItem(
  product: TProduct,
  color: string,
  memory: string
): TCartItem {

  const setProduct = useProductStore.getState().setProduct;
  const currentVariant = product.variants.find(
    (item) => item.color === color && item.memory === memory
  );
  const variantId = `${product.variants.indexOf(currentVariant)}`;
  const objectId = `${Number(product.id) - 1}x${variantId}`;
  const item: TCartItem = {
    ...product,
    ...currentVariant,
    totalPrice: currentVariant.price - currentVariant.discount,
    count: 1,
    total: product.price - product.discount,
    price: currentVariant.price,
    discount: currentVariant.discount,
    subTotal: currentVariant.price,
    totalDiscount: currentVariant.discount,
    objectId,
    variantId
  };
  setProduct(item);
  return item;
}
