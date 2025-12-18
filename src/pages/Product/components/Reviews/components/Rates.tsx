import { useProductStore } from "store/productsStore";
import Stars from "../images/components/Stars";
import { TProps } from "../types";

export default function Rates({ data }: TProps) {
  const product = useProductStore((state) => state.product);

  const marks = ["Poor", "Below Average", "Average", "Good", "Excellent"];
  
  return (
    <div className="rating py-8 px-0 flex items-center justify-between">
      <div className="left p-6 bg-stone-100 max-w-46 flex flex-col gap-4 items-center w-45 h-45">
        <p className="number text-4xl  text-center">{product.rating}</p>
        <p className="count_review text-base leading-4 text-center text-black opacity-30">
          of {data.reviews.length} reviews
        </p>
        <Stars rating={product.rating} />
      </div>

      <div className="right">
        <ul className="list flex flex-col-reverse justify-between items-start gap-3 h-45">
          {data.rates.map((el, i) => (
            <li className="item flex items-center gap-4" key={i}>
              <p className="item_title w-33">{marks[i]}</p>
              <div className="bar w-150 h-1 bg-stone-300 rounded-2xl">
                <div
                  className="bar_front bg-amber-500 h-1 rounded-2xl"
                  style={{
                    width: `${(600 * el) / data.reviews.length}px`,
                  }}
                ></div>
              </div>
              <p className="item_count color-black text-base font-medium leading-4 text-center opacity-30">
                {el}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
