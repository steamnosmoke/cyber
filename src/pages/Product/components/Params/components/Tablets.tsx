import { useProductStore } from "store/productsStore";

import getTablets from "../utils/getTablets";

export default function Tablets() {
  const product = useProductStore((state) => state.product);

  const tablets = getTablets(product);
  return (
    <ul className="tablets flex justify-between gap-8 w-full">
      {tablets.map((tablet, index) => (
        <li className="tablet flex items-center gap-4" key={index}>
          <img src={tablet.img} alt="" />
          <p className="naming text-[14px] leading-6">
            {tablet.label}
            <br />
            <span className="tablet_text text-black text-[14px] leading-6">
              {tablet.value}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}
