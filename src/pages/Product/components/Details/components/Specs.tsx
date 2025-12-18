import formatKey from "../utils/formatKey"; 
import { useDetailsStore } from "../store/useDetailsStore";
import useSpecs from "../config/specs";

export default function Specs() {
  const isDetailsOpened = useDetailsStore((state) => state.isDetailsOpened);
  const specs = useSpecs();
  return (
    <ul
      className={`main_list flex flex-col gap-10 transition-all duration-400 ease-in-out overflow-hidden  ${
        isDetailsOpened ? "max-h-3000" : "max-h-150"
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
                      className="specials border-b-2 border-[#cdcdcd] pb-4 pt-2 ml-3 flex justify-between items-start"
                    >
                      <h4 className="name capitalize text-base leading-6">
                        {formatKey(k)}
                      </h4>
                      <div>
                        {Object.entries(v).map(([itemKey, item], j) => (
                          <p
                            key={j}
                            className="value text-[15px] leading-6 text-right capitalize"
                          >
                            {formatKey(itemKey)}: {String(item)}
                          </p>
                        ))}
                      </div>
                    </li>
                  ) : typeof v === "object" && Array.isArray(v) ? (
                    <li
                      key={i}
                      className="specials border-b-2 border-[#cdcdcd] pb-4 pt-2 ml-3 flex justify-between items-start"
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
                        className="specials border-b-2 border-[#cdcdcd] pb-2 pt-2 ml-3 flex justify-between items-start"
                      >
                        <h4 className="name capitalize text-base leading-6">
                          {formatKey(k)}
                        </h4>
                        <p className="value text-[15px] leading-6 text-right capitalize">
                          {typeof v === "boolean"
                            ? v
                              ? "+"
                              : " -"
                            : String(v)}
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
  );
}
