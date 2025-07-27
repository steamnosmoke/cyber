import { useCallback, useMemo, useState } from "react";

import { TProps } from "../types";

export default function Details({ product }: TProps) {
  const [isDetailsOpened, setDetailsOpened] = useState(false);

  const specs = useMemo(
    () => new Map(Object.entries(product.specs)),
    [product]
  );

  const formatKey = useCallback(
    (key: string) => key.split(/(?=[A-Z])/).join(" "),
    []
  );

  return (
    <>
      <section className="details py-20">
        <div className="details-inner py-12 px-10 flex flex-col gap-8">
          <h2 className="title text-2xl leading-8">Details</h2>

          <p className="description text-[14px] leading-6 text-[#9d9d9d]">
            {product.specs.description}
          </p>
          <ul
            className={`main_list flex flex-col gap-10 transition-all duration-200 ease-in-out overflow-hidden ${
              !isDetailsOpened ? "max-h-150" : ""
            }`}
          >
            {[...specs.entries()].map(([key, value], index) =>
              key !== "description" && typeof value !== "object" ? (
                <li
                  key={index}
                  className="specials border-b-2 border-[#cdcdcd] pb-4 pt-2 flex justify-between items-start"
                >
                  <h3 className="item_title capitalize text-xl leading-6">
                    {formatKey(key)}
                  </h3>
                  <p className="value text-[15px] leading-6 text-right capitalize">
                    {value}
                  </p>
                </li>
              ) : Array.isArray(value) ? (
                <li
                  key={index}
                  className="specials border-b-2 border-[#cdcdcd] pb-4 pt-2 flex justify-between items-start"
                >
                  <h3 className="item_title capitalize text-xl leading-6">
                    {formatKey(key)}
                  </h3>
                  <div>
                    {value.map((el, i) => (
                      <p
                        className="value text-[15px] leading-6 text-right capitalize"
                        key={i}
                      >
                        {el}
                      </p>
                    ))}
                  </div>
                </li>
              ) : (
                typeof value === "object" &&
                !Array.isArray(value) && (
                  <li key={index} className="main_item">
                    <h3 className="item_title capitalize text-xl leading-6">
                      {formatKey(key)}
                    </h3>
                    <ul className="item_list flex flex-col gap-6">
                      {Object.entries(value).map(([k, v], i) =>
                        typeof v === "object" && !Array.isArray(v) ? (
                          <li
                            key={i}
                            className="specials border-b-2 border-[#cdcdcd] pb-4 pt-2 flex justify-between items-start"
                          >
                            <h4 className="name capitalize text-base leading-6">
                              {formatKey(k)}
                            </h4>
                            <div>
                              {Object.entries(v).map(
                                ([itemKey, item], j) => (
                                  <p
                                    key={j}
                                    className="value text-[15px] leading-6 text-right capitalize"
                                  >
                                    {formatKey(itemKey)}: {String(item)}
                                  </p>
                                )
                              )}
                            </div>
                          </li>
                        ) : typeof v === "object" && Array.isArray(v) ? (
                          <li
                            key={i}
                            className="specials border-b-2 border-[#cdcdcd] pb-4 pt-2 flex justify-between items-start"
                          >
                            <h4 className="name capitalize text-base leading-6">
                              {formatKey(k)}
                            </h4>
                            <div>
                              {v.map((el, j) => (
                                <p
                                  key={j}
                                  className="value text-[15px] leading-6 text-right capitalize"
                                >
                                  {el}
                                </p>
                              ))}
                            </div>
                          </li>
                        ) : (
                          typeof v !== "object" && (
                            <li
                              key={i}
                              className="specials border-b-2 border-[#cdcdcd] pb-4 pt-2 flex justify-between items-start"
                            >
                              <h4 className="name capitalize text-base leading-6">
                                {formatKey(k)}
                              </h4>
                              <p className="value text-[15px] leading-6 text-right capitalize">
                                {typeof v !== "boolean"
                                  ? v
                                  : v === true
                                  ? "+"
                                  : " -"}
                              </p>
                            </li>
                          )
                        )
                      )}
                    </ul>
                  </li>
                )
              )
            )}
          </ul>

          <button
            className="button flex items-center justify-center py-3 px-14 gap-2 rounded-md border-2 border-black bg-transparent cursor-pointer text-black text-[14px] font-medium mt-10 mb-0 mx-auto transition-all duration-200 ease-in-out hover:bg-black hover:text-white group"
            onClick={() => setDetailsOpened(!isDetailsOpened)}
          >
            View More
            <svg
              className={`arrow transition-all duration-200 ease-in-out ${
                isDetailsOpened
                  ? "transition-all duration-200 ease-in-out rotate-180"
                  : ""
              }`}
              width="24.000000"
              height="24.000000"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                id="Icon/24px/Arrow Down"
                rx="0.000000"
                width="23.000000"
                height="23.000000"
                transform="translate(0.500000 0.500000)"
                fill="#FFFFFF"
                fillOpacity="0"
              />
              <path
                className="fill-black transition-all duration-200 ease-in-out group-hover:fill-white"
                id="Vector 9"
                d="M18.5 9.53L18.53 9.53C18.82 9.23 18.82 8.76 18.53 8.46C18.23 8.17 17.76 8.17 17.46 8.46L17.46 8.49L18.5 9.53ZM6.53 8.49L6.53 8.46C6.23 8.17 5.76 8.17 5.46 8.46C5.17 8.76 5.17 9.23 5.46 9.53L5.49 9.53L6.53 8.49Z"
                fill="#000000"
                fillOpacity="1.000000"
              />
              <path
                className="fill-black transition-all duration-200 ease-in-out group-hover:fill-white"
                id="Vector 9"
                d="M17.46 8.46L11.46 14.46L12 15L12.53 14.46L6.53 8.46L5.46 9.53L12 16.06L18.53 9.53L17.46 8.46ZM18.5 9.53L18.53 9.53C18.82 9.23 18.82 8.76 18.53 8.46C18.23 8.17 17.76 8.17 17.46 8.46L17.46 8.49L18.5 9.53ZM6.53 8.49L6.53 8.46C6.23 8.17 5.76 8.17 5.46 8.46C5.17 8.76 5.17 9.23 5.46 9.53L5.49 9.53L6.53 8.49Z"
                fill="#000000"
                fillOpacity="1.000000"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}
