import { TProduct } from "types/ProductTypes";

import { TTablet } from "../types";

import Delivery from "../images/Delivery.svg";
import Stock from "../images/Stock.svg";
import Guaranteed from "../images/Guaranteed.svg";

export default function getTablets(product: TProduct): TTablet[] {
  return [
    {
      label: "Delivery",
      img: Delivery,
      value: "1-2 days",
    },
    {
      label: "in Stock",
      img: Stock,
      value: product.stock > 0 ? "Today" : "For order",
    },
    {
      label: "Guaranteed",
      img: Guaranteed,
      value:
        product.specs.guarantee.split(" ")[0] +
        " " +
        product.specs.guarantee.split(" ")[1],
    },
  ];
}
