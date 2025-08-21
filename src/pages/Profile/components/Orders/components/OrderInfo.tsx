import { TOrderProps } from "../types";

import getNumbers from "../config/numbers";

export default function OrderInfo({ order }: TOrderProps) {
  const numbers = getNumbers(order);

  return (
    <div className="info  flex flex-col items-center ">
      <h2 className="title text-xl leading-12 pb-3 pt-0 px-0">Order Summary</h2>
      <ul className="numbers flex flex-col gap-3 items-start justify-center">
        {numbers.map((number, index) => (
          <li
            className="item flex items-center justify-start gap-15 w-full"
            key={index}
          >
            <p className="label text-base font-medium leading-6 w-50">
              {number.label}
            </p>
            <p className="number text-base font-medium leading-8">
              {number.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
