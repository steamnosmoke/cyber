import { Product } from "types/ProductTypes";

import { TTablet } from "../types";

import Delivery from "../images/Delivery.svg";
import Stock from "../images/Stock.svg";
import Guaranteed from "../images/Guaranteed.svg";

export default function getTablets(product: Product): TTablet[] {
  return [
    {
      label: "Доставка",
      img: Delivery,
      value: "1-2 дня",
    },
    {
      label: "В наличии",
      img: Stock,
      value: product.stock > 0 ? "Сегодня" : "Под заказ",
    },
    {
      label: "Гарантия",
      img: Guaranteed,
      value:
        product.specs.guarantee.split(" ")[0] +
        " " +
        product.specs.guarantee.split(" ")[1],
    },
  ];
}
